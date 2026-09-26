---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: Документація пакета vite-intlayer
description: Плагін Vite для Intlayer, що надає псевдоніми словників та спостерігачі.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Оновлено індекс експорту – проксі та компілятор тепер об'єднані в intlayer(); додано документацію intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Уніфікована документація для всіх експортів"
author: aymericzip
---

# Пакет vite-intlayer

Пакет `vite-intlayer` надає плагін Vite для інтеграції Intlayer у ваш додаток на базі Vite.

## Встановлення

```bash
npm install vite-intlayer
```

## Експорти

### Плагін

Імпорт:

```tsx
import "vite-intlayer";
```

| Функція                    | Опис                                                                                                                                                        | Пов'язаний документ                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Основний плагін Vite. Готує словники, налаштовує псевдоніми, запускає спостерігачі сервера розробки та (з v9) об'єднує проксі та компілятор.                | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Застаріло**) Псевдонім для `intlayer`.                                                                                                                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Застаріло**) Псевдонім для `intlayer`.                                                                                                                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Плагін проміжного ПЗ для маршрутизації локалей (виявлення, перенаправлення, перезапис). З v9 вбудований у `intlayer()` – реєструйте окремо лише за потреби. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Застаріло**) Псевдонім для `intlayerProxy`.                                                                                                              | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Застаріло**) Псевдонім для `intlayerProxy`.                                                                                                              | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Витягує вбудовані оголошення вмісту з компонентів і записує їх у словники. З v9 вбудований у `intlayer()`.                                                  | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Видаляє невикористані поля словника з робочої збірки за допомогою tree-shaking.                                                                             | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Мініфікує скомпільовані JSON-файли словників і за потреби скорочує назви полів.                                                                             | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerMinify.md)     |

### Утиліти

| Export                       | Опис                                                                                               | Пов'язана документація                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Повертає framework-agnostic Node.js `(req, res, next)` middleware з логікою маршрутизації локалей. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerProxy.md) |

### Типи

| Export                       | Опис                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Параметри, прийняті `intlayer()`. Розширює `GetConfigurationOptions` за допомогою `compatCallers` та `proxy`. |
| `IntlayerProxyPluginOptions` | Параметри, прийняті `intlayerProxy()` та `createIntlayerProxyHandler()`. Включає `ignore` та `configOptions`. |
| `IntlayerCompilerOptions`    | Параметри, прийняті `intlayerCompiler()`. Включає `configOptions` та `compilerConfig`.                        |
| `CompatCallerConfig`         | Re-export з `@intlayer/babel`. Описує compat-adapter caller pattern для аналізу field-usage.                  |
