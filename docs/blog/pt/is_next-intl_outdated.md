---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: O next-intl está obsoleto em 2026?
description: O next-intl tornou-se o padrão para o Next.js App Router. No entanto, ainda carrega sobrecarga no bundle em runtime e a complexidade de manter namespaces manualmente.
keywords:
  - next-intl
  - Intlayer
  - Internacionalização
  - i18n
  - Next.js
  - Tamanho do bundle
  - Blog
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# O next-intl está obsoleto em 2026?

Quando a Vercel apresentou o App Router e descontinuou a i18n nativa do Pages Router, o `next-intl` supriu a carência rapidamente. Jan Amann ofereceu documentação exemplar e suporte pontual ao App Router, transformando a biblioteca na escolha comum da comunidade.

Por qual razão, então, reavaliar sua adequação hoje?

**A arquitetura web progrediu significativamente nos últimos três anos, mas a base do `next-intl` permaneceu estática.**

Enquanto o Next.js evoluiu em direção aos React Server Components (RSC), ao streaming e a otimizações por compilador, o `next-intl` ainda trata a internacionalização como uma responsabilidade de execução: enviando volumosos objetos JSON por provedores cliente, executando formatadores ICU nos navegadores e dependendo da triagem manual de namespaces para conter o crescimento do pacote.

<TOC/>

## Principais conclusões

**Ritmo de desenvolvimento estabilizado:**

Nos últimos 12 meses, o `next-intl` somou ~187 commits, focados quase que integralmente em compatibilidade com o Next.js e correções menores.

**Custo de execução no cliente:**

Montar o `NextIntlClientProvider` com `useTranslations()` adiciona ~12.8 KB gzipped (51 KB minificados) antes de exibir qualquer texto, quase o triplo do `next-intlayer` (4.3 KB).

**Vazamento de conteúdo de 90%:**

Em arranjos comuns, **89.8% do payload de traduções recebido por uma página pertence a outras rotas**. Acessar `/contact` força o download de textos de `/pricing` e `/dashboard`.

**Gestão manual de namespaces:**

Prevenir o inchaço dos pacotes requer fragmentar e mapear namespaces rota por rota manualmente, ampliando a possibilidade de falhas em produção.

**Parceria comercial:**

Como parceiro oficial do Crowdin, o projeto tem poucos motivos para priorizar um comando gratuito de tradução por IA local em sua CLI.

## Manutenção vs. ferramentas atuais

Atividade de commits ao longo dos últimos doze meses:

| Repositório           | Estrelas                                                                                                                                               | Total de commits                                                                                                                                                    | Commits / ano                                                                                                                                                      | Último commit                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Histórico recente:

- `amannn/next-intl`: **187 commits** (ajustes de compatibilidade e pequenos reparos).
- `aymericzip/intlayer`: **4.343 commits** (evolução ativa em compiladores, extensões de editor, servidores MCP e motores de tradução).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

Uma ferramenta consolidada pode ser confiável. Mas o ecossistema de i18n se modernizou: compiladores removem conteúdo sem referência em tempo de build, LLMs automatizam a tradução em CI e editores se integram com Language Servers (LSP) e agentes de IA. Uma arquitetura restrita ao runtime não usufrui plenamente desses avanços.

## Avaliação no Next.js 16 App Router

