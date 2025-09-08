---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Package Documentation | react-native-intlayer
description: See how to use the react-native-intlayer package
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-native-intlayer
---

# react-native-intlayer: Bir React Native uygulamasını uluslararasılaştırın (i18n)

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`react-native-intlayer` paketi**, Vite uygulamanızı uluslararasılaştırmanıza izin verir. Yapılandırmayı ortam değişkenleri aracılığıyla [Metro bundler](https://docs.expo.dev/guides/customizing-metro/)'a ayarlamak için Metro eklentisini içerir.

## Neden React Native Uygulamanızı Uluslararasılaştırasınız?

React Native uygulamanızı uluslararasılaştırmak, küresel bir kitleye etkili bir şekilde hizmet etmek için gereklidir. Uygulamanızın her kullanıcının tercih ettiği dilde içerik ve mesajlar sunmasına izin verir. Bu yetenek, kullanıcı deneyimini geliştirir ve uygulamanızın farklı dilsel geçmişlere sahip insanlara daha erişilebilir ve ilgili hale getirerek erişimini genişletir.

## Yapılandırma

`react-native-intlayer` paketi, [`react-intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) ve [`intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md) ile sorunsuz çalışır. Daha fazla bilgi için ilgili dokümantasyona bakın.

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Kullanım Örneği

Eklentilerin vite yapılandırmanıza nasıl dahil edileceğine dair bir örnek görün.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Vite uygulamanızın uluslararasılaştırmasını ustalaşın

Intlayer, Vite uygulamanızı uluslararasılaştırmanıza yardımcı olacak birçok özellik sağlar.

**Bu özellikler hakkında daha fazla bilgi edinmek için, React Native Uygulaması için [React Internationalization (i18n) with Intlayer and React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md) kılavuzuna bakın.**

## Intlayer Hakkında Okuyun

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Sorularınızı akıllı dokümantasyonumuza sorun](https://intlayer.org/docchat)

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
