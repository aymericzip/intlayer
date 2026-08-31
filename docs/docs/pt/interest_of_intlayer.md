---
createdAt: 2024-08-14
updatedAt: 2026-08-30
title: Interesse do Intlayer
description: Descubra os benefícios e vantagens de usar o Intlayer em seus projetos. Entenda por que o Intlayer se destaca entre outros frameworks.
keywords:
  - Benefícios
  - Vantagens
  - Intlayer
  - Framework
  - Comparação
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "Adicionada a seção Por que o Intlayer em vez de alternativas"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Lançamento do Compilador"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Tabela comparativa atualizada"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicialização do histórico"
author: aymericzip
---

# Por que você deve considerar o Intlayer?

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração de seu conteúdo em qualquer parte do seu código. Converte declarações de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Utilizando TypeScript, o **Intlayer** torna o seu desenvolvimento mais forte e mais eficiente.

## Por que o Intlayer em vez de alternativas?

Comparado às soluções principais como `next-intl` ou `i18next`, o Intlayer é uma solução que vem com otimizações integradas, tais como:

<AccordionGroup>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON massivos em suas páginas, carregue apenas o conteúdo estritamente necessário. O Intlayer ajuda a **reduzir o tamanho do seu bundle e de suas páginas em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

Delimitar o conteúdo de sua aplicação ao nível de componentes **facilita a manutenção** de aplicações de grande porte. Você pode duplicar ou excluir uma única pasta de funcionalidade sem o fardo mental de ter que revisar toda a sua base de código de conteúdo. Além disso, o Intlayer é **totalmente tipado** para garantir a precisão de seus conteúdos.

</Accordion>

<Accordion header="Agente de IA">

Co-localizar conteúdo e código **reduz o contexto necessário** para modelos de linguagem grandes (LLMs). O Intlayer também vem com uma suite de ferramentas, como uma **CLI** para testar traduções ausentes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência de desenvolvimento (DX) ainda mais fluida para os agentes de IA.

</Accordion>

<Accordion header="Recursos">

O Intlayer oferece uma série de recursos adicionais que outras soluções i18n não têm, tais como [suporte a Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md), [carregamento de conteúdo externo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md), [carregamento de conteúdo a partir de arquivos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file.md), [atualização de conteúdo em tempo real](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md), [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) e muito mais.

</Accordion>

<Accordion header="Automatização">

Use automação para traduzir em seu pipeline de CI/CD utilizando o LLM de sua preferência com o custo direto do seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON massivos aos componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do conteúdo em tempo de compilação (build).

</Accordion>

<Accordion header="Colaboração com perfis não técnicos">

Mais do que apenas uma solução de i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) auto-hospedado** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudar você a gerenciar seu conteúdo multilíngue em **tempo real**, tornando a colaboração com tradutores, redatores e outros membros da equipe perfeitamente integrada. O conteúdo pode ser armazenado localmente e/ou remotamente.

</Accordion>

<Accordion header="Design cross-framework">

Se você usa frameworks diferentes para partes diferentes da sua aplicação (ex: React, React-native, Vue, Angular, Svelte, etc.), o Intlayer fornece uma maneira de **usar uma sintaxe e implementação comuns em todos os principais frameworks de frontend**. Você também poderá compartilhar suas declarações de conteúdo no seu design system, aplicações, backend, etc.

</Accordion>
</AccordionGroup>

## Por que o Intlayer foi criado?

O Intlayer foi criado para resolver um problema comum que afeta todas as bibliotecas de i18n habituais como `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` e `vue-i18n`.

Todas essas soluções adotam uma abordagem centralizada para listar e gerenciar seus conteúdos. Por exemplo:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Ou aqui utilizando namespaces:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Esse tipo de arquitetura torna o processo de desenvolvimento mais lento e a base de código mais complexa de manter por vários motivos:

