import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'define-password-form',
  content: {
    goToLoginButton: {
      ariaLabel: t({
        en: 'Click to go to home page',
        ar: 'انقر للذهاب إلى الصفحة الرئيسية',
        de: 'Klicken Sie, um zur Startseite zu gehen',
        'en-GB': 'Click to go to home page',
        es: 'Haz clic para ir a la página de inicio',
        fr: "Cliquez pour aller à la page d'accueil",
        'he-IL': 'לחצו למעבר לדף הבית',
        hi: 'होम पेज पर जाने के लिए क्लिक करें',
        id: 'Klik untuk pergi ke halaman utama',
        it: 'Clicca per andare alla home page',
        ja: 'ホームページに行くにはクリックしてください',
        ko: '홈페이지로 가는 방법을 클릭하세요',
        pl: 'Kliknij, aby przejść do strony głównej',
        pt: 'Clique para ir para a home page',
        ru: 'Нажмите, чтобы перейти на главную страницу',
        tr: 'Ana sayfaya gitmek için tıklayın',
        uk: 'Натисніть, щоб перейти на головну сторінку',
        vi: 'Nhấn để đến trang chủ',
        zh: '点击进入主页',
      }),
      text: t({
        en: 'Go to home page',
        ar: 'اذهب إلى الصفحة الرئيسية',
        de: 'Gehen Sie zur Startseite',
        'en-GB': 'Go to home page',
        es: 'Ir a la página de inicio',
        fr: "Retourner à l'accueil",
        'he-IL': 'מעבר לדף הבית',
        hi: 'होम पृष्ठ पर जाएँ',
        id: 'Pergi ke halaman utama',
        it: 'Vai alla home page',
        ja: 'ホームページに行く',
        ko: '홈페이지로 가기',
        pl: 'Przejdź do strony głównej',
        pt: 'Ir para a home page',
        ru: 'Перейти на главную страницу',
        tr: 'Ana sayfaya git',
        uk: 'Перейти на головну сторінку',
        vi: 'Đến trang chủ',
        zh: '进入主页',
      }),
    },
  },
  title: 'Define password form',
  description:
    'Content declaration for the define password form component, including navigation elements such as the button to return to the home page.',
  tags: ['authentication', 'form', 'define password'],
} satisfies Dictionary;

export default content;
