---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: O i18next está obsoleto em 2026?
description: O i18next alimenta milhões de sites, mas sua arquitetura em tempo de execução de 2011 começa a mostrar a idade. Uma análise sobre inchaço de bundle, limites de tree-shaking e estagnação.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internacionalização
  - i18n
  - Tamanho do bundle
  - Blog
slugs:
  - blog
  - is-i18next-outdated
author: aymericzip
---

# O i18next está obsoleto em 2026?

Lançado em 2011, muito antes de componentes React, empacotamento com Webpack ou TypeScript se tornarem padrão, o `i18next` dominou o ecossistema por ser flexível e onipresente, conquistando plugins para diversas stacks e respostas no StackOverflow para quase todo tipo de dúvida.

O projeto não está abandonado, correções continuam sendo lançadas regularmente. No entanto, há uma diferença marcante entre manter um motor legado em funcionamento e evoluir ativamente com as arquiteturas frontend contemporâneas.

Nos últimos anos, o frontend migrou para compilação em tempo de build, React Server Components (RSC), tree-shaking agressivo e fluxos potencializados por IA. O núcleo do i18next segue fiel ao que era há mais de uma década: um singleton em tempo de execução que resolve chaves de texto no cliente.

<TOC/>

## Principais conclusões

**Modo de manutenção:**

No último ano, o `next-i18next` registrou cerca de 63 commits (aproximadamente um por semana) e o `react-i18next` cerca de 157, a maioria voltada a atualizações de dependências e correções pontuais.

**Penalidade pesada em runtime:**

`react-i18next` e `next-i18next` injetam ~17–18 KB gzipped (~60 KB minificados) antes de renderizar qualquer palavra traduzida, quase 4x mais que o `next-intlayer` (~4.7 KB).

**Vazamento severo de conteúdo:**

Em configurações estáticas padrão, até **89.8%** dos dados de localização enviados para uma página pertencem a outras rotas ou a idiomas não visualizados.

**Tree-shaking inviável:**

Chamadas dinâmicas como `t("home.hero.title")` não podem ser analisadas por empacotadores, obrigando catálogos JSON inteiros a entrarem no chunk do cliente.

**Incentivos comerciais:**

Os mantenedores gerenciam o Locize. Criar uma esteira de tradução por IA local e sem custos diretamente na CLI concorreria com sua fonte primária de receita.

## Manutenção vs. evolução ativa

Estrelas no GitHub refletem adoção histórica em vez de fôlego arquitetural recente.

