---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Відстеження показів контенту та проведення A/B-тестування
description: Дізнайтеся, як @intlayer/analytics відстежує перегляди сторінок/локалей та покази контенту, і як використовувати це для проведення A/B-тестування вашого контенту в Intlayer.
keywords:
  - Аналітика (Analytics)
  - A/B Тестування
  - Аудиторія (Audience)
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Аналітику увімкнено за замовчуванням, якщо встановлено `@intlayer/analytics`"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — пакет @intlayer/analytics, відстеження на рівні провайдера/вузла, A/B-тестування, дашборд"
author: aymericzip
---

# Документація Intlayer Analytics

`@intlayer/analytics` — це додатковий пакет, який показує, **який контент насправді бачать** ваші відвідувачі (яку сторінку, в якій локалі та який саме фрагмент перекладеного контенту), щоб ви могли розуміти свою аудиторію та **проводити A/B-тестування контенту**.

## Зміст

<TOC/>

---

## Що відстежується

`@intlayer/analytics` об'єднує в пакети (batch) три типи анонімних подій:

| Подія              | Де фіксується                             | Про що вона говорить                                                                                                                            |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | На рівні провайдера (`IntlayerProvider`)  | Яку сторінку та локаль переглянув користувач (сесія) під час першого завантаження, зміни маршруту або зміни локалі.                             |
| `content_exposure` | На рівні вузла (`useIntlayer` / плагіни)  | Який ключ словника / шлях до ключа було фактично вирішено (resolved) та показано — і, якщо це частина експерименту, який **варіант** (variant). |
| `conversion`       | Скрізь, де викликається `useConversion()` | Досягнення мети (реєстрація, клік, покупка...), пов'язане з A/B-варіантом, який бачив користувач у цій сесії.                                   |

Події збираються в пам'яті та надсилаються як **один пакетний запит приблизно кожні 20 секунд** — а не при кожному натисканні клавіші або рендерингу — тому аналітика ніколи не впливає на час першого рендерингу і не додає запити на кожну взаємодію.

## Як це працює для A/B-тестування контенту

