---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentasi Hook useLocale | astro-intlayer
description: Pelajari cara menggunakan hook useLocale di aplikasi Astro untuk mengakses dan mengelola lokal saat ini.
keywords:
  - useLocale
  - lokal
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumen"
author: aymericzip
---

# Dokumentasi Hook useLocale

Hook `useLocale` dari `astro-intlayer` menyediakan akses ke lokal permintaan saat ini, lokal default yang dikonfigurasi, dan semua lokal yang tersedia dalam aplikasi Astro.

Hook ini berperilaku konsisten di seluruh frontmatter `.astro` yang dirender server dan blok `<script>` sisi klien.

## Penggunaan

### Di Frontmatter Komponen (Dirender di Server)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Saat ini: {locale}</span>
      <span>Default: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### Di `<script>` Klien (Interaktif)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Nilai yang Dikembalikan

Hook ini mengembalikan objek bertipe `UseLocaleResult`:

| Properti           | Tipe                                   | Deskripsi                                                                                          |
| ------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Lokal yang sedang aktif.                                                                           |
| `defaultLocale`    | `DeclaredLocales`                      | Lokal fallback default yang dikonfigurasi dalam `intlayer.config.ts`.                              |
| `availableLocales` | `DeclaredLocales[]`                    | Array semua lokal yang didukung dan dikonfigurasi untuk proyek.                                    |
| `setLocale`        | `(locale: LocalesValues) => void`      | Fungsi untuk memperbarui lokal. (Interaktif di `<script>` klien, memunculkan peringatan saat SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Berlangganan perubahan lokal di sisi klien.                                                        |

## Perilaku Server vs Klien

- **Selama SSR / Render Server**: Permintaan dirender sekali dengan parameter tetap. Memanggil `setLocale()` selama render server tidak berpengaruh dan mengeluarkan peringatan; peralihan lokal harus dilakukan di klien atau dengan menavigasi ke URL lokal tujuan.
- **Dalam Skrip Klien**: `setLocale` memperbarui store klien dan memperbarui cookie atau local storage yang disimpan sesuai konfigurasi Intlayer Anda.

## Dokumentasi Terkait

- [Integrasi `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useDictionary.md)
