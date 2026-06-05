---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrando de @nuxtjs/i18n para Intlayer | Internacionalização (i18n)"
description: "Aprenda como migrar sua aplicação Nuxt de @nuxtjs/i18n para Intlayer — passo a passo, sem quebrar o seu código existente. Use o adaptador de compatibilidade @intlayer/vue-i18n para uma transição suave."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migração
  - internacionalização
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# Migrando de @nuxtjs/i18n para Intlayer

## Por que migrar de @nuxtjs/i18n para Intlayer?

<AccordionGroup>

<Accordion header="Tamanho do pacote (Bundle size)">

Em vez de carregar enormes arquivos JSON em suas páginas, carregue apenas o conteúdo necessário. Intlayer ajuda você a **reduzir o tamanho do pacote e da página em até 50%**.

</Accordion>

<Accordion header="Manutenibilidade">

Criar escopos para o conteúdo da sua aplicação torna aplicações em larga escala **fáceis de manter**. Você pode duplicar ou excluir um diretório de recursos inteiro sem o esforço mental de revisar toda a sua base de código de conteúdo. Além disso, Intlayer é **fortemente tipado** para garantir a precisão do seu conteúdo.

Intlayer também é a solução **desenvolvida mais ativamente** no ecossistema i18n — problemas são corrigidos rapidamente, novos adaptadores de frameworks são lançados regularmente e a API principal é continuamente refinada com base em feedback do mundo real em produção.

</Accordion>

<Accordion header="Agentes de IA">

A co-localização do conteúdo **reduz o contexto necessário** para Modelos de Linguagem de Grande Escala (LLMs). O Intlayer também oferece um conjunto de ferramentas como uma **CLI** para testar traduções ausentes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)** e **[Habilidades de Agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)** para tornar a Experiência do Desenvolvedor (DX) muito mais suave para agentes de IA.

</Accordion>

<Accordion header="Automação">

Automatize as traduções em seu pipeline de CI/CD usando o LLM de sua preferência pelo custo do seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para auxiliar com **tradução em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar enormes arquivos JSON aos componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do conteúdo no momento do build (build time).

</Accordion>

<Accordion header="Escalabilidade com não desenvolvedores">

Muito mais que apenas uma solução i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** auto-hospedável e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, tornando perfeita a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>

</AccordionGroup>

---

## Estratégias de Migração

Como o `@nuxtjs/i18n` é executado usando `vue-i18n` sob o capô, há duas estratégias complementares para migrar para o Intlayer:

1. **Adaptador de Compatibilidade (Recomendado para apps existentes)** — Instale o `@intlayer/vue-i18n` e o `nuxt-intlayer`. Isso expõe **exatamente a mesma API** que o `vue-i18n`, delegando todo o trabalho de tradução de bastidores para o Intlayer. Mantenha intactas suas chamadas para `$t`, `useI18n()` e do roteador do Nuxt — a única alteração é a inicialização.

2. **Migração Completa** — Substitua de forma progressiva a API contida no `@nuxtjs/i18n` voltando-se aos hooks integrados nativos vinculados e oferecidos pelo uso do Intlayer (`useIntlayer`) assim como, de carona no mesmo conceito de trabalho, vá colocalizando tudo relacionado a conteúdo e variáveis diretamente sob arquivos `.content.ts` perto a proximidade de seus respectivos componentes.

Este guia foca inicialmente em tratar a fundo a **Estratégia 1** (que aborda o uso rápido através do tal adaptador de compatibilidade em substituição direta) antes de mergulhar na completa migração, opcional em questão.

---

## Índice

<TOC/>

---

## Migração Rápida

As etapas a seguir são o mínimo necessário para executar seu aplicativo Nuxt existente no Intlayer, sem fazer alterações no código de seus componentes.

<Steps>

<Step number={1} title="Instale as Dependências">

Instale o pacote principal do Intlayer e o adaptador de compatibilidade:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
bun x intlayer init
```

> Fique a vontade para manter o `@nuxtjs/i18n` instalado e ativo seguramente ao longo de sua etapa de migração do código (estaremos desabilitando e varrendo o tal serviço brevemente na definição/configuração principal do Nuxt ali no passo adiante).

</Step>

<Step number={2} title="Configure o Intlayer">

O comando `intlayer init` cria um arquivo inicial `intlayer.config.ts`. Atualize-o para corresponder aos seus locales existentes e direcione o plugin `syncJSON` aos seus arquivos de mensagens:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Adicione todos os seus locales existentes aqui
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // Corresponde à sintaxe de espaço reservado do vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** mapeia um locale para o caminho do arquivo JSON correspondente. **`location`** diz ao observador (watcher) do Intlayer qual pasta monitorar para alterações. A opção `format: 'icu'` garante que espaços reservados do `vue-i18n` sejam analisados corretamente.

</Step>

<Step number={3} title="Atualize a Configuração do Nuxt">

Troque a representação em tela que declarava antes como módulo o `@nuxtjs/i18n` para em seguida adicionar no seu `nuxt.config.ts` o módulo atual sendo `nuxt-intlayer`. Este plugin em si que pertence e constrói debaixo da base fornecida pelo sistema do Intlayer adiciona "em seus bastidores" injeções de reencaminhamentos automáticos via criação de aliases nos seus módulos com resultados que garantem e efetuam por onde ocorra declarações chamadas pelo `import { useI18n } from 'vue-i18n'` passem imperceptíveis e perfeitamente bem ao `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Desapareça com o respectivo '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Acabou a necessidade para ter que embutir objetos do tipo i18n contendo formatações para o uso e controle do framework Nuxt** Agora, por detrás de tudo e no próprio **momento do build** (build-time), é a inteligência do sistema principal do Intlayer que orquestra tudo englobando todos recursos relativos às identificações e mapeamentos por país, redirecionamentos a certas rotas bem como o gerenciamento do carregamento prévio que o material atrelado por trás embutirá.

