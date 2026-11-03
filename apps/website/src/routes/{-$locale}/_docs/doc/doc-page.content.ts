import { type Dictionary, t } from 'intlayer';

const docContent = {
  key: 'doc-page',
  content: {
    goToNextSection: {
      label: t({
        en: 'Go to next section',
        ar: 'اذهب إلى القسم التالي',
        de: 'Gehe zum nächsten Abschnitt',
        'en-GB': 'Go to next section',
        es: 'Ir a la siguiente sección',
        fr: 'Aller à la section suivante',
        'he-IL': 'מעבר לסעיף הבא',
        hi: 'अगला अनुभाग पर जाएं',
        id: 'Lanjut ke bagian berikutnya',
        it: 'Vai alla sezione successiva',
        ja: '次のセクションに移動',
        ko: '다음 섹션으로 이동',
        pl: 'Przejdź do następnej sekcji',
        pt: 'Ir para a próxima seção',
        ru: 'Перейти к следующей секции',
        tr: 'Sonraki bölüme git',
        uk: 'Перейти до наступного розділу',
        vi: 'Đi tới phần tiếp theo',
        zh: '转到下一个部分',
      }),
    },
    goToPreviousSection: {
      label: t({
        en: 'Go to previous section',
        ar: 'اذهب إلى القسم السابق',
        de: 'Gehe zum vorherigen Abschnitt',
        'en-GB': 'Go to previous section',
        es: 'Ir a la sección anterior',
        fr: 'Aller à la section précédente',
        'he-IL': 'מעבר לסעיף הקודם',
        hi: 'पिछला अनुभाग पर जाएं',
        id: 'Kembali ke bagian sebelumnya',
        it: 'Vai alla sezione precedente',
        ja: '前のセクションに移動',
        ko: '이전 섹션으로 이동',
        pl: 'Przejdź do poprzedniej sekcji',
        pt: 'Ir para a seção anterior',
        ru: 'Перейти к предыдущей секции',
        tr: 'Önceki bölüme git',
        uk: 'Перейти до попереднього розділу',
        vi: 'Đi tới phần trước',
        zh: '转到上一个部分',
      }),
    },
  },
  title: 'Documentation page navigation',
  description:
    'Content declaration for navigation controls on the documentation page, including labels for moving to the next or previous section.',
  tags: ['documentation', 'navigation'],
} satisfies Dictionary;

export default docContent;
