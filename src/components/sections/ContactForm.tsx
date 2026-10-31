"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.scss";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.get("nome"),
          email: formData.get("email"),
          telefone: formData.get("telefone"),
          empresa: formData.get("empresa"),
          area: formData.get("area"),
          mensagem: formData.get("mensagem"),
          privacyAcknowledged: formData.has("privacyAcknowledged"),
          marketingConsent: formData.has("marketingConsent"),
          website: formData.get("website"),
          startedAt: startedAt.current,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.message ||
            "Não foi possível enviar agora. Tente novamente em alguns minutos.",
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora. Tente novamente em alguns minutos.",
      );
      setStatus("error");
    }
  }

  function resetForm() {
    startedAt.current = Date.now();
    setErrorMessage("");
    setStatus("idle");
  }

  return (
    <section className={styles.contact} id="contato">
      <div className={styles.inner}>
        <div className={styles.meta}>
          <span>08 / CONTATO</span>
          <span>X-QUADRADO</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.intro}>
            <h2>
              Tem um projeto,
              <br />
              um problema ou
              <br />
              uma ideia?
            </h2>

            <p>
              Conte um pouco sobre o que você precisa.
              A X-Quadrado organiza o problema antes de propor a solução.
            </p>
          </div>

          <div className={styles.formWrap}>
            {status === "success" ? (
              <div className={styles.success} role="status" aria-live="polite">
                <span>Recebido.</span>

                <h3>
                  Vamos
                  <br />
                  conversar.
                </h3>

                <p>
                  Sua mensagem foi registrada com segurança.
                  Retornaremos pelo contato informado assim que possível.
                </p>

                <button type="button" onClick={resetForm}>
                  Enviar outra mensagem ↗
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                aria-busy={status === "submitting"}
              >
                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="nome">Nome *</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={120}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">E-mail *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>

                <div className={styles.twoColumns}>
                  <div className={styles.field}>
                    <label htmlFor="telefone">
                      Telefone / WhatsApp
                    </label>

                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="empresa">Empresa</label>

                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      autoComplete="organization"
                      maxLength={120}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="area">Área de interesse *</label>

                  <select id="area" name="area" required defaultValue="">
                    <option value="" disabled>
                      Selecione uma área
                    </option>

                    <option value="dados">
                      Dados & inteligência
                    </option>

                    <option value="tecnologia">
                      Tecnologia & sistemas
                    </option>

                    <option value="design">
                      Design & comunicação
                    </option>

                    <option value="automacao">
                      Automação & processos
                    </option>

                    <option value="fotografia">
                      Fotografia & produção visual
                    </option>

                    <option value="outro">
                      Outro
                    </option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="mensagem">
                    Conte um pouco sobre o projeto *
                  </label>

                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={6}
                    minLength={10}
                    maxLength={3000}
                    required
                  />
                </div>

                <div className={styles.privacy}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="privacyAcknowledged"
                      required
                    />

                    <span className={styles.fakeCheckbox} />

                    <span>
                      Li e estou ciente da{" "}
                      <Link href="/privacidade">
                        Política de Privacidade
                      </Link>{" "}
                      e do tratamento dos meus dados para atendimento
                      desta solicitação. *
                    </span>
                  </label>

                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="marketingConsent"
                    />

                    <span className={styles.fakeCheckbox} />

                    <span>
                      Quero receber conteúdos, novidades e comunicações
                      da X-Quadrado. <em>Opcional.</em>
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <p className={styles.error} role="alert">
                    {errorMessage}
                  </p>
                )}

                <div className={styles.actions}>
                  <p>
                    * Campos obrigatórios
                  </p>

                  <button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Enviando…" : "Enviar projeto ↗"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