| Repositório             | Estrelas                                                                                                                                                   | Total de commits                                                                                                                                                        | Commits / ano                                                                                                                                                          | Último commit                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18next/i18next`       | [![stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=stars)](https://github.com/i18next/i18next/stargazers)             | [![commits](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![yearly](https://img.shields.io/github/commit-activity/y/i18next/i18next?style=for-the-badge&label=%2Fyear)](https://github.com/i18next/i18next/commits)             | [![last](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             |
| `i18next/react-i18next` | [![stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=stars)](https://github.com/i18next/react-i18next/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/i18next/react-i18next?style=for-the-badge&label=%2Fyear)](https://github.com/i18next/react-i18next/commits) | [![last](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) |
| `i18next/next-i18next`  | [![stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=stars)](https://github.com/i18next/next-i18next/stargazers)   | [![commits](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![yearly](https://img.shields.io/github/commit-activity/y/i18next/next-i18next?style=for-the-badge&label=%2Fyear)](https://github.com/i18next/next-i18next/commits)   | [![last](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   |
| `aymericzip/intlayer`   | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits)     | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     |

Atividade nos últimos doze meses:

| Projeto         | Commits históricos | Últimos 12 meses | Foco                                       |
| --------------- | ------------------ | ---------------- | ------------------------------------------ |
| `next-i18next`  | 1.311              | **63**           | Compatibilidade com Next.js e correções    |
| `react-i18next` | 1.988              | **157**          | Tipos e manutenção                         |
| `i18next` core  | 2.626              | **259**          | Correções menores                          |
| Intlayer        | 7.156              | **4.343**        | Compilador, extensões de IDE e motor de IA |

[![Star History Chart](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

Uma biblioteca enxuta pode ser completa e estável. Contudo, o ferramental de i18n continua a se transformar: bundlers modernos eliminam conteúdo desnecessário em tempo de build, modelos de linguagem traduzem em CI e editores utilizam Language Servers (LSP) e agentes de IA. A dependência exclusiva de plugins em tempo de execução impede que o i18next acompanhe essa evolução.

## Medindo o impacto no bundle

<I18nBenchmark framework="tanstack" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Avaliado em build de produção com 10 rotas e 10 idiomas sob compressão gzip. Mais detalhes no [relatório de benchmark de i18n](https://intlayer.org/pt/doc/benchmark).

### Sobrecarga base da biblioteca

Tamanho inicial antes de adicionar qualquer texto traduzido:

| Biblioteca             | Gzipped    | Minificado  |
| ---------------------- | ---------- | ----------- |
| `next-i18next@16.0.5`  | 17.8 KB    | 61.2 KB     |
| `react-i18next@17.0.2` | 17.3 KB    | 59.8 KB     |
| `intlayer@8.7.12`      | **4.7 KB** | **12.8 KB** |

### Peso de página e vazamento de dados

Testado em React / TanStack Start (estratégia estática):

| Biblioteca            | JS médio / pág (gz) | Vazamento idioma | Vazamento outras págs | Componente médio (gz) | Hidratação  |
| --------------------- | ------------------- | ---------------- | --------------------- | --------------------- | ----------- |
| `react-i18next`       | 180.3 KB            | **50.0%**        | **89.8%**             | 24.3 KB               | 85.1 ms     |
| Intlayer              | **127.8 KB**        | 50.0%            | **0.8%**              | **7.1 KB**            | **24.1 ms** |
| Intlayer (scoped dyn) | **118.1 KB**        | **0.0%**         | **0.8%**              | **4.6 KB**            | 23.7 ms     |

No Next.js:

| Biblioteca      | JS médio / pág (gz) | Vazamento outras págs | Componente médio (gz) |
| --------------- | ------------------- | --------------------- | --------------------- |
| Base (sem i18n) | 150.8 KB            | 0.0%                  | 0.7 KB                |
| `next-i18next`  | **227.5 KB**        | **89.8%**             | 24.5 KB               |
| `next-intlayer` | **152.1 KB**        | **0.0%**              | **7.2 KB**            |

### Principais constatações

**Peso de página:**

No Next.js, o `next-i18next` adiciona **76.7 KB gzipped** em relação ao projeto base (+50%). O `next-intlayer` acrescenta apenas 1.3 KB.

**Vazamento de traduções:**

Por padrão, cerca de **90% dos textos carregados** em uma rota pertencem a outras páginas. A divisão manual de namespaces é desgastante e vulnerável a omissões.

**Tempo de hidratação:**

Componentes com `react-i18next` levaram **85 ms** para hidratar, contra **24 ms** no Intlayer. Repassar grandes estruturas JSON aos componentes atrasa a interatividade.

## Por que o i18next é pesado?

### Acúmulo de funcionalidades em tempo de execução

Executar integralmente no navegador requer enviar todos os módulos previamente: interpolação, regras plurais, contextos, registros de formatação e barramentos de eventos. Até mesmo a troca de uma frase simples carrega todo o motor.

### Chaves dinâmicas inviabilizam o tree-shaking

Como `"hero.title"` é interpretada dinamicamente em runtime, os bundlers não têm como saber quais textos são acessados. Textos não utilizados acabam permanecendo nos pacotes do cliente.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="i18next" value="i18next">

```tsx fileName="Component.tsx"
const { t } = useTranslation("home");

return <h1>{t("hero.title")}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="Hero.tsx"
const { title } = useIntlayer("hero");

return <h1>{title}</h1>;
```

  </Tab>
</Tabs>

O [compilador do Intlayer](https://intlayer.org/pt/doc/compiler) identifica o que `Hero.tsx` realmente utiliza e remove propriedades não referenciadas antes de emitir os bundles do cliente. Veja [otimização de bundle](https://intlayer.org/pt/doc/concept/bundle-optimization) para mais esclarecimentos.

## Experiência do desenvolvedor

### Arquivos JSON desconexos vs. co-localização

Com o i18next, as traduções ficam isoladas em diretórios JSON separados do código. O Intlayer reúne as declarações de conteúdo junto aos componentes:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="i18next" value="i18next">

```json fileName="locales/en/hero.json"
{
  "title": "Ship in every language"
}
```

```json fileName="locales/pt/hero.json"
{
  "title": "Lance em todos os idiomas"
}
```

```tsx fileName="Hero.tsx"
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation("hero");
  return <h1>{t("title")}</h1>;
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      pt: "Lance em todos os idiomas",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");
  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Ao mover ou excluir `Hero.tsx`, seus arquivos de conteúdo acompanham o componente.

### Autocompletar vs. segurança estrita de tipos

Estender `CustomTypeOptions` concede autocompletar no editor, mas não valida a integridade das traduções. Excluir uma chave de `pt/home.json` não causa falha no build, gerando apenas um fallback em tempo de execução.

