---
createdAt: 2025-06-18
updatedAt: 2025-10-02
title: Cách dịch ứng dụng React Native và Expo của bạn – Hướng dẫn i18n 2025
description: Khám phá cách làm cho trang web React Native và Expo của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
history:
  - version: 6.1.6
    date: 2025-10-02
    changes: Thêm phần debug
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web React Native và Expo của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Intlayer là gì?

**Intlayer** là một **thư viện quốc tế hóa (i18n) mã nguồn mở, sáng tạo** giúp đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng hiện đại. Nó hoạt động trong nhiều môi trường JavaScript/TypeScript, **bao gồm cả React Native** (thông qua gói `react-intlayer`).

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tự động tạo.
- **Định vị nội dung một cách động**, bao gồm **chuỗi giao diện người dùng** (và trong React cho web, nó cũng có thể định vị metadata HTML, v.v.).
- **Tận dụng các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

---

## Bước 1: Cài đặt các phụ thuộc

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-native-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-react-native-template) trên GitHub.

Từ dự án React Native của bạn, cài đặt các gói sau:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
```

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
bunx intlayer init
```

### Các gói

- **intlayer**  
  Bộ công cụ i18n cốt lõi dùng để cấu hình, nội dung từ điển, tạo kiểu, và các lệnh CLI.

- **react-intlayer**  
  Tích hợp React cung cấp các context provider và React hook mà bạn sẽ dùng trong React Native để lấy và chuyển đổi ngôn ngữ.

- **react-native-intlayer**  
  Tích hợp React Native cung cấp plugin Metro để tích hợp Intlayer với bundler của React Native.

---

## Bước 2: Tạo cấu hình Intlayer

Trong thư mục gốc dự án của bạn (hoặc bất cứ nơi nào thuận tiện), tạo một file **cấu hình Intlayer**. Nó có thể trông như sau:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
/**
 * Nếu kiểu Locales không khả dụng, hãy thử đặt moduleResolution thành "bundler" trong tsconfig.json của bạn
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Thêm bất kỳ ngôn ngữ nào bạn cần
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
      // ... Thêm bất kỳ ngôn ngữ nào bạn cần
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

Trong cấu hình này, bạn có thể:

- Cấu hình **danh sách các ngôn ngữ được hỗ trợ**.
- Đặt một ngôn ngữ **mặc định**.
- Sau này, bạn có thể thêm các tùy chọn nâng cao hơn (ví dụ: ghi log, thư mục nội dung tùy chỉnh, v.v.).
- Xem thêm tại [tài liệu cấu hình Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Bước 3: Thêm plugin Metro

Metro là một trình đóng gói (bundler) cho React Native. Đây là trình đóng gói mặc định cho các dự án React Native được tạo bằng lệnh `react-native init`. Để sử dụng Intlayer với Metro, bạn cần thêm plugin vào file `metro.config.js` của bạn:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Lưu ý: `configMetroIntlayer` là một hàm trả về promise. Sử dụng `configMetroIntlayerSync` nếu bạn muốn sử dụng nó đồng bộ, hoặc tránh dùng IFFE (Immediately Invoked Function Expression).
> Lưu ý: `configMetroIntlayerSync` không cho phép xây dựng các từ điển intlayer khi khởi động server

## Bước 4: Thêm Intlayer provider

Để giữ đồng bộ ngôn ngữ người dùng trên toàn bộ ứng dụng của bạn, bạn cần bao bọc component gốc của bạn với component `IntlayerProvider` từ `react-native-intlayer`.

> Hãy chắc chắn sử dụng provider từ `react-native-intlayer` thay vì `react-intlayer`. Export từ `react-native-intlayer` bao gồm các polyfill cho web API.

Ngoài ra, bạn cần thêm hàm `intlayerPolyfill` vào file `index.js` của bạn để đảm bảo Intlayer hoạt động đúng.

```tsx fileName="app/_layout.tsx" codeFormat="typescript"
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

```jsx fileName="app/_layout.mjx" codeFormat="esm"
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
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

```jsx fileName="app/_layout.cjx" codeFormat="commonjs"
const { Stack } = require("expo-router");
const { getLocales } = require("expo-localization");
const { IntlayerProvider } = require("react-native-intlayer");

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

module.exports = RootLayout;
```

## Bước 5: Khai báo Nội dung của Bạn

Tạo các tệp **khai báo nội dung** ở bất kỳ đâu trong dự án của bạn (thường là trong thư mục `src/`), sử dụng bất kỳ định dạng phần mở rộng nào mà Intlayer hỗ trợ:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- v.v.

Ví dụ (TypeScript với các node TSX cho React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Từ điển nội dung cho miền "app" của chúng ta
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

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";
import { ReactNode } from "react";

/** @type {import('intlayer').Dictionary} */
// Từ điển nội dung cho ứng dụng
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

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Từ điển nội dung cho ứng dụng
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

