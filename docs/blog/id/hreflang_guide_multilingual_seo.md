---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, panduan untuk SEO multibahasa"
description: "Apa itu hreflang, aturan yang diterapkan search engine, mengapa x-default hampir selalu salah, dan cara membuat tag yang benar di Next.js dan TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: panduan untuk SEO multibahasa

Anda telah menerjemahkan aplikasi Anda. Anda meluncurkan `/en`, `/fr`, `/es`. Dan pengguna Prancis masih mendarat di halaman bahasa Inggris.

Menerjemahkan adalah bagian yang mudah. Bagian yang sulit adalah memberitahu search engine bahwa halaman-halaman ini adalah **halaman yang sama dalam bahasa lain**, bukan tiga dokumen yang bersaing satu sama lain. Itulah yang dilakukan `hreflang`, dan di sanalah sebagian besar situs multibahasa secara diam-diam kehilangan traffic mereka.

---

## Apa sebenarnya hreflang itu

Sebuah anotasi pada halaman yang mengatakan: _URL ini memiliki versi setara di tempat lain, untuk bahasa-bahasa tersebut._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Ini memberimu dua hal: versi yang tepat ditampilkan kepada pengguna yang tepat, dan locale-mu disatukan dalam satu cluster alih-alih saling menggugurkan satu sama lain sebagai duplikat.

Perlu jelas tentang apa yang bukan merupakan hal itu. Itu **bukan redirect** — itu adalah hint, dan Google dapat menggantinya. Itu **bukan peningkat ranking** — itu mengubah _versi mana_ yang ranking, bukan _apakah_ kamu ranking. Dan Bing mengabaikannya sepenuhnya, mengandalkan `content-language` dan geo-targeting sebagai gantinya.

---

## Di mana mendeklarasikannya

Tiga penempatan, semuanya valid. Pilih satu dan tetap di sana — cluster yang sama dideklarasikan di dua tempat adalah bagaimana set bergerak terpisah.

**HTML `<head>`** adalah pilihan biasanya. Satu caveat: tag yang disuntikkan setelah hydration tidak dapat diandalkan. Jika framework-mu hanya menambahkannya di sisi klien, crawler mungkin tidak akan pernah melihatnya.

**XML sitemap** lebih baik untuk skala besar. Sepuluh locale di 5.000 halaman berarti 50.000 elemen `<link>` dikirim ke browser tanpa tujuan; dalam sitemap tidak membutuhkan byte dari halaman Anda.

**HTTP `Link` header** adalah satu-satunya opsi untuk file non-HTML seperti PDF.

---

## Aturan-aturannya

### Referensi diri dan resiprositas

Set pada `/fr/about` harus menyertakan `hreflang="fr"` yang menunjuk ke `/fr/about`. Dan jika `/about` menunjuk ke `/fr/about`, `/fr/about` harus menunjuk kembali. Google menyebut referensi satu arah sebagai "no return tag" dan menghapusnya.

Dalam praktiknya ini berarti **setiap halaman dalam cluster mengirim set link yang identik**. Menghasilkannya dari satu daftar locale bersama bukan sekadar kenyamanan, ini adalah satu-satunya cara untuk tetap benar setelah Anda memiliki lebih dari dua locale.

### URL absolut, selalu