Intlayer вже дозволяє вам оголошувати [Варіанти (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) контенту (наприклад, словник `hero-banner` з варіантами `control` та `black_friday`). `@intlayer/analytics` замикає цикл:

1. `getVariant(experimentKey, variants)` детерміновано призначає кожну анонімну сесію варіанту — це чиста функція від ID сесії та ключа експерименту, тому призначення є **стабільним протягом усієї сесії** і не вимагає **запитів до сервера (server round-trips)** до першого рендерингу (без мерехтіння і зсувів макета).
2. Кожна подія `content_exposure` містить показаний `variant`.
3. `useConversion()` дозволяє пов'язати мету (наприклад, `"cta_click"`) з цим варіантом.
4. Ендпоінт результатів експериментів у дашборді порівнює коефіцієнти конверсії (conversion rates) за варіантами, включаючи статистичну значущість (z-тест).

## Встановлення

`@intlayer/analytics` — це **необов'язкова залежність** кожного пакета фреймворку (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), тож у більшості проєктів вона вже є. Встановіть її явно, якщо ваша конфігурація пропускає необов'язкові залежності (`npm install --no-optional`, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Щоб увімкнути аналітику, достатньо встановити пакет: `analytics.enabled` за замовчуванням дорівнює `true`, а `@intlayer/config` перетворює його на `false`, якщо пакет не знайдено у вашому проєкті. Якщо ви її не встановите, всі точки інтеграції будуть розв'язуватися у порожні операції (no-op) — див. [Нульові витрати, якщо не встановлено](#нульові-витрати-якщо-не-встановлено) нижче.

## Налаштування

Аналітиці не потрібна конфігурація, щоб почати працювати: вона **увімкнена за замовчуванням** і **повторно використовує наявний блок конфігурації `editor`** для ендпоінта та ключа проєкту.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Також використовується як кінцева точка для збору аналітики
    clientId: "your-client-id", // Також використовується як ключ проекту аналітики
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — базовий URL, на який надсилаються події аналітики (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — публічний ключ проекту, що присвоюється кожній прийнятій події. Він також діє як **перемикач увімкнення**: аналітика залишається повністю вимкненою (і видаляється при tree-shaking, див. нижче), доки не налаштовано `clientId`.

Якщо ви самостійно розміщуєте (self-host) Intlayer, аналітика автоматично вказує на ваш власний екземпляр, оскільки вона використовує спільний `editor.backendURL`.

### Як вимкнути

Необов'язковий блок `analytics` налаштовує — або повністю вимикає — збір даних:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // За замовчуванням: true — вилучає всю інтеграцію зі збірки
    flushInterval: 20_000, // Мілісекунди між двома пакетними відправленнями
    sampleRate: 1, // Частка записаних сесій, від 0 (жодної) до 1 (усі)
  },
};

export default config;
```

Видалення `@intlayer/analytics` має той самий ефект, що й `enabled: false`. Повний перелік полів дивіться в [довіднику з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Підтримка фреймворків

Аналітика вбудована у спільний `IntlayerProvider` з `react-intlayer`, тому вона доступна вже сьогодні скрізь, де використовується цей провайдер:

| Фреймворк                                                | Статус                                                                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Доступно                                                                                                |
| Next.js (`next-intlayer`)                                | ✅ Доступно (через `react-intlayer`)                                                                       |
| React Native / Expo (`react-native-intlayer`)            | ✅ Доступно (через `react-intlayer`)                                                                       |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Заплановано — той самий клієнт, прив'язки на рівні провайдера за зразком розгортання `@intlayer/editor` |

## Використання

### Автоматичне відстеження на рівні провайдера

Жодних змін у коді не потрібно. Як тільки встановлено `@intlayer/analytics` та налаштовано `editor.clientId`, `IntlayerProvider` автоматично:

- ініціалізує клієнт аналітики при монтуванні (mount),
- записує `page_view` при початковому завантаженні,
- записує `page_view` при кожній зміні локалі,
- запускає цикл очищення (flush) з інтервалом ~20 с і надсилає всі події, що залишилися, при розмонтуванні / закритті вкладки (через `navigator.sendBeacon`, з відкатом (fallback) на `fetch(..., { keepalive: true })`).

### Автоматичне відстеження на рівні вузла

Щоразу, коли `useIntlayer` розв'язує фрагмент контенту для відображення, інтерпретатор повідомляє про подію `content_exposure` для цього точного `dictionaryKey` + шляху до ключа + локалі — знову ж таки, жодних змін у коді не потрібно. Повторні покази одного й того ж вузла в межах вікна очищення (flush window) об'єднуються в одну подію з лічильником (`count`), тому список, що перемальовується (re-render) 50 разів, не надсилає 50 подій.

### Відстеження конверсій для A/B-тестування

Використовуйте `useConversion()`, щоб пов'язати мету з варіантом, який бачила сесія:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Почати
    </button>
  );
};
```

### Розв'язання варіанту на стороні клієнта

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Конфіденційність та продуктивність

- **Анонімність за дизайном**: сесії ідентифікуються за id, що обертається (rotating id); сервер (backend) коли-небудь зберігає лише **SHA-256 хеш** цього id — ніколи сам id і ніколи IP-адресу.
- **Приблизне місцезнаходження (Coarse location)**: лише код країни, отриманий із заголовків геолокації CDN (наприклад, `cf-ipcountry`, `x-vercel-ip-country`, ...) — IP не зчитується і не зберігається.
- **URL виключають параметри пошуку** за замовчуванням, тому рядки запиту (query strings) ніколи не фіксуються.
- **Семпліювання (Sampling)**: `sampleRate` дозволяє зберігати лише частину подій показу контенту в додатках з високим трафіком.
- **Пакетна передача (Batched)**: один запит приблизно кожні 20 секунд (`flushInterval`) або раніше, якщо буфер заповнений (`maxBufferSize`) — ніколи не надсилається один запит на кожну подію.

### Нульові витрати, якщо не встановлено

`@intlayer/analytics` дотримується того ж патерну опціональних залежностей, що й `@intlayer/editor`:

- кожна точка інтеграції завантажує пакет через **динамічний `import()`, обгорнутий у `try/catch`** — додаток, який ніколи не встановлює `@intlayer/analytics`, не збільшує розмір збірки (bundle size) і не витрачає ресурси під час виконання, а також ніколи не бачить помилок;
- змінна середовища часу компіляції (`INTLAYER_ANALYTICS_ENABLED`), яку `@intlayer/config` автоматично встановлює у `'false'`, коли пакет не встановлено, `analytics.enabled` дорівнює `false` або не налаштовано `editor.clientId`, дозволяє бандлерам **вилучити всю інтеграцію як мертвий код (dead-code-eliminate)**;
- аналітика вимкнена всередині iframe попереднього перегляду редактора/CMS Intlayer, тому сесії в редакторі ніколи не враховуються як реальний трафік.

## Дашборд: Сторінка Analytics

Як тільки ваш проект збере події, сторінка **Analytics** у [дашборді Intlayer](https://app.intlayer.org/analytics) (видна в бічній панелі після вибору проекту) покаже:

- **Активні користувачі** — унікальні відвідувачі за вибране ковзне вікно (7 / 30 / 90 днів).
- **Користувачі сьогодні** та **користувачі за останні 7 днів**.
- **Перегляди сторінок (Page views)** за вибране вікно.
- **Графік динаміки** унікальних відвідувачів по днях.
- Вкладки з розбивкою по **Локалях (Locales)** та **Місцезнаходженню (Location)**, що ранжують вашу аудиторію за локаллю та країною.

## Довідник API бекенда (Backend API reference)

Всі ендпоінти для читання вимагають автентифікації; прийом даних публічний і асоціюється за `clientId` у тілі запиту.

| Метод  | Ендпоінт                                    | Опис                                                                                |
| ------ | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Прийом пакету подій (публічний, асоціюється за `clientId` в тілі).                  |
| `GET`  | `/api/analytics/overview`                   | Загальні показники сторінок/локалей для автентифікованого проекту.                  |
| `GET`  | `/api/analytics/audience?days=30`           | Унікальні відвідувачі, перегляди сторінок, серії по днях, розбивка (локаль+країна). |
| `GET`  | `/api/analytics/content-stats`              | Загальні покази контенту, згруповані за ключем словника / шляхом / локаллю.         |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Коефіцієнти конверсії за варіантами та статистична значущість для A/B-тесту.        |

Ви також можете викликати їх програмно за допомогою [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Корисні посилання

- [Динамічні словники - Колекції та варіанти](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [Візуальний редактор Intlayer (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [Довідник з конфігурації (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [Посібник із самостійного хостингу (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)
