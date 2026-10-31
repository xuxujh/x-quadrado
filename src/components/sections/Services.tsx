import styles from "./Services.module.scss";

const services = [
  {
    number: "01",
    title: "Dados & inteligência",
    description:
      "Análise, dashboards, indicadores, modelagem e inteligência aplicada à tomada de decisão.",
  },
  {
    number: "02",
    title: "Tecnologia & sistemas",
    description:
      "Produtos digitais, sistemas, integrações e soluções construídas para simplificar operações.",
  },
  {
    number: "03",
    title: "Design & comunicação",
    description:
      "Identidade, experiência, direção visual e comunicação estruturadas para gerar clareza e valor.",
  },
  {
    number: "04",
    title: "Automação & processos",
    description:
      "Automação de fluxos, redução de tarefas repetitivas e integração entre pessoas, dados e ferramentas.",
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="servicos">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span>03 / SERVIÇOS</span>

          <h2>
            Diferentes disciplinas.
            <br />
            Um único sistema.
          </h2>
        </div>

        <div className={styles.list}>
          {services.map((service) => (
            <article className={styles.item} key={service.number}>
              <span className={styles.number}>{service.number}</span>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <span className={styles.arrow}>↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
