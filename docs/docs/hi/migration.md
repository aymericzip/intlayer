---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "i18next, next-intl, react-intl, Lingui, vue-i18n और अन्य से Intlayer पर माइग्रेट करें"
description: "ट्रांसलेशन कॉल्स को दोबारा लिखे बिना किसी मौजूदा ऐप को Intlayer पर ले जाएँ। compat adapters i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n और ngx-translate का API बनाए रखते हैं।"
keywords:
  - migration
  - compat adapter
  - i18next
  - next-intl
  - react-intl
  - lingui
  - vue-i18n
  - ngx-translate
  - intlayer
  - i18n
slugs:
  - doc
  - migration
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# अपनी मौजूदा i18n लाइब्रेरी से Intlayer पर माइग्रेट करें

किसी बड़े ऐप की हर ट्रांसलेशन कॉल को दोबारा लिखना शायद ही कभी संभव होता है। Intlayer **compat adapters** देता है: ऐसे packages जो आपकी मौजूदा i18n लाइब्रेरी जैसा **ही API** एक्सपोज़ करते हैं, लेकिन मैसेज Intlayer डिक्शनरी से देते हैं।

## यह कैसे काम करता है

1. **अपना कोड रखें।** आपकी `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` या `| translate` कॉल्स जैसी हैं वैसी ही रहती हैं।
2. **अपनी मैसेज फ़ाइलें रखें।** [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) (या [sync PO प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md)) आपकी मौजूदा फ़ाइलें पढ़ता है और ट्रांसलेशन उन्हीं में वापस लिखता है।
3. **bundler प्लगइन बदलें।** हर adapter के साथ एक प्लगइन आता है जो आपकी डिक्शनरी build करता है और मूल लाइब्रेरी के imports को adapter पर रीडायरेक्ट करता है। किसी import को बदलने की ज़रूरत नहीं।

आपको टाइप्ड keys, हर पेज के हिसाब से डिक्शनरी लोडिंग, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) के ज़रिए AI ट्रांसलेशन, [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) और [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) मिलते हैं। इसके बाद आप एक-एक कॉम्पोनेंट करके नेटिव `.content.ts` फ़ाइलों पर जा सकते हैं।

> ये लाइब्रेरी कहाँ से आईं, यह समझने के लिए [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) पढ़ें।

## उपलब्ध compat adapters

| लाइब्रेरी                                                  | फ़्रेमवर्क     | Adapter                   | माइग्रेशन गाइड                                                                                                                           |
| -------------------------------------------------------- | ---------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [i18next से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [react-i18next से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [next-i18next से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [next-intl से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [react-intl से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Lingui से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [vue-i18n से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [@nuxtjs/i18n से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [svelte-i18n से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [ngx-translate से माइग्रेट करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_ngx-translate_to_intlayer.md) |

## क्विक स्टार्ट

आपकी लाइब्रेरी कोई भी हो, पहला कदम एक ही है। `intlayer init` आपकी मौजूदा i18n लाइब्रेरी पहचानता है और उससे मेल खाता adapter इंस्टॉल करता है:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

फिर ऊपर दी गई अपनी लाइब्रेरी की माइग्रेशन गाइड फ़ॉलो करें।

## शुरुआत से शुरू कर रहे हैं?

अगर आपके ऐप में अभी कोई i18n लाइब्रेरी नहीं है, तो adapters छोड़ें और नेटिव API से शुरू करें:

- [Next.js के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)
- [Vite और React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)
- [Vite और Vue के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vue.md)
- [Vite और Svelte के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+svelte.md)
- [Angular के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md)
