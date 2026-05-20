---
createdAt: 2024-08-14
updatedAt: 2025-09-27
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
  - version: 7.3.1
    date: 2025-11-27
    changes: "Lançamento do Compilador"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Atualização da tabela comparativa"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Início do histórico"
---

# Por que você deve considerar o Intlayer?

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração do seu conteúdo em qualquer lugar do seu código. Ela converte declarações de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, o **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

## Por que o Intlayer foi criado?

O Intlayer foi criado para resolver um problema comum que afeta todas as bibliotecas i18n comuns, como `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` e `vue-i18n`.

Todas essas soluções adotam uma abordagem centralizada para listar e gerenciar seu conteúdo. Por exemplo:

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

Ou aqui usando namespaces:

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

Este tipo de arquitetura retarda o processo de desenvolvimento e torna a base de código mais complexa de manter por vários motivos:

1. **Para cada novo componente criado, você deve:**
   - Criar o novo recurso/namespace na pasta `locales`
   - Lembrar de importar o novo namespace em sua página
   - Traduzir seu conteúdo (muitas vezes feito manualmente por copiar/colar de provedores de IA)

2. **Para qualquer alteração feita em seus componentes, você deve:**
   - Procurar o recurso/namespace relacionado (longe do componente)
   - Traduzir seu conteúdo
   - Garantir que seu conteúdo esteja atualizado para cada localidade
   - Verificar se seu namespace não inclui chaves/valores não utilizados
   - Garantir que a estrutura de seus arquivos JSON seja a mesma para todas as localidades

Em projetos profissionais que utilizam essas soluções, plataformas de localização são frequentemente usadas para ajudar a gerenciar a tradução do seu conteúdo. No entanto, isso pode rapidamente se tornar dispendioso para grandes projetos.

Para resolver este problema, o Intlayer adota uma abordagem que delimita seu conteúdo por componente e mantém seu conteúdo próximo ao seu componente, como costumamos fazer com CSS (`styled-components`), tipos, documentação (`storybook`) ou testes unitários (`jest`).

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

Esta abordagem permite que você:

1. **Aumente a velocidade de desenvolvimento**
   - Arquivos `.content.{{ts|mjs|cjs|json}}` podem ser criados usando uma extensão do VSCode
   - Ferramentas de IA de preenchimento automático em seu IDE (como o GitHub Copilot) podem ajudá-lo a declarar seu conteúdo, reduzindo o copiar/colar

2. **Limpe sua base de código**
   - Reduza a complexidade
   - Aumente a manutenibilidade

3. **Duplique seus componentes e seus conteúdos relacionados com mais facilidade (Exemplo: componentes de login/registro, etc.)**
   - Limitando o risco de impactar o conteúdo de outros componentes
   - Copiando/colando seu conteúdo de uma aplicação para outra sem dependências externas

4. **Evite poluir sua base de código com chaves/valores não utilizados para componentes não utilizados**
   - Se você não usar um componente, o Intlayer não importará seu conteúdo relacionado
   - Se você excluir um componente, será mais fácil lembrar de remover seu conteúdo relacionado, pois ele estará presente na mesma pasta

5. **Reduza o custo de raciocínio para agentes de IA declararem seu conteúdo multilíngue**
   - O agente de IA não terá que varrer toda a sua base de código para saber onde implementar seu conteúdo
   - As traduções podem ser feitas facilmente por ferramentas de IA de preenchimento automático em seu IDE (como o GitHub Copilot)

6. **Otimize o desempenho de carregamento**
   - Se um componente for carregado tardiamente (lazy-loaded), seu conteúdo relacionado será carregado ao mesmo tempo

## Recursos adicionais do Intlayer

