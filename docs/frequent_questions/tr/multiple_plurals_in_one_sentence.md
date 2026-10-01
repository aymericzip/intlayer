---
createdAt: 2026-10-01
updatedAt: 2026-10-01
priority: 4
title: "Düğüm tipleri birleştirilebilir mi? (ör. tek bir cümlede birden çok çoğul)"
description: "Intlayer'da insert() veya iç içe plural() kullanarak düğüm tiplerini birleştirme ve tek bir cümlede bağımsız birden çok çoğul değişkeni ifade etme yöntemi."
keywords:
  - plural
  - nested plural
  - multiple plurals
  - composition
  - insertion
  - insert
  - intlayer
slugs:
  - frequent-questions
  - multiple-plurals-in-one-sentence
author: aymericzip
---

# Düğüm tipleri birleştirilebilir mi? (ör. tek bir cümlede birden çok çoğul)

**Evet**, Intlayer'daki düğüm tipleri birbiriyle birleştirilebilir (compose edilebilir). Örneğin, bir `plural()` fonksiyonunu başka bir `plural()` içine yerleştirebilir veya `plural()` ile `insert()` fonksiyonunu birlikte kullanabilirsiniz.

**Tek bir cümlede birbirinden bağımsız iki çoğul değişkeni ifade etmeniz gerektiğinde** (örneğin: _"2 klasörde 1 dosya"_ ve _"1 klasörde 3 dosya"_), iki temel yaklaşım bulunur:

1. **Ayrı `plural()` anahtarlarıyla `insert()` kullanmak (Önerilen)**: Temiz, bakımı kolay ve diller arasındaki doğru kelime sırasını korur.
2. **`plural()` içine `plural()` yerleştirmek (Doğrudan birleştirme)**: Geçerli bir sözdizimidir ancak karmaşık çoğul kurallarına sahip dillerde dalların kombinasyonel olarak çoğalmasına yol açabilir.

## `insert()` ile `plural()` Birleştirmek

En esnek ve deyimsel yaklaşım, çoğullaştırılan her terim için ayrı `plural` anahtarları tanımlamak ve bunları bir `insert()` şablonuyla bir araya getirmektir.

### 1. İçeriği Tanımlayın

```ts fileName="src/fileSummary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, plural, t, type Dictionary } from "intlayer";

const fileSummaryContent = {
  key: "file_summary",
  content: {
    // Ekleme şablonu, her dil için öğelerin dizilimini belirler
    summary: t({
      tr: insert("{{folders}} içinde {{files}}"),
      en: insert("{{files}} in {{folders}}"),
      fr: insert("{{files}} dans {{folders}}"),
      ja: insert("{{folders}}の中に{{files}}"),
    }),
    files: t({
      tr: plural({
        other: "{{count}} dosya",
      }),
      en: plural({
        one: "{{count}} file",
        other: "{{count}} files",
      }),
      fr: plural({
        one: "{{count}} fichier",
        other: "{{count}} fichiers",
      }),
      ja: plural({
        other: "{{count}} 個のファイル",
      }),
    }),
    folders: t({
      tr: plural({
        other: "{{count}} klasör",
      }),
      en: plural({
        one: "{{count}} folder",
        other: "{{count}} folders",
      }),
      fr: plural({
        one: "{{count}} dossier",
        other: "{{count}} dossiers",
      }),
      ja: plural({
        other: "{{count}} 個のフォルダー",
      }),
    }),
  },
} satisfies Dictionary;

export default fileSummaryContent;
```

```json fileName="src/fileSummary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "file_summary",
  "content": {
    "summary": {
      "nodeType": "translation",
      "translation": {
        "tr": {
          "nodeType": "insertion",
          "insertion": "{{folders}} içinde {{files}}"
        },
        "en": {
          "nodeType": "insertion",
          "insertion": "{{files}} in {{folders}}"
        }
      }
    },
    "files": {
      "nodeType": "translation",
      "translation": {
        "tr": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} dosya"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} file",
            "other": "{{count}} files"
          }
        }
      }
    },
    "folders": {
      "nodeType": "translation",
      "translation": {
        "tr": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} klasör"
          }
        },
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} folder",
            "other": "{{count}} folders"
          }
        }
      }
    }
  }
}
```

### 2. Bileşeninizde Kullanın

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/components/FileSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const FileSummary: FC<{ fileCount: number; folderCount: number }> = ({
  fileCount,
  folderCount,
}) => {
  const { summary, files, folders } = useIntlayer("file_summary");

  return (
    <p>
      {summary({
        files: files(fileCount),
        folders: folders(folderCount),
      })}
    </p>
  );
};
```

  </Tab>
  <Tab label="Vue" value="vue">

```vue fileName="src/components/FileSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{
  fileCount: number;
  folderCount: number;
}>();

const { summary, files, folders } = useIntlayer("file_summary");
</script>

<template>
  <p>
    {{
      summary({
        files: files(fileCount),
        folders: folders(folderCount),
      })
    }}
  </p>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

```svelte fileName="src/components/FileSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  export let fileCount: number;
  export let folderCount: number;

  const content = useIntlayer("file_summary");
</script>

<p>
  {$content.summary({
    files: $content.files(fileCount),
    folders: $content.folders(folderCount),
  })}
</p>
```

  </Tab>
</Tabs>

### Bu yaklaşım neden önerilir?

- **Cümle Yapısı ve Kelime Sırası**: Farklı diller sıfatları, sayıları ve nesneleri farklı sıralarda kullanır (örneğin Türkçe veya Japonca'da dosya ve klasör sırası İngilizce'ye göre değişebilir). Bir `insert()` şablonu, çoğul kurallarını bozmadan çevirmenlere kelime sırası üzerinde tam denetim sağlar.
- **Kombinasyonel Patlamayı Önler**: Eğer A dilinde 2 çoğul formu (İngilizce: `one`, `other`) ve B dilinde 4 form (Rusça: `one`, `few`, `many`, `other`) varsa, iç içe çoğul tanımlamak Rusça için $4 \times 4 = 16$ dal gerektirir. Ayrı anahtarlarla ise yalnızca $4 + 4 = 8$ dal tanımlarsınız.
- **Yeniden Kullanılabilirlik**: `files` veya `folders` çoğul tanımlarını arayüzünüzün diğer bölümlerinde tekrar kullanabilirsiniz.