1. **Para qualquer novo componente criado, você deve:**
   - Criar o novo recurso/namespace na pasta `locales`
   - Lembrar de importar o novo namespace na sua página
   - Traduzir seu conteúdo (frequentemente feito de forma manual por cópia/cola de provedores de IA)

2. **Para qualquer mudança feita em seus componentes, você deve:**
   - Procurar o recurso/namespace correspondente (longe do componente)
   - Traduzir seu conteúdo
   - Garantir que seu conteúdo esteja atualizado para todos os idiomas
   - Verificar se o seu namespace não inclui chaves/valores não utilizados
   - Garantir que a estrutura dos seus arquivos JSON seja a mesma para todos os idiomas

Em projetos profissionais que utilizam essas soluções, plataformas de localização são frequentemente utilizadas para ajudar a gerenciar a tradução de conteúdo. No entanto, isso pode rapidamente se tornar caro para projetos grandes.

Para resolver esse problema, o Intlayer adota uma abordagem que delimita seu conteúdo por componente e mantém o conteúdo próximo ao componente, como costumamos fazer com CSS (`styled-components`), tipos, documentação (`storybook`) ou testes unitários (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Esta abordagem permite-lhe:

1. **Aumentar a velocidade de desenvolvimento**
   - Os arquivos `.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` podem ser criados utilizando uma extensão do VSCode
   - Ferramentas de autocompletar de IA no seu IDE (como GitHub Copilot) podem ajudá-lo a declarar seus conteúdos, reduzindo cópias/colas

2. **Limpar a sua base de código**
   - Reduzir a complexidade
   - Aumentar a manutenibilidade

3. **Duplicar os seus componentes e seus conteúdos correspondentes com mais facilidade (Exemplo: componentes de login/registro, etc.)**
   - Limitando o risco de impactar o conteúdo de outros componentes
   - Copiando e colando seus conteúdos de uma aplicação para outra sem dependências externas

4. **Evitar poluir a sua base de código com chaves/valores não utilizados para componentes não utilizados**
   - Se você não usar um componente, o Intlayer não importará o conteúdo relacionado
   - Se excluir um componente, lembrará mais facilmente de remover o conteúdo relacionado, pois ele estará presente na mesma pasta

5. **Reduzir o custo de raciocínio para os agentes de IA ao declararem os seus conteúdos multilíngues**
   - O agente de IA não terá que escanear toda a sua base de código para saber onde implementar seu conteúdo
   - As traduções podem ser facilmente feitas por ferramentas de autocompletar de IA no seu IDE (como GitHub Copilot)

6. **Otimizar o desempenho de carregamento**
   - Se um componente for carregado de forma diferida (lazy-loaded), seu conteúdo relacionado será carregado ao mesmo tempo

## Recursos adicionais do Intlayer

| Recurso                                                                                                                   | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Suporte Cross-Framework**<br><br>O Intlayer é compatível com todos os principais frameworks e bibliotecas, incluindo Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e mais.                                                                                                                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **Gerenciamento de Conteúdo via JavaScript**<br><br>Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente. <br><br> - [Declaração de conteúdo](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Compilador**<br><br>O Compilador Intlayer extrai automaticamente o conteúdo dos componentes e gera os arquivos de dicionário.<br><br> - [Compilador](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Arquivo de Declaração de Conteúdo por Idioma**<br><br>Acelere o seu desenvolvimento declarando o seu conteúdo uma única vez, antes da geração automática.<br><br> - [Arquivo de Declaração de Conteúdo por Idioma](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Ambiente Seguro para Tipos (Type-Safe)**<br><br>Aproveite o TypeScript para garantir que suas definições de conteúdo e código estejam livres de erros, enquanto se beneficia do preenchimento automático do IDE.<br><br> - [Configuração do TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Configuração Simplificada**<br><br>Comece a funcionar rapidamente com uma configuração mínima. Ajuste as configurações de internacionalização, roteamento, IA, compilação e manuseio de conteúdo de maneira fácil. <br><br> - [Explorar integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Recuperação de Conteúdo Simplificada**<br><br>Não há necessidade de chamar sua função `t` para cada elemento de conteúdo. Recupere todo o seu conteúdo diretamente usando um único hook.<br><br> - [Integração com React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Implementação Consistente de Componentes de Servidor**<br><br>Perfeitamente adequado para componentes de servidor Next.js, use a mesma implementação tanto para componentes cliente quanto servidor, sem a necessidade de passar sua função `t` através de cada componente de servidor. <br><br> - [Componentes de Servidor](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Base de Código Organizada**<br><br>Mantenha sua base de código mais organizada: 1 componente = 1 dicionário na mesma pasta. Traduções próximas a seus respectivos componentes melhoram a manutenibilidade e a clareza. <br><br> - [Como o Intlayer funciona](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Roteamento Aprimorado**<br><br>Suporte completo de roteamento de apps, adaptando-se perfeitamente a estruturas de aplicações complexas, para Next.js, React, Vite, Vue.js, etc.<br><br> - [Explorar integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Suporte a Markdown**<br><br>Importe e interprete arquivos locais e Markdown remoto para conteúdos multilíngues como políticas de privacidade, documentação, etc. Interprete e torne os metadados de Markdown acessíveis em seu código.<br><br> - [Arquivos de conteúdo](https://intlayer.org/doc/concept/content/file)                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Editor Visual & CMS Gratuitos**<br><br>Um editor visual e CMS gratuitos estão disponíveis para criadores de conteúdo, eliminando a necessidade de uma plataforma de localização externa. Mantenha seu conteúdo sincronizado usando o Git, ou externalize-o total ou parcialmente com o CMS.<br><br> - [Editor do Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS do Intlayer](https://intlayer.org/doc/concept/cms)                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Conteúdo com Otimização Tree-shaking**<br><br>Conteúdo compatível com otimização tree-shaking, reduzindo o tamanho do pacote final. Carrega conteúdo por componente, excluindo do bundle os conteúdos não utilizados. Suporta carregamento lento (lazy loading) para melhorar a eficiência de carregamento do app. <br><br> - [Otimização do build de aplicação](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Renderização Estática**<br><br>Não bloqueia o Renderização Estática. <br><br> - [Integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **Tradução Inteligente baseada em IA**<br><br>Transforme o seu site para até 231 idiomas com apenas um clique usando as ferramentas avançadas de tradução por IA do Intlayer com o seu próprio provedor de IA/chave de API. <br><br> - [Integração com CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Preenchimento Automático](https://intlayer.org/doc/concept/auto-fill)                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **Integração do Servidor MCP**<br><br>Fornece um servidor MCP (Model Context Protocol) para automação de IDE, permitindo gerenciamento integrado de conteúdo e fluxos de trabalho i18n diretamente no seu ambiente de desenvolvimento. <br><br> - [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/pt/mcp_server.md)                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **Extensão VSCode**<br><br>O Intlayer fornece uma extensão do VSCode para ajudá-lo a gerenciar seu conteúdo e traduções, construir dicionários, traduzir conteúdos e muito mais. <br><br> - [Extensão VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilidade**<br><br>Permite a interoperabilidade com react-i18next, next-i18next, next-intl e react-intl. <br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Adaptadores de compatibilidade do Intlayer](https://intlayer.org/doc/compatibility) |
| Testar Traduções Ausentes (CLI/CI)                                                                                        | ✅ CLI: npx intlayer content test (auditoria compatível com CI)                                                                                                                                                                                                                                                                                                                                                                                                                |

## Comparação do Intlayer com outras soluções

| Recurso                                           | `intlayer`                                                                                                                                | `react-i18next`                                                                                                           | `react-intl` (FormatJS)                                                                                                                               | `lingui`                                                            | `next-intl`                                                                                                               | `next-i18next`                                                                                                            | `vue-i18n`                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Traduções Próximas aos Componentes**            | ✅ Sim, conteúdo co-localizado com cada componente                                                                                        | ❌ Não                                                                                                                    | ❌ No                                                                                                                                                 | ❌ Não                                                              | ❌ Não                                                                                                                    | ❌ Não                                                                                                                    | ✅ Sim - usando `Single File Components` (SFCs)                    |
| **Integração com TypeScript**                     | ✅ Avançada, tipos estritos autogerados                                                                                                   | ⚠️ Básica; configuração adicional para maior segurança                                                                    | ✅ Boa, mas menos estrita                                                                                                                             | ⚠️ Tipagem, necessita configuração                                  | ✅ Boa                                                                                                                    | ⚠️ Básica                                                                                                                 | ✅ Boa (tipos disponíveis; segurança das chaves precisa de ajuste) |
| **Detecção de Tradução Ausente**                  | ✅ Erro TypeScript destacado e erro/aviso no build-time                                                                                   | ⚠️ Principalmente strings de fallback em tempo de execução (runtime)                                                      | ⚠️ Strings de fallback                                                                                                                                | ⚠️ Requer configuração adicional                                    | ⚠️ Fallback em runtime                                                                                                    | ⚠️ Fallback em runtime                                                                                                    | ⚠️ Fallback/avisos em runtime (configurável)                       |
| **Conteúdo Rico (JSX/Markdown/componentes)**      | ✅ Suporte direto                                                                                                                         | ⚠️ Limitado / apenas interpolação                                                                                         | ⚠️ Sintaxe ICU, não é JSX real                                                                                                                        | ⚠️ Limitado                                                         | ❌ Não projetado para nós ricos                                                                                           | ⚠️ Limitado                                                                                                               | ⚠️ Limitado (componentes via `<i18n-t>`, Markdown via plugins)     |
| **Tradução com base em IA**                       | ✅ Sim, suporta múltiplos provedores de IA. Utilizável com chaves de API próprias. Considera o contexto da aplicação e escopo do conteúdo | ❌ Não                                                                                                                    | ❌ Não                                                                                                                                                | ❌ Não                                                              | ❌ Não                                                                                                                    | ❌ Não                                                                                                                    | ❌ Não                                                             |
| **Editor Visual**                                 | ✅ Sim, editor visual local + CMS opcional; pode externalizar conteúdo da base de código; incorporável                                    | ❌ Não / disponível via plataformas de localização externas                                                               | ❌ Não / disponível via plataformas de localização externas                                                                                           | ❌ Não / disponível via plataformas de localização externas         | ❌ Não / disponível via plataformas de localização externas                                                               | ❌ Não / disponível via plataformas de localização externas                                                               | ❌ Não / disponível via plataformas de localização externas        |
| **Roteamento Localizado**                         | ✅ Sim, suporta caminhos localizados por padrão (funciona com Next.js & Vite)                                                             | ⚠️ Não integrado, requer plugins (ex. `next-i18next`) ou config de roteador personalizada                                 | ❌ Não, apenas formatação de mensagens, roteamento manual                                                                                             | ⚠️ Não integrado, requer plugins ou config manual                   | ✅ Integrado, App Router suporta segmento `[locale]`                                                                      | ✅ Integrado                                                                                                              | ✅ Integrado                                                       |
| **Geração Dinâmica de Rotas**                     | ✅ Sim                                                                                                                                    | ⚠️ Plugin/ecossistema ou configuração manual                                                                              | ❌ Não fornecido                                                                                                                                      | ⚠️ Plugin/manual                                                    | ✅ Sim                                                                                                                    | ✅ Sim                                                                                                                    | ❌ Não fornecido (Nuxt i18n fornece)                               |
| **Pluralização**                                  | ✅ Padrões baseados em enumeração                                                                                                         | ✅ Configurável (plugins como i18next-icu)                                                                                | ✅ (ICU)                                                                                                                                              | ✅ (ICU/messageformat)                                              | ✅ Boa                                                                                                                    | ✅ Boa                                                                                                                    | ✅ Regras de pluralização integradas                               |
| **Formatação (dates, numbers, currencies)**       | ✅ Formatadores otimizados (Intl sob o capô)                                                                                              | ⚠️ Via plugins ou uso customizado de Intl                                                                                 | ✅ Formatadores ICU                                                                                                                                   | ✅ Helpers de ICU/CLI                                               | ✅ Boa (helpers do Intl)                                                                                                  | ✅ Boa (helpers do Intl)                                                                                                  | ✅ Formatadores de data/número integrados (Intl)                   |
| **Formato do Conteúdo**                           | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                          | ⚠️ .json                                                                                                                  | ✅ .json, .js                                                                                                                                         | ⚠️ .po, .json                                                       | ✅ .json, .js, .ts                                                                                                        | ⚠️ .json                                                                                                                  | ✅ .json, .js                                                      |
| **Suporte a ICU**                                 | ⚠️ WIP                                                                                                                                    | ⚠️ Via plugin (i18next-icu)                                                                                               | ✅ Sim                                                                                                                                                | ✅ Sim                                                              | ✅ Sim                                                                                                                    | ⚠️ Via plugin (`i18next-icu`)                                                                                             | ⚠️ Via formatador/compilador customizado                           |
| **SEO Helpers (hreflang, sitemap)**               | ✅ Ferramentas integradas: helpers para sitemap, robots.txt, metadata                                                                     | ⚠️ Plugins da comunidade/manual                                                                                           | ❌ Não é o núcleo                                                                                                                                     | ❌ Não é o núcleo                                                   | ✅ Boa                                                                                                                    | ✅ Boa                                                                                                                    | ❌ Não é o núcleo (Nuxt i18n fornece helpers)                      |
| **Ecossistema / Comunidade**                      | ⚠️ Menor mas em rápido crescimento e reativo                                                                                              | ✅ Maior e maduro                                                                                                         | ✅ Grande                                                                                                                                             | ⚠️ Menor                                                            | ✅ Médio, focado em Next.js                                                                                               | ✅ Médio, focado em Next.js                                                                                               | ✅ Grande no ecossistema Vue                                       |
| **Server-side Rendering & Server Components**     | ✅ Sim, otimizado para SSR / React Server Components                                                                                      | ⚠️ Suportado ao nível de página mas precisa passar t-funções na árvore de componentes para componentes de servidor filhos | ⚠️ Suportado ao nível de página com configuração adicional, mas precisa passar t-funções na árvore de componentes para componentes de servidor filhos | ✅ Suportado, configuração requerida                                | ⚠️ Suportado ao nível de página mas precisa passar t-funções na árvore de componentes para componentes de servidor filhos | ⚠️ Suportado ao nível de página mas precisa passar t-funções na árvore de componentes para componentes de servidor filhos | ✅ SSR via Nuxt/Vue SSR (sem RSC)                                  |
| **Tree-shaking (carregar apenas conteúdo usado)** | ✅ Sim, por componente em build-time via plugins Babel/SWC                                                                                | ⚠️ Geralmente carrega tudo (pode ser melhorado com namespaces/divisão de código)                                          | ⚠️ Geralmente carrega tudo                                                                                                                            | ❌ Não é padrão                                                     | ⚠️ Parcial                                                                                                                | ⚠️ Parcial                                                                                                                | ⚠️ Parcial (com divisão de código/configuração manual)             |
| **Carregamento diferido (Lazy loading)**          | ✅ Sim, por idioma / por dicionário                                                                                                       | ✅ Sim (ex. backends/namespaces sob demanda)                                                                              | ✅ Sim (split dos bundles de locale)                                                                                                                  | ✅ Sim (importações dinâmicas de catálogo)                          | ✅ Sim (por rota/por idioma), necessita gerenciamento de namespaces                                                       | ✅ Sim (por rota/por idioma), necessita gerenciamento de namespaces                                                       | ✅ Sim (mensagens de idioma assíncronas)                           |
| **Purgar conteúdo não utilizado**                 | ✅ Sim, por dicionário no build-time                                                                                                      | ❌ Não, apenas via segmentação manual de namespaces                                                                       | ❌ Não, todas as mensagens declaradas são incluídas                                                                                                   | ✅ Sim, chaves não utilizadas são detectadas e descartadas na build | ❌ Não, pode ser gerenciado de forma manual com controle de namespaces                                                    | ❌ Não, pode ser gerenciado de forma manual com controle de namespaces                                                    | ❌ Não, apenas possível via carregamento diferido manual           |
| **Gerenciamento de Grandes Projetos**             | ✅ Encoraja modularidade, ideal para design-system                                                                                        | ⚠️ Requer boa disciplina de arquivos                                                                                      | ⚠️ Catálogos centrais podem se tornar grandes                                                                                                         | ⚠️ Pode se tornar complexo                                          | ✅ Modular com configuração                                                                                               | ✅ Modular com configuração                                                                                               | ✅ Modular com configuração de Vue Router/Nuxt i18n                |

## Estrelas no GitHub

As estrelas no GitHub são um forte indicador da popularidade de um projeto, da confiança da comunidade e da relevância a longo prazo. Embora não sejam uma medida direta da qualidade técnica, refletem quantos desenvolvedores consideram o projeto útil, acompanham seu progresso e provavelmente o adotarão. Para estimar o valor de um projeto, as estrelas ajudam a comparar a tração entre alternativas e fornecem insights sobre o crescimento do ecossistema.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabilidade

`intlayer` também pode ajudar a gerenciar seus namespaces para `react-intl`, `react-i18next`, `next-intl`, `next-i18next` e `vue-i18n`.

Utilizando `intlayer`, você pode declarar seu conteúdo no formato de sua biblioteca i18n favorita, e o intlayer gerará seus namespaces no local de sua escolha (exemplo: `/messages/{{locale}}/{{namespace}}.json`).

Se você quiser continuar usando a API da sua biblioteca i18n atual, o `intlayer` também fornece **adaptadores de compatibilidade (compat adapters)**: pacotes que expõem exatamente a mesma API que `react-i18next`, `next-intl`, `react-intl`, `vue-i18n` e outras, mas servidos pelos dicionários do Intlayer. Isso permite migrar progressivamente sem reescrever seu código. Consulte a [documentação dos adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md).

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um aplicativo JavaScript?">

Três gerações coexistem no ecossistema:

- **Bibliotecas de catálogo em tempo de execução**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`, `svelte-i18n`. Namespaces JSON carregados em runtime. Maduras, agnósticas de framework, não tipadas e enviadas por inteiro para a página.
- **Bibliotecas de mensagens em tempo de compilação**: `Lingui`, `Paraglide`, e `next-intl` ou `react-intl` com etapa de extração. Melhor comportamento de bundle e tipagem parcial, ainda mantendo catálogos centralizados.
- **Bibliotecas com camada de conteúdo (Content layer)**: `Intlayer`. O conteúdo é declarado e compilado por componente, de modo que tipagem, tree-shaking, ferramentas de edição e tradução por IA se originam das mesmas declarações.

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. O markup renderizado no servidor resolve seu conteúdo no próprio servidor, e o compilador em tempo de build substitui as chamadas `useIntlayer` pelas entradas exatas que o componente utiliza, descartando chaves e idiomas não utilizados. Os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md).

</Question>

<Question title="Posso migrar do i18next, next-intl ou react-i18next sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) ou o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md). Ou você pode manter sua API atual integralmente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma interface de `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, porém alimentados pelos dicionários do Intlayer, permitindo que apenas os imports mudem enquanto o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos fonte, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada um, para que você revise um diff em vez de copiar strings para um catálogo uma a uma. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

Para um fluxo de trabalho totalmente automatizado, o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) faz o mesmo em tempo de build em código JSX, TSX, Vue e Svelte, gerando os dicionários a cada alteração para que não haja necessidade de manter chaves manualmente. Como opera por análise estática, strings criadas exclusivamente em tempo de execução ficam fora de alcance, necessitando de algumas anotações para diferenciar texto do usuário de lógica interna da aplicação.

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Como o Intlayer se diferencia do next-intl?">

O `next-intl` é uma camada de mensagens para Next.js: você mantém arquivos de mensagens JSON por locale e os lê via `useTranslations`. O Intlayer é uma camada de conteúdo completa: as declarações vivem ao lado do componente, são tipadas a partir da própria declaração e são compiladas por componente para que a página envie apenas o que renderiza. O Intlayer também cobre o que o `next-intl` delega a você: tradução por IA, editor visual, CMS e verificação de traduções faltantes no CI. Se você preferir manter a API do `next-intl`, o [adaptador de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) a atende usando dicionários do Intlayer.

</Question>

<Question title="Como o Intlayer se diferencia do i18next e react-i18next?">

O `i18next` resolve chaves baseadas em strings contra namespaces em tempo de execução, o que significa que uma chave renomeada ou digitada com erro falha silenciosamente, e todo namespace acessado por uma página é baixado por completo. O Intlayer resolve o conteúdo em tempo de build com base em tipos gerados, fazendo com que uma chave incorreta gere erro de compilação, e apenas as entradas que um componente renderiza alcancem o bundle. O `i18next` tem um ecossistema de plugins mais antigo e maior histórico; o Intlayer entrega tipagem rígida, otimização de bundle e ferramentas avançadas de edição e automação. Consulte o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md) ou o [adaptador de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md).

</Question>

<Question title="O Intlayer é mais rápido ou mais leve do que as alternativas?">

Em tamanho de bundle e de página, sim: evitar carregar catálogos que a página não renderiza reduz o tamanho do bundle e da página em até 50% em comparação com abordagens baseadas em namespaces. O [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md) publica a metodologia e os números aferidos por framework, incluindo [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md), [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/vue.md) e [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/svelte.md), para que você possa reproduzi-los diretamente.

</Question>

<Question title="Vale a pena migrar uma aplicação existente?">

Depende do seu gargalo atual. Se a dor envolve tamanho de bundle, traduções ausentes que passam despercebidas para produção ou tradutores dependentes de desenvolvedores para qualquer ajuste, a migração compensa rapidamente. Se seus catálogos são pequenos e estáveis, o ganho relativo é menor. De qualquer forma, a migração não precisa ser uma reescrita: os [adaptadores de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) preservam sua API atual, e o [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos JSON existentes como fonte de verdade enquanto as duas abordagens coexistem.

</Question>

<Question title="O que o Intlayer oferece que outras bibliotecas de i18n não oferecem?">

[Conteúdo em Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md), [conteúdo obtido de fonte externa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), carregamento de arquivos locais, [atualizações de conteúdo ao vivo (live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/live.md), um [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), um [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) que extrai conteúdo de componentes existentes, [variantes de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md) para testes A/B, [analytics](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/analytics.md) de exposição de conteúdo, um [servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md), [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md) e [skills para agentes de IA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md).

</Question>

<Question title="Posso usar o Intlayer apenas como gerenciador de traduções e manter minha biblioteca atual?">

Sim. O Intlayer pode gerar seus namespaces no formato e local esperados pela sua biblioteca atual, por exemplo `/messages/{locale}/{namespace}.json`, garantindo tradução por IA, editor visual e verificações no CI enquanto o código da sua aplicação continua consumindo a biblioteca de i18n legada.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço opcional pago que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
