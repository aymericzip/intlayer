# Documentation: `getLocaleName` 函数在 `intlayer`

## 描述：

`getLocaleName` 函数返回给定区域的本地化名称（`targetLocale`）在显示区域（`displayLocale`）中的名称。如果未提供 `targetLocale`，则返回 `displayLocale` 在其自身语言中的名称。

## 参数：

- `displayLocale: Locales`

  - **描述**：显示目标区域名称的区域。
  - **类型**：表示有效区域的枚举或字符串。

- `targetLocale?: Locales`
  - **描述**：需要本地化名称的区域。
  - **类型**：可选。表示有效区域的枚举或字符串。

## 返回：

- **类型**：`string`
- **描述**：在 `displayLocale` 中的 `targetLocale` 的本地化名称，或如果未提供 `targetLocale` 则为 `displayLocale` 自己的名称。如果没有找到翻译，返回 `"Unknown locale"`。

## 示例用法：

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 输出: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 输出: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 输出: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 输出: "English"

getLocaleName(Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 输出: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 输出: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 输出: "French"

getLocaleName(Locales.CHINESE); // 输出: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 输出: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 输出: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 输出: "Chinese"

getLocaleName("unknown-locale"); // 输出: "Unknown locale"
```

## 边缘情况：

- **未提供 `targetLocale`：**
  - 函数默认返回 `displayLocale` 自己的名称。
- **缺失翻译：**
  - 如果 `localeNameTranslations` 中没有包含 `targetLocale` 或特定 `displayLocale` 的条目，函数将回退到 `ownLocalesName` 或返回 `"Unknown locale"`。
