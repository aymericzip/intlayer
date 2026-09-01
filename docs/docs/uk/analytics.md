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

### Виклик API з браузера

Той самий токен підтримує невеликий клієнт без облікових даних, тож статичний сайт або SPA може читати вміст свого CMS під час виконання без сервера, без серверної дії (server action) і без жодного секрету в білді:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Він самостійно автентифікується на основі `editor.clientId`: обмін, кешування та оновлення токена обробляються внутрішньо. Області доступу (scopes) обмежують те, до чого він може дістатися: опублікований контент словників і збір аналітики. Усе інше (публікація словників, читання проєкту, витрачання кредитів ШІ) потребує справжніх облікових даних, а отже, сервера або авторизованого користувача.

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

## Використання

### Автоматичне відстеження на рівні провайдера

Жодних змін у коді не потрібно. Як тільки встановлено `@intlayer/analytics` та налаштовано `editor.clientId`, `IntlayerProvider` автоматично:

- ініціалізує клієнт аналітики при монтуванні (mount),
- записує `page_view` при початковому завантаженні,
- записує `page_view` при кожній зміні локалі,
- запускає цикл очищення (flush) з інтервалом ~20 с і надсилає всі події, що залишилися, при розмонтуванні / закритті вкладки (через `navigator.sendBeacon`, з відкатом (fallback) на `fetch(..., { keepalive: true })`).

Точка входу відрізняється залежно від фреймворку, але в кожному випадку це те саме місце, яке ви вже використовуєте для налаштування Intlayer, тож додавати нічого не потрібно:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` монтує провайдер аналітики внутрішньо.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` повторно експортує `IntlayerProvider` з React, тому аналітика підключається так само.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    Плагін `intlayer` реєструє хуки аналітики в життєвому циклі кореневого компонента.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > У випадку з Nuxt пакет `nuxt-intlayer` встановлює плагін за вас: робити нічого не потрібно.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` запускає аналітику з компонента, який налаштовує Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` монтує провайдер аналітики внутрішньо.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` монтує провайдер аналітики відкладено (lazy), тож цей чанк не потрапляє в критичний шлях завантаження.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` вже включає `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Використовуйте `provideIntlayerAnalytics()` окремо лише якщо ви керуєте провайдерами індивідуально.

  </Tab>
</Tabs>

### Автоматичне відстеження на рівні вузла

Щоразу, коли `useIntlayer` розв'язує фрагмент контенту для відображення, інтерпретатор повідомляє про подію `content_exposure` для цього точного `dictionaryKey` + шляху до ключа + локалі — знову ж таки, жодних змін у коді не потрібно. Повторні покази одного й того ж вузла в межах вікна очищення (flush window) об'єднуються в одну подію з лічильником (`count`), тому список, що перемальовується (re-render) 50 разів, не надсилає 50 подій.

### Відстеження конверсій для A/B-тестування

Використовуйте `useConversion()`, щоб пов'язати мету з варіантом, який бачила сесія:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

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

    > `useConversion` — це клієнтський хук: позначте компонент як `"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Почати
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Почати
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Почати</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Розв'язання варіанту на стороні клієнта

`useExperiment()` призначає сесії варіант і записує показ, який стає знаменником коефіцієнта конверсії. Показуйте піддерево, що залежить від варіанту, лише коли `isAssigned` дорівнює true, щоб жоден відвідувач не побачив короткий спалах контрольного варіанту до того, як призначення буде визначено:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` — це звичайний рядок.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` — це звичайний рядок. Призначення відбувається в браузері, тому компонент має бути клієнтським.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` та `isAssigned` — це `Ref`.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` та `isAssigned` — це стори (stores): читайте їх із префіксом `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` — це звичайний рядок.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` та `isAssigned` — це `Accessor`: викликайте їх, щоб прочитати значення.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` та `isAssigned` — це `Signal`: викликайте їх, щоб прочитати значення.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Ваги (weights) необов'язкові — передайте одну на варіант, щоб змістити розподіл, наприклад `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

Далі дочірній компонент читає [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/variants.md) словника, який відповідає:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Читання варіанту в **дочірньому** компоненті — це те, що робить це працездатним поза React: у Vue, Svelte, Solid та Angular селектор, переданий у `useIntlayer`, захоплюється під час налаштування компонента, тому читання має відбуватися в компоненті, який монтується лише тоді, коли варіант уже відомий.

Якщо експеримент охоплює цілу сторінку, а не окремий словник, підніміть варіант на провайдер замість цього — див. [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/variants.md#ambient-variant). Кожен `useIntlayer` нижче тоді розв'язується відносно нього без змін у місці виклику.

Якщо вам потрібне сире значення призначення поза компонентом, звертайтеся безпосередньо до клієнта:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` лише призначає — він не записує показ (exposure). Надавайте перевагу `useExperiment()`, інакше коефіцієнт конверсії не матиме знаменника.

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

> **Лише на боці сервера.** `createIntlayerCMS()` автентифікується за допомогою `clientId` + `clientSecret`, і секрет ніколи не доступний у браузері: цей фрагмент коду виконував би неавтентифіковані запити, якби він там працював. Тримайте його в обробнику маршруту, серверній дії або скрипті.

## Корисні посилання

- [Динамічні словники - Колекції та варіанти](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [Візуальний редактор Intlayer (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [Довідник з конфігурації (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [Посібник із самостійного хостингу (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)
