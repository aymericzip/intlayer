---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Chrome और Firefox एक्सटेंशन, i18n और SEO स्कैनर
description: Intlayer Chrome एक्सटेंशन के साथ किसी भी वेबसाइट के i18n सेटअप का निरीक्षण करें। फ़्रेमवर्क, i18n लाइब्रेरी, लोकेल्स, hreflang और SEO टैग्स का पता लगाएं, और एक पूर्ण i18n SEO ऑडिट चलाएं।
keywords:
  - Chrome एक्सटेंशन
  - i18n स्कैनर
  - hreflang चेकर
  - बहुभाषी SEO
  - Intlayer
  - स्थानीयकरण
  - विकास उपकरण
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Chrome और Firefox एक्सटेंशन: i18n और SEO स्कैनर

## अवलोकन

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) **Intlayer** का आधिकारिक Chrome एक्सटेंशन है। यह देखने के लिए कि कोई वेबसाइट अंतर्राष्ट्रीयकरण (internationalization) को कैसे संभालती है, इसे किसी भी साइट पर खोलें: वह कौन सा फ़्रेमवर्क और i18n लाइब्रेरी का उपयोग करती है, कौन से लोकेल्स प्रदान करती है, और क्या उसके बहुभाषी SEO टैग सही ढंग से सेट किए गए हैं।

यह प्रत्येक वेबसाइट पर काम करता है, चाहे वह Intlayer का उपयोग करती हो या नहीं।

