import { t, type Dictionary } from 'intlayer';

const docContent = {
  key: 'doc-page',
  content: {
    goToNextSection: {
      label: t({
        en: 'Go to next section',
        'en-GB': 'Go to next section',
        fr: 'Aller à la section suivante',
        es: 'Ir a la siguiente sección',
        de: 'Gehe zum nächsten Abschnitt',
        ja: '次のセクションに移動',
        ko: '다음 섹션으로 이동',
        zh: '转到下一个部分',
        it: 'Vai alla sezione successiva',
        pt: 'Ir para a próxima seção',
        hi: 'अगला अनुभाग पर जाएं',
        ar: 'اذهب إلى القسم التالي',
        ru: 'Перейти к следующей секции',
        tr: 'Sonraki bölüme git',
      }),
    },
    goToPreviousSection: {
      label: t({
        en: 'Go to previous section',
        'en-GB': 'Go to previous section',
        fr: 'Aller à la section précédente',
        es: 'Ir a la sección anterior',
        de: 'Gehe zum vorherigen Abschnitt',
        ja: '前のセクションに移動',
        ko: '이전 섹션으로 이동',
        zh: '转到上一个部分',
        it: 'Vai alla sezione precedente',
        pt: 'Ir para a seção anterior',
        hi: 'पिछला अनुभाग पर जाएं',
        ar: 'اذهب إلى القسم السابق',
        ru: 'Перейти к предыдущей секции',
        tr: 'Önceki bölüme git',
      }),
    },
  },
} satisfies Dictionary;

export default docContent;
