# एन्क्यूमरेशन / बहुवचन

## एन्क्यूमरेशन कैसे काम करता है

Intlayer में, एन्क्यूमरेशन `enu` कार्य के माध्यम से प्राप्त किया जाता है, जो विशिष्ट कुंजियों को उनके संबंधित सामग्री से मानचित्रित करता है। ये कुंजी संख्यात्मक मान, रेंज, या कस्टम पहचानकर्ताओं का प्रतिनिधित्व कर सकती हैं। जब इसे React Intlayer या Next Intlayer के साथ उपयोग किया जाता है, तो उचित सामग्री स्वचालित रूप से एप्लिकेशन की स्थानीयता और परिभाषित नियमों के आधार पर चुनी जाती है।

## एन्क्यूमरेशन सेट करना

अपने Intlayer प्रोजेक्ट में एन्क्यूमरेशन सेट करने के लिए, आपको एक सामग्री मॉड्यूल बनाना होगा जिसमें एन्क्यूमरेशन परिभाषाएँ शामिल हों। यहाँ कारों की संख्या के लिए एक सरल एन्क्यूमरेशन का उदाहरण है:

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "एक से कम माइनस एक कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "बहुत सारी कारें",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

इस उदाहरण में, `enu` विभिन्न शर्तों को विशिष्ट सामग्री के साथ मानचित्रित करता है। जब इसे एक React कंपोनेंट में उपयोग किया जाता है, Intlayer स्वचालित रूप से दिए गए चर के आधार पर उचित सामग्री चुन सकता है।

## React Intlayer के साथ एन्क्यूमरेशन का उपयोग करना

React कंपोनेंट में एन्क्यूमरेशन का उपयोग करने के लिए, आप `react-intlayer` पैकेज से `useIntlayer` हुक का लाभ उठा सकते हैं। यह हुक निर्दिष्ट ID के आधार पर सही सामग्री प्राप्त करता है। इसे उपयोग करने का एक उदाहरण यहाँ है:

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* आउटपुट: कोई कार नहीं */}
      <p>{content.numberOfCar(6)}</p> {/* आउटपुट: कुछ कारें */}
      <p>{content.numberOfCar(20)}</p> {/* आउटपुट: कुछ कारें */}
    </div>
  );
};

export default CarComponent;
```

इस उदाहरण में, कंपोनेंट अपने आउटपुट को कारों की संख्या के आधार पर गतिशील रूप से समायोजित करता है। निर्दिष्ट रेंज के आधार पर सही सामग्री स्वचालित रूप से चुनी जाती है।

## महत्वपूर्ण नोट्स

- Intlayer एन्क्यूमरेशन में नामकरण का क्रम महत्वपूर्ण है। पहला मान्य नामांकन वह है जिसे चुना जाएगा।
- यदि कई शर्तें लागू होती हैं, तो सुनिश्चित करें कि वे अपेक्षित व्यवहार से बचने के लिए सही क्रम में हैं।

## एन्क्यूमरेशन के लिए सर्वश्रेष्ठ प्रथाएँ

यह सुनिश्चित करने के लिए कि आपकी एन्क्यूमरेशनों की अपेक्षा के अनुसार काम करें, इन सर्वोत्तम प्रथाओं का पालन करें:

- **संगत नामकरण**: भ्रम से बचने के लिए एन्क्यूमरेशन मॉड्यूल के लिए स्पष्ट और संगत IDs का उपयोग करें।
- **डॉक्यूमेंटेशन**: अपने एन्क्यूमरेशन कुंजी और उनकी अपेक्षित आउटपुट का दस्तावेजीकरण करें ताकि भविष्य में रखरखाव सुनिश्चित हो सके।
- **त्रुटि प्रबंधन**: ऐसे मामलों का प्रबंधन करने के लिए त्रुटि प्रबंधन लागू करें जहाँ कोई मान्य एन्क्यूमरेशन नहीं पाया जाता है।
- **प्रदर्शन का अनुकूलन**: बड़े अनुप्रयोगों के लिए, प्रदर्शन में सुधार करने के लिए देखे जाने वाले फ़ाइल एक्सटेंशन की संख्या को कम करें।

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और विभिन्न ढांचे के साथ Intlayer की सेटअप और उपयोग पर आगे की अंतर्दृष्टि प्रदान करते हैं।