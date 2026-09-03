---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: glob içe aktarmaları, chunk'lar ve derleme zamanı mesajları"
description: i18n konusunda Vite'a özgü olan gerçek detaylar. import.meta.glob ile lazy kataloglar, rota başına dil bölmenin neden nadiren çalıştığı, HMR eksikleri ve derleme zamanı eklentileri.
keywords:
  - vite i18n
  - import.meta.glob
  - vite kod bölme
  - lazy load çeviriler
  - vite eklentisi i18n
  - rollup chunk'ları
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: Framework'ünüzle Değil, Doğrudan Vite ile İlgili Olan Kısımlar

Çoğu "Vite i18n" öğreticisi, aslında Vite kullanan React veya Vue eğitimleridir. Bu makale ise alttaki katmanı ele alır: katalogların nasıl içe aktarıldığı, Rollup'ın bunlarla ne yaptığı ve yazdığınız lazy loading kodunun gerçekte neden lazy olmayabileceği.

## İçindekiler

<TOC/>

## Statik içe aktarma varsayılandır ve eşzamanlıdır (eager)

En temel kurulum, her kataloğu bir modülün en üstünde doğrudan içe aktarır:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Bu, her sayfada, her kullanıcı için giriş chunk'ına üç kataloğun birden dahil edilmesi anlamına gelir. İki dil ve yüz dize için sorun teşkil etmeyebilir. Ancak on dilde, paketteki en büyük ve en kolay önlenebilir maliyet haline gelir.

## `import.meta.glob` ve herkesin yanlış ayarladığı bayrak

Vite'ın glob import özelliği bunun standart çözümüdür:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Lazy (tembel) yükleme varsayılandır: her girdi dinamik bir içe aktarma döndüren bir fonksiyondur ve Rollup dosya başına bir chunk üretir. `{ eager: true }` eklemek ise bunların hepsini doğrudan çağıran modülün içine gömer; yani kaçınmaya çalıştığınız şeyin tam olarak aynısını yapar:

```ts
// Her dil giriş chunk'ına dahil edilir. Neredeyse hiçbir zaman istenmeyen durum:
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

Tuzak şudur: her iki sürüm de geliştirme ortamında çalışır çünkü Vite modülleri paketlemeden ayrı ayrı sunar. Fark yalnızca `dist` klasöründe ortaya çıkar. `npx vite build && npx vite preview` ile test edin ve giriş chunk'ının gerçekte neleri içerdiğini inceleyin.

## Rota başına dil bölme nadiren ayrışır

Geliştiricileri en çok şaşırtan kısım burasıdır. Katalogları sayfa bazında bölersiniz:

```
locales/en/home.json
locales/en/checkout.json
```

Ardından iki farklı rota `checkout.json` dosyasını içe aktarır ve Rollup bu dosyayı her iki sayfada da yüklenen paylaşılan bir chunk'a taşır. Rollup'ın chunking mantığı klasör adlarınızla değil, modül grafiğiyle yönetilir: birden fazla giriş noktasından erişilebilen bir modül ortak hale gelir. Üçüncü bir rota eklemek hiçbir şeyi değiştirmez ve dördüncü bir rota eklemek parçalanmayı tamamen farklı bir şekilde yeniden şekillendirebilir.

Bu nedenle, rota başına dil bölme işlemi yalnızca içe aktarma grafiği kesin olarak ayrık olduğunda geçerliliğini korur. Paket boyutu önemliyse, varsayımlar yerine araçlarla ölçüm yapın:

```bash
npx vite build && npx vite-bundle-visualizer
```

Sınırları zorlamanız gerekiyorsa, `build.rollupOptions.output.manualChunks` kaçış yoludur ancak sürekli manuel bakım maliyeti getirir.

## Kataloglar otomatik olarak sıcak yenilenmez (HMR)

Bir bileşeni düzenlediğinizde Vite onu anında değiştirir. Ancak `locales/fr.json` dosyasını düzenlediğinizde, içe aktarma biçimine bağlı olarak hiçbir şey değişmeyebilir. Dinamik olarak içe aktarılan JSON dosyalarının yerel bir HMR sınırı yoktur, bu nedenle modül grafiği tüketicileri nasıl geçersiz kılacağını bilemez.

Geliştiriciler genellikle bir metne her dokunduklarında geliştirme sunucusunu yeniden başlatarak bu sorunu aşmaya çalışırlar. Çözüm i18n eklentisine aittir: HMR güncellemesini kabul etmeli ve yeni mesajları çalışan uygulamaya aktarmalıdır. Bir kütüphaneyi değerlendirirken, Vite eklentisinin bunu yapıp yapmadığını kontrol edin.

## `define` dili derleme zamanında koda gömer

Varsayılan dili derleme zamanında sabitlemek cazip gelebilir:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define`, derleme sırasında yapılan salt metinsel bir değiştirmedir. Derlediğiniz anda mevcut olan değer dağıtılan değerdir, bu nedenle dil başına bir derleme yapılmasını zorunlu kılar. Bu, Angular'ın resmi i18n yaklaşımında olduğu gibi meşru bir stratejidir, ancak tek bir dağıtımın tüm dillere hizmet etmesi gerekiyorsa istediğiniz şey bu değildir.

