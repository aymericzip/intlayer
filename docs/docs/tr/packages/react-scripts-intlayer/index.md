---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Package Documentation | react-scripts-intlayer
description: See how to use the react-scripts-intlayer package
keywords:
  - Intlayer
  - react-scripts-intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer: React Create App uygulamasında Intlayer'ı kullanmak için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`react-scripts-intlayer` paketi**, Create React App tabanlı uygulamayla Intlayer'ı entegre etmek için `react-scripts-intlayer` komutlarını ve eklentilerini içerir. Bu eklentiler [craco](https://craco.js.org/)'ya dayanır ve [Webpack](https://webpack.js.org/) bundler için ek yapılandırma içerir.

## Yapılandırma

`react-scripts-intlayer` paketi, [`react-intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) ve [`intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md) ile sorunsuz çalışır. Daha fazla bilgi için ilgili dokümantasyona bakın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Kullanım

### CLI Komutları

`react-scripts-intlayer` paketi aşağıdaki CLI komutlarını sağlar:

- `npx react-scripts-intlayer build`: Intlayer yapılandırmasıyla React uygulamasını oluşturur.
- `npx react-scripts-intlayer start`: Intlayer yapılandırmasıyla geliştirme sunucusunu başlatır.

### package.json komutlarını değiştirin

`react-scripts-intlayer` paketini kullanmak için, `package.json` komutlarını aşağıdaki komutlarla değiştirmeniz gerekir:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Özel Webpack yapılandırması kullanın

`react-scripts-intlayer`, Webpack yapılandırmasını özelleştirmenize izin veren [craco](https://craco.js.org/)'ya dayanır.
Webpack yapılandırmasını özelleştirmeniz gerekiyorsa, intlayer craco eklentisine dayalı kendi kurulumunuzu da uygulayabilirsiniz. [Örneği burada görün](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## React Create App için tam Intlayer kılavuzunu okuyun

Intlayer, React uygulamanızı uluslararasılaştırmanıza yardımcı olacak birçok özellik sağlar.
[Intlayer'ı React Create App ile nasıl kullanacağınızı görün](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md).

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
