---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer Görsel Düzenleyici | İçeriğinizi görsel düzenleyici kullanarak düzenleyin
description: Çok dilli web sitenizi yönetmek için Intlayer Düzenleyici'yi nasıl kullanacağınızı keşfedin. Bu çevrimiçi dokümantasyondaki adımları takip ederek projenizi birkaç dakikada kurun.
keywords:
  - Düzenleyici
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer Görsel Düzenleyici Dokümantasyonu

<iframe title="Web Uygulamanız İçin Görsel Düzenleyici + CMS: Intlayer Açıklaması" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Görsel Düzenleyici, web sitenizi bir iframe içine sararak içerik bildirim dosyalarınızla görsel düzenleyici kullanarak etkileşim kurmanıza olanak tanıyan bir araçtır.

![Intlayer Görsel Düzenleyici Arayüzü](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

`intlayer-editor` paketi Intlayer'a dayanır ve JavaScript uygulamaları için kullanılabilir, örneğin React (Create React App), Vite + React ve Next.js.

## Görsel düzenleyici vs CMS

Intlayer Görsel düzenleyici, yerel sözlüklerinizde içeriğinizi görsel düzenleyici ile yönetmenizi sağlayan bir araçtır. Bir değişiklik yapıldıktan sonra, içerik kod tabanında değiştirilecektir. Bu, uygulamanın yeniden oluşturulacağı ve yeni içeriği görüntülemek için sayfanın yeniden yükleneceği anlamına gelir.

Buna karşılık, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), uzak sözlüklerinizde içeriğinizi görsel düzenleyici ile yönetmenizi sağlayan bir araçtır. Bir değişiklik yapıldıktan sonra, içerik **kod tabanınızı etkilemeyecektir**. Ve web sitesi otomatik olarak değiştirilen içeriği görüntüleyecektir.

## Intlayer'ı uygulamanıza entegre edin

Intlayer'ı entegre etme hakkında daha fazla detay için aşağıdaki ilgili bölüme bakın:

### Next.js ile entegrasyon

Next.js ile entegrasyon için [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) bakın.

### Create React App ile entegrasyon

Create React App ile entegrasyon için [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md) bakın.

### Vite + React ile entegrasyon

Vite + React ile entegrasyon için [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) bakın.

## Intlayer Düzenleyici Nasıl Çalışır

Görsel düzenleyici, iki şeyi içeren bir uygulamadır:

- Web sitenizi bir iframe içinde görüntüleyecek bir ön uç uygulaması. Web siteniz Intlayer kullanıyorsa, görsel düzenleyici içeriğinizi otomatik olarak algılayacak ve onunla etkileşim kurmanıza izin verecektir. Bir değişiklik yapıldıktan sonra, değişikliklerinizi indirebileceksiniz.

- İndirme düğmesine tıkladığınızda, görsel düzenleyici sunucuya bir istek göndererek içerik bildirim dosyalarınızı yeni içerikle değiştirecektir (bu dosyalar projenizde nerede bildirilmiş olursa olsun).

> Şimdilik, Intlayer Düzenleyici içerik bildirim dosyalarınızı JSON dosyaları olarak yazacaktır.

## Kurulum

Intlayer projenizde yapılandırıldıktan sonra, `intlayer-editor`'ı geliştirme bağımlılığı olarak yükleyin:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

`--with` bayrağı ile editörü başka bir komutla paralel olarak başlatabilirsiniz:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Yapılandırma

