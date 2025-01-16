# react-scripts-intlayer: NPM पैकेज को Intlayer को एक React Create App एप्लिकेशन में उपयोग करने के लिए

**Intlayer** एक ऐसा पैकेज है जिसे विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`react-scripts-intlayer` पैकेज** `react-scripts-intlayer` कमांड और प्लगइन्स को शामिल करता है जो Create React App आधारित एप्लिकेशन के साथ Intlayer को एकीकृत करने के लिए उपयोग होता है। ये प्लगइन्स [craco](https://craco.js.org/) पर आधारित हैं और [Webpack](https://webpack.js.org/) बंडलर के लिए अतिरिक्त कॉन्फ़िगरेशन शामिल करते हैं।

## कॉन्फ़िगरेशन

`react-scripts-intlayer` पैकेज [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ निर्बाध रूप से काम करता है। अधिक जानकारी के लिए प्रासंगिक दस्तावेज़ देखें।

## स्थापना

आवश्यक पैकेज को अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके स्थापित करें:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## उपयोग

### CLI कमांड

`react-scripts-intlayer` पैकेज निम्नलिखित CLI कमांड प्रदान करता है:

- `npx react-scripts-intlayer build`: Intlayer कॉन्फ़िगरेशन के साथ React एप्लिकेशन बनाता है।
- `npx react-scripts-intlayer start`: Intlayer कॉन्फ़िगरेशन के साथ विकास सर्वर शुरू करता है।

### package.json स्क्रिप्ट को बदलें

`react-scripts-intlayer` पैकेज का उपयोग करने के लिए, आपको निम्नलिखित कमांड के साथ `package.json` स्क्रिप्ट को बदलने की आवश्यकता है:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## कस्टम Webpack कॉन्फ़िगरेशन का उपयोग करें

`react-scripts-intlayer` [craco](https://craco.js.org/) पर आधारित है, जो आपको Webpack कॉन्फ़िगरेशन को अनुकूलित करने की अनुमति देता है।
यदि आपको Webpack कॉन्फ़िगरेशन को अनुकूलित करने की आवश्यकता है, तो आप intlayer craco प्लगइन पर आधारित अपनी सेटअप को भी लागू कर सकते हैं। [यहां उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)।

## React Create App के लिए पूर्ण Intlayer गाइड पढ़ें

Intlayer आपके React एप्लिकेशन को अंतरराष्ट्रीय बनाने में मदद करने के लिए बहुत से फीचर्स प्रदान करता है।
[React Create App के साथ Intlayer का उपयोग करने का तरीका देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)।
