import Image from "next/image";
import styles from "./Projects.module.scss";

const projects = [
  {
    number: "01",
    title: "Sistema de gestão orientado a dados",
    category: "Produto digital / Dados",
    image: "/brand/featured/projeto-sistema-gestao-dados-light.png",
  },
  {
    number: "02",
    title: "Identidade e presença digital",
    category: "Branding / Design",
    image: "/brand/featured/projeto-identidade-presenca-digital-left.png",
  },
  {
    number: "03",
    title: "Automação de operação e processos",
    category: "Tecnologia / Automação",
    image: "/brand/featured/projeto-automacao-operacao-processos-flat.png",
  },
];

export default function Projects() {
  return (
    <section className={styles.projects} id="projetos">
      <div className={styles.inner}>
        <div className={styles.top}>
          <span>04 / PROJETOS</span>

          <h2>
            Trabalho real.
            <br />
            Estrutura aplicada.
          </h2>
        </div>

        <div className={styles.list}>
          {projects.map((project, index) => (
            <article
              className={`${styles.project} ${
                index % 2 === 1 ? styles.reverse : ""
              }`}
              key={project.number}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 65vw"
                  className={`${styles.image} ${
                    index === 0 ? styles.imageData : ""
                  }`}
                />
              </div>

              <div className={styles.info}>
                <span className={styles.number}>{project.number}</span>

                <div>
                  <p className={styles.category}>{project.category}</p>
                  <h3>{project.title}</h3>
                </div>

                <a href="#contato">Ver projeto ↗</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