Her istekte değişmesi gereken değerleri `define` dışında tutun ve çalışma zamanında çözün.

## Mesaj ayrıştırmayı derleme zamanına taşımak

Bu ekosistemdeki her olgun araç eninde sonunda aynı adımı atar: mesajları tarayıcı içinde ayrıştırmayı bırakmak.

| Eklenti                      | Derleme zamanına taşıdığı işlem                                                  |
| :--------------------------- | :------------------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | vue-i18n mesajlarını render fonksiyonlarına derler (salt çalışma paketi)         |
| Lingui (makro + eklenti)     | Katalogları ayıklar ve derler, makroları mesaj kimlikleriyle değiştirir          |
| Paraglide (inlang)           | Her mesajı kendi tree-shakable fonksiyonuna derler                               |
| `vite-intlayer`              | Bileşen bazında sözlükler oluşturur, kullanılmayan alanları temizler ve küçültür |

Ortak kazanım iki yönlüdür: çalışma zamanı mesaj derleyicisi paketten çıkarılır ve kullanılmayan metin girişleri statik olarak elenebilir hale gelir. Ortak maliyet ise hem geliştirme sunucunuzun hem de CI'ınızın eklentiye ihtiyaç duymasıdır.

vue-i18n en belirgin örnektir: `@intlify/unplugin-vue-i18n` olmadan, tarayıcıya `new Function` çağıran bir derleyici gönderirsiniz; bu hem gereksiz baytlar yükler hem de İçerik Güvenlik Politikası (CSP) sorunlarına yol açar.

## SSR: Dili asla modül düzeyindeki bir değişkende tutmayın

İster bir framework ister `vite-plugin-ssr` aracılığıyla SSR ekleyin, vazgeçilmez kural şudur: geçerli dili tutan modül düzeyindeki bir değişken, o sunucu sürecindeki tüm eşzamanlı istekler arasında paylaşılır.

```ts
// Tarayıcıda güvenli. Sunucuda istekler arası ciddi veri sızıntısı:
export let currentLocale = "en";
```

Sunucuya aynı anda gelen iki kullanıcı yarış durumuna (race condition) girer ve biri diğerinin dilinde içerik alır. Geliştirme ortamında tek istek olduğunuz için bu hata tekrarlanamaz. Dili her istek için ayrı ayrı çözün ve bağlam (context) ya da framework'ün istek düzeyindeki depolama alanı üzerinden açıkça iletin.

## Intlayer'ın Vite Eklentisi

Intlayer, sözlük derlemesini, geliştirme modu izlemesini ve optimizasyon ardışık düzenini yöneten tek bir eklenti kaydeder:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

İçe aktarma yeniden yazma, temizleme (purge) ve küçültme (minify) varsayılan olarak açıktır. Bilinmesi gereken iki ayar `intlayer.config.ts` dosyasında bulunur:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // hiçbir bileşenin okumadığı içerik alanlarını atar
    minify: true, // içerik anahtarlarını kısa takma adlarla yeniden adlandırır
  },
};

export default config;
```

İçerik devasa global dil dosyaları yerine bileşen başına tanımlandığından, temizleme adımı gerçek modül grafiğini analiz eder ve kullanılmayan kodların güvenle silinmesini sağlar. Ayrıntılar [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) dokümantasyonunda.

## Sık yapılan hatalar

- **Lazy loading amaçlı bir glob üzerinde `{ eager: true }` kullanmak.** Geliştirmede çalışır, canlıda tüm dilleri tek pakette sunar.
- **Klasör yapısının otomatik chunk üreteceğine güvenmek.** Rollup dizinleri değil, içe aktarmaları takip eder. Paketi ölçün.
- **Çeviri değişikliğini görmek için geliştirme sunucusunu yeniden başlatmak.** Eksik HMR desteğinin bir işaretidir.
- **Dili `define` içine koymak.** Dil başına ayrı bir derleme yapmayı zorunlu kılar.
- **SSR ile modül düzeyinde dil durumu saklamak.** Eşzamanlı isteklerde dillerin karışmasına neden olur.
- **Geliştirme sunucusunda performans kıyaslaması yapmak.** Paketlenmemiş modüller üretim paketi hakkında fikir vermez.

## İleri okuma

- [Paket optimizasyonu: temizleme, küçültme ve tarayıcıya ulaşan çıktılar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [Frameworkler arası kıyaslama raporları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [Yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Vite ve React ile Intlayer kurulumu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- [i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md)
- [React i18n: Sağlayıcı (Provider) modeli nasıl çalışır?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: Nasıl çalışır ve nerede zorlar?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/vue.md)
- [Bileşen bazlı ve merkezi i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
