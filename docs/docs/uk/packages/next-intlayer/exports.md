---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета next-intlayer
description: Інтеграція Intlayer, специфічна для Next.js, що надає middleware та провайдери для App Router і Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет next-intlayer

Пакет `next-intlayer` надає необхідні інструменти для інтеграції Intlayer у додатки Next.js. Він підтримує як App Router, так і Page Router, включно з middleware для маршрутизації залежно від локалі.

## Встановлення

```bash
npm install next-intlayer
```

## Експорти

### Middleware

Імпорт:

```tsx
import "next-intlayer/middleware";
```

| Функція              | Опис                                                                                                                                                                             | Пов'язана документація                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware для Next.js, що обробляє маршрутизацію та редиректи на основі локалі. Визначає локаль із заголовків (headers) або cookies і перенаправляє на відповідний шлях локалі. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/intlayerMiddleware.md) |

### Помічники конфігурації

Імпорт:

```tsx
import "next-intlayer/server";
```

| Функція            | Опис                                                                                                                                                                             | Пов'язана документація |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `withIntlayer`     | Асинхронний хелпер для обгортання конфігурації Next.js, що забезпечує підготовку словників Intlayer перед збіркою. Підготовлює файли контенту та налаштовує плагіни webpack/SWC. | -                      |
| `withIntlayerSync` | Синхронний хелпер для обгортання конфігурації Next.js, ідеальний для конфігурацій, де асинхронність неможлива або небажана. Не готує словники на старті сервера.                 | -                      |

### Провайдери

Імпорт:

```tsx
import "next-intlayer";
```

або

```tsx
import "next-intlayer/server";
```

| Компонент                | Опис                                                                                                          | Пов'язана документація |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `IntlayerClientProvider` | Провайдер для клієнтських компонентів у Next.js App Router. Обгортає `IntlayerProvider` з `react-intlayer`.   | -                      |
| `IntlayerServerProvider` | Провайдер для серверних компонентів у Next.js (App Router). Надає контекст локалі на сервері.                 | -                      |
| `IntlayerServer`         | Серверна обгортка для контенту Intlayer у App Router. Забезпечує коректну обробку локалі в Server Components. | -                      |

### Хуки (на стороні клієнта)

Імпорт:

```tsx
import "next-intlayer";
```

Повторно експортує більшість хуків із `react-intlayer`.

| Хук                    | Опис                                                                                                                                      | Пов'язаний документ                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Клієнтський хук, який вибирає один словник за його ключем і повертає його вміст. Використовує locale з контексту, якщо не вказано.        | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Хук, який перетворює об'єкт dictionary і повертає вміст для поточного locale. Обробляє переклади `t()`, перерахування тощо.               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Хук, що працює з асинхронними словниками. Приймає мапу словників на основі Promise і отримує дані для поточної локалі.                    | -                                                                                                                       |
| `useDictionaryDynamic` | Хук, який обробляє динамічні словники, завантажувані за ключем. Внутрішньо використовує React Suspense для станів завантаження.           | -                                                                                                                       |
| `useLocale`            | Клієнтський хук для отримання поточної локалі та функції для її встановлення. Розширений для Next.js App Router з підтримкою навігації.   | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Клієнтський хук для керування переписуванням URL. Автоматично оновлює URL, якщо існує більш естетичне локалізоване правило переписування. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Специфічний для Next.js Page Router хук для керування локаллю. Обробляє перенаправлення та перезавантаження сторінки при зміні локалі.    | -                                                                                                                       |
| `useI18n`              | Хук, який надає функцію перекладу `t()` для доступу до вкладеного вмісту за ключем. Імітує патерн i18next/next-intl.                      | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Хук, який надає зв'язаний із локаллю об'єкт `Intl`. Автоматично підставляє поточну локаль і використовує оптимізоване кешування.          | -                                                                                                                       |
| `useLoadDynamic`       | Хук для завантаження динамічних словників за допомогою React Suspense. Приймає ключ і проміс, кешує результати.                           | -                                                                                                                       |

### Функції (Server-side)

Імпорт:

```tsx
import "next-intlayer/server";
```

| Функція                | Опис                                                                                                                                                    | Пов'язана документація                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Серверна версія функції перекладу для Next.js App Router. Повертає переклад багатомовного контенту для поточної серверної локалі.                       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md) |
| `getLocale`            | Допоміжна функція для отримання поточної локалі з заголовків і cookie Next.js. Призначена для Server Components, Server Actions або Route Handlers.     | -                                                                                                      |
| `generateStaticParams` | Генерує статичні параметри для динамічних маршрутів Next.js на основі налаштованих локалей. Повертає масив об'єктів локалі для попереднього рендерингу. | -                                                                                                      |
| `locale`               | Функція для отримання або встановлення локалі в серверному контексті (App Router). Забезпечує керування локаллю в Server Components.                    | -                                                                                                      |

### Типи

Імпорт:

```tsx
import "next-intlayer";
```

| Тип                    | Опис                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Тип для Next.js pages з підтримкою Intlayer. Generic type, що включає параметр locale.                                        |
| `Next14PageIntlayer`   | Тип для Next.js 14 pages з підтримкою Intlayer.                                                                               |
| `Next15PageIntlayer`   | Тип для Next.js 15 pages з підтримкою Intlayer.                                                                               |
| `NextLayoutIntlayer`   | Тип для Next.js layouts з підтримкою Intlayer. Generic type, що включає параметр locale.                                      |
| `Next14LayoutIntlayer` | Тип для layout-ів Next.js 14 з підтримкою Intlayer.                                                                           |
| `Next15LayoutIntlayer` | Тип для layout-ів Next.js 15 з підтримкою Intlayer.                                                                           |
| `LocalParams`          | Тип для параметрів маршруту Next.js з локаллю. Об'єкт з властивістю `locale`.                                                 |
| `LocalPromiseParams`   | Тип для параметрів маршруту Next.js з локаллю (асинхронна версія). Promise, що розв'язується в об'єкт з властивістю `locale`. |
