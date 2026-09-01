---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Отслеживание показов контента и проведение A/B-тестирования
description: Узнайте, как @intlayer/analytics отслеживает просмотры страниц/локалей и показы контента, а также как использовать это для проведения A/B-тестирования вашего контента Intlayer.
keywords:
  - Analytics
  - A/B-тестирование
  - Аудитория
  - Интернационализация
  - Документация
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
    changes: "Аналитика включена по умолчанию, если установлен `@intlayer/analytics`"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — пакет @intlayer/analytics, отслеживание на уровне провайдера/узла, A/B-тестирование, дашборд"
author: aymericzip
---

# Документация Intlayer Analytics

`@intlayer/analytics` — это дополнительный пакет, который показывает, **какой контент на самом деле видят** ваши посетители (какая страница, в какой локали и какой именно фрагмент переведенного контента), чтобы вы могли лучше понимать свою аудиторию и **проводить A/B-тестирование контента**.

## Содержание

<TOC/>

---

## Что отслеживается

`@intlayer/analytics` объединяет в пакеты три типа анонимных событий:

| Событие            | Где фиксируется                           | О чем оно говорит                                                                                                          |
| ------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | На уровне провайдера (`IntlayerProvider`) | Какую страницу и локаль просмотрел пользователь при начальной загрузке, смене маршрута или смене локали.                   |
| `content_exposure` | На уровне узла (`useIntlayer` / плагины)  | Какой ключ словаря / путь к ключу был фактически разрешен и отображен — и, если это часть эксперимента, какой **вариант**. |
| `conversion`       | Везде, где вызывается `useConversion()`   | Достижение цели (регистрация, клик, покупка...), связанное с A/B-вариантом, который видел пользователь в этой сессии.      |

События собираются в памяти и отправляются как **один пакетный запрос примерно каждые 20 секунд** — а не при каждом нажатии клавиши или рендеринге — поэтому аналитика никогда не влияет на время первого рендеринга и не добавляет запросы на каждое взаимодействие.

## Как это работает для A/B-тестирования контента

Intlayer уже позволяет вам объявлять [Варианты](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) контента (например, словарь `hero-banner` с вариантами `control` и `black_friday`). `@intlayer/analytics` замыкает цикл:

1. `getVariant(experimentKey, variants)` детерминированно назначает каждую анонимную сессию варианту — это чистая функция от ID сессии и ключа эксперимента, поэтому назначение **стабильно на протяжении всей сессии** и не требует **серверных запросов** до первого рендеринга (без мерцания и сдвигов макета).
2. Каждое событие `content_exposure` содержит показанный `variant`.
3. `useConversion()` позволяет связать цель (например, `"cta_click"`) с этим вариантом.
4. Эндпоинт результатов экспериментов в дашборде сравнивает коэффициенты конверсии по вариантам, включая статистическую значимость (z-тест).

## Установка

`@intlayer/analytics` — **опциональная зависимость** каждого пакета фреймворка (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), поэтому в большинстве проектов он уже установлен. Установите его явно, если ваша конфигурация пропускает опциональные зависимости (`npm install --no-optional`, …):

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

Чтобы включить аналитику, достаточно установить пакет: значение `analytics.enabled` по умолчанию равно `true`, а `@intlayer/config` приводит его к `false`, если пакет не найден в вашем проекте. Если вы её не установите, все точки интеграции будут разрешаться в пустые операции (no-op) — см. [Нулевые затраты, если не установлено](#нулевые-затраты-если-не-установлено) ниже.

## Настройка

Аналитике не нужна настройка, чтобы начать работу: она **включена по умолчанию** и **переиспользует существующий блок конфигурации `editor`** для эндпоинта и ключа проекта.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Также используется как конечная точка для сбора аналитики
    clientId: "your-client-id", // Также используется как ключ проекта аналитики
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — базовый URL, на который отправляются события аналитики (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — открытый ключ проекта, присваиваемый каждому принятому событию. Он также действует как **переключатель включения**: аналитика остается полностью отключенной (и удаляется при tree-shaking, см. ниже), пока не настроен `clientId`.

Если вы самостоятельно размещаете (self-host) Intlayer, аналитика автоматически указывает на ваш собственный экземпляр, поскольку она использует общий `editor.backendURL`.

### Вызов API из браузера

Тот же токен обеспечивает работу небольшого клиента без учетных данных, поэтому статический сайт или SPA может читать контент своей CMS во время выполнения без сервера, без серверного действия и без какого-либо секрета в бандле:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Он аутентифицируется на основе `editor.clientId`: обмен, кеширование и обновление токена обрабатываются внутренне. Область действия (scopes) ограничивает то, к чему у него есть доступ: опубликованный контент словарей и прием событий аналитики. Все остальное (публикация словарей, чтение проекта, расходование AI-кредитов) требует настоящих учетных данных, а значит, сервера или авторизованного пользователя.

### Как отключить

Необязательный блок `analytics` настраивает — или полностью отключает — сбор данных:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // По умолчанию: true — исключает всю интеграцию из сборки
    flushInterval: 20_000, // Миллисекунды между двумя пакетными отправками
    sampleRate: 1, // Доля записываемых сессий, от 0 (ни одной) до 1 (все)
  },
};

