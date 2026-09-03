---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: next-intl 2026'da Güncelliğini Yitirdi mi?
description: next-intl, Next.js App Router için varsayılan çözüm haline geldi. Ancak arka planda çalışma zamanı paket şişkinliği ve manuel ad alanı yükü taşımayı sürdürüyor.
keywords:
  - next-intl
  - Intlayer
  - Uluslararasılaştırma
  - i18n
  - Next.js
  - Paket boyutu
  - Blog
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# next-intl 2026'da Güncelliğini Yitirdi mi?

Vercel, App Router yapısını tanıtıp Pages Router'daki yerleşik i18n desteğini sonlandırdığında, `next-intl` bu boşluğu hızla doldurdu. Jan Amann'ın hazırladığı anlaşılır dokümantasyon ve zamanında sağlanan App Router desteği, kütüphaneyi topluluğun bir numaralı tercihi yaptı.

Öyleyse bugün neden güncelliği tartışılıyor?

**Web mimarisi son üç yılda köklü bir değişim geçirdi, ancak `next-intl`'in temel yaklaşımı aynı kaldı.**

Next.js; React Server Components (RSC), akış (streaming) ve derleyici düzeyinde optimizasyonlara odaklanırken, `next-intl` yerelleştirmeyi halen bir çalışma zamanı meselesi olarak görüyor: istemci sağlayıcılarına büyük JSON nesneleri geçiyor, tarayıcıda ICU formatlayıcıları çalıştırıyor ve paket büyümesini önlemek için manuel ad alanı ayrımına güveniyor.

<TOC/>

## Öne Çıkanlar

**Geliştirme temposunda yavaşlama:**

Son 12 ayda `next-intl` ~187 commit kaydetti, bu çalışmaların neredeyse tamamı Next.js sürümleriyle uyumluluk ve hata düzeltmeleri üzerine yoğunlaştı.

**İstemci çalışma zamanı yükü:**

`NextIntlClientProvider` bileşenini `useTranslations()` ile bağlamak, tek bir kelime görüntülemeden önce ~12.8 KB gzipped (51 KB minified) kod ekler, bu da `next-intlayer`'ın (4.3 KB) yaklaşık 3 katıdır.

**%90 oranında içerik sızıntısı:**

Yaygın kurulumlarda, **bir sayfaya aktarılan çevirilerin %89.8'i diğer sayfalara aittir**. Kullanıcı `/contact` sayfasına girdiğinde `/pricing` ve yönetim paneli metinlerini de indirmek zorunda kalır.

**Manuel ad alanı yönetimi:**

Paket şişkinliğini önlemek için ad alanlarını rota rota elle bölmek gerekir, bu da üretim ortamında eksik metin riskini artırır.

**Ticari ortaklık:**

Crowdin'in resmi ortağı olan bir kütüphanenin, CLI içine yerel ve ücretsiz bir yapay zeka çeviri komutu geliştirmesi için ticari bir gerekçesi yoktur.

## Bakım vs. Modern Araçlar

Son 12 aydaki commit hareketliliği:

| Depo                  | Yıldızlar                                                                                                                                              | Toplam commit                                                                                                                                                       | Yıllık commit                                                                                                                                                      | Son commit                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Geçtiğimiz 12 ayın özeti:

- `amannn/next-intl`: **187 commit** (çoğunlukla sürüm geçişleri ve küçük yamalar).
- `aymericzip/intlayer`: **4.343 commit** (derleyiciler, IDE eklentileri, MCP sunucuları ve çeviri araçları üzerinde kesintisiz geliştirme).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

Kararlı bir kütüphane güven verir. Fakat i18n dünyası evrildi: derleyiciler çağrılmayan çevirileri build aşamasında atıyor, LLM'ler CI süreçlerinde otomatik çeviri sağlıyor ve editörler özel LSP ile yapay zeka asistanlarından yararlanıyor. Sadece runtime'a bağlı bir kütüphanenin bu dönüşüme uyum sağlaması zordur.

## Next.js 16 App Router Performans Testi

