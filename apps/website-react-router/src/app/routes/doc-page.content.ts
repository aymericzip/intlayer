import { type Dictionary, t } from 'intlayer';

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
        pl: 'Przejdź do następnej sekcji',
        id: 'Lanjut ke bagian berikutnya',
        vi: 'Đi tới phần tiếp theo',
        uk: 'Перейти до наступного розділу',
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
        pl: 'Przejdź do poprzedniej sekcji',
        id: 'Kembali ke bagian sebelumnya',
        vi: 'Đi tới phần trước',
        uk: 'Перейти до попереднього розділу',
      }),
    },
  },
  title: 'Documentation page navigation',
  description:
    'Content declaration for navigation controls on the documentation page, including labels for moving to the next or previous section.',
  tags: ['documentation', 'navigation'],
} satisfies Dictionary;

export default docContent;
