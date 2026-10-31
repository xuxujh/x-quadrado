import "server-only";

export const PRIVACY_POLICY_VERSION = "2026-09-12";

export type LeadInput = {
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
  area: string;
  mensagem: string;
  marketingConsent: boolean;
};

function getSupabaseConfig() {
  const projectUrl = process.env.SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!projectUrl || !secretKey) {
    throw new Error("Supabase is not configured");
  }

  let url: URL;

  try {
    url = new URL(projectUrl);
  } catch {
    throw new Error("Supabase URL is invalid");
  }

  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("Supabase URL must use HTTPS");
  }

  return {
    projectUrl: url.toString().replace(/\/$/, ""),
    secretKey,
  };
}

export async function saveLead(lead: LeadInput) {
  const { projectUrl, secretKey } = getSupabaseConfig();
  const submittedAt = new Date().toISOString();

  const response = await fetch(`${projectUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      empresa: lead.empresa,
      area: lead.area,
      mensagem: lead.mensagem,
      privacy_acknowledged: true,
      privacy_acknowledged_at: submittedAt,
      privacy_policy_version: PRIVACY_POLICY_VERSION,
      marketing_consent: lead.marketingConsent,
      marketing_consent_at: lead.marketingConsent ? submittedAt : null,
      source: "website_contact_form",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed with status ${response.status}`);
  }
}
