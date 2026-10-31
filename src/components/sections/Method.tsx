import styles from "./Method.module.scss";

const steps = [
  {
    number: "01",
    title: "Observar",
    text: "Entender contexto, operação, público, dados e restrições reais antes de propor qualquer solução.",
  },
  {
    number: "02",
    title: "Estruturar",
    text: "Organizar informações, processos e prioridades para transformar complexidade em arquitetura clara.",
  },
  {
    number: "03",
    title: "Criar",
    text: "Projetar soluções digitais, visuais e operacionais alinhadas ao problema e ao objetivo do negócio.",
  },
  {
    number: "04",
    title: "Medir",
    text: "Acompanhar indicadores, comportamento e desempenho para saber o que realmente funciona.",
  },
  {
    number: "05",
    title: "Otimizar",
    text: "Refinar continuamente sistemas, experiências e decisões com base em evidências.",
  },
];

export default function Method() {
  return (
    <section className={styles.method} id="metodo">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span>05 / MÉTODO</span>

          <h2>
            Pensar em sistema.
            <br />
            Evoluir por evidência.
          </h2>
        </div>

        <div className={styles.flow}>
          {steps.map((step) => (
            <article className={styles.step} key={step.number}>
              <span className={styles.number}>{step.number}</span>

              <div className={styles.marker}></div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
