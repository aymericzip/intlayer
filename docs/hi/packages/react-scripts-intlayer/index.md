# react-scripts-intlayer: NPM पैकेज जो Intlayer को React Create App एप्लिकेशन में उपयोग करने के लिए है

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`react-scripts-intlayer` पैकेज** में `react-scripts-intlayer` कमांड और प्लगइन्स शामिल हैं जो Intlayer को Create React App आधारित एप्लिकेशन के साथ एकीकृत करते हैं। ये प्लगइन्स [craco](https://craco.js.org/) पर आधारित हैं और [Webpack](https://webpack.js.org/) बंडलर के लिए अतिरिक्त कॉन्फ़िगरेशन शामिल करते हैं।

## कॉन्फ़िगरेशन

`react-scripts-intlayer` पैकेज [`react-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/react-intlayer/index.md) और [`intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/hi/packages/intlayer/index.md) के साथ सहजता से काम करता है। अधिक जानकारी के लिए संबंधित दस्तावेज़ देखें।

## इंस्टॉलेशन

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

### CLI कमांड्स

`react-scripts-intlayer` पैकेज निम्नलिखित CLI कमांड्स प्रदान करता है:

- `npx react-scripts-intlayer build`: Intlayer कॉन्फ़िगरेशन के साथ React एप्लिकेशन को बनाता है।
- `npx react-scripts-intlayer start`: Intlayer कॉन्फ़िगरेशन के साथ विकास सर्वर शुरू करता है।

### package.json स्क्रिप्ट्स को बदलें

`react-scripts-intlayer` पैकेज का उपयोग करने के लिए, आपको `package.json` स्क्रिप्ट्स को निम्नलिखित कमांड्स के साथ बदलना होगा:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## कस्टम Webpack कॉन्फ़िगरेशन का उपयोग करें

`react-scripts-intlayer` [craco](https://craco.js.org/) पर आधारित है, जो आपको Webpack कॉन्फ़िगरेशन को कस्टमाइज़ करने की अनुमति देता है।
यदि आपको Webpack कॉन्फ़िगरेशन को कस्टमाइज़ करने की आवश्यकता है, तो आप intlayer craco प्लगइन पर आधारित अपनी सेटअप को भी लागू कर सकते हैं। [यहां उदाहरण देखें](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)।

## React Create App के लिए पूरी Intlayer गाइड पढ़ें

Intlayer आपके React एप्लिकेशन को अंतर्राष्ट्रीय बनाने में मदद करने के लिए कई सुविधाएँ प्रदान करता है।
[देखें कि React Create App के साथ Intlayer का उपयोग कैसे करें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)।
