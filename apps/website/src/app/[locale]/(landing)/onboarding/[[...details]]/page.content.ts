import { type Dictionary, t } from 'intlayer';

const resetPasswordContent = {
  key: 'onboard-page',
  content: {
    title: t({
      en: 'Onboarding',
      'en-GB': 'Onboarding',
      fr: 'Configurer votre compte',
      es: 'Configurar tu cuenta',
      de: 'Ihr Konto einrichten',
      ja: 'オンボーディング',
      ko: '온보딩',
      zh: '入门',
      it: 'Onboarding',
      pt: 'Configuração da sua conta',
      hi: 'ऑनबोर्डिंग',
      ar: 'إعداد الحساب',
      ru: 'Настройка аккаунта',
      tr: 'Hesap Kurulumu',
      pl: 'Wprowadzenie',
      id: 'Onboarding',
      vi: 'Hướng dẫn bắt đầu',
    }),

    description: t({
      en: 'Set up your Intlayer account by following the instructions.',
      'en-GB': 'Set up your Intlayer account by following the instructions.',
      fr: 'Suivez les instructions pour configurer votre compte Intlayer.',
      es: 'Sigue las instrucciones para configurar tu cuenta de Intlayer.',
      de: 'Richten Sie Ihr Intlayer-Konto ein, indem Sie die Anweisungen befolgen.',
      ja: '指示に従ってIntlayerアカウントを設定します。',
      ko: '지침에 따라 Intlayer 계정을 설정하십시오.',
      zh: '按照说明设置您的Intlayer帐户。',
      it: 'Configura il tuo account Intlayer seguendo le istruzioni.',
      pt: 'Configure sua conta Intlayer seguindo as instruções.',
      hi: 'निर्देशों का पालन करके अपना Intlayer खाता सेट करें।',
      ar: 'قم بإعداد حسابك في Intlayer باتباع التعليمات.',
      ru: 'Настройте свою учетную запись Intlayer, следуя инструкциям.',
      tr: 'Talimatları izleyerek Intlayer hesabınızı kurun.',
      pl: 'Skonfiguruj swoje konto Intlayer, postępując zgodnie z instrukcjami.',
      id: 'Siapkan akun Intlayer Anda dengan mengikuti instruksi.',
      vi: 'Thiết lập tài khoản Intlayer của bạn theo hướng dẫn.',
    }),
  },
  title: 'Onboarding page content',
  description:
    'Content for the onboarding page, helps users set up their Intlayer account through provided instructions and guidance.',
  tags: ['onboarding', 'landing page'],
} satisfies Dictionary;

export default resetPasswordContent;
