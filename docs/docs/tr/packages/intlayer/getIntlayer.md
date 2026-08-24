---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayer Fonksiyonu Dokümantasyonu | intlayer
description: intlayer paketi için getIntlayer fonksiyonunun nasıl kullanılacağını öğrenin
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Belgelendirme: `intlayer`'de `getIntlayer` Fonksiyonu

## Açıklama

`getIntlayer` işlevi bir anahtar (key) ile bir sözlüğü seçer ve içeriğini belirli bir yerel ayar için yorumlanmış şekilde döndürür. `useIntlayer` hook'unun framework-agnostik karşılığıdır: aynı içerik, aynı seçiciler, ancak React context'in kullanılamadığı her yerde kullanılabilir — Node scriptleri, server işlevleri, route loaders, metadata builders, Express/Fastify handlers, testler.

Intlayer tarafından `.intlayer/` içinde oluşturulan sözlükleri okur, bu nedenle `key` argümanı sizin kendi içerik bildirimlerinizden türü belirlenmiş ve otomatik tamamlanmıştır, ve döndürülen nesne her yaprakta tam olarak türü belirlenmiştir.

**Ana Özellikler:**

- Türü belirlenmiş sözlük anahtarları ve türü belirlenmiş döndürülen içerik
- Her içerik düğümünü yorumlar (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Yerel ayarı veya seçici nesnesini kabul eder (koleksiyonlar, varyantlar)
- Sonuçlar `key + locale + selector` başına bellekte tutulur
- Geliştirme sırasında sözlük eksik olduğunda, kilitlenmek yerine güvenli bir proxy'ye geri döner

---

## Fonksiyon İmzası

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Gerekli
  localeOrSelector?: LocalesValues | DictionarySelector, // İsteğe bağlı
  plugins?: Plugins[]                         // İsteğe bağlı
): DeepTransformContent<...>
```

---

## Parametreler

- `key: DictionaryKeys`
  - **Açıklama**: İçerik dosyalarınızda bildirilen sözlüğün anahtarı.
  - **Tür**: `DictionaryKeys` — bildirilen her sözlük anahtarının birleşimi.
  - **Gerekli**: Evet

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Açıklama**: İçeriği yorumlamak için kullanılacak yerel ayar veya [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) için bir seçici nesnesi.
    - `'fr'` — bir yerel ayar
    - `{ item: 2 }` — bir [koleksiyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/collections.md) öğesi (`item` öğesini atlayarak tüm öğeleri dizi olarak alabilirsiniz)
    - `{ variant: 'black-friday' }` — adlandırılmış bir [varyant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md) (varsayılan olanı almak için atlayın)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — yapılandırılmış bir varyant
    - Herhangi bir seçici yerel ayar taşıyabilir: `{ item: 2, locale: 'fr' }`
  - **Tür**: `LocalesValues | DictionarySelector`
  - **Gerekli**: Hayır (İsteğe bağlı) — yapılandırılan `defaultLocale` değerini kullanır.

- `plugins: Plugins[]`
  - **Açıklama**: Temel yorumlayıcı eklentilerinin yerini alan özel düğüm dönüştürücüleri. Yalnızca ileri kullanım için; varsayılan davranışı korumak için atlayın.
  - **Tür**: `Plugins[]`
  - **Gerekli**: Hayır (İsteğe bağlı)

### Döndürülen Değerler

- **Type**: Sözlüğünüzün deklarasyonundan yazılan, yorumlanan içerik.
- **Description**: Sözlüğünüzün `content` alanını yansıtan düz bir nesne; burada her Intlayer düğümü, istenen locale için nihai değerine çözülmüştür.

---

## Örnek Kullanım

### Temel Kullanım

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      tr: "Merhaba",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### Locale olmadan

Locale'i atlarsanız, içerik [yapılandırmanızda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) belirtilen `defaultLocale` ile yorumlanır.

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Varsayılan locale ile yorumlanır
```

### Bir sunucu işleyicisinin içinde

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Seçici ile (collections ve variants)

```typescript
import { getIntlayer } from "intlayer";

// Bir collection öğesi
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Collection'ın tüm öğeleri, sıralı bir dizi olarak
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Adlandırılmış bir variant
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Davranış Notları

### Önbellekleme

Sonuçlar, `key + locale + selector` ile anahtarlanan bir modül seviyesi önbelleğinde memoize edilir. `getIntlayer("app", "fr")` işlemini tekrar tekrar çağırmak sözlüğü bir kez yorumlar ve daha sonra aynı nesneyi döndürür.

### Eksik sözlükler

Geliştirme sırasında, oluşturulmuş bir sözlüğü olmayan bir anahtarı istediğinizde, bir uyarı bir kez kaydedilir ve güvenli bir fallback proxy döndürülür: `content.title` öğesini okuduğunuzda hata atmak yerine `"app.title"` dizesini verir. Bu, eksik bildirim düzeltilirken bir sayfanın kullanılabilir kalmasını sağlar. Sözlüğün oluşturulması için Intlayer build'ini (veya geliştirme sunucusunu) çalıştırın.

### Bundle boyutu

`getIntlayer` birleştirilmiş sözlüğü okur; bu sözlük **her** locale'i içerir. İstemci bundle'larında, [build eklentileri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) çağrıyı yeniden yazarak yalnızca gerekli içeriğin gönderilmesini sağlar. Rendering dışında içerik okuyorsanız (metadata, loaders, server functions) ve talep üzerine tek bir locale yüklenmesini istiyorsanız, bunun yerine [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayerAsync.md) kullanın.

---

## İlgili Fonksiyonlar

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayerAsync.md): Tek bir locale chunk yükleyen async eşdeğeri.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getDictionary.md): Anahtarla arama yapılan bir sözlük yerine, kendiniz geçtiğiniz bir sözlük nesnesini yorumlar.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/react-intlayer/useIntlayer.md): React hook eşdeğeri, provider'dan locale'i okur.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
