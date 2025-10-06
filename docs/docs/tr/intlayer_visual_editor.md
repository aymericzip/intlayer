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
---

# Intlayer Görsel Düzenleyici Dokümantasyonu

<iframe title="Web Uygulamanız İçin Görsel Düzenleyici + CMS: Intlayer Açıklaması" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Yapılandırma

Intlayer yapılandırma dosyanızda düzenleyici ayarlarını özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * Görsel düzenleyici sunucusu tarafından kullanılan port.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * İsteğe bağlı
     * Varsayılan olarak "http://localhost:8000"
     * Uygulamadan erişilecek düzenleyici sunucusunun URL'si. Güvenlik nedeniyle uygulamayla etkileşim kurabilecek kaynakları kısıtlamak için kullanılır. '*' olarak ayarlanırsa, düzenleyici herhangi bir kaynaktan erişilebilir. Port değiştirilirse veya düzenleyici farklı bir domaine barındırılırsa ayarlanmalıdır.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer yapılandırma ayarları
  editor: {
    /**
     * Gerekli
     * Uygulamanın URL'si.
     * Bu, görsel düzenleyici tarafından hedeflenen URL'dir.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
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
    /**
     * İsteğe bağlı
     * Varsayılan olarak `true`. Eğer `false` ise, düzenleyici etkin değildir ve erişilemez.
     * Güvenlik nedeniyle üretim gibi belirli ortamlar için düzenleyiciyi devre dışı bırakmak için kullanılabilir.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
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

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