| Recurso                                                                                                                   | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Recurso](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Suporte Multi-Framework**<br><br>O Intlayer é compatível com todos os principais frameworks e bibliotecas, incluindo Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e muito mais.                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **Gestão de Conteúdo Baseada em JavaScript**<br><br>Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo com eficiência. <br><br> - [Declaração de conteúdo](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Recurso" width="700">  | **Compilador**<br><br>O Compilador Intlayer extrai automaticamente o conteúdo dos componentes e gera os arquivos de dicionário.<br><br> - [Compilador](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Arquivo de Declaração de Conteúdo por Localidade**<br><br>Acelere seu desenvolvimento declarando seu conteúdo uma vez, antes da geração automática.<br><br> - [Arquivo de Declaração de Conteúdo por Localidade](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Ambiente com Segurança de Tipos**<br><br>Utilize o TypeScript para garantir que suas definições de conteúdo e código estejam livres de erros, beneficiando-se também do preenchimento automático do IDE.<br><br> - [Configuração do TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Configuração Simplificada**<br><br>Comece a rodar rapidamente com configuração mínima. Ajuste as configurações de internacionalização, roteamento, IA, build e tratamento de conteúdo com facilidade. <br><br> - [Explore a integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Recuperação de Conteúdo Simplificada**<br><br>Não há necessidade de chamar sua função `t` para cada item de conteúdo. Recupere todo o seu conteúdo diretamente usando um único hook.<br><br> - [Integração com React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Implementação Consistente de Server Components**<br><br>Perfeitamente adequado para server components do Next.js, use a mesma implementação para componentes client e server, sem necessidade de passar sua função `t` por cada server component. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Base de Código Organizada**<br><br>Mantenha sua base de código mais organizada: 1 componente = 1 dicionário na mesma pasta. Traduções próximas aos seus respectivos componentes aumentam a manutenibilidade e a clareza. <br><br> - [Como o Intlayer funciona](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Roteamento Avançado**<br><br>Suporte total ao roteamento de aplicativos, adaptando-se perfeitamente a estruturas complexas de aplicativos, para Next.js, React, Vite, Vue.js, etc.<br><br> - [Explore a integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Suporte a Markdown**<br><br>Importe e interprete arquivos de localidade e Markdown remoto para conteúdo multilíngue, como políticas de privacidade, documentação, etc. Interprete e torne os metadados de Markdown acessíveis em seu código.<br><br> - [Arquivos de conteúdo](https://intlayer.org/doc/concept/content/file)                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Editor Visual e CMS Gratuitos**<br><br>Um editor visual e CMS gratuitos estão disponíveis para escritores de conteúdo, removendo a necessidade de uma plataforma de localização. Mantenha seu conteúdo sincronizado usando Git, ou externalize-o total ou parcialmente com o CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Conteúdo Tree-shakable**<br><br>Conteúdo tree-shakable, reduzindo o tamanho do bundle final. Carrega o conteúdo por componente, excluindo qualquer conteúdo não utilizado do seu bundle. Suporta carregamento tardio (lazy loading) para aumentar a eficiência de carregamento do app. <br><br> - [Otimização do build do app](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Renderização Estática**<br><br>Não bloqueia a Renderização Estática. <br><br> - [Integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **Tradução Baseada em IA**<br><br>Transforme seu site em 231 idiomas com apenas um clique usando as ferramentas avançadas de tradução baseadas em IA do Intlayer, usando seu próprio provedor de IA/chave de API. <br><br> - [Integração de CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI do Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Auto preenchimento](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **Integração do Servidor MCP**<br><br>Fornece um servidor MCP (Model Context Protocol) para automação de IDE, permitindo uma gestão de conteúdo fluida e fluxos de trabalho de i18n diretamente no seu ambiente de desenvolvimento. <br><br> - [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/pt/mcp_server.md)                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **Extensão para VSCode**<br><br>O Intlayer fornece uma extensão para VSCode para ajudá-lo a gerenciar seu conteúdo e traduções, criar seus dicionários, traduzir seu conteúdo e muito mais. <br><br> - [Extensão para VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilidade**<br><br>Permite interoperabilidade com react-i18next, next-i18next, next-intl e react-intl. <br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                  |
| Teste de Traduções Ausentes (CLI/CI)                                                                                      | ✅ CLI: npx intlayer content test (auditoria compatível com CI)                                                                                                                                                                                                                                                                                                                                                                   |

## Comparação do Intlayer com outras soluções

| Recurso                                                  | `intlayer`                                                                                                                                        | `react-i18next`                                                                                                      | `react-intl` (FormatJS)                                                                                                                         | `lingui`                                                      | `next-intl`                                                                                                          | `next-i18next`                                                                                                       | `vue-i18n`                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Traduções Próximas aos Componentes**                   | ✅ Sim, conteúdo colocalizado com cada componente                                                                                                 | ❌ Não                                                                                                               | ❌ Não                                                                                                                                          | ❌ No                                                         | ❌ Não                                                                                                               | ❌ Não                                                                                                               | ✅ Sim - usando `Single File Components` (SFCs)                  |
| **Integração com TypeScript**                            | ✅ Avançada, tipos estritos gerados automaticamente                                                                                               | ⚠️ Básica; configuração extra para segurança                                                                         | ✅ Boa, mas menos estrita                                                                                                                       | ⚠️ Tipagens, precisa de configuração                          | ✅ Boa                                                                                                               | ⚠️ Básica                                                                                                            | ✅ Boa (tipos disponíveis; segurança de chaves precisa de setup) |
| **Detecção de Tradução Ausente**                         | ✅ Destaque de erro no TypeScript e erro/aviso no tempo de build                                                                                  | ⚠️ Principalmente strings de fallback em tempo de execução                                                           | ⚠️ Strings de fallback                                                                                                                          | ⚠️ Precisa de configuração extra                              | ⚠️ Fallback em tempo de execução                                                                                     | ⚠️ Fallback em tempo de execução                                                                                     | ⚠️ Fallback/avisos em tempo de execução (configurável)           |
| **Conteúdo Rico (JSX/Markdown/componentes)**             | ✅ Suporte direto                                                                                                                                 | ⚠️ Limitado / apenas interpolação                                                                                    | ⚠️ Sintaxe ICU, não JSX real                                                                                                                    | ⚠️ Limitado                                                   | ❌ Não projetado para nós ricos                                                                                      | ⚠️ Limitado                                                                                                          | ⚠️ Limitado (componentes via `<i18n-t>`, Markdown via plugins)   |
| **Tradução baseada em IA**                               | ✅ Sim, suporta vários provedores de IA. Utilizável com suas próprias chaves de API. Considera o contexto da sua aplicação e o escopo do conteúdo | ❌ Não                                                                                                               | ❌ Não                                                                                                                                          | ❌ Não                                                        | ❌ Não                                                                                                               | ❌ Não                                                                                                               | ❌ Não                                                           |
| **Editor Visual**                                        | ✅ Sim, Editor Visual local + CMS opcional; pode externalizar o conteúdo da base de código; incorporável                                          | ❌ Não / disponível via plataformas de localização externas                                                          | ❌ Não / disponível via plataformas de localização externas                                                                                     | ❌ Não / disponível via plataformas de localização externas   | ❌ Não / disponível via plataformas de localização externas                                                          | ❌ Não / disponível via plataformas de localização externas                                                          | ❌ Não / disponível via plataformas de localização externas      |
| **Roteamento Localizado**                                | ✅ Sim, suporta caminhos localizados nativamente (funciona com Next.js e Vite)                                                                    | ⚠️ Sem suporte nativo, requer plugins (ex: `next-i18next`) ou configuração de roteador personalizada                 | ❌ Não, apenas formatação de mensagens, o roteamento deve ser manual                                                                            | ⚠️ Sem suporte nativo, requer plugins ou configuração manual  | ✅ Nativo, App Router suporta segmento `[locale]`                                                                    | ✅ Nativo                                                                                                            | ✅ Nativo                                                        |
| **Geração Dinâmica de Rotas**                            | ✅ Sim                                                                                                                                            | ⚠️ Plugin/ecossistema ou configuração manual                                                                         | ❌ Não fornecido                                                                                                                                | ⚠️ Plugin/manual                                              | ✅ Sim                                                                                                               | ✅ Sim                                                                                                               | ❌ Não fornecido (Nuxt i18n fornece)                             |
| **Pluralização**                                         | ✅ Padrões baseados em enumeração                                                                                                                 | ✅ Configurável (plugins como i18next-icu)                                                                           | ✅ (ICU)                                                                                                                                        | ✅ (ICU/messageformat)                                        | ✅ Boa                                                                                                               | ✅ Boa                                                                                                               | ✅ Regras de pluralização integradas                             |
| **Formatação (datas, números, moedas)**                  | ✅ Formatadores otimizados (Intl sob o capô)                                                                                                      | ⚠️ Via plugins ou uso personalizado do Intl                                                                          | ✅ Formatadores ICU                                                                                                                             | ✅ Helpers ICU/CLI                                            | ✅ Boa (helpers Intl)                                                                                                | ✅ Boa (helpers Intl)                                                                                                | ✅ Formatadores de data/número integrados (Intl)                 |
| **Formato de Conteúdo**                                  | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                  | ⚠️ .json                                                                                                             | ✅ .json, .js                                                                                                                                   | ⚠️ .po, .json                                                 | ✅ .json, .js, .ts                                                                                                   | ⚠️ .json                                                                                                             | ✅ .json, .js                                                    |
| **Suporte a ICU**                                        | ⚠️ WIP                                                                                                                                            | ⚠️ Via plugin (i18next-icu)                                                                                          | ✅ Sim                                                                                                                                          | ✅ Sim                                                        | ✅ Sim                                                                                                               | ⚠️ Via plugin (`i18next-icu`)                                                                                        | ⚠️ Via formatador/compilador personalizado                       |
| **Helpers de SEO (hreflang, sitemap)**                   | ✅ Ferramentas integradas: helpers para sitemap, robots.txt, metadados                                                                            | ⚠️ Plugins da comunidade/manual                                                                                      | ❌ Não é o núcleo                                                                                                                               | ❌ Não é o núcleo                                             | ✅ Boa                                                                                                               | ✅ Boa                                                                                                               | ❌ Não é o núcleo (Nuxt i18n fornece helpers)                    |
| **Ecossistema / Comunidade**                             | ⚠️ Menor, mas crescendo rápido e reativo                                                                                                          | ✅ Maior e maduro                                                                                                    | ✅ Grande                                                                                                                                       | ⚠️ Menor                                                      | ✅ Tamanho médio, focado no Next.js                                                                                  | ✅ Tamanho médio, focado no Next.js                                                                                  | ✅ Grande no ecossistema Vue                                     |
| **Renderização no Lado do Servidor e Server Components** | ✅ Sim, simplificado para SSR / React Server Components                                                                                           | ⚠️ Suportado no nível da página, mas precisa passar funções-t na árvore de componentes para filhos server components | ⚠️ Suportado no nível da página com configuração adicional, mas precisa passar funções-t na árvore de componentes para filhos server components | ✅ Suportado, configuração necessária                         | ⚠️ Suportado no nível da página, mas precisa passar funções-t na árvore de componentes para filhos server components | ⚠️ Suportado no nível da página, mas precisa passar funções-t na árvore de componentes para filhos server components | ✅ SSR via Nuxt/Vue SSR (sem RSC)                                |
| **Tree-shaking (carrega apenas o conteúdo usado)**       | ✅ Sim, por componente no tempo de build via plugins Babel/SWC                                                                                    | ⚠️ Geralmente carrega tudo (pode ser melhorado com namespaces/code-splitting)                                        | ⚠️ Geralmente carrega tudo                                                                                                                      | ❌ Não é o padrão                                             | ⚠️ Parcial                                                                                                           | ⚠️ Parcial                                                                                                           | ⚠️ Parcial (com code-splitting/configuração manual)              |
| **Carregamento Tardio (Lazy Loading)**                   | ✅ Sim, por localidade / por dicionário                                                                                                           | ✅ Sim (ex: backends/namespaces sob demanda)                                                                         | ✅ Sim (bundles de localidade divididos)                                                                                                        | ✅ Sim (importações dinâmicas de catálogo)                    | ✅ Sim (por rota/por localidade), precisa de gestão de namespace                                                     | ✅ Sim (por rota/por localidade), precisa de gestão de namespace                                                     | ✅ Sim (mensagens de localidade assíncronas)                     |
| **Limpar conteúdo não utilizado**                        | ✅ Sim, por dicionário no tempo de build                                                                                                          | ❌ Não, apenas via segmentação manual de namespace                                                                   | ❌ Não, todas as mensagens declaradas são agrupadas                                                                                             | ✅ Sim, chaves não utilizadas detectadas e removidas no build | ❌ Não, pode ser gerenciado manualmente com gestão de namespace                                                      | ❌ Não, pode ser gerenciado manualmente com gestão de namespace                                                      | ❌ Não, apenas possível via lazy-loading manual                  |
| **Gestão de Projetos Grandes**                           | ✅ Incentiva a modularidade, adequado para design-systems                                                                                         | ⚠️ Precisa de boa disciplina de arquivos                                                                             | ⚠️ Catálogos centrais podem se tornar grandes                                                                                                   | ⚠️ Pode se tornar complexo                                    | ✅ Modular com configuração                                                                                          | ✅ Modular com configuração                                                                                          | ✅ Modular com configuração do Vue Router/Nuxt i18n              |

---

## Estrelas do GitHub

As estrelas do GitHub são um forte indicador da popularidade de um projeto, da confiança da comunidade e da relevância a longo prazo. Embora não sejam uma medida direta da qualidade técnica, elas refletem quantos desenvolvedores consideram o projeto útil, acompanham seu progresso e têm probabilidade de adotá-lo. Para estimar o valor de um projeto, as estrelas ajudam a comparar a tração entre as alternativas e fornecem insights sobre o crescimento do ecossistema.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabilidade

o `intlayer` também pode ajudar a gerenciar seus namespaces `react-intl`, `react-i18next`, `next-intl`, `next-i18next` e `vue-i18n`.

Usando o `intlayer`, você pode declarar seu conteúdo no formato da sua biblioteca i18n favorita, e o intlayer gerará seus namespaces no local de sua escolha (exemplo: `/messages/{{locale}}/{{namespace}}.json`).
