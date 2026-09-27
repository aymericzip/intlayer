---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: görsel editör komutları"
description: "Intlayer görsel editörünü CLI'dan başlatıp yapılandırın ve içeriği çalışan uygulamanızda doğrudan bağlamında düzenleyin."
keywords:
  - Editör
  - Görsel Editör
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# Editör komutları

`editor` komutu, `intlayer-editor` komutlarını yeniden sarar.

> `editor` komutunu kullanabilmek için, `intlayer-editor` paketinin yüklü olması gerekir. (Bkz. [Intlayer Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md))

- [Intlayer Görsel Editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
