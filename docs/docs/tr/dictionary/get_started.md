---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Sözlük | Başlarken
description: Çok dilli web sitenizde sözlükleri nasıl bildireceğinizi ve kullanacağınızı öğrenin. Bu çevrimiçi dokümantasyonun adımlarını takip ederek projenizi birkaç dakikada kurun.
keywords:
  - Başlarken
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# İçeriğinizin bildirimi ile başlayın

<iframe title="i18n, Markdown, JSON… hepsini yönetmek için tek çözüm | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Dosya uzantıları

Varsayılan olarak, Intlayer içerik bildirimleri için aşağıdaki uzantılara sahip tüm dosyaları izler:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Uygulama varsayılan olarak `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` glob deseniyle eşleşen dosyaları arar.

Bu varsayılan uzantılar çoğu uygulama için uygundur. Ancak, belirli gereksinimleriniz varsa, bunları yönetme talimatları için [içerik uzantısı özelleştirme kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#content-configuration) bakın.

Yapılandırma seçeneklerinin tam listesi için yapılandırma dokümantasyonunu ziyaret edin.

## İçeriğinizi Bildirin

Sözlüklerinizi oluşturun ve yönetin:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // İç içe yerleştirilecek sözlüğün anahtarı
      "login.button" // [İsteğe bağlı] İç içe yerleştirilecek içeriğin yolu
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown Example"),

    /*
     * Sadece `react-intlayer` veya `next-intlayer` kullanarak kullanılabilir
     */
    jsxContent: <h1>My title</h1>,
  },
} satisfies Dictionary<Content>; // [isteğe bağlı] Dictionary genel türdür ve sözlüğünüzün biçimlendirmesini güçlendirmenize izin verir
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // İç içe yerleştirilecek sözlüğün anahtarı
      "login.button" // [İsteğe bağlı] İç içe yerleştirilecek içeriğin yolu
    ),
    markdownContent: md("# Markdown Example"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Sadece `react-intlayer` veya `next-intlayer` kullanarak kullanılabilir
    jsxContent: <h1>My title</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // İç içe yerleştirilecek sözlüğün anahtarı
      "login.button" // [İsteğe bağlı] İç içe yerleştirilecek içeriğin yolu
    ),
    markdownContent: md("# Markdown Example"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Sadece `react-intlayer` veya `next-intlayer` kullanarak kullanılabilir
    jsxContent: <h1>My title</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hello World",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "No cars",
        "1": "One car",
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        ">5": "Some cars",
        ">19": "Many cars",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validation is enabled",
        "false": "Validation is disabled",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Hello {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown Example",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["My title"],
      },
    },
  },
}
```

## İşlev iç içe yerleştirme

Sorun olmadan işlevleri diğerlerinin içine iç içe yerleştirebilirsiniz.

Örnek:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Koşul, numaralandırma ve çok dilli içeriği iç içe yerleştiren bileşik içerik
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Koşul, numaralandırma ve çok dilli içeriği iç içe yerleştiren bileşik içerik
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Koşul, numaralandırma ve çok dilli içeriği iç içe yerleştiren bileşik içerik
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## Ek Kaynaklar

Intlayer hakkında daha fazla ayrıntı için aşağıdaki kaynaklara bakın:

- [Yerel Başına İçerik Bildirimi Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/per_locale_file.md)
- [Çeviri İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)
- [Numaralandırma İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md)
- [Koşul İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md)
- [Ekleme İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)
- [Dosya İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)
- [İç İçe Yerleştirme İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md)
- [Markdown İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)
- [İşlev Getirme İçeriği Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)

## Dokümantasyon Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |

```

```
