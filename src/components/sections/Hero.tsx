import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <span className={styles.index}>01 / HOME</span>

          <h1>
            Dados, design
            <br />
            e tecnologia
            <br />
            trabalhando
            <br />
            como sistema.
          </h1>

          <div className={styles.bottom}>
            <p>
              Estratégia e inteligência aplicada para transformar
              operações, decisões e experiências.
            </p>

            <a href="#about">
              Conheça a X-Quadrado ↓
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <Image
            src="/brand/featured/hero-xq-dark-v2.png"
            alt="Identidade visual X-Quadrado"
            fill
            priority
            className={styles.heroImage}
            sizes="(max-width: 900px) 100vw, 34vw"
          />
        </div>
      </div>

      <div className={styles.footer}>
        <span>São Paulo — Brasil</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}


