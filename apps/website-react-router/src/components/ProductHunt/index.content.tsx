import { type Dictionary, t } from 'intlayer';

const productHuntContent = {
  key: 'product-hunt',
  content: {
    title: 'Product Hunt',
    content: t({
      en: (
        <>
          Intlayer Launches This <strong>Sunday, May 11th</strong> on{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      fr: (
        <>
          Intlayer lance cette <strong>dimanche 11 mai</strong> sur{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      es: (
        <>
          Intlayer lanza esta <strong>domingo 11 mayo</strong> en{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      'en-GB': (
        <>
          Intlayer Launches This <strong>Sunday, May 11th</strong> on{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      de: (
        <>
          Intlayer startet diesen <strong>Sonntag, den 11. Mai</strong> auf{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      ja: (
        <>
          Intlayerはこの<strong>日曜日、5月11日</strong>に{' '}
          <strong className="underline">Product Hunt</strong>でローンチします
        </>
      ),
      ko: (
        <>
          Intlayer가<strong>일요일, 5월 11일</strong>에{' '}
          <strong className="underline">Product Hunt</strong>에서 런칭됩니다
        </>
      ),
      zh: (
        <>
          Intlayer将在<strong>星期日，5月11日</strong>在{' '}
          <strong className="underline">Product Hunt</strong>发布
        </>
      ),
      it: (
        <>
          Intlayer lancia questo<strong>domenica 11 maggio</strong> su{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      pt: (
        <>
          Intlayer lança este<strong>domingo, 11 de maio</strong> no{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      hi: (
        <>
          Intlayer<strong>रविवार, 11 मई</strong> को{' '}
          <strong className="underline">Product Hunt</strong> पर लॉन्च होता है
        </>
      ),
      ar: (
        <>
          Intlayer تطلق هذا<strong>الأحد، 11 مايو</strong> على{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      uk: (
        <>
          Intlayer запускається <strong>в неділю, 11 травня</strong> на{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      ru: (
        <>
          Intlayer запускается<strong>в воскресенье, 11 мая</strong> на{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      tr: (
        <>
          Intlayer bu<strong>Pazar, 11 Mayıs</strong>nda{' '}
          <strong className="underline">Product Hunt</strong> üzerinde
          yayınlanır
        </>
      ),
      pl: (
        <>
          Intlayer wydany<strong>w niedzielę, 11 maja</strong> na{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      id: (
        <>
          Intlayer akan diluncurkan pada <strong>Minggu, 11 Mei</strong> di{' '}
          <strong className="underline">Product Hunt</strong>
        </>
      ),
      vi: (
        <>
          Intlayer sẽ được phát hành vào <strong>Chủ Nhật, 11 tháng 5</strong>{' '}
          trên <strong className="underline">Product Hunt</strong>
        </>
      ),
    }),
    details: t({
      en: 'Visit us on Product Hunt and show your support with an upvote. Your feedback is invaluable!',
      fr: 'Visitez-nous sur Product Hunt et montrez votre soutien avec un upvote. Votre feedback est inaliénable !',
      es: 'Visite con nosotros en Product Hunt y muestre su apoyo con un upvote. ¡Su feedback es inalcanzable!',
      'en-GB':
        'Visit us on Product Hunt and show your support with an upvote. Your feedback is invaluable!',
      de: 'Besuchen Sie uns auf Product Hunt und zeigen Sie Ihre Unterstützung mit einem Upvote. Ihr Feedback ist unbezahlbar!',
      ja: 'Product Huntで私たちを訪ねて、アップボートでサポートしてください。あなたのフィードバックは貴重です！',
      ko: 'Product Hunt에서 저희를 방문하고 업보팅으로 지원해 주세요. 당신의 피드백은 소중합니다!',
      zh: '在Product Hunt上访问我们，并通过投票支持我们。您的反馈非常重要！',
      it: 'Visita il nostro profilo su Product Hunt e mostra il tuo supporto con un upvote. Il tuo feedback è inestimabile!',
      pt: 'Visite-nos no Product Hunt e mostre seu apoio com um upvote. Seu feedback é inestimável!',
      hi: 'Product Hunt पर हमें देखें और एक अपvote के साथ अपना समर्थन दिखाएं। आपकी फीडबैक अनमोल है!',
      ar: 'قم بزيارتنا على Product Hunt وأظهر دعمك من خلال التصويت. ملاحظاتك لا تقدر بثمن!',
      uk: 'Відвідайте нас на Product Hunt та підтримайте нас голосуванням. Ваш відгук безцінний!',
      ru: 'Посетите нас на Product Hunt и поддержите нас голосованием. Ваш отзыв бесценен!',
      tr: "Product Hunt'da bizi ziyaret edin ve bir upvote ile desteğinizi gösterin. Yorumunuz değerlidir!",
      pl: 'Odwiedź nas na Product Hunt i wesprzyj nas upvotem. Twoja opinia jest dla nas nieoceniona!',
      id: 'Kunjungi kami di Product Hunt dan tunjukkan dukungan Anda dengan memberi upvote. Umpan balik Anda sangat berharga!',
      vi: 'Hãy ghé thăm chúng tôi trên Product Hunt và ủng hộ bằng một lượt upvote. Phản hồi của bạn vô cùng quý giá!',
    }),
    linkLabel: t({
      en: 'Go to see it on Product Hunt',
      fr: 'Aller voir sur Product Hunt',
      es: 'Ir a verlo en Product Hunt',
      'en-GB': 'Go to see it on Product Hunt',
      de: 'Gehe zum Sehen auf Product Hunt',
      ja: 'Product Huntで見る',
      ko: 'Product Hunt에서 보기',
      zh: '去看看Product Hunt',
      it: 'Vai a vedere su Product Hunt',
      pt: 'Vá para ver no Product Hunt',
      hi: 'प्रोडक्शन हिंदु में जाएं',
      ar: 'اذهب لرؤيةه على Product Hunt',
      uk: 'Перейти на Product Hunt',
      ru: 'Посетите на Product Hunt',
      tr: "Product Hunt'da görüntüle",
      pl: 'Zobacz to na Product Hunt',
      id: 'Lihat di Product Hunt',
      vi: 'Xem trên Product Hunt',
    }),
    closeLabel: t({
      en: 'Close',
      fr: 'Fermer',
      es: 'Cerrar',
      'en-GB': 'Close',
      de: 'Schließen',
      ja: '閉じる',
      ko: '닫기',
      zh: '关闭',
      it: 'Chiudi',
      pt: 'Fechar',
      hi: 'बंद करें',
      ar: 'إغلاق',
      uk: 'Закрити',
      ru: 'Закрыть',
      tr: 'Kapat',
      pl: 'Zamknij',
      id: 'Tutup',
      vi: 'Đóng',
    }),
  },
  title: 'Product Hunt announcement',
  description:
    'Content related to the Product Hunt launch announcement, including title, call-to-action, launch date and interaction labels for the modal or banner.',
  tags: ['product launch', 'announcement'],
} satisfies Dictionary;

export default productHuntContent;
