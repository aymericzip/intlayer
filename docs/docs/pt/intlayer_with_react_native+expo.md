# Introdução à Internacionalização (i18n) com Intlayer e React Native

Veja [Application Template](https://github.com/aymericzip/intlayer-react-native-template) on GitHub.

## O que é Intlayer?

**Intlayer** é uma **biblioteca de internacionalização (i18n) inovadora e de código aberto** que simplifica o suporte a vários idiomas em aplicações modernas. Ele funciona em muitos ambientes JavaScript/TypeScript, **incluindo React Native** (através do pacote `react-intlayer`).

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** usando dicionários declarativos no nível do componente.
- **Garantir suporte ao TypeScript** com geração automática de tipos.
- **Localizar dinamicamente** conteúdos, incluindo **textos da interface do usuário** (e, no React para a web, também pode localizar metadados HTML, etc.).
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de idioma.

---

## Passo 1: Instalar Dependências

No seu projeto React Native, instale os seguintes pacotes:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
```

### Pacotes

- **intlayer**  
  O kit de ferramentas i18n principal para configuração, dicionários de conteúdo, geração de tipos e comandos CLI.

- **react-intlayer**  
  Integração com React que fornece os provedores de contexto e hooks React necessários para obter e alterar idiomas no React Native.

- **react-native-intlayer**  
  Integração específica para React Native que fornece o plugin do Metro para integrar o Intlayer ao empacotador do React Native.

---

## Passo 2: Criar uma Configuração do Intlayer

No diretório raiz do seu projeto (ou em qualquer local conveniente), crie um arquivo de configuração do **Intlayer**. Ele pode se parecer com este:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Adicione quaisquer outros idiomas necessários
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Adicione quaisquer outros idiomas necessários
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Nesta configuração, você pode:

- Definir a **lista de idiomas suportados**.
- Configurar um **idioma padrão**.
- Mais tarde, adicionar opções avançadas (por exemplo, logs, diretórios personalizados para conteúdo, etc.).
- Consulte a [documentação de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) para mais informações.

---

## Passo 3: Adicionar o Plugin do Metro

O Metro é o empacotador padrão para projetos React Native criados com `react-native init`. Para usar o Intlayer com o Metro, adicione o plugin ao seu arquivo `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

---

## Passo 4: Adicionar o Provedor do Intlayer

Para manter a sincronização do idioma do usuário em toda a aplicação, envolva seu componente raiz com o `IntlayerProvider` do `react-intlayer`.

Além disso, adicione a função `intlayerPolyfill` ao seu arquivo `index.js` para garantir que o Intlayer funcione corretamente.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProviderContent } from "react-intlayer";
import { intlayerPolyfill } from "react-native-intlayer";
import { type FC } from "react";

intlayerPolyfill();

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProviderContent defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProviderContent>
  );
};

export default RootLayout;
```

---

## Passo 5: Declarar Seu Conteúdo

Crie arquivos de **declaração de conteúdo** em qualquer lugar do seu projeto (geralmente dentro de `src/`), usando qualquer um dos formatos suportados pelo Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Exemplo:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/**
 * Dicionário de conteúdo para a tela inicial
 */
const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      pt: "Bem-vindo!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

> Para mais detalhes sobre a declaração de conteúdo, consulte a [documentação do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md).

---

## Passo 6: Usar o Intlayer nos Seus Componentes

Use o hook `useIntlayer` para obter conteúdos traduzidos nos seus componentes:

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import { ThemedText } from "@/components/ThemedText";

const HomeScreen = () => {
  const { title } = useIntlayer("home-screen");

  return <ThemedText type="title">{title}</ThemedText>;
};

export default HomeScreen;
```

---

## (Opcional) Passo 7: Alterar o Idioma do Aplicativo

Para mudar o idioma dentro dos seus componentes, use o método `setLocale` do hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Button } from "react-native";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <Button
      title="Mudar para Francês"
      onPress={() => setLocale(Locales.FRENCH)}
    />
  );
};
```

---

## Configuração do Git

Para evitar o commit de arquivos gerados automaticamente pelo Intlayer, adicione ao seu `.gitignore`:

```plaintext
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

---

## Vá Além

- **Editor Visual**: Gerencie traduções com o [Editor Visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md).
- **Integração com CMS**: Exporte e obtenha traduções de um [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
- **Comandos CLI**: Explore o [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).