```html
<!-- Diabaikan dalam diam -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Benar -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Alasannya layak untuk dipahami daripada hanya dihafal. `hreflang` adalah referensi lintas dokumen: mesin pencari membangun cluster yang dikunci oleh URL, dibagikan di setiap halaman di dalamnya. Sebuah path relatif hanya memiliki makna relatif terhadap dokumen tempat ia berada, jadi ia tidak dapat mengekspresikan hal itu. Ia juga tidak dapat melampaui host — dan alternate sering kali melakukannya, ketika locale berada di `example.fr` atau `fr.example.com`. Dalam sitemap atau HTTP header tidak ada dokumen dasar untuk diselesaikan sama sekali.

Ini memiliki konsekuensi langsung dalam kode. `getLocalizedUrl("/about", "fr")` mengembalikan `/fr/about` — relatif masuk, relatif keluar. Untuk `hreflang` Anda harus memberikannya URL absolut:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ ditolak
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Satu-satunya pengecualian adalah framework yang menyelesaikan nilai relatif untuk Anda sebelum rendering: Next.js memperluas `alternates` relatif terhadap `metadataBase`. Baik — tetapi aturan berlaku untuk **HTML yang diemisikan**, jadi periksa dengan `curl`, bukan inspektur DevTools.

### Kode bahasa

ISO 639-1 untuk bahasa, ISO 3166-1 Alpha 2 untuk wilayah opsional: `fr`, `fr-CA`, `pt-BR`.

Dua jebakan menangkap hampir semua orang. Region saja tidak valid — `hreflang="ca"` adalah Catalan, bukan Canada; Anda memerlukan `en-CA` atau `fr-CA`. Dan `en-UK` tidak ada: kode negara untuk United Kingdom adalah `GB`, jadi itu `en-GB`.

Tambahkan region hanya ketika Anda benar-benar melayani konten berbeda untuk region tersebut — harga berbeda, pemberitahuan hukum berbeda. `fr` dan `fr-FR` pada konten identik adalah kebisingan.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Satu konsep yang paling sering terlupakan, dan dipahami dengan buruk, adalah `x-default` — kurang dari 30% aplikasi mengimplementasikannya dengan benar.

Ini adalah fallback untuk pengguna yang bahasanya tidak cocok dengan entri apa pun dalam set Anda. Pembicara Belanda di situs yang menawarkan English, French, dan Spanish tidak cocok dengan entri apa pun; tanpa `x-default`, Google memilih untuk Anda.

Apa yang sering salah dipahami adalah apa artinya. `x-default` **bukan "versi English"** dan **bukan "locale default"**, meskipun biasanya menunjuk ke sana. Ini berarti _halaman untuk pengguna yang set ini tidak cover_. Itulah mengapa sah — dan sering kali lebih baik — untuk mengarahkannya ke halaman language-selector atau geo-redirecting daripada ke `/en`. Jika Anda tidak memiliki halaman seperti itu, bahasa utama Anda adalah jawaban yang masuk akal.

Dua hal yang perlu diperhatikan: `x-default` adalah satu entry tambahan dalam set, bukan pengganti untuk yang self-referencing, dan seperti setiap entry lainnya harus muncul secara identik di setiap halaman dalam cluster.

---

## The canonical trap

Setiap halaman yang dilokalisasi harus menjadi **canonicalnya sendiri**:

```html
<!-- On https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Mengarahkan canonical setiap locale di versi English sebaliknya:

```html
<!-- On https://example.com/fr/about — kills the page -->
<link rel="canonical" href="https://example.com/about" />
```

mengatakan halaman Prancis adalah duplikat yang tidak boleh diindeks, sementara `hreflang` mengatakan itu adalah halaman untuk disajikan kepada pengguna Prancis. Sinyal-sinyalnya bertentangan, canonical menang, dan halaman Prancis Anda keluar dari indeks.

**Canonical bersifat self-referential per locale. `hreflang` mendeskripsikan cluster.**

---

## Memilih struktur URL

`hreflang` memberi anotasi pada URL, jadi struktur datang terlebih dahulu.

| Struktur           | Contoh            | Trade-off                                                                          |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------- |
| **Subdirectories** | `example.com/fr/` | Satu domain, shared authority — sinyal geo yang lebih lemah                        |
| **Subdomains**     | `fr.example.com`  | Mudah untuk menambah atau menghapus locale — mungkin dibaca sebagai situs terpisah |
| **ccTLDs**         | `example.fr`      | Sinyal negara terkuat — otoritas dibangun per domain                               |

Subdirektori adalah default yang tepat untuk sebagian besar proyek. Gunakan ccTLDs hanya ketika Anda benar-benar beroperasi sebagai bisnis negara terpisah.

Satu struktur yang harus dihindari: melayani bahasa berbeda di **URL yang sama** berdasarkan `Accept-Language` atau IP. Crawler melihat satu versi dan mengindeks satu versi; semuanya yang lain tidak terlihat.

