# Internationalização do React (i18n) com **react-intl** e Intlayer

Este guia mostra como integrar **Intlayer** com **react-intl** para gerenciar traduções em uma aplicação React. Você declarará seu conteúdo traduzível com o Intlayer e, em seguida, consumirá essas mensagens com **react-intl**, uma biblioteca popular do ecossistema [FormatJS](https://formatjs.io/docs/react-intl).

## Visão Geral

- **Intlayer** permite que você armazene traduções em arquivos de declaração de conteúdo **de nível de componente** (JSON, JS, TS, etc.) dentro do seu projeto.
- **react-intl** fornece componentes e hooks do React (como `<FormattedMessage>` e `useIntl()`) para exibir strings localizadas.

Ao configurar o Intlayer para **exportar** traduções em um formato **compatível com react-intl**, você pode automaticamente **gerar** e **atualizar** os arquivos de mensagem que `<IntlProvider>` (do react-intl) requer.

---

## Por Que Usar Intlayer com react-intl?

1. **Declarações de Conteúdo por Componente**  
   Os arquivos de declaração de conteúdo do Intlayer podem viver ao lado dos seus componentes React, prevenindo traduções “órfãs” se os componentes forem movidos ou removidos. Por exemplo:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Declaração de conteúdo do Intlayer
               └── index.tsx          # Componente React
   ```

2. **Traduções Centralizadas**  
   Cada arquivo de declaração de conteúdo coleta todas as traduções necessárias para um componente. Isso é particularmente útil em projetos TypeScript: traduções ausentes podem ser descobertas no **tempo de compilação**.

3. **Construção e Regeneração Automática**  
   Sempre que você adicionar ou atualizar traduções, o Intlayer regenera os arquivos JSON de mensagens. Você pode então passá-los para o `<IntlProvider>` do react-intl.

---

## Instalação

Em um projeto React típico, instale o seguinte:

```bash
# com npm
npm install intlayer react-intl

# com yarn
yarn add intlayer react-intl

# com pnpm
pnpm add intlayer react-intl
```

### Por Que Esses Pacotes?

- **intlayer**: CLI e biblioteca principal que escaneia por declarações de conteúdo, as mescla e constrói saídas de dicionário.
- **react-intl**: A biblioteca principal do FormatJS que fornece `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` e outros princípios de internacionalização.

> Se você ainda não tiver o React instalado, precisará dele também (`react` e `react-dom`).

## Configurando o Intlayer para Exportar Mensagens do react-intl

Na raiz do seu projeto, crie **`intlayer.config.ts`** (ou `.js`, `.mjs`, `.cjs`) assim:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Adicione quantos locais desejar
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Indica ao Intlayer para gerar arquivos de mensagens para o react-intl
    dictionaryOutput: ["react-intl"],

    // O diretório onde o Intlayer escreverá seus arquivos JSON de mensagens
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Nota**: Para outras extensões de arquivo (`.mjs`, `.cjs`, `.js`), consulte a [documentação do Intlayer](https://intlayer.org/pt/doc/concept/configuration) para detalhes de uso.

---

## Criando Suas Declarações de Conteúdo do Intlayer

O Intlayer escaneia seu código (por padrão, sob `./src`) em busca de arquivos que correspondam a `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
Aqui está um exemplo de **TypeScript**:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" se torna a chave de mensagem de nível superior no seu arquivo JSON do react-intl
  key: "meu-componente",

  content: {
    // Cada chamada a t() declara um campo traduzível
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

Se preferir JSON ou diferentes variantes JS (`.cjs`, `.mjs`), a estrutura é em grande parte a mesma , veja [documentação do Intlayer sobre declaração de conteúdo](https://intlayer.org/pt/doc/concept/content).

---

## Construindo as Mensagens do react-intl

Para gerar os arquivos JSON de mensagens reais para **react-intl**, execute:

```bash
# com npm
npx intlayer dictionaries build

# com yarn
yarn intlayer build

# com pnpm
pnpm intlayer build
```

Isso escaneia todos os arquivos `*.content.*`, os compila e grava os resultados no diretório especificado no seu **`intlayer.config.ts`** , neste exemplo, `./react-intl/messages`.  
Uma saída típica pode parecer com:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Cada arquivo é um objeto JSON cujas **chaves de nível superior** correspondem a cada **`content.key`** das suas declarações. As **subchaves** (como `helloWorld`) refletem as traduções declaradas dentro daquele item de conteúdo.

Por exemplo, o **en.json** pode parecer assim:

```json
{
  "meu-componente": {
    "helloWorld": "Hello World",
    "description": "This is a description"
  }
}
```

---

## Inicializando o react-intl na Sua Aplicação React

### 1. Carregue as Mensagens Geradas

Onde você configura o componente raiz da sua aplicação (por exemplo, `src/main.tsx` ou `src/index.tsx`), você precisará:

1. **Importar** os arquivos de mensagem gerados (estaticamente ou dinamicamente).
2. **Fornecer** a eles para o `<IntlProvider>` do `react-intl`.

Uma abordagem simples é importá-los **estaticamente**:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Importar os arquivos JSON da saída de compilação.
// Alternativamente, você pode importar dinamicamente com base no idioma escolhido pelo usuário.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// Se você tiver um mecanismo para detectar o idioma do usuário, defina-o aqui.
// Para simplicidade, vamos escolher o inglês.
const locale = "en";

// Compilar mensagens em um objeto (ou selecioná-las dinamicamente)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Dica**: Para projetos reais, você pode:

> - Carregar dinamicamente as mensagens JSON em tempo de execução.

> - Usar detecção de localidade baseada em ambiente, no navegador ou na conta do usuário.

### 2. Usar `<FormattedMessage>` ou `useIntl()`

Uma vez que suas mensagens estejam carregadas no `<IntlProvider>`, qualquer componente filho pode usar react-intl para acessar strings localizadas. Existem duas abordagens principais:

- **Componente `<FormattedMessage>`**
- **Hook `useIntl()`**

---

## Usando Traduções em Componentes React

### Abordagem A: `<FormattedMessage>`

Para uso rápido em linha:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “meu-componente.helloWorld” referencia a chave de en.json, fr.json, etc. */}
        <FormattedMessage id="meu-componente.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="meu-componente.description" />
      </p>
    </div>
  );
}
```

> A prop **`id`** em `<FormattedMessage>` deve corresponder à **chave de nível superior** (`meu-componente`) mais quaisquer subchaves (`helloWorld`).

### Abordagem B: `useIntl()`

Para um uso mais dinâmico:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "meu-componente.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "meu-componente.description" })}</p>
    </div>
  );
}
```

