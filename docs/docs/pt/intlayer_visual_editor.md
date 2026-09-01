---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: Editor Visual Intlayer | Edite seu conteúdo usando um editor visual
description: Descubra como usar o Editor Intlayer para gerenciar seu site multilíngue. Siga os passos nesta documentação online para configurar seu projeto em poucos minutos.
keywords:
  - Editor
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Documentação do Editor Visual Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

O Editor Visual Intlayer é uma ferramenta que envolverá seu site para interagir com seus arquivos de declaração de conteúdo usando um editor visual.

![Interface do Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

O pacote `intlayer-editor` é baseado no Intlayer e está disponível para aplicações JavaScript, como React (Create React App), Vite + React e Next.js.

## Editor visual vs CMS

O Editor Visual Intlayer é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários locais. Uma vez feita uma alteração, o conteúdo será substituído na base de código. Isso significa que a aplicação será reconstruída e a página será recarregada para exibir o novo conteúdo.

Em contraste, o [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) é uma ferramenta que permite gerenciar seu conteúdo em um editor visual para dicionários remotos. Uma vez feita uma alteração, o conteúdo **não** impactará sua base de código. E o site exibirá automaticamente o conteúdo alterado.

## Integrar o Intlayer na sua aplicação

Para mais detalhes sobre como integrar o Intlayer, consulte a seção relevante abaixo:

### Integração com Next.js

Para integração com Next.js, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md).

### Integração com Create React App

Para integração com Create React App, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md).

### Integração com Vite + React

Para integração com Vite + React, consulte o [guia de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md).

## Como o Editor Intlayer Funciona

O editor visual em uma aplicação inclui duas coisas:

- Uma aplicação frontend que exibirá seu site em um iframe. Se seu site usar o Intlayer, o editor visual detectará automaticamente seu conteúdo e permitirá que você interaja com ele. Uma vez feita uma modificação, você poderá baixar suas alterações.

- Após clicar no botão de download, o editor visual enviará uma solicitação ao servidor para substituir seus arquivos de declaração de conteúdo pelo novo conteúdo (onde quer que esses arquivos estejam declarados em seu projeto).

> Observe que, por enquanto, o Editor Intlayer gravará seus arquivos de declaração de conteúdo como arquivos JSON.

## Instalação

Depois que o Intlayer estiver configurado em seu projeto, basta instalar o `intlayer-editor` como uma dependência de desenvolvimento:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Com a flag `--with`, você pode iniciar o editor em paralelo com outro comando:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Configuração

No arquivo de configuração do Intlayer, você pode personalizar as configurações do editor:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... outras configurações
  editor: {
    /**
     * Obrigatório
     * A URL da aplicação.
     * Esta é a URL alvo do editor visual.
     * Exemplo: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcional
     * Padrão como `true`. Se `false`, o editor está inativo e não pode ser acessado.
     * Pode ser usado para desativar o editor em ambientes específicos por razões de segurança, como produção.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opcional
     * Padrão como `8000`.
     * A porta do servidor do editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcional
     * Padrão como "http://localhost:8000"
     * A URL do servidor do editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Para ver todos os parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Usando o Editor

1. Quando o editor estiver instalado, você pode iniciá-lo usando o seguinte comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Observe que você deve executar sua aplicação em paralelo.** A URL da aplicação deve corresponder à que você configurou no editor (`applicationURL`).

> **Nota que o comando é reexportado pelo pacote `intlayer`. Você pode usar `npx intlayer editor start` em vez disso.**

2. Em seguida, abra a URL fornecida. Por padrão `http://localhost:8000`.

   Você pode visualizar cada campo indexado pelo Intlayer passando o cursor sobre seu conteúdo.

   ![Passando o cursor sobre o conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Se o seu conteúdo estiver destacado, você pode pressioná-lo por um longo tempo para exibir a gaveta de edição.

## Configuração do ambiente

O editor pode ser configurado para usar um arquivo de ambiente específico. Isso é útil quando você deseja usar o mesmo arquivo de configuração para desenvolvimento e produção.

Para usar um arquivo de ambiente específico, você pode usar a flag `--env-file` ou `-f` ao iniciar o editor:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Observe que o arquivo de ambiente deve estar localizado no diretório raiz do seu projeto.

Ou você pode usar a flag `--env` ou `-e` para especificar o ambiente:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Depuração

Se você encontrar problemas com o editor visual, verifique o seguinte:

- O editor visual e a aplicação estão em execução.

- As configurações do [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) estão corretamente definidas no arquivo de configuração do Intlayer.
  - Campos obrigatórios:
    - A URL da aplicação deve corresponder à que você configurou no editor (`applicationURL`).

- O editor visual usa um iframe para exibir seu site. Certifique-se de que a Política de Segurança de Conteúdo (CSP) do seu site permita a URL do CMS como `frame-ancestors` (`http://localhost:8000` por padrão). Verifique o console do editor para quaisquer erros.

## Perguntas Frequentes

<FAQ>

<Question title="Qual é a diferença entre o editor visual e o CMS?">

O editor visual edita dicionários locais e grava as modificações de volta na sua base de código, integrando-se ao seu processo habitual de revisão por commits e deploy. O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) edita dicionários remotos, cujas alterações entram em vigor no site em produção sem necessidade de deploy. O editor é ideal para conteúdos pertencentes a desenvolvedores; o CMS atende perfeitamente ao time de marketing.

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

<Question title="Onde roda o editor visual?">

Na sua própria infraestrutura. Ele carrega a aplicação em um iframe e comunica-se com um servidor local do editor, de modo que seu conteúdo nunca deixa o seu ambiente. Isso viabiliza o uso em projetos confidenciais ou corporativos que não podem enviar dados para serviços de terceiros.

</Question>

<Question title="Os editores precisam saber programar?">

Não. Eles abrem a interface, clicam em qualquer texto na tela e editam diretamente no contexto da página. O editor identifica qual entrada de dicionário corresponde àquele texto e salva as mudanças no arquivo `.content` apropriado, dispensando tradutores de encontrar arquivos ou manipular chaves de código.

</Question>

<Question title="Editar pelo editor visual modifica meus arquivos de código-fonte?">

Sim, esse é exatamente o objetivo. A alteração é gravada no arquivo de declaração de conteúdo no repositório, surgindo como um diff normal do Git para você revisar e commitar, enquanto a aplicação recompila para refletir o novo texto.

</Question>

<Question title="O editor exibe uma página em branco ou recusa carregar meu site. O que devo verificar?">

O editor carrega a aplicação em um iframe; por isso, a Política de Segurança de Conteúdo (CSP) da sua aplicação deve permitir a origem do editor na diretiva `frame-ancestors` (`http://localhost:8000` por padrão). Verifique também se a URL definida em `applicationURL` nas configurações do editor coincide exatamente com o endereço em que sua aplicação está sendo servida. O console do navegador indicará eventuais bloqueios.

</Question>

<Question title="Posso usar o editor visual em produção?">

Ele foi projetado primariamente para ambientes locais de desenvolvimento e staging, onde um reload ou rebuild é aceitável. Para editar conteúdo diretamente em produção sem intervenção de deploy, utilize o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) e seus dicionários remotos.

</Question>

<Question title="O editor visual é gratuito?">

Sim. O editor visual faz parte do projeto de código aberto sob a licença Apache 2.0, com uso comercial incluído. Apenas o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) hospedado em nuvem é um serviço pago opcional, que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>
