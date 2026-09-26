---
createdAt: 2026-06-13
updatedAt: 2026-06-13
priority: 7
title: "Intlayer Compat アダプター"
description: "既存の i18n ソリューションを、compat アダプターを使用して、ゼロの摩擦で Intlayer に移行してください。"
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Intlayer Compat Adapters

大規模なアプリケーションを新しい国際化ライブラリに移行することは困難な場合があります。この移行を容易にするため、Intlayer はエコシステムで最も人気のある i18n ライブラリ用の **compat adapters** を提供しています。

これらのアダプターパッケージは、既存の i18n ライブラリと **まったく同じパブリック API** を公開していますが、すべての翻訳作業を実行時に Intlayer に委譲しています。

## 仕組み

compat アダプターを使用する場合、アプリケーションのインポートを書き直したり、翻訳フックとコンポーネントの使用方法を変更したりする必要はありません。代わりに、Intlayer のバンドラープラグインが既存のインポートを自動的に Intlayer compat パッケージにエイリアスします。

例えば、開発者は `import { useTranslation } from 'react-i18next'` を `import { useTranslation } from '@intlayer/react-i18next'` に置き換えます (バンドラープラグインが自動的に行います)。すると、アプリケーションは Intlayer 辞書から提供される翻訳で動作し続けます。キーは Intlayer 辞書に対しても型付けされています！

## 利用可能な互換性アダプター

以下から既存のライブラリを選択して、シームレスに移行する方法を確認してください：

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)
