---
createdAt: 2025-09-07
updatedAt: 2026-05-31
title: "Expo + React Native i18n - Uygulamanızı çevirmek için eksiksiz kılavuz"
description: "Artık i18next yok. 2026 yılı için çok dilli (i18n) Expo + React Native uygulaması oluşturma kılavuzu. Yapay zeka ajanlarıyla çevirin ve bundle boyutu, SEO ve performansı optimize edin."
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmişi başlat"
---

# Expo ve React Native uygulamanızı çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-react-native-template)na bakın.

## Neden alternatifler yerine Intlayer?

'React-native-localize' veya 'i18next' gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam React Native kapsamı">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **TypeScript desteği** ve mobil uygulamalarda uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak React Native ve Expo ile mükemmel çalışacak şekilde optimize edilmiştir.

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

<Accordion header="Bundle boyutu">

Sayfalarınıza çok büyük JSON dosyaları yüklemek yerine yalnızca gerekli içeriği yükleyin. Intlayer **paketinizi ve görüntüleme boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>
</AccordionGroup>

## 1. Adım: Bağımlılıkları Kurun

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-react-native-template) konusuna bakın.

React Native projenizden aşağıdaki paketleri yükleyin:

````bash packageManager = "npm"
npm intlayer tepki-intlayer'ı kurun
npm kurulumu --save-dev react-native-intlayer
npx katman içi başlatma
''''

```bash packageManager = "pnpm"
pnpm ara katman ekle tepki-ara katman
pnpm add --save-dev react-native-intlayer
pnpm katman içi başlatma
''''