export default config;
```

Удаление `@intlayer/analytics` даёт тот же эффект, что и `enabled: false`. Полный список полей см. в [справочнике по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование

### Автоматическое отслеживание на уровне провайдера

Никаких изменений в коде не требуется. Как только установлен `@intlayer/analytics` и настроен `editor.clientId`, `IntlayerProvider` автоматически:

- инициализирует клиент аналитики при монтировании,
- записывает `page_view` при начальной загрузке,
- записывает `page_view` при каждой смене локали,
- запускает цикл очистки (flush) с интервалом около 20 с и отправляет оставшиеся события при размонтировании / закрытии вкладки (через `navigator.sendBeacon`, с откатом на `fetch(..., { keepalive: true })`).

Точка входа отличается для каждого фреймворка, но в любом случае это то же самое место, где вы уже настраиваете Intlayer, поэтому добавлять ничего не нужно:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` монтирует провайдер аналитики внутренне.

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

    `next-intlayer` реэкспортирует `IntlayerProvider` из React, поэтому аналитика подключается так же.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    Плагин `intlayer` регистрирует хуки аналитики в жизненном цикле корневого компонента.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > В случае с Nuxt пакет `nuxt-intlayer` устанавливает плагин за вас: делать ничего не нужно.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` запускает аналитику из компонента, который настраивает Intlayer.

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

    `IntlayerProvider` монтирует провайдер аналитики внутренне.

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

    `IntlayerProvider` монтирует провайдер аналитики отложенно (lazy), поэтому этот чанк не попадает в критический путь загрузки.

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

    `provideIntlayer()` уже включает в себя `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Используйте `provideIntlayerAnalytics()` отдельно только если вы управляете провайдерами по отдельности.

  </Tab>
</Tabs>

### Автоматическое отслеживание на уровне узла

Каждый раз, когда `useIntlayer` разрешает фрагмент контента для отображения, интерпретатор сообщает о событии `content_exposure` для этого точного `dictionaryKey` + пути к ключу + локали — опять же, никаких изменений в коде не требуется. Повторяющиеся показы одного и того же узла в пределах окна очистки объединяются в одно событие со счетчиком (`count`), поэтому список, перерисовывающийся 50 раз, не отправляет 50 событий.

### Отслеживание конверсий для A/B-тестирования

Используйте `useConversion()`, чтобы связать цель с вариантом, который видела сессия:

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
          Начать
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
          Начать
        </button>
      );
    };
    ```

    > `useConversion` — это клиентский хук: пометьте компонент как `"use client"`.

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
        Начать
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
      Начать
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
          Начать
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
          Начать
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
      template: `<button (click)="onClick()">Начать</button>`,
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

### Разрешение варианта на стороне клиента

`useExperiment()` назначает сессии вариант и записывает показ, который становится знаменателем коэффициента конверсии. Отображайте поддерево, зависящее от варианта, только при `isAssigned`, чтобы ни один посетитель не увидел мелькание контрольного варианта до того, как назначение будет разрешено:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` — это обычная строка.

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

    `variant` — это обычная строка. Назначение происходит в браузере, поэтому компонент должен быть клиентским.

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

    `variant` и `isAssigned` — это `Ref`.

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

    `variant` и `isAssigned` — это сторы (stores): читайте их с префиксом `$`.

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

    `variant` — это обычная строка.

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

    `variant` и `isAssigned` — это `Accessor`: вызывайте их, чтобы прочитать значение.

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

    `variant` и `isAssigned` — это `Signal`: вызывайте их, чтобы прочитать значение.

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

