---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` और Intlayer – false positive `node:fs` अस्वीकृत त्रुटि
description: vite-env-only यह क्यों रिपोर्ट करता है कि Intlayer + React-Router + Vite के साथ `node:fs` आयात अस्वीकृत है और इस स्थिति में क्या करना चाहिए।
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - आयात अस्वीकृत
  - एलियास
  - क्लाइंट बंडल
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only Intlayer के साथ `node:fs` को अस्वीकार कर देता है

यदि आपने **vite-env-only** प्लगइन का उपयोग किया है (जैसा कि पुराने React-Router v7 सुझावों में उल्लेख है) और आप देखते हैं:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…हालाँकि आपके क्लाइंट बंडल में **कोई `node:fs` नहीं है**, यह एक **false positive** है।

## कारण

`vite-env-only` Vite ग्राफ़ रिज़ॉल्यूशन के आरंभिक चरण में एक Babel-आधारित जाँच चलाता है, _इसके पहले_:

- अलायसिंग (Intlayer के browser बनाम node मैपिंग्स सहित),
- dead-code elimination,
- SSR बनाम क्लाइंट रिज़ॉल्यूशन,
- React-Router जैसे वर्चुअल मॉड्यूल।

Intlayer पैकेजों में ऐसा कोड होता है जो Node और ब्राउज़र दोनों पर काम कर सकता है। एक _मध्यवर्ती_ चरण में, `node:fs` जैसा Node बिल्ट-इन ग्राफ़ में दिखाई दे सकता है **पहले** कि Vite इसे क्लाइंट बिल्ड से हटा दे। `vite-env-only` यह देखकर तुरंत त्रुटि देता है, हालांकि अंतिम बंडल में यह मौजूद नहीं होता।

## React-Router और सर्वर मॉड्यूल

React-Router के दस्तावेज़ में **server module conventions**  
(https://reactrouter.com/api/framework-conventions/server-modules), टीम **स्पष्ट रूप से `vite-env-only` का उपयोग करने का सुझाव देती है** ताकि server-only imports क्लाइंट बंडल में लीक न हों।

हालाँकि, ये कन्वेंशन्स Vite की aliasing, conditional exports, और tree-shaking पर निर्भर करते हैं ताकि server-only कोड हटाया जा सके। जबकि aliasing और conditional exports पहले से लागू हैं, कुछ Node-आधारित utilities उस चरण में अभी भी पैकेजेज़ जैसे `@intlayer/core` में मौजूद रहते हैं (हालाँकि वे क्लाइंट पर कभी import नहीं होते)। क्योंकि tree-shaking अभी तक नहीं चला है, वे फ़ंक्शंस अभी भी Babel द्वारा पार्स किए जाते हैं, और `vite-env-only` उनके `node:` imports का पता लगा कर एक false positive उठाता है — भले ही वे अंतिम क्लाइंट बंडल से सही तरीके से हटाए जा चुके हों।

## कैसे ठीक करें / वर्कअराउंड

### अनुशंसित: `vite-env-only` हटाएँ

सिर्फ़ प्लगइन को हटा दें। कई मामलों में इसकी आवश्यकता नहीं होती — Vite अपने resolution के माध्यम से क्लाइंट बनाम सर्वर इम्पोर्ट्स को पहले से ही संभालता है।

यह Intlayer में किसी बदलाव के बिना `node:fs` पर दिखने वाली false positive को ठीक कर देता है।

### इसके बजाय अंतिम बिल्ड को सत्यापित करें

अगर आप फिर भी यह सुनिश्चित करना चाहते हैं कि क्लाइंट में कोई Node built-ins न हो, तो इसे **बिल्ड के बाद** करें, उदाहरण के लिए:

```bash
pnpm build
grep -R "node:" dist/
```

यदि कोई परिणाम नहीं मिलता है, तो आपके क्लाइंट बंडल्स साफ़ हैं।

## सारांश

- `vite-env-only` `node:fs` पर त्रुटि दे सकता है क्योंकि यह बहुत जल्दी जाँच करता है।
- Vite + Intlayer + React-Router के server modules conventions सामान्यतः server-only संदर्भों को सही ढंग से हटा देते हैं।
- प्लगइन को हटाना या _final output_ की जाँच करना आम तौर पर सबसे अच्छा समाधान होता है।