> Intlayer mencakup ketiganya melalui `routing.mode` dan `routing.domains`. Lihat [custom domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/custom_domains.md) dan [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

---

## Implementation

Menulis tag ini secara manual tidak akan bertahan dengan locale kedua. Turunkan tag-tag ini dari daftar locale Anda.

<Steps>

<Step number={1} title="Emit cluster di setiap halaman">

Set yang sama di mana saja, canonical per locale, URL absolut, `x-default` disertakan.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API mengekspos `alternates.languages`, dan `getMultilingualUrls` membangun seluruh record dari locale yang dikonfigurasi:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) mengembalikan:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Pengaturan lengkap: [Panduan i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Fungsi `head` route membangun link-link tersebut. `localeMap` melakukan iterasi pada locale yang dikonfigurasi, jadi menambahkan locale ke config menambahkannya di mana-mana sekaligus:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` berjalan di server, jadi tag mendarat di HTML awal. Setup lengkap: [Panduan i18n TanStack](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Atau pindahkan semuanya ke sitemap">

Dalam skala besar, jangan sertakan anotasi di halaman Anda sama sekali. `generateSitemap` mengeluarkan alternates `xhtml:link` per entri, membaca locale dan mode routing dari konfigurasi Anda:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Dua opsi yang perlu diketahui:

- `xhtmlLinks` (default `true`) — alternates hanya diemisikan di mana URL lokal benar-benar berbeda. Dalam mode `no-prefix` setiap lokal berbagi satu URL, jadi mereka dilewati kecuali `routing.domains` memberikan lokal nama host mereka sendiri.
- `entryPerLocale` (default `false`) — secara default satu entri `<url>` membawa semua alternates. Kedua bentuk valid, namun hanya URL yang terdaftar sebagai `<loc>` yang dihitung sebagai _submitted_ di Search Console; locale alternate-only tetap discoverable namun tidak dikaitkan dengan sitemap. Mengaktifkan ini memberikan setiap URL lokal entri tersendiri dengan set alternate lengkap yang diulang. Ini mengalikan entri berdasarkan jumlah locale, jadi perhatikan batas 50 000 URL / 50 MB dan pisahkan ke sitemap index melampaui batas itu.

</Step>

<Step number={3} title="Verifikasi apa yang diterima crawler">

`hreflang` gagal secara senyap, jadi periksa daripada menganggap.

Baca sumbernya, bukan inspector — `curl https://example.com/fr/about | grep hreflang` menampilkan apa yang diterima crawler; DevTools menampilkan DOM setelah JavaScript berjalan. Kemudian ikuti setiap alternate dan konfirmasi bahwa ia menunjuk kembali dengan set yang identik, dan bahwa tidak ada satupun yang redirect. Laporan International Targeting Search Console menangkap sisanya di seluruh situs.

Untuk crawl khusus multilingual, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) memeriksa tag yang hilang, alternate yang rusak, dan konflik canonical di seluruh halaman terlokalisasi Anda.

</Step>

</Steps>

---

## Checklist

- [ ] Setiap locale memiliki URL yang distinct dan crawlable
- [ ] Setiap halaman self-references, dan setiap referensi bersifat reciprocal
- [ ] Set yang sama dikirim pada setiap halaman dalam cluster
- [ ] Semua nilai `href` adalah absolut dalam HTML yang dihasilkan
- [ ] Kode adalah ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, bukan `en-UK`)
- [ ] `x-default` ada, dan menunjuk ke mana pengguna yang tidak cocok harus pergi
- [ ] Canonical bersifat self-referential per locale
- [ ] Tag di-render server-side, bukan diinjeksi setelah hydration
- [ ] Dideklarasikan di tepat satu tempat
- [ ] Tidak ada alternate yang redirect

---

## Penutup

`hreflang` sederhana dan tidak toleran. Satu tag return yang hilang, satu URL relatif, satu canonical lintas-locale, dan cluster akan diabaikan tanpa error di mana pun. Setiap satu dari itu berasal dari menulis tag secara manual.

Turunkan set dari daftar locale tunggal, render server-side, jaga canonical self-referential, dan berikan `x-default` perhatian yang layak. Lakukan itu sekali dan kebenaran berhenti menjadi sesuatu yang Anda pertahankan.

### Melangkah lebih jauh

- [SEO dan Internasionalisasi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md) — gambaran SEO multibahasa yang lebih luas
- [SEO dan i18n di Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Panduan i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)
- [Panduan i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)
- [Custom domains per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/custom_domains.md)
- [Referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