> Để biết chi tiết về khai báo nội dung, xem [tài liệu nội dung của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

---

## Bước 4: Sử dụng Intlayer trong các Component của bạn

Sử dụng hook `useIntlayer` trong các component con để lấy nội dung đã được bản địa hóa.

### Ví dụ

```tsx fileName="app/(tabs)/index.tsx" codeFormat="typescript"
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

```jsx fileName="app/(tabs)/index.content.msx" codeFormat="esm"
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HomeScreen = () => {
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
    flexDirection: "row", // hướng linh hoạt theo hàng ngang
    alignItems: "center", // căn giữa theo chiều dọc
    gap: 8, // khoảng cách giữa các phần tử
  },
});

export default HomeScreen;
```

```jsx fileName="app/(tabs)/index.content.csx" codeFormat="commonjs"
const { Image, StyleSheet, Platform } = require("react-native");
const { useIntlayer } = require("intlayer");
const { HelloWave } = require("@/components/HelloWave");
const ParallaxScrollView = require("@/components/ParallaxScrollView");
const { ThemedText } = require("@/components/ThemedText");
const { ThemedView } = require("@/components/ThemedView");

const HomeScreen = () => {
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
    flexDirection: "row", // hướng linh hoạt theo hàng ngang
    alignItems: "center", // căn giữa theo chiều dọc
    gap: 8, // khoảng cách giữa các phần tử
  },
});

module.exports = HomeScreen;
```

> Khi sử dụng `content.someKey` trong các props dạng chuỗi (ví dụ, `title` của một nút hoặc `children` của một component `Text`), **hãy gọi `content.someKey.value`** để lấy chuỗi thực tế.

---

## (Tùy chọn) Bước 5: Thay đổi Ngôn ngữ Ứng dụng

Để chuyển đổi ngôn ngữ từ bên trong các component của bạn, bạn có thể sử dụng phương thức `setLocale` của hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react.intlayer";

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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher = () => {
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { View, Text, TouchableOpacity, StyleSheet } = require("react-native");
const { getLocaleName } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
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

Điều này kích hoạt việc render lại tất cả các component sử dụng nội dung Intlayer, giờ đây hiển thị bản dịch cho locale mới.

> Xem thêm tài liệu [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md) để biết chi tiết.

## Cấu hình TypeScript (nếu bạn sử dụng TypeScript)

Intlayer tạo ra các định nghĩa kiểu trong một thư mục ẩn (mặc định là `.intlayer`) để cải thiện tính năng tự động hoàn thành và phát hiện lỗi dịch:

```json5
// tsconfig.json
{
  // ... cấu hình TS hiện có của bạn
  "include": [
    "src", // mã nguồn của bạn
    ".intlayer/types/**/*.ts", // <-- đảm bảo các kiểu tự động tạo được bao gồm
    // ... bất cứ thứ gì khác bạn đã bao gồm
  ],
}
```

Điều này cho phép các tính năng như:

- **Tự động hoàn thành** cho các khóa từ điển của bạn.
- **Kiểm tra kiểu** cảnh báo nếu bạn truy cập khóa không tồn tại hoặc sai kiểu.

---

## Cấu hình Git

Để tránh commit các file được Intlayer tự động tạo, hãy thêm đoạn sau vào `.gitignore` của bạn:

```plaintext
# Bỏ qua các file do Intlayer tạo ra
.intlayer
```

---

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi theo thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, tham khảo [Tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Đi xa hơn

- **Trình chỉnh sửa trực quan**: Sử dụng [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) để quản lý bản dịch một cách trực quan.
- **Tích hợp CMS**: Bạn cũng có thể tách riêng và lấy nội dung từ từ điển của mình từ một [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).
- **Lệnh CLI**: Khám phá [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md) cho các tác vụ như **trích xuất bản dịch** hoặc **kiểm tra các khóa bị thiếu**.

Chúc bạn xây dựng các ứng dụng **React Native** với i18n đầy đủ sức mạnh thông qua **Intlayer**!

---

### Gỡ lỗi

React Native có thể kém ổn định hơn so với React Web, vì vậy hãy chú ý đặc biệt đến việc đồng bộ phiên bản.

Intlayer chủ yếu hướng đến Web Intl API; trên React Native bạn phải bao gồm các polyfill phù hợp.

Danh sách kiểm tra:

- Sử dụng các phiên bản mới nhất của `intlayer`, `react-intlayer`, và `react-native-intlayer`.
- Kích hoạt polyfill của Intlayer.
- Nếu bạn sử dụng `getLocaleName` hoặc các tiện ích dựa trên Intl-API khác, hãy nhập các polyfill này sớm (ví dụ trong `index.js` hoặc `App.tsx`):

```ts
import "intl";
// Nhập polyfill để hỗ trợ các tính năng Intl khác nhau
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Kiểm tra cấu hình Metro của bạn (bí danh resolver, plugin tài sản, đường dẫn `tsconfig`) nếu các module không thể được giải quyết.

---
