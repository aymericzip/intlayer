# react-scripts-intlayer: Pacote NPM para usar Intlayer em uma aplicação React Create App

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `react-scripts-intlayer`** inclui os comandos e plugins `react-scripts-intlayer` para integrar o Intlayer com a aplicação baseada em Create React App. Esses plugins são baseados no [craco](https://craco.js.org/) e incluem configuração adicional para o empacotador [Webpack](https://webpack.js.org/).

## Configuração

O pacote `react-scripts-intlayer` funciona perfeitamente com o [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/index.md) e o [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md). Dê uma olhada na documentação relevante para mais informações.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Uso

### Comandos CLI

O pacote `react-scripts-intlayer` fornece os seguintes comandos CLI:

- `npx react-scripts-intlayer build`: Compila a aplicação React com a configuração do Intlayer.
- `npx react-scripts-intlayer start`: Inicia o servidor de desenvolvimento com a configuração do Intlayer.

### Substituir scripts package.json

Para usar o pacote `react-scripts-intlayer`, você precisa substituir os scripts do `package.json` pelos seguintes comandos:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Usar configuração Webpack personalizada

`react-scripts-intlayer` é baseado no [craco](https://craco.js.org/), que permite personalizar a configuração do Webpack. Se você precisa personalizar a configuração do Webpack, você também pode implementar sua própria configuração baseada no plugin craco do intlayer. [Veja um exemplo aqui](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Leia o guia completo do Intlayer para React Create App

Intlayer fornece muitos recursos para ajudar você a internacionalizar sua aplicação React. [Veja como usar o intlayer com React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).
