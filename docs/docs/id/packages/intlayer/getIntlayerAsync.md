---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentasi Fungsi getIntlayerAsync | intlayer
description: Lihat cara menggunakan fungsi getIntlayerAsync untuk package intlayer
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentasi: Fungsi `getIntlayerAsync` di `intlayer`

## Deskripsi

Fungsi `getIntlayerAsync` memilih satu kamus berdasarkan kuncinya dan menyelesaikan kontennya untuk locale yang diberikan, **memuat locale tersebut saja**.

Ini adalah mitra asinkron dari [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md), dimaksudkan untuk tempat-tempat di mana kamus dibaca di luar rendering — route `head` / pembangun metadata, loaders, server functions.

Di mana `getIntlayer` menarik kamus gabungan yang menampung setiap locale, [plugin build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) menulis ulang panggilan ini menjadi `getDictionaryAsync(loaderMap, key, locale)`, mengarahkannya ke chunk per-locale di `.intlayer/dynamic_dictionaries/`. Bundle oleh karena itu hanya pernah membawa locale yang benar-benar diminta.

Tanpa plugin tersebut — build yang tidak dioptimalkan — panggilan diselesaikan melalui registry kamus sinkron sebagai gantinya: konten yang sama, tanpa pemisahan per-locale.

**Fitur Utama:**

- Kunci, selektor dan konten yang dikembalikan sama dengan `getIntlayer`
- Memuat hanya chunk locale yang diminta dalam build yang dioptimalkan
- Panggilan bersamaan untuk chunk yang sama berbagi satu load
- Aman digunakan dalam pembangun metadata `async`, loaders dan server functions

---

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Diperlukan
  localeOrSelector?: LocalesValues | DictionarySelector, // Opsional
  plugins?: Plugins[]                         // Opsional
): Promise<DeepTransformContent<...>>
```

---

## Parameters

- `key: DictionaryKeys`
  - **Description**: Kunci kamus yang akan dibaca, seperti yang dideklarasikan dalam file konten Anda.
  - **Type**: `DictionaryKeys` — union dari setiap kunci kamus yang dideklarasikan.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale untuk menginterpretasi konten, atau objek selector untuk [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md).
    - `'fr'` — sebuah locale
    - `{ item: 2 }` — item [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/collections.md) (abaikan `item` untuk mendapatkan setiap item sebagai array)
    - `{ variant: 'black-friday' }` — [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md) bernama (abaikan untuk yang `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — variant terstruktur
    - Setiap selector dapat membawa locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults ke `defaultLocale` yang dikonfigurasi.

- `plugins: Plugins[]`
  - **Description**: Custom node transformers yang menggantikan base interpreter plugins. Penggunaan advanced only.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise yang resolve ke konten yang diinterpretasi dari dictionary, yang diketik dari declaration Anda.

---

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### Di TanStack Start route `head`

Karena locale chunk dimuat sesuai permintaan, `head` menjadi `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### Di Next.js `generateMetadata`

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### Dalam fungsi server

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Returns            | Konten                                                                                                          | Janji dari konten                                 |
| Dictionary loaded  | Dictionary yang digabungkan (semua locale)                                                                      | Chunk dari locale yang diminta saja               |
| Best suited for    | Rendering, jalur kode sinkron                                                                                   | Metadata, loaders, fungsi server                  |
| Requires a plugin? | Tidak                                                                                                           | Tidak — split per-locale memerlukan build plugins |

Keduanya menerima argumen yang sama dan mengembalikan konten yang sama: beralih dari satu ke yang lain hanya mengubah **kapan** dan **berapa banyak** yang dimuat.

---

## Fungsi Terkait

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md): Ekuivalen sinkron yang membaca dictionary yang sudah digabung.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getDictionaryAsync.md): Fungsi tingkat rendah yang plugin build tulis ulang menjadi panggilan ini.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocale.md): Mendeteksi locale dari request yang masuk.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
