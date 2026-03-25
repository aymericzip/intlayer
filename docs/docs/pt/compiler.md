---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Intlayer Compiler | Extração Automática de Conteúdo para i18n
description: Automatize seu processo de internacionalização com o Intlayer Compiler. Extraia conteúdo diretamente dos seus componentes para uma i18n mais rápida e eficiente em Vite, Next.js e mais.
keywords:
  - Intlayer
  - Compiler
  - Internacionalização
  - i18n
  - Automação
  - Extração
  - Velocidade
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-10
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Atualizar opções do compilador"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Lançamento do Compiler"
---

# Intlayer Compiler | Extração Automática de Conteúdo para i18n

## O que é o Intlayer Compiler?

O **Intlayer Compiler** é uma ferramenta poderosa projetada para automatizar o processo de internacionalização (i18n) em suas aplicações. Ele escaneia seu código-fonte (JSX, TSX, Vue, Svelte) em busca de declarações de conteúdo, extrai-as e gera automaticamente os arquivos de dicionário necessários. Isso permite que você mantenha seu conteúdo localizado junto aos seus componentes, enquanto o Intlayer gerencia e sincroniza seus dicionários.

## Por que Usar o Intlayer Compiler?

- **Automação**: Elimina a cópia manual e colagem de conteúdo nos dicionários.
- **Velocidade**: Extração de conteúdo otimizada garantindo que seu processo de build permaneça rápido.
- **Experiência do Desenvolvedor**: Mantenha as declarações de conteúdo exatamente onde são usadas, melhorando a manutenção.
- **Atualizações em Tempo Real**: Suporta Hot Module Replacement (HMR) para feedback instantâneo durante o desenvolvimento.

Veja o post do blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md) para uma comparação mais aprofundada.

## Por que não usar o Intlayer Compiler?

Embora o compilador ofereça uma excelente experiência "funciona automaticamente", ele também introduz algumas compensações das quais você deve estar ciente:

- **Ambiguidade heurística**: O compilador deve adivinhar o que é conteúdo voltado para o usuário versus a lógica da aplicação (por exemplo, `className="active"`, códigos de status, IDs de produtos). Em bases de código complexas, isso pode levar a falsos positivos ou strings perdidas que exigem anotações manuais e exceções.
- **Extração apenas estática**: A extração baseada em compilador depende de análise estática. Strings que existem apenas em tempo de execução (códigos de erro de API, campos CMS, etc.) não podem ser descobertas ou traduzidas pelo compilador sozinho, então você ainda precisa de uma estratégia i18n de tempo de execução complementar.

Para uma comparação arquitetural mais profunda, veja o post do blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md).

Como alternativa, para automatizar seu processo i18n mantendo controle total sobre seu conteúdo, o Intlayer também fornece um comando de auto-extração `intlayer extract` (consulte a [documentação CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md)), ou o comando `Intlayer: extract content to Dictionary` da extensão Intlayer VS Code (consulte a [documentação da extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)).

## Uso

<Tabs>
 <Tab value='vite'>

### Vite

Para aplicações baseadas em Vite (React, Vue, Svelte, etc.), a maneira mais fácil de usar o compilador é através do plugin `vite-intlayer`.

#### Instalação

```bash
npm install vite-intlayer
```

#### Configuração

Atualize seu `vite.config.ts` para incluir el plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adiciona o plugin do compilador
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Suporte a Frameworks

O plugin do Vite detecta e lida automaticamente com diferentes tipos de arquivos:

- **React / JSX / TSX**: Suportado nativamente.
- **Vue**: Requer `@intlayer/vue-compiler`.
- **Svelte**: Requer `@intlayer/svelte-compiler`.

Certifique-se de instalar o pacote do compilador apropriado para o seu framework:

```bash
# Para Vue
npm install @intlayer/vue-compiler

# Para Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Para Next.js ou outras aplicações baseadas em Webpack que usam Babel, você pode configurar o compilador usando o plugin `@intlayer/babel`.

#### Instalação

```bash
npm install @intlayer/babel
```

#### Configuração

Atualize seu `babel.config.js` (ou `babel.config.json`) para incluir o plugin de extração. Fornecemos um helper `getExtractPluginOptions` para carregar automaticamente sua configuração do Intlayer.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Esta configuração garante que o conteúdo declarado em seus componentes seja automaticamente extraído e usado para gerar dicionários durante o processo de build.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Configuração personalizada

Para personalizar o comportamento do compilador, você pode atualizar o arquivo `intlayer.config.ts` na raiz do seu projeto.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Indica se o compilador deve ser habilitado.
     * Defina como 'build-only' para ignorar o compilador durante o desenvolvimento e acelerar os tempos de inicialização.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída. Substitui `outputDir`.
     *
     * - Os caminhos `./` são resolvidos em relação ao diretório do componente.
     * - Os caminhos `/` são resolvidos em relação à raiz do projeto (`baseDir`).
     *
     * - A inserção da variável `{{locale}}` no caminho ativará a geração de dicionários separados por idioma.
     *
     * Exemplo:
     * ```ts
     * {
     *   // Cria arquivos .content.ts multilíngues próximos ao componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando uma string template
     * }
     * ```
     *
     * ```ts
     * {
     *   // Cria arquivos JSON centralizados por idioma na raiz do projeto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando uma string template
     * }
     * ```
     *
     * Lista de variáveis:
     *   - `fileName`: O nome do arquivo.
     *   - `key`: A chave do conteúdo.
     *   - `locale`: O idioma do conteúdo.
     *   - `extension`: A extensão do arquivo.
     *   - `componentFileName`: O nome do arquivo do componente.
     *   - `componentExtension`: A extensão do arquivo do componente.
     *   - `format`: O formato do dicionário.
     *   - `componentFormat`: O formato do dicionário do componente.
     *   - `componentDirPath`: O caminho do diretório do componente.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Se deve guardar as componentes após serem transformadas.
     *
     * - Se `true`, o compilador reescreverá o arquivo do componente no disco. Portanto, a transformação será permanente, e o compilador pulará a transformação para o próximo processo. Dessa forma, o compilador pode transformar o app, e então pode ser removido.
     *
     * - Se `false`, o compilador injetará a chamada da função `useIntlayer()` no código apenas na saída da build, e manterá a base de código original intacta. A transformação será feita apenas em memória.
     */
    saveComponents: false,

    /**
     * Inserir apenas o conteúdo no arquivo gerado. Útil para saídas i18next ou ICU MessageFormat JSON por idioma.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Adicione um prefixo opcional para as chaves de dicionário extraídas
  },
};

export default config;
````

### Referência de configuração do compilador

As seguintes propriedades podem ser configuradas no bloco `compiler` do seu arquivo `intlayer.config.ts`:

- **enabled**:
  - _Tipo_: `boolean | 'build-only'`
  - _Padrão_: `true`
  - _Descrição_: Indica se o compilador deve ser habilitado.

- **dictionaryKeyPrefix**:
  - _Tipo_: `string`
  - _Padrão_: `''`
  - _Descrição_: Prefixo para as chaves de dicionário extraídas.

- **transformPattern**:
  - _Tipo_: `string | string[]`
  - _Padrão_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Descrição_: (Obsoleto: use `build.traversePattern` em seu lugar) Padrões para percorrer o código a ser otimizado.

- **excludePattern**:
  - _Tipo_: `string | string[]`
  - _Padrão_: `['**/node_modules/**']`
  - _Descrição_: (Obsoleto: use `build.traversePattern` em seu lugar) Padrões para excluir da otimização.

- **output**:
  - _Tipo_: `FilePathPattern`
  - _Padrão_: `({ key }) => 'compiler/${key}.content.json'`
  - _Descrição_: Define o caminho dos arquivos de saída. Substitui `outputDir`. Manipula variáveis dinâmicas como `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. Pode ser definido como uma string usando o formato `'my/{{var}}/path'` ou como uma função.
  - _Nota_: `./**/*` Os caminhos são resolvidos relativamente ao componente. `/**/*` os caminhos são resolvidos relativamente ao `baseDir` do Intlayer.
  - _Nota_: Se o idioma for definido no caminho, os dicionários serão gerados por idioma.
  - _Exemplo_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se os metadados devem ser salvos no arquivo. Se verdadeiro, o compilador não salvará os metadados dos dicionários (chave, wrapper de conteúdo). Útil para saídas JSON i18next ou ICU MessageFormat por localidade.
  - _Nota_: Útil se usado com o plugin `loadJSON`.
  - _Exemplo_:
    Se `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Se `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Tipo_: `boolean`
  - _Padrão_: `false`
  - _Descrição_: Indica se os componentes devem ser salvos após serem transformados.
    - Se `true`, o compilador reescreverá o arquivo do componente no disco. A transformação será permanente, e o compilador poderá ser removido.
    - Se `false`, o compilador injetará a chamada da função `useIntlayer()` no código apenas na saída da build, mantendo a base de código original intacta. A transformação será feita apenas em memória.

### Preencher traduções ausentes

Intlayer fornece uma ferramenta CLI para ajudá-lo a preencher as traduções ausentes. Você pode usar o comando `intlayer` para testar e preencher as traduções ausentes do seu código.

```bash
npx intlayer test         # Testa se há traduções ausentes
```

```bash
npx intlayer fill         # Preencher traduções ausentes
```

### Extração

Intlayer fornece uma ferramenta CLI para extrair conteúdo do seu código. Você pode usar o comando `intlayer extract` para extrair o conteúdo do seu código.

```bash
npx intlayer extract
```

> Para mais detalhes, consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