Ambas as abordagens são válidas , escolha o estilo que melhor se adequa ao seu aplicativo.

---

## Atualizando ou Adicionando Novas Traduções

1. **Adicione ou modifique** o conteúdo em qualquer arquivo `*.content.*`.
2. Execute novamente `intlayer build` para regenerar os arquivos JSON sob `./react-intl/messages`.
3. O React (e o react-intl) buscará as atualizações da próxima vez que você reconstruir ou recarregar sua aplicação.

---

## Integração com TypeScript (Opcional)

Se você estiver usando TypeScript, o Intlayer pode **gerar definições de tipo** para suas traduções.

- Certifique-se de que o `tsconfig.json` inclua sua pasta `types` (ou qualquer pasta de saída que o Intlayer gera) na matriz `"include"`.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

Os tipos gerados podem ajudar a detectar traduções ausentes ou chaves inválidas em seus componentes React no tempo de compilação.

---

## Configuração do Git

É comum **excluir** os artefatos internos de construção do Intlayer do controle de versão. No seu `.gitignore`, adicione:

```plaintext
# Ignorar artefatos de construção do intlayer
.intlayer
react-intl
```

Dependendo do seu fluxo de trabalho, você pode também querer ignorar ou commitar os dicionários finais em `./react-intl/messages`. Se seu pipeline CI/CD os regenerar, você pode ignorá-los com segurança; caso contrário, comite-os se precisar deles para implantações em produção.