```bash packageManager = "iplik"
iplik ekleme ara katman reaksiyon-ara katman
iplik ekleme --save-dev react-native-intlayer
iplik ara katmanı başlangıcı
''''

```bash packageManager = "topuz"
topuz ekle ara katman reaksiyon-ara katman
topuz ekle --dev react-native-intlayer
bun x ara katman başlatma
''''

### Paketler

- **ara katman**
  Yapılandırma, sözlük içeriği, tür oluşturma ve CLI komutları için temel i18n araç seti.

- **tepki katmanı**
  Yerel ayarları edinmek ve değiştirmek için React Native'de kullanacağınız içerik sağlayıcıları ve React kancalarını sağlayan React entegrasyonu.

- **tepki-yerel-intlayer**
  Intlayer'ı React Native paketleyiciyle entegre etmek için Metro eklentisini sağlayan React Native entegrasyonu.

---

## Adım 1: Bağımlılıkları Kurma

React Native projenizden aşağıdaki paketleri kurun:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
````

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bun x intlayer init
```

### Paketler

- **intlayer**  
  Yapılandırma, sözlük içeriği, tür oluşturma ve CLI komutları için çekirdek i18n araç takımı.

- **react-intlayer**  
  React entegrasyonu, React Native'te yerel ayarları elde etmek ve değiştirmek için kullanacağınız bağlam sağlayıcıları ve React kancalarını sağlar.

- **react-native-intlayer**  
  React Native entegrasyonu, Intlayer'ı React Native paketleyici ile entegre etmek için Metro eklentisini sağlar.

---

## Adım 2: Intlayer Yapılandırması Oluşturma

Proje kökünüzde (veya uygun herhangi bir yerde), bir **Intlayer yapılandırma** dosyası oluşturun. Şöyle görünebilir:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * Eğer Locales türleri mevcut değilse, tsconfig.json'da moduleResolution'ı "bundler" olarak ayarlamayı deneyin
 */
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
- Daha sonra, daha gelişmiş seçenekler ekleyebilirsiniz (örneğin, günlükler, özel içerik dizinleri, vb.).
- Daha fazla bilgi için [Intlayer yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## Adım 3: Metro Eklentisini Ekleyin

Metro, React Native için bir paketleyicidir. `react-native init` komutuyla oluşturulan React Native projeleri için varsayılan paketleyicidir. Metro ile Intlayer'ı kullanmak için, `metro.config.js` dosyanıza eklentiyi eklemeniz gerekir:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Adım 4: Intlayer Sağlayıcısını Ekleyin

Uygulamanız genelinde kullanıcı dilini senkronize tutmak için, kök bileşeninizi `react-intlayer-native`'den gelen `IntlayerProvider` bileşeni ile sarmanız gerekir.

> `react-intlayer` yerine `react-native-intlayer`'dan gelen sağlayıcıyı kullandığınızdan emin olun. `react-native-intlayer`'dan gelen dışa aktarım, web API'si için polyfill'leri içerir.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
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

Örnek (React Native için TSX düğümleriyle TypeScript):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * "app" alanımız için içerik sözlüğü
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> İçerik bildirimleri hakkında detaylar için [Intlayer'ın içerik dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) bakın.

---

## Adım 4: Bileşenlerinizde Intlayer'ı Kullanın

Alt bileşenlerde yerelleştirilmiş içerik almak için `useIntlayer` kancasını kullanın.

### Örnek

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> `content.someKey`'i dize tabanlı özelliklerde kullandığınızda (örneğin, bir düğmenin `title`ı veya bir `Text` bileşeninin `children`ı), gerçek dizeyi almak için **`content.someKey.value`** çağırın.

> Eğer uygulamanız zaten mevcutsa, binlerce bileşeni bir saniye içinde dönüştürmek için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)'ı [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md) ile birlikte kullanabilirsiniz.

---

## (İsteğe Bağlı) Adım 5: Uygulama Yerel Ayarını Değiştirin

Bileşenlerinizden yerel ayarları değiştirmek için, `useLocale` kancasının `setLocale` metodunu kullanabilirsiniz:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

Bu, Intlayer içeriği kullanan tüm bileşenlerin yeniden işlenmesini tetikler, artık yeni yerel ayar için çevirileri gösterir.

> Daha fazla detay için [`useLocale` dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) bakın.

## TypeScript Yapılandırma (TypeScript kullanıyorsanız)

Intlayer, otomatik tamamlama ve çeviri hatalarını yakalamak için gizli bir klasörde (.intlayer varsayılan olarak) tür tanımlarını oluşturur:

```json5
// tsconfig.json
{
  // ... mevcut TS yapılandırmanız
  "include": [
    "src", // kaynak kodunuz
    ".intlayer/types/**/*.ts", // <-- otomatik olarak oluşturulan türlerin dahil edildiğinden emin olun
    // ... zaten dahil ettiğiniz başka şeyler
  ],
}
```

Bu, aşağıdaki gibi özellikleri etkinleştirir:

- **Sözlük anahtarlarınız için otomatik tamamlama**.
- **Var olmayan bir anahtara eriştiğinizde veya türü eşleşmediğinde sizi uyaran tür kontrolü**.

---

## Git Yapılandırma

Intlayer tarafından otomatik olarak oluşturulan dosyaları göndermekten kaçınmak için, `.gitignore`'nize aşağıdakileri ekleyin:

```bash
#  Intlayer tarafından oluşturulan dosyaları yok say
.intlayer
```

---

### VS Code Uzantısı

Intlayer ile geliştirme deneyiminizi geliştirmek için, resmi **Intlayer VS Code Uzantısı**'nı kurabilirsiniz.

[VS Code Marketplace'ten Kurun](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu uzantı şunları sağlar:

- **Çeviri anahtarları için otomatik tamamlama**.
- **Eksik çeviriler için gerçek zamanlı hata algılama**.
- **Çevrilmiş içeriğin satır içi önizlemeleri**.
- **Çevirileri kolayca oluşturmak ve güncellemek için hızlı eylemler**.

Uzantının nasıl kullanılacağı hakkında daha fazla detay için, [Intlayer VS Code Uzantısı dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakın.

---

## Daha Fazla İlerleyin

- **Görsel Düzenleyici**: Çevirileri görsel olarak yönetmek için [Intlayer Görsel Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)'yi kullanın.
- **CMS Entegrasyonu**: Sözlük içeriğinizi bir [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)'den harici hale getirebilir ve getirebilirsiniz.
- **CLI Komutları**: Çevirileri çıkarma veya eksik anahtarları kontrol etme gibi görevler için [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)'yi keşfedin.

**Intlayer** ile tam güçlendirilmiş i18n ile **React Native** uygulamalarınızı oluşturmanın keyfini çıkarın!

---
