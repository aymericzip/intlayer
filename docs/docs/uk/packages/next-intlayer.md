---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета next-intlayer
description: Інтеграція Intlayer для Next.js, що надає middleware та провайдери для App Router і Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет next-intlayer

Пакет `next-intlayer` надає необхідні інструменти для інтеграції Intlayer у додатки Next.js. Він підтримує як App Router, так і Page Router, зокрема middleware для маршрутизації на основі локалі.

## Встановлення

```bash
npm install next-intlayer
```

## Експорти

### Middleware

| Function             | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware для Next.js, що обробляє маршрутизацію на основі локалі та перенаправлення. |

### Провайдери

| Component                | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `IntlayerClientProvider` | Провайдер для клієнтських компонентів у Next.js.            |
| `IntlayerServerProvider` | Провайдер для серверних компонентів у Next.js (App Router). |

### Хуки (на стороні клієнта)

Повторно експортує більшість хуків з `react-intlayer`.

| Хук             | Опис                                                   |
| --------------- | ------------------------------------------------------ |
| `useIntlayer`   | Вибирає словник за ключем і повертає його вміст.       |
| `useDictionary` | Вибирає словник за ключем і повертає його вміст.       |
| `useLocale`     | Повертає поточну локаль і функцію для її встановлення. |
| `useI18n`       | Повертає поточні значення контексту Intlayer.          |

### Функції (на сервері)

| Функція                | Опис                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `t`                    | Серверна версія функції перекладу для Next.js App Router.    |
| `generateStaticParams` | Генерує статичні параметри для динамічних маршрутів Next.js. |

### Типи

| Тип                  | Опис                                              |
| -------------------- | ------------------------------------------------- |
| `NextPageIntlayer`   | Тип для сторінок Next.js зі підтримкою Intlayer.  |
| `NextLayoutIntlayer` | Тип для layout-ів Next.js зі підтримкою Intlayer. |
