---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Варианты
description: Используйте поле метаданных variant в файлах контента Intlayer, чтобы объявлять именованные или структурированные альтернативы контента — A/B-тесты, сезонные баннеры, тексты под feature-флагами, записи CMS, контент конкретного пользователя — и переключаться между ними во время выполнения без изменений кода.
keywords:
  - Варианты
  - A/B-тестирование
  - Feature-флаги
  - Динамический контент
  - Динамические записи
  - CMS
  - Intlayer
  - Интернационализация
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Выпуск функции вариантов"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` теперь принимает строку или объект — прежние `meta` / динамические записи объявляются как вариант объектов"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Вариант объявляет только ключи, которые он переопределяет; необъявленные варианты возвращаются к записи по умолчанию"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Провайдеры принимают внешний проп `variant`; селекторы принимают упорядоченную цепочку предпочтений"
author: aymericzip
---

# Варианты

**Вариант** — это набор файлов контента, которые имеют общий ключ словаря (`key`), но каждый несёт своё значение `variant`. Intlayer отдаёт нужный файл на основе селектора, переданного в `useIntlayer`.

Значение `variant` может принимать **две формы**:

- **Строка** — одна именованная альтернатива (A/B-тесты, сезонные баннеры, feature-флаги).
- **Объект** — структурированный дискриминатор, адресуемый набором полей (записи CMS, контент конкретного пользователя, любой контент с непрозрачным ID в качестве ключа). Идентичностью является весь объект: селектор должен предоставить **равный** объект, чтобы разрешить запись.

> Объектная форма заменяет прежнее поле `meta`. Везде, где раньше вы писали `meta: { id, … }`, пишите `variant: { id, … }` и выбирайте её через `{ variant: { id, … } }`.

## Именованные (строковые) варианты

Каждый файл представляет одну именованную альтернативу. Пропуск `variant` (или значение `"default"`) помечает его как запасной вариант.

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

### Частичные варианты

Вариант **объявляет только ключи, которые он переопределяет**; остальные наследуются из записи по умолчанию.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` унаследовано

useIntlayer("hero-banner", { variant: "never-declared" });
// → запись по умолчанию
```

Поэтому вы добавляете файл варианта только там, где текст действительно отличается. Ключ разрешается в `null` только в том случае, если он объявляет варианты, но не имеет записи по умолчанию.

### Использование именованных вариантов

#### Вариант по умолчанию

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → вариант по умолчанию

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
      // → вариант по умолчанию

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
      // → вариант по умолчанию

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
      // → вариант по умолчанию

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

#### Именованный вариант

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Именованный вариант с явной локалью

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Объектные (структурированные) варианты

Объектный вариант адресует контент произвольным набором пар ключ-значение, объявленных в поле `variant`, — что позволяет моделировать записи CMS, контент конкретного пользователя или любой контент с непрозрачным ID в качестве ключа. Идентичностью является **весь объект**: селектор должен предоставить равный объект, чтобы запись была разрешена.

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

### Использование объектных вариантов

Передайте соответствующий объект в `variant`. Каждое поле, объявленное в словаре, должно быть предоставлено и равно; иначе результат — `null`. Порядок полей не имеет значения.

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

#### С явной локалью

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Отсутствует поле — нет совпадения

```ts
// Возвращает null: отсутствует `userId`, поэтому объект не совпадает с объявленным вариантом
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Внешний вариант

Некоторые измерения варианта неизменны в течение всей сессии — арендатор, тип учебного заведения, тарифный план. Они вычисляются один раз, и ни один компонент не должен передавать их вручную.

> Не оборачивайте `useIntlayer` в собственный хук, чтобы их подставить. Оптимизация на этапе сборки переписывает только литеральный вызов `useIntlayer("key")`, импортированный из пакета фреймворка, поэтому ничто за обёрткой не попадёт в бандл.

Вместо этого объявите вариант один раз на провайдере, точно так же, как `locale`:

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

Теперь каждое чтение словаря под провайдером разрешается с этим вариантом, а селектор в месте вызова всегда побеждает:

```tsx
useIntlayer("hero-banner");
// → вариант провайдера

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — заменяет вариант провайдера, а не дополняет его
```

### Формы

Проп `variant` принимает три формы:

| Форма                                                     | Значение                                 |
| --------------------------------------------------------- | ---------------------------------------- |
| `variant="school1"`                                       | один именованный вариант для всех ключей |
| `variant={["school1", "default"]}`                        | упорядоченная цепочка предпочтений       |
| `variant={{ "hero-banner": "school1", default: "base" }}` | свой вариант для каждого ключа словаря   |

#### Цепочка предпочтений

Цепочка перебирается слева направо по записям, объявленным каждым ключом, и побеждает первая объявленная. Если не объявлена ни одна, используется неявная запись по умолчанию — точно так же, как для одиночного значения.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` не объявляет запись `school1`, но объявляет `school2` → "school2"
// ключ, не объявляющий ни одной из них → запись по умолчанию
```

Таким образом, `["black_friday", "summer"]` читается как «black friday, если у этого ключа он есть, иначе summer, иначе по умолчанию». Цепочки также принимаются в месте вызова:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Обратите внимание: это зеркальное отражение массива, принимаемого **полем** `variant` файла контента: там массив _объявляет_ по одной записи на элемент, здесь он _потребляет_ их в порядке приоритета.

#### Отображение по ключам

Обращайтесь к каждому ключу словаря отдельно. Зарезервированная запись `default` покрывает все не перечисленные ключи:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> На провайдере обычный объект **всегда** читается как отображение по ключам, но не как объектный вариант — они структурно идентичны. Чтобы задать объектный вариант глобально, вложите его в запись: `variant={{ default: { id: "prod_abc" } }}`.

Поскольку ключи отображения сверяются с объявленными ключами словарей, опечатка — или объектный вариант, записанный напрямую, например `variant={{ id: "prod_abc" }}` — приводит к ошибке компиляции.

## Режим загрузки

Объектные варианты часто загружаются лениво. Задайте `importMode` в словаре, чтобы управлять этим:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) для подробностей о режимах `static`, `dynamic` и `fetch`.

## Типичные сценарии использования

- A/B-тесты текста, управляемые ключом эксперимента
- Сезонные или рекламные баннеры
- Сообщения под feature-флагами
- Маркетинговые кампании для конкретной локали
- Маркетинговый текст по товарам, управляемый в CMS
- Контент конкретного пользователя или аккаунта
- Любой контент, адресуемый непрозрачным ID во время выполнения
