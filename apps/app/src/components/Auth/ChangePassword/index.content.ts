import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'change-password-form',
  content: {
    goToLoginButton: {
      text: t({
        hi: 'होम पेज पर जाएँ',
        pt: 'Ir para a página inicial',
        it: 'Vai alla home page',
        ar: 'اذهب إلى الصفحة الرئيسية',
        zh: '前往主页',
        ko: '홈페이지로 이동',
        ja: 'トップページへ',
        ru: 'Перейти на главную страницу',
        en: 'Go to home page',
        fr: "Aller à la page d'accueil",
        es: 'Ir a la página de inicio',
        de: 'Gehen Sie zur Startseite',
        'en-GB': 'Go to home page',
        tr: 'Ana sayfaya git',
        pl: 'Przejdź na stronę główną',
        id: 'Ke beranda',
        vi: 'Về trang chủ',
        uk: 'Перейти на головну сторінку',
      }),
      ariaLabel: t({
        hi: 'होम पृष्ठ पर जाएँ को क्लिक करें',
        pt: 'Clique para ir para a home page',
        it: 'Clicca per andare alla home page',
        ar: 'انقر للذهاب إلى الصفحة الرئيسية',
        zh: '点击进入主页',
        ko: '홈페이지로 가는 방법을 클릭하세요',
        ja: 'ホームページに行くにはクリックしてください',
        ru: 'Нажмите, чтобы перейти на главную страницу',
        en: 'Click to go to home page',
        fr: "Cliquez pour aller à la page d'accueil",
        es: 'Haz clic para ir a la página de inicio',
        de: 'Klicken Sie, um zur Startseite zu gehen',
        'en-GB': 'Click to go to home page',
        tr: 'Ana sayfaya gitmek için tıklayın',
        pl: 'Kliknij, aby przejść na stronę główną',
        id: 'Klik untuk pergi ke beranda',
        vi: 'Nhấp để về trang chủ',
        uk: 'Натисніть, щоб перейти на головну сторінку',
      }),
    },
  },
  title: 'Change password form',
  description:
    'Content for the change password form component, including button text and accessibility label to navigate back to the home page.',
  tags: ['auth form', 'change password'],
} satisfies Dictionary;

export default content;
