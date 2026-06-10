---
createdAt: 2025-09-07
updatedAt: 2026-05-31
title: "Lynx + React i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Lynx + React uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
---

# Intlayer ile Lynx and React mobile app çevirin | Uluslararasılaştırma (i18n)

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-lynx-template)'na bakın.

## Neden alternatifler yerine Intlayer?

'React-native-localize' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam Lynx kapsamı">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **TypeScript desteği** ve uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak Lynx ve React ile mükemmel çalışacak şekilde optimize edilmiştir.

</Accordion>

<Accordion header="Bundle boyutu">

Sayfalarınıza çok büyük JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer **bundle ve sayfa boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğinin kapsamını belirlemek, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. İçerik kod tabanınızın tamamını gözden geçirmenin zihinsel yükü olmadan, tek bir özellik klasörünü çoğaltabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiş (fully typed)tır**.

</Accordion>

<Accordion header="Yapay Zeka Temsilcisi">

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[aracı becerileri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka için daha da sorunsuz hale getirmek için ajanlar.

</Accordion>

<Accordion header="Otomasyon">

Maliyeti AI sağlayıcınıza ait olmak üzere seçtiğiniz LLM'yi kullanarak CI/CD işlem hattınızda çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici** ve **arka planda çeviri yapmaya** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak performans ve tepkime sorunlarına yol açabilir. Intlayer, içerik yüklemenizi derleme sırasında optimize eder.

</Accordion>

<Accordion header="Non-dev ile ölçeklendirme">

Bir i18n çözümünden çok daha fazlası olan Intlayer, **kendi kendine barındırılan bir [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** ve **[tam CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** çok dilli içeriğinizi **gerçek zamanlı** olarak yönetmenize yardımcı olarak çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini kusursuz hale getirir. İçerik yerel olarak ve/veya uzaktan depolanabilir.

</Accordion>
</AccordionGroup>

---

<Steps>

<Step number={1} title="Bağımlılıkları Yükleyin">

Lynx projenizden aşağıdaki paketleri yükleyin:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bun x intlayer init
```

### Paketler

- **intlayer**  
  Yapılandırma, sözlük içeriği, tür oluşturma ve CLI komutları için temel i18n araç takımı.

- **react-intlayer**  
  Lynx'te yerel ayarları elde etmek ve değiştirmek için kullanacağınız bağlam sağlayıcıları ve React hook'ları sağlayan React entegrasyonu.

- **lynx-intlayer**  
  Intlayer'ı Lynx paketleyici ile entegre etmek için eklentiyi sağlayan Lynx entegrasyonu.

---

</Step>

<Step number={2} title="Intlayer Yapılandırması Oluşturun">

Proje kökünüzde (veya uygun herhangi bir yerde) bir **Intlayer yapılandırma** dosyası oluşturun. Şöyle görünebilir:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

Bu yapılandırma içinde şunları yapabilirsiniz:

- **Desteklenen yerel ayarlarınızın listesini** yapılandırın.
- Bir **varsayılan** yerel ayar belirleyin.
- Daha sonra daha gelişmiş seçenekler ekleyebilirsiniz (örneğin, günlükler, özel içerik dizinleri, vb.).
- Daha fazla bilgi için [Intlayer yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

</Step>

<Step number={3} title="Lynx Paketleyiciye Intlayer Eklentisini Ekleyin">

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

</Step>

<Step number={4} title="Intlayer Sağlayıcısını Ekleyin">

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

</Step>

<Step number={5} title="İçeriğinizi Bildirin">

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

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number={6} title="Bileşenlerinizde Intlayer'ı Kullanın">

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

</Step>

<Step number={7} title="Uygulama Yerel Ayarını Değiştirin">

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

</Step>

</Steps>

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

```bash
#  Intlayer tarafından oluşturulan dosyaları yok say
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
- **CLI Komutları**: Çevirileri çıkarma veya eksik anahtarları kontrol etme gibi görevler için [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)'yi keşfedin.

---
