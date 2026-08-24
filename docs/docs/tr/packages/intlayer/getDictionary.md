---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary Function Documentation | intlayer
description: intlayer paketi için getDictionary fonksiyonunun nasıl kullanılacağını öğrenin
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `getDictionary` Function in `intlayer`

## Açıklama

`getDictionary` fonksiyonu, **kendiniz geçtiğiniz bir sözlük nesnesini** yorumlar ve belirli bir locale için çözülmüş içeriğini döndürür. İçeriği tek bir geçişte yürür ve her bir yorumlayıcı eklentisini gerektiği şekilde uygulayarak `t()` çevirileri, numaralandırmaları, koşulları, eklemeleri, iç içe geçişi, markdown'ı, HTML'yi ve dosya düğümlerini çözer.

Oluşturulan kayıt defterinde bir sözlüğü anahtara göre arayan [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md)'dan farklı olarak, `getDictionary` sözlüğün kendisini alır. Bu, çalışma zamanında oluşturulan, bir API veya CMS'den getirilen ya da bir teste satır içinde bildirilen içerik için doğru araç haline getirir.

**Temel Özellikler:**

- Sözlük yapısını izleyen herhangi bir nesneyle çalışır (`{ key, content }`)
- Nitelikli bir sözlük grubu (koleksiyonlar, varyantlar) ile birlikte bir seçiciyi kabul eder
- Tam olarak tipli: döndürülen nesne, geçtiğiniz `content`'i yansıtır
- Özel yorumlayıcı eklentilerini kabul eder

---

## Fonksiyon İmzası

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Gerekli
  localeOrSelector?: LocalesValues | DictionarySelector, // İsteğe Bağlı
  plugins?: Plugins[]                                // İsteğe Bağlı
): DeepTransformContent<...>
```

---

## Parametreler

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Açıklama**: Yorumlanacak sözlük (veya nitelikli sözlük grubu).
  - **Tür**: `Dictionary | QualifiedDictionaryGroup`
  - **Gerekli**: Evet

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Açıklama**: İçeriği yorumlamak için kullanılacak yerel ayar veya bir seçici nesnesi (`{ item }`, `{ variant }`, isteğe bağlı olarak `locale`). Bkz. [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md).
  - **Tür**: `LocalesValues | DictionarySelector`
  - **Gerekli**: Hayır (İsteğe bağlı) — yapılandırılmış `defaultLocale` ayarına varsayılan olarak atar.

- `plugins: Plugins[]`
  - **Açıklama**: Tanınan düğümlerin nasıl yorumlandığını tanımlayan bir dizi düğüm dönüştürücüsü. Atlanırsa, varsayılan yorumlayıcı eklentileri seti kullanılır.
  - **Tür**: `Plugins[]`
  - **Gerekli**: Hayır (İsteğe bağlı)

### Dönüşler

- **Tür**: Sözlüğün yorumlanan içeriği.
- **Açıklama**: Geçirdiğiniz `content`, istenen yerel ayar için çözümlenen her Intlayer düğümü ile. `item` seçici olmayan bir koleksiyon grubu için, yorumlanan girdilerin sıralı bir dizisi döndürülür; seçici hiçbir şeyi hedeflediğinde `null` döndürülür.

---

## Örnek Kullanım

### Temel Kullanım

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        tr: "Merhaba",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "tr"
);

console.log(content.greeting); // "Merhaba"
```

### Çalışma zamanında getirilen içeriği yorumlama

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Bir seçici ile

```typescript
import { getDictionary } from "intlayer";

// Nitelikli bir sözlük grubu tek bir girişe çözülür…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …veya `item` verilmediğinde sıralı bir diziye çözülür
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## İlgili Fonksiyonlar

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md): Aynı yorum, ancak sözlük oluşturulan kayıt defterinde anahtar tarafından aranır.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getDictionaryAsync.md): Her locale yükleyici haritaları için karşılık gelen fonksiyon.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useDictionary.md): React hook eşdeğeri, sağlayıcıdan locale'i okur.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
