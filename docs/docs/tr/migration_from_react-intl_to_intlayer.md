---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "react-intl'den (FormatJS) Intlayer'a geçiş"
description: "Bir React uygulamasını adım adım react-intl'den Intlayer'a taşıyın. useIntl, FormattedMessage ve tüm Formatted* bileşenleri @intlayer/react-intl compat adapter'ı ile çalışmaya devam eder."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# react-intl'den (FormatJS) Intlayer'a geçiş

## Neden react-intl'den Intlayer'a geçmeli?

<AccordionGroup>
<Accordion header="Bundle boyutu">

react-intl ile locale'in tüm mesajları `IntlProvider`'a verilir, bu yüzden her sayfa tüm kataloğu taşır. Intlayer yalnızca her sayfanın kullandığı sözlükleri gönderir; bu da **bundle ve sayfa boyutlarınızı %50'ye kadar azaltır**.

</Accordion>
<Accordion header="Sürdürülebilirlik">

Mesaj id'leri sözlüklerinize göre **tiplidir**: geçersiz id'ler build sırasında hata verir. İçerik, onu kullanan bileşenlerin yanında durabilir.

</Accordion>
<Accordion header="Yapay zeka ajanı">

Bileşenlerin yanındaki içerik, LLM'ler için **gereken bağlamı azaltır**. Intlayer eksik çevirileri test etmek için bir **CLI**, bir **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, bir **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** sunar.

</Accordion>
<Accordion header="Otomasyon">

Eksik mesajları CI/CD pipeline'ınızda seçtiğiniz LLM ile ya da arka planda [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ile çevirin.

</Accordion>
<Accordion header="Geliştirici olmayanlarla ölçeklenme">

Intlayer, çevirmenlerin ve metin yazarlarının içeriği gerçek zamanlı düzenleyebilmesi için self-hosted bir **[görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** sunar.

</Accordion>
</AccordionGroup>

> Bu kütüphanelerin nereden geldiğini anlamak için [JavaScript i18n tarihini](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) okuyun.

## Geçiş stratejileri

1. **Compat adapter (mevcut uygulamalar için önerilir)**: `@intlayer/react-intl` kurun. `react-intl` ile aynı API'yi (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) sunar ve mesajları Intlayer sözlüklerinden sağlar. ICU MessageFormat, çoğullar, select'ler ve rich text etiketleri eskisi gibi çalışır.
2. **Tam geçiş**: react-intl çağrılarını kademeli olarak `useIntlayer` ve bileşenlerinizin yanındaki `.content.ts` dosyalarıyla değiştirin.

## İçindekiler

<TOC/>

## Hızlı geçiş

<Steps>
<Step number={1} title="Bağımlılıkları kurun">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` flag'i isteğe bağlıdır. Bir yapay zeka ajanıysanız `intlayer-cli init` kullanın.

Komut ortamınızı algılar ve gerekli package'ları kurar, örneğin:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> `react-intl` kurulu kalsın: TypeScript tiplerini sağlar.

</Step>
<Step number={2} title="Intlayer'ı yapılandırın">

`syncJSON` plugin'ini mevcut mesaj dosyalarınıza yönlendirin. react-intl katalogları, noktalı id'lerden oluşan düz map'lerdir:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Her id'nin ilk segmenti (`home`) bir Intlayer sözlüğü olur, böylece her sayfa yalnızca kullandığı sözlükleri yükler. Intlayer çevirileri geri yazdığında dosya düz yapısını korur.

</Step>
<Step number={3} title="Vite plugin'ini ekleyin">

`reactIntlVitePlugin()` Intlayer build'ini çalıştırır ve `react-intl` için `@intlayer/react-intl`'e alias oluşturur; kaynak dosyalarınızda değişiklik gerekmez.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Başka bir bundler mı kullanıyorsunuz? Import'ları `@intlayer/react-intl` olarak yeniden adlandırın (5. adıma bakın) ve bundler'ınız için Intlayer plugin'ini kullanın, örneğin Next.js için `next-intlayer` içindeki `withIntlayer`.

</Step>
<Step number={4} title="IntlProvider'a mesaj vermeyi bırakın">

`IntlProvider` çalışmaya devam eder, ancak mesajlar artık Intlayer tarafından yüklenir. `messages` prop'unu ve katalog import'unu kaldırın:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> `messages` hâlâ verilirse yok sayılır ve geliştirme ortamında bir uyarı gösterilir.

</Step>
</Steps>

Bileşenleriniz tipli id'lerle, değişmeden çalışmaya devam eder:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Tam geçiş

<Steps>
<Step number={5} title="Import'ları açıkça yeniden adlandırma (isteğe bağlı)" isOptional={true}>

Vite plugin'i alias'ları zaten yönetir. Bağımlılığı açık hale getirmek için:

| Önce                                            | Sonra                                                     |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="İçeriği .content.ts dosyalarına taşıyın" isOptional={true}>

Yeni bileşenler, mevcut react-intl çağrılarının yanında yerel Intlayer içeriğini kullanabilir:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="Yapay zeka destekli çeviriyi etkinleştirin" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Doldurulan çeviriler JSON dosyalarınıza geri yazılır. Yapay zeka yapılandırması için [CLI dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) bakın.

</Step>
</Steps>

## Geçişten sonra silebilecekleriniz

| Dosya / kalıp                          | Neden artık gerekli değil                                                   |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `messages` prop'u ve katalog yükleme   | Sözlükler Intlayer tarafından derlenir ve yüklenir.                         |
| `formatjs compile` adımı               | Intlayer ICU mesajlarını doğrudan JSON dosyalarından ayrıştırır.            |
| `babel-plugin-formatjs` ile id üretimi | Her id'nin bir sözlüğe karşılık gelmesi için açık, noktalı id'ler kullanın. |

## TypeScript'i yapılandırın

Üretilen tipleri `tsconfig.json` dosyanıza ekleyin:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git yapılandırması

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md)
- [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)
- [Vite ve React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- [react-i18next'ten geçiş](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_react-i18next_to_intlayer.md)
- [Intlayer görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
