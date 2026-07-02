---
createdAt: 2025-06-18
updatedAt: 2026-06-25
title: "Expo + React Native i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Expo + React Native multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Importar providers e hooks diretamente de react-native-intlayer; react-intlayer não é mais necessário como dependência direta"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionar comando init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Adicionar seção de debug"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza seu aplicativo Expo e React Native | Internacionalização (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como Internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `react-native-localize` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>

<Accordion header="Cobertura completa do React Native">

O Intlayer é otimizado para funcionar perfeitamente com React Native e Expo, oferecendo **escopo de conteúdo em nível de componente**, **suporte a TypeScript** e todos os recursos necessários para dimensionar a internacionalização (i18n) em aplicativos móveis.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**, e **[habilidades do agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) auto-hospedado** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do seu pacote e visualização em até 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Instalar Dependências">

Consulte o [Modelo de Aplicativo](https://github.com/aymericzip/intlayer-react-native-template) no GitHub.

No seu projeto React Native, instale os seguintes pacotes:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> A flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Pacotes

- **intlayer**  
  O kit de ferramentas i18n principal para configuração, conteúdo do dicionário, geração de tipos e comandos CLI.

- **react-native-intlayer**  
  Integração React Native que fornece os provedores de contexto e hooks React que você usará para obter e trocar localidades, os polyfills do React Native e o plugin Metro para integrar o Intlayer com o bundler do React Native. Reexporta tudo de `react-intlayer`, portanto você só precisa deste único pacote em um aplicativo React Native.

---

</Step>

<Step number={2} title="Criar uma Configuração Intlayer">

Na raiz do seu projeto (ou em qualquer lugar conveniente), crie um arquivo de **configuração do Intlayer**. Pode ser algo assim:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Se os tipos Locales não estiverem disponíveis, tente definir moduleResolution como "bundler" no seu tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Adicione quaisquer outras localidades que você precisar
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dentro desta configuração, você pode:

- Configurar sua **lista de localidades suportadas**.
- Definir uma localidade **padrão**.
- Posteriormente, você pode adicionar opções mais avançadas (por exemplo, logs, diretórios personalizados de conteúdo, etc.).
- Veja a [documentação de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais informações.

</Step>

<Step number={3} title="Adicione o plugin Metro">

Metro é um empacotador para React Native. É o empacotador padrão para projetos React Native criados com o comando `react-native init`. Para usar o Intlayer com o Metro, você precisa adicionar o plugin ao seu arquivo `metro.config.js`:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Nota: `configMetroIntlayer` é uma função que retorna uma promise. Use `configMetroIntlayerSync` se quiser usá-la de forma síncrona ou evitar IIFE (Immediately Invoked Function Expression).
> Nota: `configMetroIntlayerSync` não permite construir dicionários intlayer no início do servidor

</Step>

<Step number={4} title="Adicione o provedor Intlayer">

Para manter sincronizada a linguagem do usuário em toda a sua aplicação, você precisa envolver seu componente raiz com o componente `IntlayerProvider` do `react-native-intlayer`.

> Sempre importe de `react-native-intlayer`. Seu `IntlayerProvider` inclui polyfills para a API web usada pelo Intlayer, e o pacote reexporta todos os hooks e utilitários de `react-intlayer`.

Além disso, você precisa adicionar a função `intlayerPolyfill` ao seu arquivo `index.js` para garantir que o Intlayer funcione corretamente.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

</Step>

<Step number={5} title="Declare Seu Conteúdo">

Crie arquivos de **declaração de conteúdo** em qualquer lugar do seu projeto (comumente dentro de `src/`), usando qualquer um dos formatos de extensão que o Intlayer suporta:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- etc.

> **Expo Router (web): mantenha os arquivos `.content.*` fora do diretório `app/`.** O Expo Router trata cada arquivo JavaScript/TypeScript dentro de `app/` como uma rota. Na web, a descoberta de rotas varre o sistema de arquivos diretamente e **não** respeita o `resolver.blockList` do Metro, então um `*.content.ts` co-localizado é registrado como uma rota. Um arquivo como `app/(tabs)/_layout.content.ts` é até analisado como um layout (a parte `.content` é lida como um sufixo de plataforma), o que entra em conflito com o verdadeiro `_layout.tsx` e lança o erro:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Coloque suas declarações em um diretório fora de `app/` (por exemplo, `content/` ou `src/content/`). O Intlayer descobre arquivos `.content.*` em qualquer lugar do projeto e os dicionários são referenciados por sua `key`, portanto, nenhuma mudança de importação é necessária. No nativo isso não é necessário (a `blockList` do Metro já os esconde), mas usar um diretório diferente de `app/` mantém ambas as plataformas funcionando.

Exemplo (TypeScript com nós TSX para React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Dicionário de conteúdo para nosso domínio "app"
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> Para detalhes sobre declarações de conteúdo, veja [a documentação de conteúdo do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Use o Intlayer em Seus Componentes">

Use o hook `useIntlayer` em componentes filhos para obter conteúdo localizado.

### Exemplo

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> Ao usar `content.someKey` em props baseadas em string (por exemplo, o `title` de um botão ou os `children` de um componente `Text`), **chame `content.someKey.value`** para obter a string real.

> Se a sua aplicação já existe, você pode usar o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) em conjunto com o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para converter milhares de componentes em um segundo.

---

</Step>

<Step number={7} title="Alterar o Locale do App" isOptional={true}>

Para trocar os locales dentro dos seus componentes, você pode usar o método `setLocale` do hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

Isto provoca uma nova renderização de todos os componentes que utilizam conteúdo do Intlayer, mostrando agora as traduções para a nova localidade.

> Veja a documentação de [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md) para mais detalhes.

</Step>

</Steps>

## Configurar TypeScript (se usar TypeScript)

O Intlayer gera definições de tipos numa pasta oculta (por defeito `.intlayer`) para melhorar a autocompletação e detetar erros de tradução:

```json5
// tsconfig.json
{
  // ... sua configuração TS existente
  "include": [
    "src", // seu código fonte
    ".intlayer/types/**/*.ts", // <-- garantir que os tipos gerados automaticamente estejam incluídos
    // ... qualquer outra coisa que você já inclua
  ],
}
```

Isto é o que habilita funcionalidades como:

- **Autocompletar** para as chaves do seu dicionário.
- **Verificação de tipos** que avisa se você acessar uma chave inexistente ou incompatível com o tipo.

---

## Configuração do Git

Para evitar o commit de arquivos gerados automaticamente pelo Intlayer, adicione o seguinte ao seu `.gitignore`:

```bash
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

---

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Além

- **Editor Visual**: Use o [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) para gerenciar traduções visualmente.
- **Integração com CMS**: Você também pode externalizar e buscar o conteúdo do seu dicionário a partir de um [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).
- **Comandos CLI**: Explore o [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md) para tarefas como **extrair traduções** ou **verificar chaves faltantes**.

Aproveite para construir seus aplicativos **React Native** com i18n totalmente potencializado através do **Intlayer**!

---

### Debug

React Native pode ser menos estável do que React Web, então preste atenção extra ao alinhamento de versões.

Intlayer tem como alvo principal a Web Intl API; no React Native você deve incluir os polyfills apropriados.

Checklist:

- Use as últimas versões de `intlayer` e `react-native-intlayer`.
- Ative o polyfill do Intlayer.
- Se você usar `getLocaleName` ou outros utilitários baseados em Intl-API, importe esses polyfills cedo (por exemplo em `index.js` ou `App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Verifique sua configuração do Metro (resolver aliases, asset plugins, caminhos de `tsconfig`) se os módulos falharem em resolver.

---
