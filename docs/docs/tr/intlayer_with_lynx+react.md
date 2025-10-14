---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Lynx and React mobile app uygulamanızı nasıl çevirirsiniz – i18n rehberi 2025
description: Lynx ve React mobil uygulamanızı çok dilli hale getirmeyi keşfedin. Dokümantasyonu takip ederek uluslararasılaştırma (i18n) yapın ve çevirin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer ile Lynx and React mobile app çevirin | Uluslararasılaştırma (i18n)

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-lynx-template)'na bakın.

## Intlayer Nedir?

**Intlayer**, modern uygulamalarda çok dilli desteği basitleştirmek için tasarlanmış **yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir**. Birçok JavaScript/TypeScript ortamında çalışır, **Lynx dahil** (`react-intlayer` paketi aracılığıyla).

Intlayer ile şunları yapabilirsiniz:

- **Bileşen düzeyinde bildirimsel sözlükler kullanarak çevirileri kolayca yönetin**.
- **Otomatik oluşturulan türlerle TypeScript desteği sağlayın**.
- **İçeriği dinamik olarak yerelleştirin**, **UI dizelerini** içerir (ve web için React'te HTML meta verilerini de yerelleştirebilir, vb.).
- **Dinamik yerel algılama ve değiştirme gibi gelişmiş özelliklerden yararlanın**.

---

## Adım 1: Bağımlılıkları Yükleyin

Lynx projenizden aşağıdaki paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### Paketler

- **intlayer**  
  Yapılandırma, sözlük içeriği, tür oluşturma ve CLI komutları için temel i18n araç takımı.

- **react-intlayer**  
  Lynx'te yerel ayarları elde etmek ve değiştirmek için kullanacağınız bağlam sağlayıcıları ve React hook'ları sağlayan React entegrasyonu.

- **lynx-intlayer**  
  Intlayer'ı Lynx paketleyici ile entegre etmek için eklentiyi sağlayan Lynx entegrasyonu.

---

## Adım 2: Intlayer Yapılandırması Oluşturun

Proje kökünüzde (veya uygun herhangi bir yerde) bir **Intlayer yapılandırma** dosyası oluşturun. Şöyle görünebilir:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Gerektiğiniz diğer yerel ayarları ekleyin
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Gerektiğiniz diğer yerel ayarları ekleyin
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Bu yapılandırma içinde şunları yapabilirsiniz:

- **Desteklenen yerel ayarlarınızın listesini** yapılandırın.
- Bir **varsayılan** yerel ayar belirleyin.
- Daha sonra daha gelişmiş seçenekler ekleyebilirsiniz (örneğin, günlükler, özel içerik dizinleri, vb.).
- Daha fazla bilgi için [Intlayer yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Adım 3: Lynx Paketleyiciye Intlayer Eklentisini Ekleyin

Lynx ile Intlayer kullanmak için `lynx.config.ts` dosyanıza eklentiyi eklemeniz gerekir:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... diğer eklentiler
    pluginIntlayerLynx(),
  ],
});
```

## Adım 4: Intlayer Sağlayıcısını Ekleyin

Kullanıcı dilini uygulamanız genelinde senkronize tutmak için kök bileşeninizi `react-intlayer`'dan `IntlayerProvider` bileşeniyle sarmalamanız gerekir.

Ayrıca, Intlayer'ın düzgün çalışmasını sağlamak için `intlayerPolyfill` fonksiyon dosyasını eklemeniz gerekir.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Adım 5: İçeriğinizi Bildirin

Projenizde herhangi bir yerde **içerik bildirim** dosyaları oluşturun (genellikle `src/` içinde), Intlayer'ın desteklediği uzantı formatlarından herhangi birini kullanarak:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- vb.

Örnek:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> İçerik bildirimleri hakkında detaylar için [Intlayer'ın içerik dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

---

## Adım 4: Bileşenlerinizde Intlayer'ı Kullanın

Yerelleştirilmiş içeriği almak için alt bileşenlerde `useIntlayer` hook'unu kullanın.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> `content.someKey`'i dize tabanlı prop'larda kullanırken (örneğin, bir düğmenin `title`ı veya `Text` bileşeninin `children`ı), gerçek dizeyi almak için **çağrı `content.someKey.value`** yapın.

---

## (İsteğe Bağlı) Adım 5: Uygulama Yerel Ayarını Değiştirin

Bileşenleriniz içinden yerel ayarları değiştirmek için `useLocale` hook'unun `setLocale` metodunu kullanabilirsiniz:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Bu, Intlayer içeriği kullanan tüm bileşenlerin yeniden işlenmesini tetikler, artık yeni yerel ayar için çevirileri gösterir.

> Daha fazla detay için [`useLocale` dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın.

## TypeScript'i Yapılandırın (TypeScript kullanıyorsanız)

Intlayer, otomatik tamamlama ve çeviri hatalarını yakalamayı iyileştirmek için gizli bir klasörde tür tanımlarını oluşturur (varsayılan olarak `.intlayer`):

```json5
// tsconfig.json
{
  // ... mevcut TS yapılandırmanız
  "include": [
    "src", // kaynak kodunuz
    ".intlayer/types/**/*.ts", // <-- otomatik oluşturulan türlerin dahil edildiğinden emin olun
    // ... zaten dahil ettiğiniz başka şeyler
  ],
}
```

Bu, aşağıdaki gibi özellikleri etkinleştirir:

- **Sözlük anahtarlarınız için otomatik tamamlama**.
- **Bir anahtara erişmediğinizde veya türü eşleşmediğinde uyaran tür kontrolü**.

---

## Git Yapılandırması

Intlayer tarafından otomatik oluşturulan dosyaları commit etmemek için `.gitignore`'nize aşağıdakileri ekleyin:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

---

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Uzantısı**'nı yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

## Daha Fazla Gidin

- **Görsel Düzenleyici**: Çevirileri görsel olarak yönetmek için [Intlayer Görsel Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)'yi kullanın.
- **CMS Entegrasyonu**: Sözlük içeriğinizi bir [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)'den harici hale getirebilir ve getirebilirsiniz.
- **CLI Komutları**: Çevirileri çıkarma veya eksik anahtarları kontrol etme gibi görevler için [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)'yi keşfedin.

---
