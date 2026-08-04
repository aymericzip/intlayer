---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Варіанти
description: Використовуйте поле метаданих variant у файлах контенту Intlayer, щоб оголошувати іменовані або структуровані альтернативи контенту — A/B-тести, сезонні банери, тексти під feature-прапорцями, записи CMS, контент конкретного користувача — і перемикатися між ними під час виконання без змін коду.
keywords:
  - Варіанти
  - A/B-тестування
  - Feature-прапорці
  - Динамічний контент
  - Динамічні записи
  - CMS
  - Intlayer
  - Інтернаціоналізація
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Випуск функції варіантів"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` тепер приймає рядок або об'єкт — колишні `meta` / динамічні записи оголошуються як об'єктні варіанти"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Варіант оголошує лише ключі, які він перевизначає; неоголошені варіанти повертаються до запису за замовчуванням"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Провайдери приймають зовнішній проп `variant`; селектори приймають упорядкований ланцюжок переваг"
author: aymericzip
---

# Варіанти

**Варіант** — це набір файлів контенту, що мають спільний ключ словника (`key`), але кожен несе своє значення `variant`. Intlayer віддає відповідний файл на основі селектора, переданого до `useIntlayer`.

Значення `variant` може набувати **двох форм**:

- **Рядок** — одна іменована альтернатива (A/B-тести, сезонні банери, feature-прапорці).
- **Об'єкт** — структурований дискримінатор, адресований набором полів (записи CMS, контент конкретного користувача, будь-який контент із непрозорим ID як ключем). Ідентичністю є весь об'єкт: селектор має надати **рівний** об'єкт, щоб розв'язати запис.

> Об'єктна форма замінює колишнє поле `meta`. Усюди, де раніше ви писали `meta: { id, … }`, пишіть `variant: { id, … }` і вибирайте її через `{ variant: { id, … } }`.

## Іменовані (рядкові) варіанти

Кожен файл представляє одну іменовану альтернативу. Пропуск `variant` (або значення `"default"`) позначає його як запасний.

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({ en: "Get started", fr: "Commencer" }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off — today only",
      fr: "−50 % — aujourd'hui seulement",
    }),
    cta: t({ en: "Shop now", fr: "Acheter maintenant" }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Часткові варіанти

Варіант **оголошує лише ключі, які він перевизначає**; решта успадковується з запису за замовчуванням.

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` успадковано

useIntlayer("hero-banner", { variant: "never-declared" });
// → запис за замовчуванням
```

Тому ви додаєте файл варіанту лише там, де текст дійсно відрізняється. Ключ дозволяється в `null` тільки в тому випадку, якщо він оголошує варіанти, але не має запису за замовчуванням.

### Використання іменованих варіантів

#### Варіант за замовчуванням

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → варіант за замовчуванням

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → варіант за замовчуванням

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → варіант за замовчуванням

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → варіант за замовчуванням

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### Іменований варіант

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Іменований варіант із явною локаллю

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Об'єктні (структуровані) варіанти

Об'єктний варіант адресує контент довільним набором пар ключ-значення, оголошених у полі `variant`, — що дозволяє моделювати записи CMS, контент конкретного користувача або будь-який контент із непрозорим ID як ключем. Ідентичністю є **весь об'єкт**: селектор має надати рівний об'єкт, щоб запис було розв'язано.

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Використання об'єктних варіантів

Передайте відповідний об'єкт у `variant`. Кожне поле, оголошене у словнику, має бути надане й рівне; інакше результат — `null`. Порядок полів не має значення.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### З явною локаллю

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Відсутнє поле — немає збігу

```ts
// Повертає null: відсутній `userId`, тож об'єкт не збігається з оголошеним варіантом
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Зовнішній варіант

Деякі виміри варіанта незмінні протягом усієї сесії — орендар, тип навчального закладу, тарифний рівень. Вони визначаються один раз, і жоден компонент не має передавати їх вручну.

> Не загортайте `useIntlayer` у власний хук, щоб їх підставити. Оптимізація під час збірки переписує лише літеральний виклик `useIntlayer("key")`, імпортований з пакета фреймворку, тож ніщо за обгорткою не потрапить до бандла.

Натомість оголосіть варіант один раз на провайдері, так само як `locale`:

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerServerProvider } from "next-intlayer/server";
    import { IntlayerClientProvider } from "next-intlayer";

    export default async function Layout({ children, params }) {
      const { locale } = await params;
      const schoolType = await getSchoolType();

      return (
        <IntlayerServerProvider locale={locale} variant={schoolType}>
          <IntlayerClientProvider locale={locale} variant={schoolType}>
            {children}
          </IntlayerClientProvider>
        </IntlayerServerProvider>
      );
    }
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

Тепер кожне читання словника під провайдером розв'язується з цим варіантом, а селектор у місці виклику завжди перемагає:

```tsx
useIntlayer("hero-banner");
// → варіант провайдера

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — замінює варіант провайдера, а не доповнює його
```

### Форми

Проп `variant` приймає три форми:

| Форма                                                     | Значення                                |
| --------------------------------------------------------- | --------------------------------------- |
| `variant="school1"`                                       | один іменований варіант для всіх ключів |
| `variant={["school1", "default"]}`                        | упорядкований ланцюжок переваг          |
| `variant={{ "hero-banner": "school1", default: "base" }}` | свій варіант для кожного ключа словника |

#### Ланцюжок переваг

Ланцюжок перебирається зліва направо за записами, які оголошує кожен ключ, і перемагає перший оголошений. Якщо не оголошено жодного, використовується неявний запис за замовчуванням — так само, як для одиничного значення.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` не оголошує запис `school1`, але оголошує `school2` → "school2"
// ключ, що не оголошує жодного з них → запис за замовчуванням
```

Отже, `["black_friday", "summer"]` читається як «black friday, якщо цей ключ його має, інакше summer, інакше за замовчуванням». Ланцюжки також приймаються в місці виклику:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Зверніть увагу: це дзеркальне відображення масиву, який приймає **поле** `variant` файлу контенту: там масив _оголошує_ по одному запису на елемент, тут він _споживає_ їх у порядку пріоритету.

#### Відображення за ключами

Звертайтеся до кожного ключа словника окремо. Зарезервований запис `default` покриває всі неперелічені ключі:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> На провайдері звичайний об'єкт **завжди** читається як відображення за ключами, а не як об'єктний варіант — вони структурно ідентичні. Щоб задати об'єктний варіант глобально, вкладіть його в запис: `variant={{ default: { id: "prod_abc" } }}`.

Оскільки ключі відображення звіряються з оголошеними ключами словників, друкарська помилка — або об'єктний варіант, записаний напряму, як-от `variant={{ id: "prod_abc" }}` — призводить до помилки компіляції.

## Режим завантаження

Об'єктні варіанти часто завантажуються ліниво. Задайте `importMode` у словнику, щоб керувати цим:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) для деталей про режими `static`, `dynamic` і `fetch`.

## Типові сценарії використання

- A/B-тести тексту, керовані ключем експерименту
- Сезонні або рекламні банери
- Повідомлення під feature-прапорцями
- Маркетингові кампанії для конкретної локалі
- Маркетинговий текст за товарами, керований у CMS
- Контент конкретного користувача або акаунта
- Будь-який контент, адресований непрозорим ID під час виконання
