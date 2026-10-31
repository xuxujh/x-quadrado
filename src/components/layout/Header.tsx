import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="X-Quadrado — Home">
          <span className={styles.logoFrame}>
            <Image
              src="/brand/marks/xq-icon-dark.png"
              alt=""
              fill
              priority
              sizes="48px"
            />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#about">About</a>
          <a href="#servicos">Serviços</a>
          <a href="#projetos">Projetos</a>
          <a href="#insights">Insights</a>
        </nav>

        <a href="#contato" className={styles.contact}>
          Contato ↗
        </a>
      </div>
    </header>
  );
}