</Step>

</Steps>

Isso é tudo para a migração rápida. Seu aplicativo Nuxt agora está executando perfeitamente bem ao decorrer das chamadas que antes serviam em formato de `$t` somados também das chamadas via funcionalidade com nome igual a `useI18n()` a partir de dentro das suas próprias estruturas atadas no sistema operacional englobado e alimentado internamente a plataforma e ecossistema pelo uso contínuo de suporte atrelados as raízes de base Intlayer.

---

## Migração Completa

As etapas a seguir são opcionais e podem ser feitas gradativamente. Elas desbloqueiam o conjunto completo das funcionalidades do Intlayer: editor visual, CMS, arquivos de conteúdo tipados, automação de tradução por IA e muito mais.

<Steps>

<Step number={4} title="Renomeie Explícitamente as Importações (Opcional)" isOptional={true}>

O plugin atrelado à ferramenta Intlayer engloba nativamente a estrutura e lida com base no nível central da máquina empacotadora a parte relacionada a aliases no projeto. Ainda assim, caso seu interesse prefira forçar como explícitos os caminhos para uso nas suas fontes internas ou dependências diretas de origem nativa em particular, lhe daremos opções fáceis manuais voltadas para isso:

| Antes                                | Depois                                         |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

Essas são **substituições diretas** (drop-in) — nenhuma alteração de assinaturas de chamadas, argumentos ou tipos de retorno é necessária.

</Step>

<Step number={5} title="Habilite a Automação de Tradução por IA" isOptional={true}>

Com o Intlayer configurado, você pode usar a CLI para preencher traduções ausentes automaticamente:

```bash packageManager="npm"
# Testar traduções ausentes (adicionar ao CI)
npx intlayer test

# Preencher traduções ausentes usando IA
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Adicione a configuração de IA ao seu `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // padrão
    // model: "gpt-4o-mini",   // padrão
  },
};

export default config;
```

> Verifique a [Documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para explorar todas as opções disponíveis.

</Step>

</Steps>

---

## O que pode ser excluído pós-migração

Uma vez que o adaptador de compatibilidade esteja implementado, o seguinte boilerplate padrão do `@nuxtjs/i18n` pode ser excluído:

| Arquivo / Padrão                                                                                                                                                                                                                                  | Por que não é mais necessário                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objeto `i18n` contido no arquivo de inicialização de opções baseadas lá pelo `nuxt.config.ts`                                                                                                                                                     | É agora a máquina da Intlayer gerindo autonomamente as funcionalidades pertinentes aos caminhos do projeto, a rotina para invocar dados, bem como tudo que trata aos retornos do idioma principal sem que precise mais do auxílio direto de configurações avulsas vindas do `@nuxtjs/i18n`. |
| Qualquer vestígio ligado e referenciado com menções visando resgatar pacotes pertencentes e listados na sua seção de importações do `@nuxtjs/i18n` presentes dentro da estrutura listada na montagem do objeto e do seu respectivo `package.json` | Desnecessário manter a dependência ao projeto visto as raízes profundas recém atadas junto da completa dependência que seu aplicativo criou de forma plena ao pacote pertencente ao `nuxt-intlayer`.                                                                                        |
| Pacotes de idiomas JSON (`locales/*.json`)                                                                                                                                                                                                        | Pacotes JSON são necessários apenas se você continuar a usar o plugin `syncJSON`. Uma vez migrado para arquivos `.content.ts`, você pode remover a pasta JSON.                                                                                                                              |

Quando você estiver pronto para ir mais além, o Intlayer **descobre automaticamente todos os arquivos `.content.ts` e `.content.json` em qualquer lugar da sua base de código** (por padrão, em qualquer lugar sob `./src`). Basta colocar um arquivo `my-component.content.ts` ao lado do seu `MyComponent.vue`, e o Intlayer o detectará em tempo de build sem necessidade de configuração adicional — não são necessários imports, registros ou um arquivo index central. Isso torna a co-localização das traduções com páginas e componentes totalmente fluida.

---

## Configuração do TypeScript

O Intlayer usa aumento de módulo (module augmentation) para fornecer IntelliSense completo no TypeScript (autocompletar) para as chaves de tradução. Certifique-se de que o seu arquivo `tsconfig.json` inclua os tipos gerados automaticamente:

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes de TypeScript
  "include": [
    // ... Suas configurações existentes de TypeScript
    ".intlayer/**/*.ts", // Inclui os tipos gerados automaticamente
  ],
}
```

---

## Configuração do Git

Adicione o diretório gerado pelo Intlayer ao seu `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora arquivos gerados pelo Intlayer
.intlayer
```

---

## Explore Além

- **Editor Visual** — Gerencie traduções visualmente no seu navegador: [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)
- **CMS** — Externalize o conteúdo e gerencie remotamente: [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)
- **Extensão para VS Code** — Obtenha autocompletar de tradução e detecção de erros em tempo real: [Extensão do VS Code para o Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- **Referência da CLI** — Lista completa de comandos da CLI: [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- **Intlayer com Nuxt** — Guida completa de configuração para Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md)
- **Intlayer com Vue** — Guida completa de configuração para Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md)
