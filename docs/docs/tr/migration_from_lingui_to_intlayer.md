---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Lingui'den Intlayer'a geçiş"
description: "Bir React uygulamasını adım adım Lingui'den Intlayer'a taşıyın. Lingui makrolarınız, useLingui ve <Trans> çağrılarınız @intlayer/lingui compat adapter'ı ile çalışmaya devam eder."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Lingui'den Intlayer'a geçiş

## Neden Lingui'den Intlayer'a geçmeli?

<AccordionGroup>
<Accordion header="Bundle boyutu">

Lingui, her locale için uygulamanın tüm mesajlarını içeren derlenmiş bir katalog yükler. Intlayer içeriği sözlüklere böler ve yalnızca her sayfanın kullandığını gönderir; bu da **bundle ve sayfa boyutlarınızı %50'ye kadar azaltır**.

</Accordion>
<Accordion header="Sürdürülebilirlik">

Intlayer sözlükleri **tamamen tiplidir** ve onları kullanan bileşenlerin yanında durabilir. Hatırlanacak `extract` / `compile` adımı yoktur: sözlükler bundler plugin'i tarafından build edilir.

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

1. **Compat adapter (mevcut uygulamalar için önerilir)**: `@intlayer/lingui` kurun. `@lingui/core` ve `@lingui/react` ile aynı API'yi (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) sunar ve mesajları Intlayer sözlüklerinden sağlar. Makrolarınız (`` t`…` ``, `<Trans>`, `msg`, `plural`) tam olarak eskisi gibi derlenmeye devam eder.
2. **Tam geçiş**: Lingui çağrılarını kademeli olarak `useIntlayer` ve bileşenlerinizin yanındaki `.content.ts` dosyalarıyla değiştirin.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> `@lingui/core`, `@lingui/react` ve makro plugin'inizi (`@lingui/babel-plugin-lingui-macro` veya `@lingui/swc-plugin`) kurulu tutun. Makrolar çalışmaya devam eder ve Lingui package'ları TypeScript tiplerini sağlar.

</Step>
<Step number={2} title="Intlayer'ı yapılandırın">

Intlayer, Lingui kataloglarınızı tek doğruluk kaynağı olarak okur. Lingui'nin varsayılan yapısıyla (`src/locales/{locale}/messages.po`), `syncPO` plugin'ini bu dosyalara yönlendirin:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="JSON katalogları kullanma">

`@lingui/format-json` ile ICU formatında `syncJSON` kullanın:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Açık mesaj id'leri kullanın (`t({ id: "hero.title", message: "Welcome" })` veya `<Trans id="hero.title">`). Kaynak metinden üretilen id'ler kataloglarda çözümlenmez.

</Step>
<Step number={3} title="Lingui Vite plugin'ini değiştirin">

`@lingui/vite-plugin` yerine `@intlayer/lingui/plugin` kullanın. Binding `lingui()` olarak kalır: Intlayer build'ini çalıştırır ve `@lingui/core` ile `@lingui/react` için `@intlayer/lingui`'ye alias oluşturur; kaynak dosyalarınızda değişiklik gerekmez.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Makro plugin'ini React plugin'inde tutun (Babel veya `@lingui/swc-plugin`), böylece makrolar Intlayer tarafından çözümlenmeden önce `i18n._()` çağrılarına derlenir.

</Step>
</Steps>

Bileşenleriniz değişmeden çalışmaya devam eder:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Locale değiştirme hâlâ `i18n.activate(locale)` üzerinden yapılır ve her `useLingui()` tüketicisini günceller.

## Tam geçiş

<Steps>
<Step number={4} title="Çalışma zamanında katalog yüklemeyi kaldırın" isOptional={true}>

Mesajlar artık build sırasında derlenen Intlayer sözlüklerinden gelir. `i18n.load()` / `i18n.loadAndActivate()` çağrıları yalnızca fallback görevi görür ve geliştirme ortamında bir uyarı gösterir. Bunları `i18n.activate(locale)` ile değiştirin ve `lingui compile` adımını kaldırın. Yeni mesaj id'lerini toplamak için `lingui extract` komutunu koruyun.

</Step>
<Step number={5} title="Import'ları açıkça yeniden adlandırma (isteğe bağlı)" isOptional={true}>

Vite plugin'i alias'ları zaten yönetir. Bağımlılığı açık hale getirmek için:

| Önce                                               | Sonra                                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="İçeriği .content.ts dosyalarına taşıyın" isOptional={true}>

Yeni bileşenler, mevcut Lingui çağrılarının yanında yerel Intlayer içeriğini kullanabilir:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

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

Doldurulan çeviriler Lingui kataloglarınıza geri yazılır. Yapay zeka yapılandırması için [CLI dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) bakın.

</Step>
</Steps>

## Geçişten sonra silebilecekleriniz

| Dosya / kalıp                                   | Neden artık gerekli değil                                       |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `i18n.load()` / dinamik katalog import'ları     | Sözlükler Intlayer tarafından derlenir ve yüklenir.             |
| `lingui compile` ve derlenmiş `.js` katalogları | Intlayer sözlükleri doğrudan kataloglarınızdan build eder.      |
| `@lingui/vite-plugin`                           | `@intlayer/lingui/plugin` içindeki `lingui()` ile değiştirildi. |

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

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md)
- [Sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md)
- [Vite ve React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- [Intlayer görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)
