import { t, type Dictionary } from 'intlayer';

const featuresSectionContent = {
  key: 'visual-editor-section',
  content: {
    description: t({
      en: 'Try it for free using the playground.',
      'en-GB': 'Try it for free using the playground.',
      fr: 'Essayez-le gratuitement en utilisant le playground.',
      es: 'Pruébelo gratis usando el playground.',
      de: 'Probieren Sie es kostenlos mit dem Playground.',
      it: 'Provalo gratuitamente usando il playground.',
      pt: 'Experimente gratuitamente usando o playground.',
      ru: 'Попробуйте бесплатно с помощью плейграунда.',
      zh: '在用演示机中免费试用。',
      ja: 'プレイグラウンドを使用して無料で試してみてください。',
      ar: 'جربه مجاناً باستخدام الملعب.',
      hi: 'प्लेगन का उपयोग करके मुफ्त को खेलें।',
      ko: '플레이그라운드를 사용하여 무료로 시도하세요.',
    }),
    gotToPlaygroundButton: {
      text: t({
        en: 'Go to playground',
        'en-GB': 'Go to playground',
        fr: 'Aller au playground',
        es: 'Ir al playground',
        de: 'Gehe zum Playground',
        it: 'Vai al playground',
        pt: 'Ir ao playground',
        ru: 'Перейти к плейграунду',
        zh: '前往演示机',
        ja: 'プレイグラウンドに移動',
        ar: 'اذهب إلى الملعب',
        hi: 'प्लेगन पर जाएं',
        ko: '플레이그라운드로 이동',
      }),
      label: t({
        en: 'Click to go to the playground',
        'en-GB': 'Click to go to the playground',
        fr: 'Cliquez pour aller au playground',
        es: 'Haga clic para ir al playground',
        de: 'Klicken Sie hier, um zum Playground zu gelangen',
        it: 'Fai clic per andare al playground',
        pt: 'Clique aqui para ir ao playground',
        ru: 'Нажмите, чтобы перейти к плейграунду',
        zh: '点击这里前往演示机',
        ja: 'クリックしてプレイグラウンドに移動します',
        ar: 'انقر للذهاب إلى الملعب',
        hi: 'प्लेगन पर जाएं',
        ko: '클릭하여 플레이그라운드로 이동',
      }),
    },
  },
} satisfies Dictionary;

export default featuresSectionContent;
