---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Storybook ile Intlayer Nasıl Kurulur
description: Intlayer ve Storybook kullanarak tasarım sisteminizi nasıl çok dilli hale getireceğinizi öğrenin — içerik bildirimlerini derleyin, bir yerel ayar değiştirici ekleyin ve bileşenlerinizi herhangi bir dilde önizleyin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Storybook ile Intlayer

## İçindekiler

<TOC/>

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir. **Bileşen düzeyinde** çalışır — her bileşen kendi içerik bildirimlerine sahiptir — böylece çeviriler, onları kullanan kodla aynı yerde tutulur.

Intlayer ile şunları yapabilirsiniz:

- **Çevirileri bildirimsel olarak yönetin** bileşen başına içerik dosyalarıyla.
- **Tam TypeScript desteği alın** otomatik olarak oluşturulan türler ve IDE otomatik tamamlama aracılığıyla.
- **Çalışma zamanında dilleri değiştirin** sayfa yenilemesi olmadan.
- **Otomatik olarak çevirin** yerleşik AI sağlayıcı entegrasyonları ile.

---

## Neden Storybook ile Intlayer Kullanmalısınız?

Storybook, UI bileşenlerini izole bir şekilde geliştirmek ve belgelemek için endüstri standardı bir araçtır. Intlayer ile birleştirmek şunları yapmanızı sağlar:

- **Her dili önizleyin** doğrudan Storybook tuvali içinde bir araç çubuğu değiştiricisi kullanarak.
- **Eksik çevirileri yakalayın** üretime ulaşmadan önce.
- **Çok dilli bileşenleri belgeleyin** sabit kodlanmış dizeler yerine gerçek, tür açısından güvenli (type-safe) içeriklerle.

---

## Adım Adım Kurulum

<Tabs>
<Tab value="Vite Setup">

### Adım 1: Bağımlılıkları Yükleyin

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Paket            | Rol                                                          |
| ---------------- | ------------------------------------------------------------ |
| `intlayer`       | Çekirdek — yapılandırma, içerik derleme, CLI                 |
| `react-intlayer` | React bağlamaları — `IntlayerProvider`, `useIntlayer` hook   |
| `vite-intlayer`  | Vite eklentisi — içerik bildirim dosyalarını izler ve derler |

---

### Adım 2: Bir Intlayer Yapılandırması Oluşturun

Projenizin kök dizinine (veya tasarım sistemi paketinizin içine) `intlayer.config.ts` dosyasını oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // gerektiğinde daha fazla dil ekleyin
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // *.content.ts dosyalarınızın bulunduğu yer
  },
};

export default config;
```

> Seçeneklerin tam listesi için [yapılandırma referansına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

---

### Adım 3: Storybook'a Vite Eklentisini Ekleyin

Storybook'un `viteFinal` kancası, dahili Vite yapılandırmasını genişletmenize olanak tanır. Oraya `intlayer()` eklentisini içe aktarın ve ekleyin:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …diğer eklentiler
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

`intlayer()` eklentisi `*.content.ts` dosyalarınızı izler ve Storybook geliştirme sırasında herhangi bir değişiklik olduğunda sözlükleri otomatik olarak yeniden oluşturur.

---

### Adım 4: `IntlayerProvider` Dekoratörünü ve Bir Yerel Araç Çubuğunu Ekleyin

Storybook'un `preview` dosyası, her hikayeyi `IntlayerProvider` ile sarmalamak ve araç çubuğunda bir dil değiştirici göstermek için doğru yerdir:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Her hikayeyi IntlayerProvider içinde sarmalayın
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Storybook araç çubuğunda bir dil değiştirici gösterin
  globalTypes: {
    locale: {
      description: "Aktif dil",
      defaultValue: "en",
      toolbar: {
        title: "Dil",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> `locale` değerleri, `intlayer.config.ts` dosyanızda bildirilen dillerle eşleşmelidir.

</Tab>
<Tab value="Webpack Setup">

### Adım 1: Bağımlılıkları Yükleyin

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### Adım 2: Bir Intlayer Yapılandırması Oluşturun

Projenizin kök dizinine `intlayer.config.ts` dosyasını oluşturun:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### Adım 3: Storybook'un Webpack'ini Yapılandırın

Webpack tabanlı Storybook kurulumları için (örneğin `@storybook/react-webpack5`), Intlayer takma adlarını ve yükleyiciyi eklemek için `webpackFinal` aracılığıyla webpack yapılandırmasını genişletin:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### Adım 4: `IntlayerProvider` Dekoratörünü ve Bir Yerel Araç Çubuğunu Ekleyin

Vite kurulumuyla aynıdır — dekoratörü ve genel dil türünü `.storybook/preview.tsx` dosyasına ekleyin:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Aktif dil",
      defaultValue: "en",
      toolbar: {
        title: "Dil",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## İçerik Bildirme

Her bileşenin yanına bir `*.content.ts` dosyası oluşturun. Intlayer derleme sırasında bunu otomatik olarak algılar.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> Daha fazla içerik bildirimi formatı ve özelliği için [içerik bildirimi dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

---

## Bir Bileşende `useIntlayer` Kullanımı

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Kopyala
    </button>
  );
};
```

`useIntlayer`, en yakın `IntlayerProvider` tarafından sağlanan geçerli dil için derlenmiş sözlüğü döndürür. Storybook araç çubuğunda dili değiştirmek, hikayeyi güncellenmiş çevirilerle otomatik olarak yeniden oluşturur.

---

## Uluslararasılaştırılmış Bileşenler İçin Hikayeler Yazma

`IntlayerProvider` dekoratörü devredeyken, hikayeleriniz daha önce olduğu gibi çalışır. Dil araç çubuğu tüm tuval için aktif dili kontrol eder:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Varsayılan hikaye — çevirileri önizlemek için araç çubuğunda dili değiştirin. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Butonu bir kod bloğu içinde oluşturur; yaygın bir gerçek dünya kullanım durumu. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Her hikaye araç çubuğundan `locale` küreselini devralır, böylece herhangi bir hikaye kodunu değiştirmeden her dili doğrulayabilirsiniz.

---

## Hikayelerde Çevirileri Test Etme

Belirli bir dil için doğru çevrilmiş metnin oluşturulduğunu iddia etmek için Storybook'un `play` işlevlerini kullanın:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Butonun boş olmayan erişilebilir bir adı olduğunu doğrulayın
    await expect(button).toHaveAccessibleName();
    // Butonun devre dışı olmadığını doğrulayın
    await expect(button).not.toBeDisabled();
    // Klavye erişilebilirliğini doğrulayın
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Ek Kaynaklar

- [Intlayer yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [İçerik bildirimi dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)
- [Intlayer CLI dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
- [Storybook dokümantasyonu](https://storybook.js.org/docs)
