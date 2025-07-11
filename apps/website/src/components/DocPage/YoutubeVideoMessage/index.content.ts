import { t, type Dictionary } from 'intlayer';

const youtubeVideoMessageContent = {
  key: 'youtube-video-message',
  content: {
    title: t({
      en: 'Watch the video tutorial',
      fr: 'Regarder le tutoriel vidéo',
      ar: 'شاهد الفيديو التعليمي',
      de: 'Video-Tutorial ansehen',
      es: 'Ver el video tutorial',
      hi: 'वीडियो ट्यूटोरियल देखें',
      ru: 'Посмотреть видео урок',
      'en-GB': 'Watch the video tutorial',
      it: 'Guarda il video tutorial',
      ja: 'ビデオチュートリアルを見る',
      ko: '비디오 튜토리얼 보기',
      pt: 'Assistir ao vídeo tutorial',
      zh: '观看视频教程',
    }),
    description: t({
      en: 'This page has a video tutorial available.',
      fr: "Cette page dispose d'un tutoriel vidéo.",
      es: 'Esta página tiene un video tutorial disponible.',
      hi: 'इस पृष्ठ के लिए एक वीडियो ट्यूटोरियल उपलब्ध है।',
      ru: 'Для этой страницы доступен видео урок.',
      de: 'Für diese Seite ist ein Video-Tutorial verfügbar.',
      pt: 'Esta página tem um vídeo tutorial disponível.',
      ja: 'このページにはビデオチュートリアルがあります。',
      ko: '이 페이지에는 비디오 튜토리얼이 제공됩니다.',
      zh: '此页面有视频教程。',
      ar: 'هذه الصفحة لديها فيديو تعليمي متاح.',
      'en-GB': 'This page has a video tutorial available.',
      it: 'Questa pagina ha un video tutorial disponibile.',
    }),
    label: t({
      en: 'Watch the video tutorial',
      fr: 'Regarder le tutoriel vidéo',
      ar: 'شاهد الفيديو التعليمي',
      de: 'Video-Tutorial ansehen',
      es: 'Ver el video tutorial',
      hi: 'वीडियो ट्यूटोरियल देखें',
      ru: 'Посмотреть видео урок',
      'en-GB': 'Watch the video tutorial',
      it: 'Guarda il video tutorial',
      ja: 'ビデオチュートリアルを見る',
      ko: '비디오 튜토리얼 보기',
      pt: 'Assistir ao vídeo tutorial',
      zh: '观看视频教程',
    }),
  },
} satisfies Dictionary;

export default youtubeVideoMessageContent;
