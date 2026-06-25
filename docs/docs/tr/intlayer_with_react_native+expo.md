---
createdAt: 2025-09-07
updatedAt: 2026-06-25
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Sağlayıcıları ve hook'ları doğrudan react-native-intlayer'dan içe aktarın; react-intlayer artık doğrudan bağımlılık olarak gerekli değildir"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API kullanımını doğrudan özellik erişimine güncelle"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu ekle"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmişi başlat"
author: aymericzip
---

# Expo ve React Native uygulamanızı çevirin | Uluslararasılaştırma (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## İçindekiler

<TOC/>

## Neden alternatifler yerine Intlayer?

`react-native-localize` veya `i18next` gibi ana çözümlerle karşılaştırıldığında Intlayer, aşağıdaki gibi entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Tam React Native kapsamı">

Intlayer, **bileşen düzeyinde içerik kapsamı**, **TypeScript desteği** ve mobil uygulamalarda uluslararasılaştırmayı (i18n) ölçeklendirmek için gereken tüm özellikleri sunarak React Native ve Expo ile mükemmel çalışacak şekilde optimize edilmiştir.

</Accordion>

<Accordion header="Sürdürülebilirlik">

Uygulamanızın içeriğinin kapsamını belirlemek, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. İçerik kod tabanınızın tamamını gözden geçirmenin zihinsel yükü olmadan, tek bir özellik klasörünü çoğaltabilir veya silebilirsiniz. Ayrıca Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplendirilmiş (fully typed)tır**.

</Accordion>

<Accordion header="Yapay Zeka Temsilcisi">

İçeriğin bir arada konumlandırılması **Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için **CLI** gibi bir araç paketiyle birlikte gelir; **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** ve **[aracı becerileri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, geliştirici deneyimini (DX) yapay zeka ajanları için daha da sorunsuz hale getirmek için.

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

<Steps>

<Step number={1} title="Bağımlılıkları Kurma">

GitHub'da [Uygulama Şablonu](https://github.com/aymericzip/intlayer-react-native-template)na bakın.

React Native projenizden aşağıdaki paketleri kurun:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` bayrağı isteğe bağlıdır. Bir yapay zeka aracısıysanız `intlayer-cli init` kullanın.

> Bu komut ortamınızı algılayacak ve gerekli paketleri yükleyecektir. Örneğin:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Paketler

- **intlayer**  
  Yapılandırma, sözlük içeriği, tür oluşturma ve CLI komutları için çekirdek i18n araç takımı.

- **react-native-intlayer**  
  React Native entegrasyonu, yerel ayarları elde etmek ve değiştirmek için kullanacağınız bağlam sağlayıcıları ve React kancalarını, React Native polyfill'lerini ve Intlayer'ı React Native paketleyici ile entegre etmek için Metro eklentisini sağlar. `react-intlayer`'dan her şeyi yeniden dışa aktarır, bu nedenle bir React Native uygulamasında yalnızca bu tek pakete ihtiyaç duyarsınız.

---

</Step>

<Step number={2} title="Intlayer Yapılandırması Oluşturma">

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

</Step>

<Step number={3} title="Metro Eklentisini Ekleyin">

Metro, React Native için bir paketleyicidir. `react-native init` komutuyla oluşturulan React Native projeleri için varsayılan paketleyicidir. Metro ile Intlayer'ı kullanmak için, `metro.config.js` dosyanıza eklentiyi eklemeniz gerekir:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Not: `configMetroIntlayer` bir promise fonksiyonudur. Eş zamanlı kullanmak istiyorsanız `configMetroIntlayerSync` kullanın veya IIFE'den (Hemen Çağrılan Fonksiyon İfadesi) kaçının.
> Not: `configMetroIntlayerSync`, sunucu başlatıldığında intlayer sözlükleri oluşturmaya izin vermez

</Step>

<Step number={4} title="Intlayer Sağlayıcısını Ekleyin">

Uygulamanız genelinde kullanıcı dilini senkronize tutmak için, kök bileşeninizi `react-native-intlayer`'dan gelen `IntlayerProvider` bileşeni ile sarmanız gerekir.

> Her zaman `react-native-intlayer`'dan içe aktarın. Onun `IntlayerProvider`'ı, Intlayer tarafından kullanılan web API'si için polyfill'leri içerir ve paket, `react-intlayer`'dan tüm hook'ları ve yardımcı programları yeniden dışa aktarır.

Ayrıca Intlayer'ın düzgün çalışmasını sağlamak için `intlayerPolyfill` fonksiyonunu `index.js` dosyanıza eklemeniz gerekir.

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

</Step>

<Step number={5} title="İçeriğinizi Bildirin">

Projenizde herhangi bir yerde **içerik bildirim** dosyaları oluşturun (genellikle `src/` içinde), Intlayer'ın desteklediği uzantı formatlarından herhangi birini kullanarak:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- vb.

> **Expo Router (web): `.content.*` dosyalarını `app/` dizininin dışında tutun.** Expo Router, `app/` içindeki her JavaScript/TypeScript dosyasını bir rota olarak ele alır. Web'de rota keşfi doğrudan dosya sistemini tarar ve Metro'nun `resolver.blockList` ayarını **dikkate almaz**, bu nedenle aynı konumdaki `*.content.ts` bir rota olarak kaydedilir. `app/(tabs)/_layout.content.ts` gibi bir dosya bir düzen (layout) olarak bile ayrıştırılır (`.content` kısmı bir platform eki olarak okunur), bu da gerçek `_layout.tsx` ile çakışır ve şu hatayı fırlatır:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Bildirimlerinizi `app/` dışında bir dizine yerleştirin (örneğin `content/` veya `src/content/`). Intlayer, `.content.*` dosyalarını projede herhangi bir yerde keşfeder ve sözlüklere kendi `key` değerleri üzerinden atıfta bulunulur, bu nedenle içe aktarma değişikliklerine gerek yoktur. Yerel uygulamalarda bu gerekli değildir (Metro'nun `blockList` ayarı bunları zaten gizler), ancak `app/` dışı bir dizin kullanmak her iki platformun da çalışmasını sağlar.

Örnek (React Native için TSX düğümleriyle TypeScript):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number={6} title="Bileşenlerinizde Intlayer'ı Kullanın">

Alt bileşenlerde yerelleştirilmiş içerik almak için `useIntlayer` kancasını kullanın.

### Örnek

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
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

</Step>

<Step number={7} title="Uygulama Yerel Ayarını Değiştirin" isOptional={true}>

Bileşenlerinizden yerel ayarları değiştirmek için, `useLocale` kancasının `setLocale` metodunu kullanabilirsiniz:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

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

</Step>

</Steps>

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
# Intlayer tarafından oluşturulan dosyaları yok say
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

### Debug

React Native, React Web'ten daha az stabil olabilir, bu nedenle sürüm uyumuna ekstra dikkat edin.

Intlayer öncelikle Web Intl API'sini hedefler; React Native'de uygun polyfill'leri eklemeniz gerekir.

Kontrol Listesi:

- `intlayer` ve `react-native-intlayer`'ın en son sürümlerini kullanın.
- Intlayer polyfill'ini etkinleştirin.
- `getLocaleName` veya diğer Intl-API tabanlı yardımcı programları kullanıyorsanız, bu polyfill'leri erken aktarın (örneğin `index.js` veya `App.tsx` içinde):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Modüller çözümlenemezse Metro yapılandırmanızı (resolver takma adları, asset eklentileri, `tsconfig` yolları) doğrulayın.

---
