import styles from "./Cta.module.scss";

export default function Cta() {
  return (
    <section className={styles.cta} id="contato">
      <div className={styles.inner}>
        <span className={styles.index}>07 / CONTATO</span>

        <div className={styles.content}>
          <h2>
            Tem um problema
            <br />
            interessante?
          </h2>

          <a href="mailto:contato@xquadrado.com.br">
            Vamos conversar ↗
          </a>
        </div>
      </div>
    </section>
  );
}