O Intlayer infere os tipos a partir das próprias declarações, e o [`strictMode`](https://intlayer.org/pt/doc/concept/configuration) faz com que traduções faltantes interrompam o build com erros claros.

### Comparativo de ferramentas

| Funcionalidade             | Ecossistema i18next | Intlayer                                                                |
| -------------------------- | ------------------- | ----------------------------------------------------------------------- |
| **Extensão VS Code**       | Somente terceiros   | ✅ [Extensão oficial](https://intlayer.org/pt/doc/vs-code-extension)    |
| **Language Server (LSP)**  | ❌ Nenhum           | ✅ [LSP dedicado](https://intlayer.org/pt/doc/lsp)                      |
| **Servidor MCP (para IA)** | ❌ Nenhum           | ✅ [Servidor MCP embutido](https://intlayer.org/pt/doc/mcp-server)      |
| **Habilidades de Agente**  | ❌ Nenhuma          | ✅ [Skills prontas](https://intlayer.org/pt/doc/agent_skills)           |
| **CMS Visual em contexto** | Locize (SaaS pago)  | ✅ [Gratuito & Open Source](https://intlayer.org/pt/doc/concept/editor) |

## A tradução e o modelo do Locize

O Locize é a solução comercial mantida pelos mesmos criadores do i18next. Sustentar projetos abertos é fundamental, mas esse arranjo gera incentivos divergentes: uma biblioteca cuja renda depende de uma plataforma SaaS de tradução tem pouco interesse em oferecer uma solução gratuita de tradução local por IA na CLI.

O Intlayer apoia um formato aberto:

- [`intlayer fill`](https://intlayer.org/pt/doc/concept/auto-fill) preenche traduções pendentes no terminal ou em pipelines de CI usando suas próprias chaves de API da OpenAI, Anthropic, Mistral ou Gemini.
- O [CMS Intlayer](https://intlayer.org/pt/doc/concept/cms) é código aberto e pode ser hospedado via Docker Compose.
- Compilador, CLI, editor e CMS são distribuídos sob a licença Apache 2.0.

## Em quais cenários o i18next ainda faz sentido?

<AccordionGroup>
<Accordion header="Projetos legados estáveis">

Se a aplicação opera com estabilidade e o tamanho do pacote não é um impedimento, migrar não se faz urgente.

</Accordion>
<Accordion header="Plataformas não convencionais">

O amplo ecossistema de plugins do i18next contempla configurações particulares (Electron, jQuery legado, pontes nativas sob medida) fora do foco de compiladores modernos.

</Accordion>
<Accordion header="Extensa base comunitária">

O histórico de discussões no StackOverflow e GitHub agiliza a solução de cenários atípicos.

</Accordion>
</AccordionGroup>

## Como melhorar minha configuração atual do i18next?

O Intlayer oferece pacotes de compatibilidade direta que preservam com exatidão as assinaturas de função das bibliotecas i18next (`i18next`, `react-i18next` e `next-i18next`). Não é necessário reescrever seus componentes para usufruir de uma arquitetura otimizada por compilador.

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

1. Instala o pacote de compatibilidade `@intlayer/i18next`.
2. Configura aliases no empacotador para que suas importações habituais (`useTranslation`, `Trans`, `t`) apontem para o Intlayer, permitindo remover a biblioteca antiga do seu `package.json`.
3. Ativa imediatamente o suporte a Language Server (LSP) no editor, a eliminação de código inútil no build (tree-shaking) e fluxos locais de tradução por IA.

Para instruções passo a passo, explore nossos guias dedicados:

- **Camadas de compatibilidade:** Mantenha a sintaxe existente com os adaptadores para [i18next](https://intlayer.org/pt/doc/compatibility/i18next), [react-i18next](https://intlayer.org/pt/doc/compatibility/react-i18next) e [next-i18next](https://intlayer.org/pt/doc/compatibility/next-i18next).
- **Migração de catálogos:** Converta arquivos JSON em dicionários tipados com os guias: [a partir do i18next](https://intlayer.org/pt/doc/migration/i18next), [a partir do react-i18next](https://intlayer.org/pt/doc/migration/react-i18next) ou [a partir do next-i18next](https://intlayer.org/pt/doc/migration/next-i18next).
- **Estratégia híbrida:** Mantenha o runtime do i18next enquanto [utiliza o Intlayer com o i18next](https://intlayer.org/pt/blog/intlayer-with-i18next) para tipar e traduzir catálogos automaticamente.

Examine sua aplicação em produção com o [scanner de SEO para i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Leituras recomendadas

- [Benchmark Next.js i18n: avaliação detalhada de performance](https://intlayer.org/pt/doc/benchmark/nextjs)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/pt/blog/react-i18next-vs-react-intl-vs-intlayer)
- [O next-intl está obsoleto em 2026?](https://intlayer.org/pt/blog/is-next-intl-outdated)
- [Arquitetura orientada a compilador vs i18n declarativa](https://intlayer.org/pt/blog/compiler-vs-declarative-i18n)
