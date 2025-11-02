---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ロケールリストをカスタマイズする方法は？
description: ロケールリストのカスタマイズ方法を学びます。
keywords:
  - ロケール
  - リスト
  - intlayer
  - 設定
  - availableLocales
  - defaultLocale
  - useLocale
  - フック
  - ロケール
  - リスト
slugs:
  - frequent-questions
  - customized-locale-list
---

# 英語のような言語タイプをブロックすることは可能ですか？辞書には英語を追加していますが、まだウェブサイトで英語を利用可能にしたくありません

はい、Intlayerの設定で `availableLocales` オプションを使用することで、英語のような言語タイプをブロックできます。

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

または

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

この設定により、`t()` 関数の型は利用可能なロケールのみを含むように変更されます。

`availableLocales` はオプションであり、指定しない場合はすべてのロケールが利用可能になります。

注意してください。`availableLocales` オプションに含まれるすべてのロケールは、`locales` オプションにも含まれている必要があります。

`useLocale` フックを使用する場合、`availableLocales` オプションがロケールリストへのアクセス設定に使用されることに注意してください。

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
