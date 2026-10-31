# Banco de leads

O formulário grava os contatos em uma tabela privada no Supabase. A chave de
acesso é usada somente na rota de servidor do Next.js e nunca é enviada ao
navegador.

## Ativação

1. Crie ou selecione um projeto no Supabase.
2. Abra o SQL Editor e execute `migrations/001_create_leads.sql`.
3. Copie `.env.example` para `.env.local`.
4. Preencha `SUPABASE_URL` e `SUPABASE_SECRET_KEY` com os valores do painel.
5. Reinicie `npm run dev` depois de alterar o arquivo de ambiente.

Use uma chave secreta no formato atual `sb_secret_...`. Não coloque essa chave
em variáveis iniciadas por `NEXT_PUBLIC_`, no código-fonte ou em commits.

## Segurança e retenção

- A tabela usa Row Level Security e não concede acesso aos papéis públicos.
- A API valida tamanho, formato, origem, consentimento e área de interesse.
- Um campo-isca e um limite básico por origem reduzem envios automatizados.
- `retention_until` marca a revisão do registro após 24 meses. A eliminação ou
  extensão do prazo deve acompanhar o processo interno de atendimento.
