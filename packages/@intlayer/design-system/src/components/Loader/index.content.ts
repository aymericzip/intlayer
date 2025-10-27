import { type Dictionary, t } from 'intlayer';

export const loaderContent = {
  key: 'loader',
  content: {
    label: t({
      en: 'Animated icon, meaning that the website is processing',
      'en-GB': 'Animated icon, meaning that the website is processing',
      fr: 'Icône animée, signifiant que le site Web est en cours de traitement',
      es: 'Icono animado, significa que el sitio web está procesando',
      de: 'Animiertes Icon, das heißt, dass die Website in Bearbeitung ist',
      ja: 'アニメーションアイコン、ウェブサイトが処理していることを意味する',
      ko: '애니메이션 아이콘, 웹 사이트가 처리 중인 의미',
      zh: '动画图标，意味着网站正在处理',
      it: 'Icona animata, che significa che il sito web è in fase di elaborazione',
      pt: 'Ícone animado, o que significa que o site está processando',
      hi: 'एनिमेटेड आइकन, जो कि वेबसाइट को प्रसंस्करण हो रहा है इसका मतलब है',
      ar: 'رمز متحرك، مما يعني أن الموقع الإلكتروني يتم التحميل',
      ru: 'Анимационный значок, что означает, что сайт обрабатывается',
      tr: 'Web sitesinin işlemde olduğunu belirten animasyonlu simge',
      pl: 'Animowana ikona oznaczająca, że strona przetwarza dane',
      id: 'Ikon animasi yang menunjukkan bahwa situs sedang memproses konten',
      vi: 'Biểu tượng động, biểu thị rằng trang web đang xử lý',
    }),
  },
  title: 'Loader component',
  description:
    'Content declaration for the loader component, representing an animated icon indicating that the website is processing or loading content.',
  tags: ['component', 'loader'],
} satisfies Dictionary;

export default loaderContent;
