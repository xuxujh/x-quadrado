import Reveal from "@/components/ui/Reveal";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>

        <Reveal>
          <div className={styles.meta}>
            <span>02 / ABOUT</span>
            <span>X-QUADRADO</span>
          </div>
        </Reveal>

        <div className={styles.content}>

          <Reveal>
            <h2>
              Complexidade
              <br />
              transformada
              <br />
              em estrutura.
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <div className={styles.copy}>
              <p className={styles.lead}>
                A X-Quadrado conecta dados, design e tecnologia para construir
                soluções mais inteligentes, eficientes e coerentes.
              </p>

              <p>
                Atuamos entre estratégia e execução, organizando informação,
                processos e experiências para transformar problemas reais em
                sistemas claros, mensuráveis e preparados para evoluir.
              </p>

              <a href="#servicos">
                Conheça nossas áreas de atuação ↓
              </a>
            </div>
          </Reveal>

        </div>

        <Reveal delay={220}>
          <div className={styles.transition}>
            <span>Dados</span>
            <span>Design</span>
            <span>Tecnologia</span>
            <span>Estratégia</span>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
