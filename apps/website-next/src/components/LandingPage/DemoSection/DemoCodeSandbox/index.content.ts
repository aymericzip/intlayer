import { type Dictionary, insert, t } from 'intlayer';

const demoCodeSandboxContent = {
  key: 'demo-code-sandbox',
  content: {
    demoCodesandboxHowToInternationalize: insert(
      t({
        en: 'Demo Code Sandbox - How to internationalize your {{framework}} application using Intlayer',
        fr: 'Demo Code Sandbox - Comment internationaliser votre application {{framework}} en utilisant Intlayer',
        es: 'Demo Code Sandbox - Cómo internacionalizar su aplicación {{framework}} usando Intlayer',
        de: 'Demo Code Sandbox - So internationalisieren Sie Ihre {{framework}}-Anwendung mit Intlayer',
        it: 'Demo Code Sandbox - Come internazionalizzare la tua applicazione {{framework}} usando Intlayer',
        pt: 'Demo Code Sandbox - Como internacionalizar sua aplicação {{framework}} usando Intlayer',
        ru: 'Демо-песочница - Как интернационализировать ваше приложение {{framework}} с помощью Intlayer',
        ja: 'デモコードサンドボックス - Intlayer を使用して {{framework}} アプリケーションを国際化する方法',
        ko: '데모 코드 샌드박스 - Intlayer를 사용하여 {{framework}} 애플리케이션을 국제화하는 방법',
        zh: '演示代码沙箱 - 如何使用 Intlayer 国际化您的 {{framework}} 应用程序',
        'en-GB':
          'Demo Code Sandbox - How to internationalise your {{framework}} application using Intlayer',
        hi: 'डे모 कोड सैंडबॉक्स - Intlayer का उपयोग करके अपने {{framework}} एप्लिकेशन को अंतर्राष्ट्रीयकृत कैसे करें',
        tr: 'Demo Kod Sandığı - Intlayer kullanarak {{framework}} uygulamanızı nasıl uluslararasılaştıracağınız',
        pl: 'Demo Code Sandbox - Jak umiędzynarodowić aplikację {{framework}} za pomocą Intlayer',
        id: 'Demo Code Sandbox - Cara menginternasionalisasi aplikasi {{framework}} Anda menggunakan Intlayer',
        vi: 'Demo Code Sandbox - Cách quốc tế hóa ứng dụng {{framework}} của bạn bằng Intlayer',
        uk: 'Демо-пісочниця - Як інтернаціоналізувати ваш додаток {{framework}} за допомогою Intlayer',
        ar: 'عرض صندوق رمل الكود - كيفية تدويل تطبيق {{framework}} الخاص بك باستخدام Intlayer',
      })
    ),
  },
} satisfies Dictionary;

export default demoCodeSandboxContent;
