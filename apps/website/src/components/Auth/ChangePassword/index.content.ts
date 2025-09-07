import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'change-password-form',
  content: {
    goToLoginButton: {
      text: t({
        en: 'Go to home page',
        fr: "Aller à la page d'accueil",
        es: 'Ir a la página de inicio',
        de: 'Gehen Sie zur Startseite',
        ja: 'ホームページに行く',
        ko: '홈페이지로 가기',
        zh: '进入主页',
        it: 'Vai alla home page',
        pt: 'Ir para a home page',
        hi: 'होम पृष्ठ पर जाएँ',
        ar: 'اذهب إلى الصفحة الرئيسية',
        ru: 'Перейти на главную страницу',
        'en-GB': 'Go to home page',
        tr: 'Ana sayfaya git',
      }),
      ariaLabel: t({
        en: 'Click to go to home page',
        fr: "Cliquez pour aller à la page d'accueil",
        es: 'Haz clic para ir a la página de inicio',
        de: 'Klicken Sie, um zur Startseite zu gehen',
        ja: 'ホームページに行くにはクリックしてください',
        ko: '홈페이지로 가는 방법을 클릭하세요',
        zh: '点击进入主页',
        it: 'Clicca per andare alla home page',
        pt: 'Clique para ir para a home page',
        hi: 'होम पृष्ठ पर जाएँ को क्लिक करें',
        ar: 'انقر للذهاب إلى الصفحة الرئيسية',
        ru: 'Нажмите, чтобы перейти на главную страницу',
        'en-GB': 'Click to go to home page',
        tr: 'Ana sayfaya gitmek için tıklayın',
      }),
    },
  },
} satisfies Dictionary;

export default content;
