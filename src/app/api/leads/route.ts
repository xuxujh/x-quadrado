import { saveLead } from "@/lib/leads";

export const runtime = "nodejs";

const MAX_BODY_SIZE = 16_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const allowedAreas = new Set([
  "dados",
  "tecnologia",
  "design",
  "automacao",
  "fotografia",
  "outro",
]);

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitGlobal = globalThis as typeof globalThis & {
  xqLeadRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  rateLimitGlobal.xqLeadRateLimit ?? new Map<string, RateLimitEntry>();

rateLimitGlobal.xqLeadRateLimit = rateLimitStore;

class LeadValidationError extends Error {}

function json(body: object, status: number, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "local"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();

  if (rateLimitStore.size > 1_000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(storedKey);
      }
    }
  }

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return null;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  }

  entry.count += 1;
  return null;
}

function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host");

  if (!origin || !host) {
    return;
  }

  try {
    if (new URL(origin).host !== host) {
      throw new LeadValidationError("Origem inválida.");
    }
  } catch (error) {
    if (error instanceof LeadValidationError) {
      throw error;
    }

    throw new LeadValidationError("Origem inválida.");
  }
}

function readString(
  data: Record<string, unknown>,
  field: string,
  minLength: number,
  maxLength: number,
) {
  const value = data[field];

  if (typeof value !== "string") {
    throw new LeadValidationError("Revise os campos obrigatórios.");
  }

  const normalized = value.trim().replace(/\r\n/g, "\n");

  if (normalized.length < minLength || normalized.length > maxLength) {
    throw new LeadValidationError("Revise os campos obrigatórios.");
  }

  return normalized;
}

function readOptionalString(
  data: Record<string, unknown>,
  field: string,
  maxLength: number,
) {
  const value = data[field];

  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new LeadValidationError("Revise os dados informados.");
  }

  const normalized = value.trim();

  if (normalized.length > maxLength) {
    throw new LeadValidationError("Revise os dados informados.");
  }

  return normalized || null;
}

function parseLead(data: unknown) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new LeadValidationError("Dados do formulário inválidos.");
  }

  const fields = data as Record<string, unknown>;

  if (typeof fields.website === "string" && fields.website.trim()) {
    return null;
  }

  const startedAt = fields.startedAt;
  const elapsed =
    typeof startedAt === "number" ? Date.now() - startedAt : Number.NaN;

  if (!Number.isFinite(elapsed) || elapsed < 800 || elapsed > 24 * 60 * 60 * 1000) {
    throw new LeadValidationError("Não foi possível validar o envio.");
  }

  const nome = readString(fields, "nome", 2, 120);
  const email = readString(fields, "email", 5, 254).toLowerCase();
  const telefone = readOptionalString(fields, "telefone", 40);
  const empresa = readOptionalString(fields, "empresa", 120);
  const area = readString(fields, "area", 2, 40);
  const mensagem = readString(fields, "mensagem", 10, 3_000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new LeadValidationError("Informe um e-mail válido.");
  }

  if (!allowedAreas.has(area)) {
    throw new LeadValidationError("Selecione uma área de interesse válida.");
  }

  if (fields.privacyAcknowledged !== true) {
    throw new LeadValidationError(
      "É necessário confirmar a leitura da Política de Privacidade.",
    );
  }

  if (typeof fields.marketingConsent !== "boolean") {
    throw new LeadValidationError("Consentimento de marketing inválido.");
  }

  return {
    nome,
    email,
    telefone,
    empresa,
    area,
    mensagem,
    marketingConsent: fields.marketingConsent,
  };
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return json({ ok: false, message: "Formato de envio inválido." }, 415);
    }

    const retryAfter = checkRateLimit(getClientKey(request));

    if (retryAfter) {
      return json(
        {
          ok: false,
          message: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
        },
        429,
        { "Retry-After": String(retryAfter) },
      );
    }

    const body = await request.text();

    if (body.length > MAX_BODY_SIZE) {
      return json({ ok: false, message: "Mensagem muito extensa." }, 413);
    }

    let payload: unknown;

    try {
      payload = JSON.parse(body);
    } catch {
      return json({ ok: false, message: "Dados do formulário inválidos." }, 400);
    }

    const lead = parseLead(payload);

    if (!lead) {
      return json({ ok: true }, 201);
    }

    await saveLead(lead);

    return json({ ok: true }, 201);
  } catch (error) {
    if (error instanceof LeadValidationError) {
      return json({ ok: false, message: error.message }, 400);
    }

    console.error("Lead submission failed", error);

    return json(
      {
        ok: false,
        message: "Não foi possível enviar agora. Tente novamente em alguns minutos.",
      },
      503,
    );
  }
}