Benchmark conduzido em uma aplicação App Router padrão com 10 rotas e 10 idiomas:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Avaliado em navegadores reais com compressão gzip de produção. Informações completas no [relatório de benchmark Next.js](https://intlayer.org/pt/doc/benchmark/nextjs).

### Pegada base da biblioteca

Peso no cliente antes de acrescentar quaisquer textos:

| Biblioteca             | Gzipped    | Minificado  |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### Peso da página e vazamento de dados

| Configuração           | JS médio / pág (gz) | Vazamento idioma | Vazamento outras págs | Componente médio (gz) |
| ---------------------- | ------------------- | ---------------- | --------------------- | --------------------- |
| Base (sem i18n)        | 150.8 KB            | 0.0%             | 0.0%                  | 0.7 KB                |
| `next-intl` (estático) | 163.5 KB            | 4.2%             | **89.8%**             | 20.5 KB               |
| `next-intl` (dinâmico) | 163.4 KB            | 9.7%             | **89.9%**             | 20.5 KB               |
| `next-intlayer`        | **152.1 KB**        | **0.0%**         | **0.0%**              | **7.2 KB**            |

### Como ocorre o vazamento entre rotas

Em implementações habituais do `next-intl`, o layout raiz carrega todos os textos de uma única vez:

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Ao fornecer `messages` ao provedor na raiz, o navegador baixa a coleção integral de mensagens em qualquer página. Quem visita `/login` é obrigado a carregar também as seções de ajuda, termos e dashboards.

É possível atenuar o problema dividindo arquivos JSON por namespaces. Contudo, manter essa tabela manualmente demanda esforço contínuo e gera erros frequentes.

O Intlayer soluciona isso por análise estática: o [compilador do Intlayer](https://intlayer.org/pt/doc/compiler) empacota exclusivamente os textos solicitados por cada rota, reduzindo o vazamento para **0.0%**.

## Por que o next-intl não suporta tree-shaking

Sua API depende de buscas dinâmicas por strings em runtime:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack e Webpack não conseguem assegurar quais chaves de `UserProfile` serão de fato invocadas. Para não ocasionar erros, **o bundler precisa empacotar o namespace por inteiro no bundle do cliente**. A desestruturação do Intlayer permite ao compilador inspecionar referências concretas e suprimir campos sem utilidade. Saiba mais em [otimização de bundle](https://intlayer.org/pt/doc/concept/bundle-optimization).

## Experiência do desenvolvedor

### JSON segregado vs. co-localização

Com o `next-intl`, os textos ficam retidos em pastas `messages/` distantes do código. O Intlayer reúne as declarações de conteúdo junto aos componentes:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/pt.json"
{
  "authModal": {
    "title": "Entre na sua conta",
    "submitButton": "Continuar"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      pt: "Entre na sua conta",
    }),
    submitButton: t({
      en: "Continue",
      pt: "Continuar",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

Ao mover ou remover `AuthModal.tsx`, as traduções associadas são ajustadas ou excluídas em conjunto.

### Sugestão de código vs. segurança estrita de tipos

Definir `IntlMessages` no `next-intl` traz autocompletar baseado no arquivo de idioma principal:

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

Entretanto, apenas o idioma base é verificado. Se uma chave for excluída de `pt.json`, o TypeScript não emitirá avisos, seu build passará normalmente e os usuários receberão textos ausentes.

O Intlayer infere tipos a partir de todas as declarações. Com o [`strictMode`](https://intlayer.org/pt/doc/concept/configuration), traduções incompletas geram erros imediatos na compilação.

### Ecossistema e automação com IA

| Funcionalidade                  | `next-intl` | Intlayer                                                                |
| ------------------------------- | ----------- | ----------------------------------------------------------------------- |
| **Extensão VS Code**            | ❌ Nenhuma  | ✅ [Extensão oficial](https://intlayer.org/pt/doc/vs-code-extension)    |
| **Language Server (LSP)**       | ❌ Nenhum   | ✅ [LSP dedicado](https://intlayer.org/pt/doc/lsp)                      |
| **Servidor MCP (para agentes)** | ❌ Nenhum   | ✅ [Servidor MCP integrado](https://intlayer.org/pt/doc/mcp-server)     |
| **Habilidades de Agente**       | ❌ Nenhuma  | ✅ [Skills prontas](https://intlayer.org/pt/doc/agent_skills)           |
| **CMS Visual em contexto**      | ❌ Nenhum   | ✅ [Gratuito & Open Source](https://intlayer.org/pt/doc/concept/editor) |

A presença de servidores LSP e MCP viabiliza que assistentes de codificação entendam a estrutura de conteúdo do projeto e sugiram atualizações com alta precisão.

## A relação com o Crowdin

O `next-intl` conta com patrocínio oficial do Crowdin. Apoios financeiros são importantes para o software livre, mas direcionam prioridades: estruturado para operar como cliente de serviços TMS externos, o `next-intl` não prioriza ferramentas gratuitas e locais de tradução por IA na CLI.

O Intlayer disponibiliza esses recursos nativamente:

**Preenchimento automático por IA local (`intlayer fill`):**

Localiza e traduz textos ausentes utilizando suas credenciais da OpenAI, Anthropic, Mistral ou Gemini.

**CMS visual auto-hospedado:**

Use o [CMS Intlayer](https://intlayer.org/pt/doc/concept/cms) para capacitar editores a ajustarem textos com gravação direta no Git.

**Licença de código aberto permissiva:**

Todo o pacote opera sob licença Apache 2.0.

## Em quais situações o next-intl ainda é aplicável?

<AccordionGroup>
<Accordion header="Demandas complexas de ICU MessageFormat">

Se o sistema utiliza extensivamente seletores ordinais encadeados e formatos avançados, o suporte a ICU do `next-intl` é confiável.

</Accordion>
<Accordion header="Fluxos consolidados no Crowdin">

Para times cujo processo de tradução já se apoia integralmente no Crowdin, a integração do `next-intl` é bastante fluida.

</Accordion>
<Accordion header="Sistemas em produção estáveis">

Se a aplicação atende bem aos requisitos e o tamanho do pacote não afeta o desempenho esperado, a migração não se faz urgente.

</Accordion>
</AccordionGroup>

## Como melhorar minha configuração atual do next-intl?

O Intlayer fornece um pacote de compatibilidade direta que replica as assinaturas de funções e hooks do `next-intl` (como `useTranslations`, `getTranslations` e auxiliares de navegação). Você não precisa reescrever componentes para obter as vantagens de otimização em nível de compilador.

A configuração é feita com um único comando:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Essa CLI interativa:

1. Instala o pacote de compatibilidade `@intlayer/next-intl`.
2. Configura aliases no empacotador para que suas importações (`next-intl`, `next-intl/server`) apontem para o Intlayer, permitindo desinstalar a biblioteca antiga do `package.json`.
3. Ativa imediatamente o Language Server (LSP), a eliminação de vazamentos de dados entre páginas (tree-shaking completo) e fluxos locais de tradução por IA sem necessidade de uma refatoração pesada.

Para instruções detalhadas, veja nossos guias dedicados:

- **Compatibilidade transparente:** Mantenha suas chamadas `useTranslations` usando o [adaptador de compatibilidade para next-intl](https://intlayer.org/pt/doc/compatibility/next-intl).
- **Migração guiada:** Converta catálogos JSON existentes em arquivos tipados por meio do nosso [guia de migração next-intl](https://intlayer.org/pt/doc/migration/next-intl).
- **Abordagem híbrida:** Conserve o `next-intl` na renderização enquanto [utiliza o Intlayer com next-intl](https://intlayer.org/pt/blog/intlayer-with-next-intl) para realizar traduções locais por IA.

Avalie o payload e vazamento do seu site com o [scanner de SEO para i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Leituras complementares

- [Benchmark Next.js i18n: comparativo completo de performance](https://intlayer.org/pt/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/pt/blog/next-i18next-vs-next-intl-vs-intlayer)
- [O i18next está obsoleto em 2026?](https://intlayer.org/pt/blog/is-i18next-outdated)
- [Por que adotar uma internacionalização orientada a compiladores](https://intlayer.org/pt/blog/compiler-vs-declarative-i18n)
