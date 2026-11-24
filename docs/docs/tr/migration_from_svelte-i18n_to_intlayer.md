---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "svelte-i18n'den Intlayer'a geçiş"
description: "Bir Svelte veya SvelteKit uygulamasını adım adım svelte-i18n'den Intlayer'a taşıyın. $_, $date ve $number store'ları @intlayer/svelte-i18n compat adapter'ı ile çalışmaya devam eder."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# svelte-i18n'den Intlayer'a geçiş

## Neden svelte-i18n'den Intlayer'a geçmeli?

<AccordionGroup>
<Accordion header="Bundle boyutu">

svelte-i18n başlangıçta locale dosyalarının tamamını kaydeder. Intlayer yalnızca her sayfanın kullandığı sözlükleri gönderir; bu da **bundle ve sayfa boyutlarınızı %50'ye kadar azaltır**.

</Accordion>
<Accordion header="Sürdürülebilirlik">

Anahtarlar sözlüklerinize göre **tiplidir**: geçersiz anahtarlar build sırasında hata verir. İçerik, onu kullanan bileşenlerin yanında durabilir.

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

1. **Compat adapter (mevcut uygulamalar için önerilir)**: `@intlayer/svelte-i18n` kurun. `svelte-i18n` ile aynı API'yi (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) sunar ve mesajları Intlayer sözlüklerinden sağlar. ICU MessageFormat eskisi gibi çalışır.
2. **Tam geçiş**: svelte-i18n store'larını kademeli olarak `svelte-intlayer` içindeki `useIntlayer` ve bileşenlerinizin yanındaki `.content.ts` dosyalarıyla değiştirin.

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
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> `svelte-i18n` kurulu kalsın: TypeScript tiplerini sağlar.

</Step>
<Step number={2} title="Intlayer'ı yapılandırın">

`syncJSON` plugin'ini mevcut mesaj dosyalarınıza yönlendirin. Namespace başına bir dosya ile (`src/locales/en/home.json`), her dosya bir sözlük olur:

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
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')`, `home` sözlüğünün `title` alanına çözümlenir. Locale başına tek dosya (`src/locales/en.json`) ve iç içe namespace'ler kullanıyorsanız bunun yerine `source: ({ locale }) => \`./src/locales/${locale}.json\`` kullanın: her üst düzey anahtar bir sözlük olur.

</Step>
<Step number={3} title="Vite plugin'ini ekleyin">

`svelteI18nVitePlugin()` Intlayer build'ini çalıştırır ve `svelte-i18n` için `@intlayer/svelte-i18n`'e alias oluşturur; kaynak dosyalarınızda değişiklik gerekmez.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> SvelteKit için `svelteI18nVitePlugin()` öğesini aynı `plugins` dizisinde `sveltekit()` öğesinden sonra ekleyin.

</Step>
<Step number={4} title="i18n kurulumunu sadeleştirin">

`init()` kalsın, ancak `register()` ve `addMessages()` çağrılarını kaldırın: mesajlar Intlayer sözlüklerinden gelir.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Bileşenleriniz değişmeden çalışmaya devam eder:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

`$locale = 'fr'` ataması hem svelte-i18n store'larının hem de `useIntlayer`'ın dilini değiştirir.

## Tam geçiş

<Steps>
<Step number={5} title="Import'ları açıkça yeniden adlandırma (isteğe bağlı)" isOptional={true}>

Vite plugin'i alias'ları zaten yönetir. Bağımlılığı açık hale getirmek için:

| Önce                                         | Sonra                                                  |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="İçeriği .content.ts dosyalarına taşıyın" isOptional={true}>

Yeni bileşenler, mevcut svelte-i18n çağrılarının yanında yerel Intlayer içeriğini kullanabilir:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
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

| Dosya / kalıp                            | Neden artık gerekli değil                            |
| ---------------------------------------- | ---------------------------------------------------- |
| `register()` / `addMessages()` çağrıları | Sözlükler Intlayer tarafından derlenir ve yüklenir.  |
| Render öncesi `waitLocale()`             | Mesajlar locale ayarlanır ayarlanmaz kullanılabilir. |

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

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/svelte-i18n.md)
- [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)
- [Vite ve Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md)
- [SvelteKit ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_svelte_kit.md)
- [Intlayer görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