Weights необязательны — передайте один на вариант, чтобы изменить распределение, например `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

Затем дочерний компонент читает [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md) словаря, который совпадает:

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

> Чтение варианта в **дочернем** компоненте — это то, что делает это работающим вне React: в Vue, Svelte, Solid и Angular селектор, передаваемый в `useIntlayer`, захватывается при инициализации компонента, поэтому чтение должно происходить в компоненте, который монтируется только после того, как вариант известен.

Если эксперимент охватывает целую страницу, а не отдельный словарь, поместите вариант на provider вместо этого — см. [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md#ambient-variant). Каждый `useIntlayer` ниже затем разрешается против него без изменения места вызова.

Если вам нужно получить необработанное значение переменной за пределами компонента, обратитесь непосредственно к клиенту:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` только присваивает — он не записывает экспозицию. Предпочитайте `useExperiment()`, иначе коэффициент конверсии не будет иметь знаменателя.

## Конфиденциальность и производительность

- **Анонимность по дизайну**: сессии идентифицируются по ротируемому id; сервер когда-либо сохраняет только **SHA-256 хэш** этого id — никогда сам id и никогда IP-адрес.
- **Приблизительное местоположение**: только код страны, полученный из заголовков геолокации CDN (`cf-ipcountry`, `x-vercel-ip-country`, ...) — IP не считывается и не сохраняется.
- **URL исключают параметры поиска** по умолчанию, поэтому строки запроса никогда не фиксируются.
- **Семплирование**: `sampleRate` позволяет сохранять только часть событий показа контента в приложениях с высоким трафиком.
- **Пакетная передача**: один запрос примерно каждые 20 секунд (`flushInterval`) или раньше, если буфер заполнен (`maxBufferSize`) — никогда не отправляется один запрос на каждое событие.

### Нулевые затраты, если не установлено

`@intlayer/analytics` следует тому же паттерну опциональных зависимостей, что и `@intlayer/editor`:

- каждая точка интеграции загружает пакет через **динамический `import()`, обернутый в `try/catch`** — приложение, которое никогда не устанавливает `@intlayer/analytics`, не увеличивает размер сборки (bundle) и не тратит ресурсы во время выполнения, а также никогда не видит ошибок;
- переменная окружения времени компиляции (`INTLAYER_ANALYTICS_ENABLED`), автоматически устанавливаемая `@intlayer/config` в `'false'`, когда пакет не установлен, `analytics.enabled` равно `false` или не настроен `editor.clientId`, позволяет бандлерам **удалить всю интеграцию как мёртвый код (dead-code-eliminate)**;
- аналитика отключена внутри iframe предварительного просмотра редактора/CMS Intlayer, поэтому сессии в редакторе никогда не учитываются как реальный трафик.

## Дашборд: Страница Analytics

Как только ваш проект соберет события, страница **Analytics** в [дашборде Intlayer](https://app.intlayer.org/analytics) (видна в боковой панели после выбора проекта) покажет:

- **Активные пользователи** — уникальные посетители за выбранное скользящее окно (7 / 30 / 90 дней).
- **Пользователи сегодня** и **пользователи за последние 7 дней**.
- **Просмотры страниц** за выбранное окно.
- **График динамики** уникальных посетителей по дням.
- Вкладки с разбивкой по **Локалям** и **Местоположению**, ранжирующие вашу аудиторию по локали и по стране.

## Справочник API бэкенда

Все эндпоинты для чтения требуют аутентификации; прием данных публичный и ассоциируется по `clientId` в теле запроса.

| Метод  | Эндпоинт                                    | Описание                                                                             |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `POST` | `/api/analytics/events`                     | Прием пакета событий (публичный, ассоциируется по `clientId` в теле).                |
| `GET`  | `/api/analytics/overview`                   | Общие показатели страниц/локалей для аутентифицированного проекта.                   |
| `GET`  | `/api/analytics/audience?days=30`           | Уникальные посетители, просмотры страниц, серии по дням, разбивка (локаль + страна). |
| `GET`  | `/api/analytics/content-stats`              | Общие показатели показов контента, сгруппированные по ключу словаря / пути / локали. |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Коэффициенты конверсии по вариантам и статистическая значимость для A/B-теста.       |

Вы также можете вызывать их программно с помощью [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **Только на стороне сервера.** `createIntlayerCMS()` аутентифицируется с помощью `clientId` + `clientSecret`, и секрет никогда не доступен в браузере: этот фрагмент кода выполнял бы неаутентифицированные запросы, если бы он там работал. Держите его в обработчике маршрута, серверном действии или скрипте.

## Полезные ссылки

- [Динамические словари - Коллекции и варианты](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)
- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
- [Справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [Руководство по самостоятельному хостингу (Self-Hosting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md)