![Intlayer Chrome एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Chrome एक्सटेंशन लिंक](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[Firefox ऐड-ऑन लिंक](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## विशेषताएँ

- **प्रौद्योगिकी पहचान (Technology detection)**: फ़्रेमवर्क (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) और i18n लाइब्रेरी (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang) की पहचान करता है। प्रत्येक पहचान उन साक्ष्यों को दिखाती है जिन्होंने इसे ट्रिगर किया, जैसे कि एक ग्लोबल वेरिएबल, कुकी या DOM मार्कर।
- **लोकेल्स (Locales)**: `lang` एट्रिब्यूट, hreflang और `og:locale` टैग्स, URL लोकेल प्रीफ़िक्स, और लोकेल कुकीज़ या स्टोरेज प्रविष्टियों में पाए गए लोकेल्स को सूचीबद्ध करता है।
- **SEO i18n टैग्स**: `html lang`, `html dir`, विहित (canonical) लिंक, hreflang टैग्स, `x-default`, `og:locale` और स्थानीयकृत आंतरिक लिंक के अनुपात की जांच करता है।
- **Locales के बीच नेविगेशन**: hreflang टैग्स के आधार पर, वर्तमान पेज को एक क्लिक में उसके किसी भी स्थानीयकृत संस्करण पर ले जाता है।
- **Sitemap में खोज**: साइट के sitemap में सूचीबद्ध सभी पेज खोजता है और उन्हें वर्तमान टैब में खोलता है।
- **पूर्ण ऑडिट**: [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) के समान ऑडिट चलाता है और लाइव स्कोर दिखाता है।

## इंस्टॉलेशन

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

Chrome वेब स्टोर से [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) इंस्टॉल करें, फिर इसे अपने टूलबार में पिन करें।

यह एक्सटेंशन Chrome और Chrome वेब स्टोर एक्सटेंशन का समर्थन करने वाले किसी भी Chromium आधारित ब्राउज़र (Edge, Brave, Arc, Opera) में काम करता है।

  </Tab>
  <Tab label="Firefox" value="firefox">

Firefox ऐड-ऑन से [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/) इंस्टॉल करें, फिर इसे अपने टूलबार में पिन करें।

  </Tab>
</Tabs>

## उपयोग

### किसी पेज का निरीक्षण करना

1. वह वेबसाइट खोलें जिसका आप निरीक्षण करना चाहते हैं।
2. टूलबार में **Intlayer i18n Scanner** आइकन पर क्लिक करें।
3. पॉपअप वर्तमान पेज के लिए **पहचानी गई प्रौद्योगिकियां**, **लोकेल्स** और **SEO i18n टैग्स** अनुभाग दिखाता है।

पहचान प्रक्रिया आपके ब्राउज़र में स्थानीय रूप से, केवल वर्तमान टैब पर चलती है।

### Locales के बीच नेविगेट करना

![Intlayer Chrome एक्सटेंशन नेविगेशन](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

**नेविगेट करें** सेक्शन वर्तमान पेज के hreflang टैग्स से पढ़े गए **स्थानीयकृत संस्करण** दिखाता है। किसी locale पर क्लिक करके उस संस्करण को वर्तमान टैब में खोलें।

**साइटमैप पेज** में, साइट के sitemap के URLs खोजें और किसी परिणाम पर क्लिक करके उसे खोलें।

### पूर्ण ऑडिट चलाना

![Intlayer Chrome एक्सटेंशन ऑडिट स्कोर](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

**पूर्ण ऑडिट** अनुभाग तक स्क्रॉल करें और **पूर्ण i18n ऑडिट चलाएं** पर क्लिक करें। प्रत्येक जांच पूरी होने के साथ परिणाम स्ट्रीम होते हैं, जिन्हें निम्नानुसार समूहीकृत किया गया है:

- **पेज**: `html lang` और `dir` एट्रिब्यूट्स, वर्तमान लोकेल, hreflang टैग्स, `x-default`, विहित लिंक, स्थानीयकृत आंतरिक लिंक, भाषा चयनकर्ता, ध्वज आइकन, और जावास्क्रिप्ट बंडल में भेजी गई अप्रयुक्त लोकेल सामग्री।
- **Robots.txt**: उपस्थिति, और क्या लोकेल पाथ क्रॉल करने योग्य बने रहते हैं।
- **साइटमैप**: उपस्थिति, सूचीबद्ध प्रत्येक लोकेल, वैकल्पिक लिंक और `x-default`।
- **डोमेन**: पूरी साइट में खोजे गए लोकेल्स की संख्या।

प्रत्येक जांच को पास, चेतावनी या असफल के रूप में चिह्नित किया जाता है, और स्कोर पेज के समग्र i18n SEO स्वास्थ्य को सारांशित करता है।

## गोपनीयता और अनुमतियाँ

एक्सटेंशन न्यूनतम अनुमतियों का अनुरोध करता है:

- **activeTab** और **scripting**: डिटेक्टर केवल उस टैब पर चलता है जिसे आप देख रहे हैं, और केवल तभी जब आप पॉपअप खोलते हैं।
- **back.intlayer.org**: इसका उपयोग केवल तब किया जाता है जब आप पूर्ण ऑडिट चलाते हैं। स्कैन करने के लिए वर्तमान पेज का URL Intlayer API को भेजा जाता है।

कोई ब्राउज़िंग इतिहास एकत्र नहीं किया जाता है और बैकग्राउंड में कुछ भी नहीं चलता है।

## अक्सर पूछे जाने वाले प्रश्न (FAQ)

<FAQ>

<Question title="क्या वेबसाइट को Intlayer का उपयोग करने की आवश्यकता है?">

नहीं। एक्सटेंशन किसी भी वेबसाइट का निरीक्षण करता है, चाहे वह किसी भी फ़्रेमवर्क या i18n लाइब्रेरी का उपयोग करती हो।

</Question>
<Question title="किसी तकनीक का पता क्यों नहीं चल पाता है?">

पहचान इस बात पर निर्भर करती है कि पेज ब्राउज़र में क्या प्रदर्शित करता है: ग्लोबल वेरिएबल्स, कुकीज़, मेटा टैग और DOM मार्कर। कुछ प्रोडक्शन बिल्ड इन मार्करों को हटा देते हैं, इसलिए कोई लाइब्रेरी दृश्यमान निशान छोड़े बिना उपयोग में हो सकती है।

</Question>
<Question title="मैं ऑडिट द्वारा पाई गई समस्याओं को कैसे ठीक करूँ?">

अधिकांश जांचें रूटिंग या मेटाडेटा सेटिंग से संबंधित होती हैं। Intlayer के साथ, hreflang, विहित लिंक, `x-default`, स्थानीयकृत लिंक, साइटमैप और robots.txt आपके [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) से स्वचालित रूप से उत्पन्न होते हैं। अपने फ़्रेमवर्क के लिए एकीकरण मार्गदर्शिका देखें, उदाहरण के लिए [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nuxt.md) या [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)।

</Question>

</FAQ>

## संबंधित उपकरण

- [VS Code एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)
- [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)
- [LSP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)
