# vite-intlayer: Pacote NPM para internacionalizar (i18n) uma aplicação Vite

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `vite-intlayer`** permite que você internacionalize sua aplicação Vite. Ele inclui o plugin Vite para definir a configuração através de variáveis de ambiente no [pacote Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Também fornece middleware para detectar o locale preferido do usuário e redirecionar o usuário para a URL apropriada, conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Por que internacionalizar sua aplicação Vite?

Internacionalizar sua aplicação Vite é essencial para atender efetivamente a um público global. Permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade aprimora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Configuração

O pacote `vite-intlayer` funciona perfeitamente com o pacote [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/index.md) e o pacote [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md). Dê uma olhada na documentação relevante para mais informações.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Exemplo de uso

Veja um exemplo de como incluir os plugins na sua configuração vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> O plugin `intlayerPlugin()` do Vite é utilizado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora em modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

> O `intLayerMiddlewarePlugin()` adiciona roteamento do lado do servidor à sua aplicação. Este plugin detectará automaticamente o locale atual com base na URL e definirá o cookie de locale apropriado. Se nenhum locale for especificado, o plugin determinará o locale mais apropriado com base nas preferências de idioma do navegador do usuário. Se nenhum locale for detectado, redirecionará para o locale padrão.

## Dominando a internacionalização da sua aplicação Vite

Intlayer oferece muitos recursos para ajudá-lo a internacionalizar sua aplicação Vite.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização (i18n) com React usando Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md) para Aplicações Vite e React.**
