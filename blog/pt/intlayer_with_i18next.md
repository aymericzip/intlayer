# Internacionalização com Intlayer e i18next

i18next é um framework de internacionalização (i18n) de código aberto projetado para aplicações JavaScript. É amplamente utilizado para gerenciar traduções, localização e troca de idiomas em projetos de software. No entanto, possui algumas limitações que podem complicar a escalabilidade e o desenvolvimento.

Intlayer é outro framework de internacionalização que aborda essas limitações, oferecendo uma abordagem mais flexível para declaração e gerenciamento de conteúdo. Vamos explorar algumas diferenças principais entre i18next e Intlayer, e como configurar ambos para uma internacionalização ideal.

## Intlayer vs. i18next: Diferenças Chave

### 1. Declaração de Conteúdo

Com o i18next, os dicionários de tradução devem ser declarados em uma pasta específica, o que pode complicar a escalabilidade da aplicação. Em contraste, o Intlayer permite que o conteúdo seja declarado dentro do mesmo diretório que seu componente. Isso possui várias vantagens:

- **Edição de Conteúdo Simplificada**: Os usuários não precisam procurar o dicionário correto para editar, diminuindo a chance de erros.
- **Adaptação Automática**: Se um componente muda de localização ou é removido, o Intlayer detecta e se adapta automaticamente.

### 2. Complexidade de Configuração

Configurar o i18next pode ser complexo, especialmente ao integrar com componentes do lado do servidor ou ao configurar middleware para frameworks como Next.js. O Intlayer simplifica esse processo, oferecendo uma configuração mais direta.

### 3. Consistência dos Dicionários de Tradução

Garantir que os dicionários de tradução sejam consistentes em diferentes idiomas pode ser desafiador com o i18next. Essa inconsistência pode levar a falhas na aplicação se não for tratada adequadamente. O Intlayer aborda isso aplicando restrições ao conteúdo traduzido, garantindo que nenhuma tradução seja perdida e que o conteúdo traduzido seja preciso.

### 4. Integração com TypeScript

O Intlayer oferece melhor integração com TypeScript, permitindo sugestões automáticas de conteúdo em seu código, aumentando, assim, a eficiência do desenvolvimento.

### 5. Compartilhamento de Conteúdo entre Aplicações

O Intlayer facilita o compartilhamento de arquivos de declaração de conteúdo entre várias aplicações e bibliotecas compartilhadas. Esse recurso torna mais fácil manter traduções consistentes em uma base de código maior.

## Como Gerar Dicionários do i18next com Intlayer

### Configurando o Intlayer para Exportar Dicionários do i18next

> Notas Importantes
> A exportação de dicionários do i18next está atualmente em beta e não garante uma compatibilidade 1:1 com outros frameworks. Recomenda-se aderir a uma configuração baseada no Intlayer para minimizar problemas.

Para exportar dicionários do i18next, você precisa configurar o Intlayer adequadamente. Abaixo está um exemplo de como configurar o Intlayer para exportar tanto os dicionários do Intlayer quanto do i18next.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Indica que o Intlayer irá exportar tanto os dicionários do Intlayer quanto do i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // Caminho relativo a partir da raiz do projeto até o diretório onde os dicionários i18n serão exportados
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Indica que o Intlayer irá exportar tanto os dicionários do Intlayer quanto do i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // Caminho relativo a partir da raiz do projeto até o diretório onde os dicionários i18n serão exportados
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Indica que o Intlayer irá exportar tanto os dicionários do Intlayer quanto do i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // Caminho relativo a partir da raiz do projeto até o diretório onde os dicionários i18n serão exportados
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

module.exports = config;
```

Ao incluir 'i18next' na configuração, o Intlayer gera dicionários dedicados do i18next além dos dicionários do Intlayer. Observe que remover 'intlayer' da configuração pode quebrar a compatibilidade com React-Intlayer ou Next-Intlayer.

### Importando Dicionários na Sua Configuração do i18next

Para importar os dicionários gerados na sua configuração do i18next, você pode usar 'i18next-resources-to-backend'. Aqui está um exemplo de como importar seus dicionários do i18next:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Sua configuração do i18next
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Sua configuração do i18next
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // Sua configuração do i18next
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```