10 rota ve 10 dil içeren tipik bir App Router uygulamasında ölçüm yapılmıştır:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Gerçek tarayıcı ortamlarında gzip sıkıştırmasıyla test edilmiştir. Tüm detaylar [Next.js benchmark raporunda](https://intlayer.org/tr/doc/benchmark/nextjs).

### Kütüphane Ayak İzi

Çeviri metinleri eklenmeden önceki istemci yükü:

| Kütüphane              | Gzipped    | Minified    |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### Sayfa Ağırlığı ve Veri Sızıntısı

| Kurulum               | Ort. sayfa JS (gz) | Dil sızıntısı | Diğer sayfa sızıntısı | Ort. bileşen (gz) |
| --------------------- | ------------------ | ------------- | --------------------- | ----------------- |
| Temel (i18n yok)      | 150.8 KB           | 0.0%          | 0.0%                  | 0.7 KB            |
| `next-intl` (statik)  | 163.5 KB           | 4.2%          | **89.8%**             | 20.5 KB           |
| `next-intl` (dinamik) | 163.4 KB           | 9.7%          | **89.9%**             | 20.5 KB           |
| `next-intlayer`       | **152.1 KB**       | **0.0%**      | **0.0%**              | **7.2 KB**        |

### Rotalar Arası Veri Sızıntısı Neden Olur?

Klasik `next-intl` projelerinde kök layout tüm sözlüğü tek seferde çeker:

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

`messages` kök düzeyinde istemci sağlayıcısına teslim edildiğinde, tarayıcı her sayfada tüm kelime havuzunu edinir. `/login` sayfasına giren bir ziyaretçi yardım, rehber ve gösterge paneli içeriklerini de birlikte indirir.

Bunu önlemek için JSON dosyalarını ad alanlarına ayırmak mümkündür. Ancak bu eşleştirmeleri elle yönetmek zahmetlidir ve gözden kaçan eksikliklere yol açar.

Intlayer bunu statik analiz ile çözer: [Intlayer derleyicisi](https://intlayer.org/tr/doc/compiler) sadece o rotada çağrılan metinleri paketler, rotalar arası sızıntıyı **%0.0'a** indirir.

## next-intl Neden Tree-Shaking'e İzin Vermez?

Kütüphanenin arayüzü çalışma zamanında çözülen dinamik dize anahtarlarına dayanır:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack ve Webpack, `UserProfile` içinde hangi anahtarların çağrılacağını bilemez. Çalışma anında hata oluşmaması için **paketleyici tüm ad alanını istemci paketine dahil eder**. Intlayer'ın parçalanmış özellikleri sayesinde derleyici erişilen alanları analiz eder ve gereksiz metinleri ayıklar. Detaylar için [paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization) konusuna göz atın.

## Geliştirici Deneyimi

### Ayrı JSON Klasörleri vs. Birlikte Konumlandırma

`next-intl` ile metinler `messages/` dizininde koddan uzakta durur. Intlayer ise içerik tanımlarını doğrudan bileşenlerin yanına koyar:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/tr.json"
{
  "authModal": {
    "title": "Hesabınıza giriş yapın",
    "submitButton": "Devam Et"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      tr: "Hesabınıza giriş yapın",
    }),
    submitButton: t({
      en: "Continue",
      tr: "Devam Et",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

`AuthModal.tsx` bileşenini taşıdığınızda veya sildiğinizde, çevirileri de birlikte taşınır ya da silinir.

### Otomatik Tamamlama vs. Kesin Tip Denetimi

`next-intl` içinde `IntlMessages` arayüzünü genişletmek ana dile göre otomatik tamamlama sunar:

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

Ancak yalnızca temel dil doğrulanır. `tr.json` içinden bir anahtar silindiğinde TypeScript hata vermez, CI başarılı görünür ve kullanıcılar boş metinlerle karşılaşır.

Intlayer, tipleri tüm bildirimlerden çıkarır. [`strictMode`](https://intlayer.org/tr/doc/concept/configuration) modu etkinleştirildiğinde herhangi bir dildeki eksik çeviri derleme hatası oluşturur.

### Araç Ekosistemi ve Yapay Zeka

| Özellik                      | `next-intl` | Intlayer                                                                 |
| ---------------------------- | ----------- | ------------------------------------------------------------------------ |
| **VS Code Eklentisi**        | ❌ Yok      | ✅ [Resmi eklenti](https://intlayer.org/tr/doc/vs-code-extension)        |
| **Language Server (LSP)**    | ❌ Yok      | ✅ [Özel LSP](https://intlayer.org/tr/doc/lsp)                           |
| **MCP Sunucusu (AI İçin)**   | ❌ Yok      | ✅ [Entegre MCP sunucusu](https://intlayer.org/tr/doc/mcp-server)        |
| **Ajan Becerileri (Skills)** | ❌ Yok      | ✅ [Kullanıma hazır beceriler](https://intlayer.org/tr/doc/agent_skills) |
| **Görsel CMS**               | ❌ Yok      | ✅ [Ücretsiz ve Açık Kaynak](https://intlayer.org/tr/doc/concept/editor) |

Entegre LSP ve MCP sunucuları sayesinde yapay zeka kodlama asistanları projenin içerik yapısını eksiksiz algılar ve çevirileri hatasız biçimde tamamlar.

## Crowdin Ortaklığı

`next-intl` resmi olarak Crowdin ile ortaklık yürütmektedir. Sponsorluklar açık kaynağı destekler ancak yol haritasını da şekillendirir: harici TMS platformlarına istemci olacak şekilde kurgulanan `next-intl`, CLI içine yerel ve ücretsiz bir yapay zeka çeviri komutu entegre etmeye odaklanmaz.

Intlayer bu araçları standart olarak sunar:

**Yerel Yapay Zeka Doldurma (`intlayer fill`):**

Eksik çevirileri OpenAI, Anthropic, Mistral veya Gemini API anahtarlarınızla otomatik tamamlar.

**Kendi Sunucunuzda Barındırılabilir Görsel CMS:**

Teknik olmayan ekiplerin Git ile entegre biçimde metin düzenlemesi için [Intlayer CMS](https://intlayer.org/tr/doc/concept/cms) kullanın.

**Özgür Açık Kaynak Lisansı:**

Tüm araçlar Apache 2.0 lisansı altındadır.

## next-intl Hangi Durumlarda Halen Tercih Edilebilir?

<AccordionGroup>
<Accordion header="Kapsamlı ICU MessageFormat Gereksinimleri">

Uygulamanız iç içe geçmiş çoğul kurallarına ve gelişmiş sıralama biçimlendiricilerine dayanıyorsa, `next-intl` olgun bir ICU desteğine sahiptir.

</Accordion>
<Accordion header="Oturmuş Crowdin Süreçleri">

Hali hazırda çeviri operasyonunu Crowdin üzerinde yürüten ekipler için `next-intl` entegrasyonu oldukça kolaydır.

</Accordion>
<Accordion header="Sorunsuz Çalışan Mevcut Sistemler">

Mevcut projeniz ihtiyaçlarınızı karşılıyor ve paket boyutu sizin için bir sorun teşkil etmiyorsa, geçiş zorunlu değildir.

</Accordion>
</AccordionGroup>

## Mevcut next-intl Yapılandırmamı Nasıl Geliştirebilirim?

Intlayer, `next-intl` kütüphanesinin fonksiyon ve kanca (hook) imzalarını (`useTranslations`, `getTranslations` ve yönlendirme yardımcıları) birebir koruyan doğrudan uyumluluk paketleri sunar. Derleyici seviyesindeki optimizasyonlardan yararlanmak için bileşenlerinizi sıfırdan yazmanıza gerek yoktur.

Kurulum tek bir komutla tamamlanır:

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

Bu etkileşimli CLI aracı:

1. `@intlayer/next-intl` uyumluluk paketini yükler.
2. Paketleyici takma adlarını (alias) yapılandırarak mevcut import'larınızın (`next-intl`, `next-intl/server`) doğrudan Intlayer'a yönlendirilmesini sağlar; böylece eski kütüphaneyi `package.json` dosyasından kaldırabilirsiniz.
3. Editörde Dil Sunucusu (LSP) teşhislerini anında açar, sayfalar arası çeviri sızıntılarını ortadan kaldırır (tam tree-shaking) ve büyük bir yeniden yapılandırma gerektirmeden yerel yapay zeka çeviri iş akışlarını etkinleştirir.

Ayrıntılı adımlar için hazırladığımız kılavuzları inceleyin:

- **Doğrudan Uyumluluk:** [`next-intl` uyumluluk katmanı](https://intlayer.org/tr/doc/compatibility/next-intl) ile mevcut `useTranslations` kodlarınızı değiştirmeden koruyun.
- **Rehberli Geçiş:** Eski JSON dosyalarınızı [next-intl geçiş kılavuzumuz](https://intlayer.org/tr/doc/migration/next-intl) ile yapılandırılmış sözlüklere dönüştürün.
- **Hibrit Model:** Arayüzde `next-intl` kullanmaya devam ederken, yerel yapay zeka çevirisinden yararlanmak için [Intlayer'ı next-intl ile birleştirin](https://intlayer.org/tr/blog/intlayer-with-next-intl).

Sitenizin boyutunu ve sızıntılarını ücretsiz [i18n SEO Tarayıcısı](https://intlayer.org/i18n-seo-scanner) ile inceleyin:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Ek Kaynaklar

- [Next.js i18n Benchmark: Ayrıntılı Performans Analizi](https://intlayer.org/tr/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/tr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [i18next 2026'da Güncelliğini Yitirdi mi?](https://intlayer.org/tr/blog/is-i18next-outdated)
- [Derleyici Odaklı Uluslararasılaştırmanın Önemi](https://intlayer.org/tr/blog/compiler-vs-declarative-i18n)
