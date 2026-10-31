import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.mark}>xq.</div>

            <p>
              Dados, design e tecnologia
              <br />
              trabalhando como sistema.
            </p>
          </div>

          <div className={styles.column}>
            <span>Navegação</span>

            <a href="#about">About</a>
            <a href="#servicos">Serviços</a>
            <a href="#projetos">Projetos</a>
            <a href="#insights">Insights</a>
          </div>

          <div className={styles.column}>
            <span>Social</span>

            <a href="https://www.instagram.com/xis.quadrado/" target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            <a href="#">LinkedIn ↗</a>
          </div>

          <div className={styles.column}>
            <span>Contato</span>

            <a href="mailto:contato@xquadrado.com.br">
              contato@xquadrado.com.br
            </a>

            <p className={styles.location}>
              São Paulo — Brasil
            </p>
          </div>
        </div>

        <div className={styles.bottom}>

          <div className={styles.copyright}>
            <span className={styles.copyrightMark}>C</span>

            <span>
              Todos os quadrados reservados.
            </span>
          </div>

          <span className={styles.year}>
            X-QUADRADO / 2026
          </span>

          <a className={styles.backTop} href="#">
            Voltar ao topo ↑
          </a>

        </div>

      </div>
    </footer>
  );
}