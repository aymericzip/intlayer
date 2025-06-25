---
docName: package__react-native-intlayer
url: /doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentação do pacote | react-native-intlayer
description: Veja como usar o pacote react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `react-native-intlayer`** permite que você internacionalize sua aplicação Vite. Ele inclui o plugin Metro para configurar através de variáveis de ambiente no [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## Por que Internacionalizar Sua Aplicação React Native?

Internacionalizar sua aplicação React Native é essencial para atender eficazmente a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Configuração

O pacote `react-native-intlayer` funciona perfeitamente com o pacote [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/index.md), e o pacote [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md). Consulte a documentação relevante para mais informações.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Exemplo de uso

Veja um exemplo de como incluir os plugins na configuração do seu Vite.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Dominando a internacionalização da sua aplicação Vite

O Intlayer oferece muitos recursos para ajudá-lo a internacionalizar sua aplicação Vite.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização (i18n) com Intlayer e React Native](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_react_native+expo.md) para Aplicação React Native.**

## Leia sobre o Intlayer

- [Site do Intlayer](https://intlayer.org)
- [Documentação do Intlayer](https://intlayer.org/doc)
- [GitHub do Intlayer](https://github.com/aymericzip/intlayer)

- [Faça suas perguntas à nossa documentação inteligente](https://intlayer.org/docchat)