Intlayer yapılandırma dosyanızda düzenleyici ayarlarını özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... diğer yapılandırma ayarları
  editor: {
    /**
     * Gerekli
     * Uygulamanın URL'si.
     * Bu, görsel düzenleyici tarafından hedeflenen URL'dir.
     * Örnek: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * İsteğe bağlı
     * Varsayılan olarak `true`. Eğer `false` ise, düzenleyici etkin değildir ve erişilemez.
     * Güvenlik nedeniyle üretim gibi belirli ortamlar için düzenleyiciyi devre dışı bırakmak için kullanılabilir.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * İsteğe bağlı
     * Varsayılan olarak `8000`.
     * Düzenleyici sunucusunun portu.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * İsteğe bağlı
     * Varsayılan olarak "http://localhost:8000"
     * Düzenleyici sunucusunun URL'si.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Kullanılabilir tüm parametreleri görmek için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Düzenleyiciyi Kullanma

1. Düzenleyici yüklendiğinde, düzenleyiciyi aşağıdaki komutla başlatabilirsiniz:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Uygulamanızı paralel olarak çalıştırmanız gerektiğini unutmayın.** Uygulama URL'si düzenleyici yapılandırmasında ayarladığınızla eşleşmelidir (`applicationURL`).

> **Komutun `intlayer` paketi tarafından yeniden ihraç edildiğini unutmayın. Bunun yerine `npx intlayer editor start` komutunu kullanabilirsiniz.**

2. Ardından, sağlanan URL'yi açın. Varsayılan olarak `http://localhost:8000`.

   İmlecinizi içeriğinizin üzerine getirerek Intlayer tarafından indekslenen her alanı görüntüleyebilirsiniz.

   ![İçerik üzerinde gezinme](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. İçeriğinizin ana hatları varsa, düzenleme çekmecesini görüntülemek için uzun basın.

## Ortam yapılandırması

Düzenleyici belirli bir ortam dosyasını kullanacak şekilde yapılandırılabilir. Bu, geliştirme ve üretim için aynı yapılandırma dosyasını kullanmak istediğinizde yararlıdır.

Düzenleyiciyi başlatırken belirli bir ortam dosyası kullanmak için `--env-file` veya `-f` bayrağını kullanabilirsiniz:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Ortam dosyasının projenizin kök dizininde bulunması gerektiğini unutmayın.

Veya ortamı belirtmek için `--env` veya `-e` bayrağını kullanabilirsiniz:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpx intlayer-editor start -e development
```

## Hata ayıklama

Görsel düzenleyici ile herhangi bir sorunla karşılaşırsanız, aşağıdakileri kontrol edin:

- Görsel düzenleyici ve uygulama çalışıyor.

- Intlayer yapılandırma dosyanızda [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) yapılandırması doğru şekilde ayarlandı.
  - Gerekli alanlar:
    - Uygulama URL'si düzenleyici yapılandırmasında ayarladığınızla eşleşmelidir (`applicationURL`).

- Görsel düzenleyici web sitenizi görüntülemek için bir iframe kullanır. Web sitenizin İçerik Güvenlik Politikası'nın (CSP) CMS URL'sini `frame-ancestors` olarak izin verdiğinden emin olun (varsayılan olarak 'http://localhost:8000'). Herhangi bir hata için düzenleyici konsolunu kontrol edin.

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Görsel düzenleyici ile CMS arasındaki fark nedir?">

Görsel düzenleyici yerel sözlükleri düzenler ve değişiklikleri doğrudan kaynak kod dosyalarınıza kaydeder, böylece normal Git inceleme sürecinden geçer. CMS ise içeriği uzak sunucuda saklar ve dağıtım olmadan yayınlar.

</Question>

<Question title="i18n paket boyutuma ne kadar ekler?">

Ad alanı (namespace) tabanlı bir kuruluma kıyasla çok daha az, çünkü bir sayfa render etmediği bir sözlüğü asla indirmez. Sunucu tarafında render edilen markup içeriği sunucuda çözer ve derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük kayıtlarıyla değiştirir, böylece kullanılmayan anahtarlar ve diller elenir. [Dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Yaygın alternatiflerle karşılaştırıldığında Intlayer paket ve sayfa boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="i18next, next-intl veya react-i18next'ten bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Evet, iki yol mevcuttur. [i18next geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) veya [next-intl geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md) ile içeriği aşamalı olarak taşıyabilirsiniz. Ya da mevcut API'nizi tamamen koruyabilirsiniz: [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md), `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` ve `Lingui` ile tamamen aynı API'yi sunar, ancak Intlayer sözlükleri tarafından desteklenir; böylece yalnızca import satırları değişir, bileşen kodu aynı kalır.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

Tam otomatik bir akış için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında JSX, TSX, Vue ve Svelte kodunda aynı işlemi yapar ve sözlükleri her değişiklikte otomatik üretir, böylece elle anahtar yönetimi gerekmez. Statik analizle çalıştığından, yalnızca çalışma zamanında var olan dizeler kapsam dışı kalır.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="Görsel düzenleyici nerede çalışır?">

Kendi altyapınızda. Uygulamanızı bir iframe içinde yükler ve yerel bir düzenleyici sunucusuyla iletişim kurar, bu nedenle içeriğiniz makinenizden dışarı çıkmaz.

</Question>

<Question title="Düzenleyicilerin kod bilmesi gerekir mi?">

Hayır. Siteyi açar, bir metin öğesine doğrudan tıklar ve yerinde düzenlerler. Düzenleyici hangi sözlük kaydının metni sağladığını otomatik bulur.

</Question>

<Question title="Görsel düzenleyici üzerinden düzenleme yapmak kaynak dosyalarımı değiştirir mi?">

Evet, amaç budur. Değişiklik kod tabanınızdaki içerik bildirim dosyasına yazılır ve git diff üzerinde normal bir commit olarak görünür.

</Question>

<Question title="Düzenleyici boş bir sayfa gösteriyor veya sitemi yüklemeyi reddediyor. Neyi kontrol etmeliyim?">

Düzenleyici sitenizi iframe içinde görüntüler, bu nedenle İçerik Güvenlik Politikanızın (CSP) düzenleyici kaynağına `frame-ancestors` direktifinde izin vermesi gerekir. Ayrıca hem uygulama hem düzenleyici sunucusunun çalıştığından emin olun.

</Question>

<Question title="Görsel düzenleyiciyi üretimde kullanabilir miyim?">

Geliştirme ve hazırlık (staging) ortamları için tasarlanmıştır. Canlı üretim sitelerindeki anlık düzenlemeler için [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) önerilir.

</Question>

<Question title="Görsel düzenleyici ücretsiz mi?">

Evet. Görsel düzenleyici ticari kullanım dahil Apache 2.0 lisansı altında açık kaynak projesinin bir parçasıdır.

</Question>

</FAQ>
