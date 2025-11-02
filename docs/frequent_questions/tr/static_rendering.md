---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Next.js'de i18n ile Statik ve Dinamik Render
 description: Next.js'de i18n ile statik ve dinamik render nasıl kullanılır, öğrenin.
keywords:
  - statik
  - dinamik
  - render
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - yapılandırma
slugs:
  - frequent-questions
  - static-rendering
---

# Next.js'de i18n ile Statik ve Dinamik Render

## **next-intl** ile yaşanan sorun

- **Ne olur?**
  `useTranslations`, `getTranslations` veya herhangi bir next-intl yardımcı fonksiyonunu _Server Component_ içinde kullandığınızda, Next.js tüm rotayı **dinamik** olarak işaretler. ([Next Intl][1])

- **Neden?**
  next-intl, mevcut locale'i yalnızca istek başlığı (`x-next-intl-locale`) üzerinden `headers()` ile okur. `headers()` **dinamik bir API** olduğu için, ona dokunan her bileşen statik optimizasyonunu kaybeder. ([Next Intl][1], [Next.js][2])

- **Resmi çözüm (boilerplate)**
  1. Desteklenen her locale için `generateStaticParams` export edin.
  2. Her layout/page'de `useTranslations`'dan önce `setRequestLocale(locale)` çağırın. ([Next Intl][1])
     Böylece header bağımlılığı kalkar, ancak fazladan kod ve kararsız bir API ile uğraşırsınız.

## **intlayer** ile bu sorun nasıl aşılır?

**Tasarım tercihleri**

1. **Sadece route-param** – Locale, Next.js'in her sayfaya zaten ilettiği `[locale]` URL segmentinden gelir.
2. **Derleme zamanı paketleri** – Çeviriler normal ES modülleri olarak import edilir, tree-shake edilir ve derleme zamanında gömülür.
3. **Dinamik API yok** – `useT()` React context'ten okur, `headers()` veya `cookies()` kullanmaz.
4. **Ekstra yapılandırma yok** – Sayfalarınız `app/[locale]/` altında olduğunda, Next.js her locale için otomatik olarak bir HTML dosyası üretir.
