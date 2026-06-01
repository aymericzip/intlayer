---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: Expo + React Native i18n - Hướng dẫn đầy đủ để dịch React Native
description: Giải pháp tốt nhất cho kích thước bundle, SEO, hiệu suất & khả năng bảo trì. Làm cho Expo and React Native ứng dụng di động của bạn đa ngôn ngữ vào năm 2026, dịch thuật LLM, Agent Skills & MCP.
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
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Thêm phần debug"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
---

# Dịch ứng dụng Expo và React Native của bạn | Quốc tế hóa (i18n)

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `react-native-localize` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

**Phạm vi bảo hiểm đầy đủ của React Native**

Intlayer được tối ưu hóa để hoạt động hoàn hảo với React Native và Expo bằng cách cung cấp **phạm vi nội dung cấp thành phần**, **hỗ trợ TypeScript** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n) trong ứng dụng di động.

**Khả năng bảo trì**

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

**Đại lý AI**

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

**Tự động hóa**

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

**Hiệu suất**

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

**Mở rộng quy mô không có nhà phát triển**

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

**Kích thước bundle**

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và chế độ xem của bạn lên tới 50%**.

## Bước 1: Cài đặt phụ thuộc

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-react-native-template) trên GitHub.

Từ dự án React Native của bạn, hãy cài đặt các gói sau:

```bash packageManager="npm"
npm cài đặt intlayer phản ứng-intlayer
cài đặt npm --save-dev Reac -igen-intlayer
init nội bộ npx
```

```bash packageManager="pnpm"
pnpm thêm intlayer phản ứng-intlayer
pnpm thêm --save-dev Reac -igen-intlayer
init nội bộ pnpm
```

```bash packageManager="sợi"
sợi thêm lớp trong Reac-inlayer
thêm sợi --save-dev Reac -igen-intlayer
init sợi bên trong
```

```bash packageManager="bun"
bun thêm intlayer phản ứng-inlayer
bun thêm --dev Reac -igen-intlayer
init x init
```

### Gói

- **người xen vào**  
  Bộ công cụ i18n cốt lõi để cấu hình, nội dung từ điển, tạo kiểu và lệnh CLI.

- **người tham gia phản ứng**  
  Tích hợp React cung cấp các nhà cung cấp ngữ cảnh và móc nối React mà bạn sẽ sử dụng trong React Native để lấy và chuyển đổi ngôn ngữ.

- **Reac-bản địa-intlayer**  
  Tích hợp React Native cung cấp plugin Metro để tích hợp Intlayer với bộ đóng gói React Native.

---

## Bước 1: Cài đặt các phụ thuộc

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
bun x intlayer init
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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Khi sử dụng `content.someKey` trong các props dạng chuỗi (ví dụ, `title` của một nút hoặc `children` của một component `Text`), **hãy gọi `content.someKey.value`** để lấy chuỗi thực tế.

> Nếu ứng dụng của bạn đã tồn tại, bạn có thể sử dụng [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) kết hợp với [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi hàng nghìn component chỉ trong một giây.

---

## (Tùy chọn) Bước 5: Thay đổi Ngôn ngữ Ứng dụng

Để chuyển đổi ngôn ngữ từ bên trong các component của bạn, bạn có thể sử dụng phương thức `setLocale` của hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

```bash
#  Bỏ qua các file do Intlayer tạo ra
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
- **Lệnh CLI**: Khám phá [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) cho các tác vụ như **trích xuất bản dịch** hoặc **kiểm tra các khóa bị thiếu**.

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
