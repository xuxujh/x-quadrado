import styles from "./Insights.module.scss";

const insights = [
  {
    number: "01",
    category: "Dados",
    title: "Decisões melhores começam com perguntas melhores.",
    date: "03.09.26",
  },
  {
    number: "02",
    category: "Design",
    title: "Clareza visual também é estratégia.",
    date: "28.08.26",
  },
  {
    number: "03",
    category: "Tecnologia",
    title: "Automação não é sobre fazer mais. É sobre remover atrito.",
    date: "17.08.26",
  },
];

export default function Insights() {
  return (
    <section className={styles.insights} id="insights">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span>06 / INSIGHTS</span>

          <h2>
            Ideias para pensar
            <br />
            sistemas melhores.
          </h2>
        </div>

        <div className={styles.list}>
          {insights.map((item) => (
            <article className={styles.item} key={item.number}>
              <span className={styles.number}>{item.number}</span>

              <span className={styles.category}>{item.category}</span>

              <h3>{item.title}</h3>

              <time className={styles.date}>{item.date}</time>

              <span className={styles.arrow}>↗</span>
            </article>
          ))}
        </div>

        <a className={styles.all} href="#">
          Ver todos os insights ↗
        </a>
      </div>
    </section>
  );
}
