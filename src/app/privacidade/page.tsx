import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Política de Privacidade | X-Quadrado",
  description:
    "Entenda como a X-Quadrado coleta, utiliza, protege e compartilha dados pessoais.",
};

const sections = [
  { id: "dados", label: "Dados tratados" },
  { id: "finalidades", label: "Finalidades e bases legais" },
  { id: "compartilhamento", label: "Compartilhamento" },
  { id: "retencao", label: "Retenção e segurança" },
  { id: "direitos", label: "Seus direitos" },
  { id: "cookies", label: "Cookies e tecnologias" },
  { id: "contato", label: "Contato" },
];

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="X-Quadrado — Home">
            xq.
          </Link>

          <Link href="/" className={styles.backLink}>
            Voltar ao site ↗
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>
              <span>DOCUMENTO / 01</span>
              <span>LGPD</span>
            </div>

            <div className={styles.heroGrid}>
              <p>Privacidade é parte do projeto.</p>

              <h1>
                Política de
                <br />
                Privacidade.
              </h1>
            </div>

            <div className={styles.heroMeta}>
              <span>Última atualização</span>
              <time dateTime="2026-09-12">12.09.2026</time>
            </div>
          </div>
        </section>

        <section className={styles.policy}>
          <div className={styles.policyInner}>
            <aside className={styles.index} aria-label="Índice da política">
              <span>Índice</span>

              <nav>
                {sections.map((section, index) => (
                  <a key={section.id} href={`#${section.id}`}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {section.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className={styles.content}>
              <div className={styles.introduction}>
                <p>
                  Esta Política explica como a X-Quadrado trata dados pessoais
                  de visitantes do site e de pessoas que entram em contato
                  conosco. Nosso compromisso é usar apenas os dados necessários,
                  com transparência, segurança e respeito à Lei Geral de Proteção
                  de Dados Pessoais — Lei nº 13.709/2018 (LGPD).
                </p>

                <p>
                  Para os tratamentos descritos aqui, a X-Quadrado atua como
                  controladora dos dados pessoais, isto é, define como e por que
                  essas informações serão utilizadas.
                </p>
              </div>

              <section id="dados" className={styles.section}>
                <div className={styles.sectionNumber}>01</div>
                <div>
                  <h2>Quais dados tratamos</h2>

                  <p>
                    Quando você envia o formulário de contato, recebemos
                    nome, e-mail, telefone ou WhatsApp, empresa, área de interesse,
                    conteúdo da mensagem, confirmação de leitura desta Política,
                    sua versão vigente e sua escolha opcional sobre comunicações
                    de marketing.
                  </p>

                  <p>
                    O acesso ao site também pode gerar dados técnicos, como
                    endereço IP, data e horário de acesso, tipo de dispositivo,
                    navegador e registros necessários para segurança e
                    funcionamento do serviço.
                  </p>

                  <p>
                    Pedimos que você não envie dados pessoais sensíveis ou
                    informações confidenciais que não sejam necessárias para o
                    primeiro atendimento.
                  </p>
                </div>
              </section>

              <section id="finalidades" className={styles.section}>
                <div className={styles.sectionNumber}>02</div>
                <div>
                  <h2>Por que usamos esses dados</h2>

                  <ul>
                    <li>
                      Responder solicitações, entender necessidades e preparar
                      propostas ou outras medidas pré-contratuais solicitadas por
                      você.
                    </li>
                    <li>
                      Manter o relacionamento e executar serviços contratados,
                      quando aplicável.
                    </li>
                    <li>
                      Proteger o site, prevenir fraudes e melhorar nossos
                      processos, com base em interesses legítimos e sempre
                      respeitando seus direitos.
                    </li>
                    <li>
                      Cumprir obrigações legais, regulatórias ou determinações de
                      autoridades competentes.
                    </li>
                    <li>
                      Enviar conteúdos e novidades somente quando você der
                      consentimento. Esse consentimento pode ser retirado a
                      qualquer momento.
                    </li>
                  </ul>
                </div>
              </section>

              <section id="compartilhamento" className={styles.section}>
                <div className={styles.sectionNumber}>03</div>
                <div>
                  <h2>Com quem podemos compartilhar</h2>

                  <p>
                    Podemos compartilhar dados, no limite necessário, com
                    fornecedores que apoiam nossa operação — como hospedagem,
                    armazenamento, e-mail, segurança e gestão de contatos. Esses
                    parceiros devem tratar as informações de acordo com nossas
                    instruções, contratos e a legislação aplicável.
                  </p>

                  <p>
                    Também poderemos compartilhar dados para cumprir uma obrigação
                    legal, atender uma ordem de autoridade ou proteger direitos da
                    X-Quadrado e de terceiros. Não vendemos dados pessoais.
                  </p>

                  <p>
                    Se um fornecedor tratar dados fora do Brasil, a transferência
                    será realizada somente com uma base e um mecanismo válidos,
                    além das salvaguardas exigidas pela LGPD e pela regulamentação
                    da ANPD. As informações específicas aplicáveis poderão ser
                    solicitadas pelo canal indicado nesta Política.
                  </p>
                </div>
              </section>

              <section id="retencao" className={styles.section}>
                <div className={styles.sectionNumber}>04</div>
                <div>
                  <h2>Por quanto tempo guardamos</h2>

                  <p>
                    Mantemos os dados pelo período necessário para cumprir as
                    finalidades desta Política. Solicitações que não resultem em
                    contratação são mantidas, como regra, por até 24 meses após a
                    última interação. Registros ligados a contratos ou obrigações
                    legais podem ser conservados por prazos maiores previstos em
                    lei.
                  </p>

                  <p>
                    Dados usados para comunicações de marketing são tratados até
                    a retirada do consentimento ou até deixarem de ser necessários.
                    Ao fim do prazo aplicável, os dados são eliminados ou
                    anonimizados, salvo quando sua conservação for permitida ou
                    exigida por lei.
                  </p>

                  <p>
                    Adotamos medidas técnicas e administrativas razoáveis para
                    evitar acessos não autorizados, perda, alteração ou divulgação
                    indevida. Nenhum ambiente digital, porém, é totalmente imune a
                    riscos.
                  </p>
                </div>
              </section>

              <section id="direitos" className={styles.section}>
                <div className={styles.sectionNumber}>05</div>
                <div>
                  <h2>Seus direitos</h2>

                  <p>A LGPD permite que você solicite, conforme o caso:</p>

                  <ul>
                    <li>confirmação da existência de tratamento e acesso;</li>
                    <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                    <li>
                      anonimização, bloqueio ou eliminação de dados desnecessários,
                      excessivos ou tratados em desconformidade;
                    </li>
                    <li>
                      portabilidade, informação sobre compartilhamentos e revisão
                      de decisões automatizadas;
                    </li>
                    <li>
                      eliminação de dados tratados com consentimento, quando
                      aplicável;
                    </li>
                    <li>
                      informação sobre a possibilidade de negar consentimento e
                      suas consequências;
                    </li>
                    <li>revogação do consentimento;</li>
                    <li>
                      oposição ao tratamento realizado sem consentimento, quando
                      houver descumprimento da LGPD; e
                    </li>
                    <li>
                      peticionamento perante a ANPD ou órgãos de defesa do
                      consumidor.
                    </li>
                  </ul>

                  <p>
                    Para proteger você, poderemos pedir informações que confirmem
                    sua identidade. A retirada do consentimento não invalida os
                    tratamentos realizados anteriormente nem aqueles baseados em
                    outra hipótese legal.
                  </p>
                </div>
              </section>

              <section id="cookies" className={styles.section}>
                <div className={styles.sectionNumber}>06</div>
                <div>
                  <h2>Cookies e decisões automatizadas</h2>

                  <p>
                    O site pode usar tecnologias estritamente necessárias para
                    funcionamento, segurança e preferências. Caso ferramentas de
                    medição ou publicidade sejam adicionadas, você receberá
                    informações e controles adequados antes do uso, quando exigido.
                  </p>

                  <p>
                    Atualmente, não tomamos decisões que produzam efeitos jurídicos
                    ou relevantes para você de forma exclusivamente automatizada a
                    partir dos dados enviados no formulário.
                  </p>
                </div>
              </section>

              <section id="contato" className={styles.section}>
                <div className={styles.sectionNumber}>07</div>
                <div>
                  <h2>Fale sobre seus dados</h2>

                  <p>
                    Para exercer direitos, tirar dúvidas ou fazer uma solicitação
                    relacionada à privacidade, escreva para:
                  </p>

                  <a
                    className={styles.email}
                    href="mailto:contato@xquadrado.com.br?subject=Privacidade%20e%20dados%20pessoais"
                  >
                    contato@xquadrado.com.br ↗
                  </a>

                  <p>
                    Esta Política pode ser atualizada para refletir mudanças nos
                    serviços ou na legislação. A versão vigente e a data de sua
                    última atualização estarão sempre disponíveis nesta página.
                  </p>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <span className={styles.footerLogo}>
              <Image
                src="/brand/marks/xq-icon-dark.png"
                alt="X-Quadrado"
                fill
                sizes="clamp(110px, 10vw, 150px)"
              />
            </span>
            <p>
              Dados, design e tecnologia
              <br />
              trabalhando como sistema.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <Link href="/">Página inicial</Link>
            <a href="#">Voltar ao topo ↑</a>
          </div>

          <span>X-QUADRADO / 2026</span>
        </div>
      </footer>
    </div>
  );
}
