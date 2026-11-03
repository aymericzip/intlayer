import { type Dictionary, t } from 'intlayer';

const sendInvitationModalContent = {
  key: 'send-invitation-modal',
  content: {
    inviteSomeoneToJoinThe: t({
      en: 'Invite someone to join the affiliate program. They will receive an email with a link to complete their setup.',
      ar: 'قم بدعوة شخص ما للانضمام إلى برنامج الشراكة. سيتلقون بريدًا إلكترونيًا يحتوي على رابط لإكمال الإعداد الخاص بهم.',
      de: 'Laden Sie jemanden ein, am Affiliate-Programm teilzunehmen. Sie erhalten eine E-Mail mit einem Link zur Vervollständigung ihrer Einrichtung.',
      'en-GB':
        'Invite someone to join the affiliate program. They will receive an email with a link to complete their setup.',
      es: 'Invite a alguien a unirse al programa de afiliados. Recibirán un correo electrónico con un enlace para completar su configuración.',
      fr: "Invitez quelqu'un à rejoindre le programme d'affiliation. Il recevra un e-mail avec un lien pour finaliser sa configuration.",
      'he-IL':
        'הזמינו מישהו להצטרף לתוכנית השותפים. הוא יקבל אימייל עם קישור להשלמת ההגדרה.',
      hi: 'सहबद्ध कार्यक्रम में शामिल होने के लिए किसी को आमंत्रित करें। उन्हें अपना सेटअप पूरा करने के लिए एक लिंक के साथ एक ईमेल प्राप्त होगा।',
      id: 'Undang seseorang untuk bergabung dengan program afiliasi. Mereka akan menerima email dengan tautan untuk menyelesaikan pengaturan mereka.',
      it: "Invita qualcuno a unirsi al programma di affiliazione. Riceveranno un'e-mail con un link per completare la configurazione.",
      ja: 'アフィリエイトプログラムに参加するよう誰かを招待します。設定を完了するためのリンクが記載されたメールが届きます。',
      ko: '제휴 프로그램에 참여하도록 누군가를 초대합니다. 그들은 설정을 완료할 수 있는 링크가 포함된 이메일을 받게 됩니다.',
      pl: 'Zaproś kogoś do dołączenia do programu partnerskiego. Otrzymają wiadomość e-mail z linkiem do zakończenia konfiguracji.',
      pt: 'Convide alguém para participar do programa de afiliados. Eles receberão um e-mail com um link para concluir a configuração.',
      ru: 'Пригласите кого-нибудь присоединиться к партнерской программе. Они получат электронное письмо со ссылкой для завершения настройки.',
      tr: 'Birini ortaklık programına katılmaya davet edin. Kurulumlarını tamamlamaları için bir bağlantı içeren bir e-posta alacaklar.',
      uk: 'Запросіть когось приєднатися до партнерської програми. Вони отримають електронного листа з посиланням для завершення налаштування.',
      vi: 'Mời ai đó tham gia chương trình tiếp thị liên kết. Họ sẽ nhận được email có liên kết để hoàn tất thiết lập.',
      zh: '邀请某人加入联属网络营销计划。他们将收到一封包含链接的电子邮件，以完成其设置。',
    }),
    sendAffiliateInvitation: t({
      en: 'Send Affiliate Invitation',
      ar: 'إرسال دعوة انضمام',
      de: 'Affiliate-Einladung senden',
      'en-GB': 'Send Affiliate Invitation',
      es: 'Enviar invitación de afiliado',
      fr: "Envoyer une invitation d'affiliation",
      'he-IL': 'שליחת הזמנת שותף',
      hi: 'सहबद्ध निमंत्रण भेजें',
      id: 'Kirim Undangan Afiliasi',
      it: 'Invia invito di affiliazione',
      ja: 'アフィリエイトの招待状を送信',
      ko: '제휴 초대장 보내기',
      pl: 'Wyślij zaproszenie partnerskie',
      pt: 'Enviar convite de afiliado',
      ru: 'Отправить приглашение партнеру',
      tr: 'Ortaklık Daveti Gönder',
      uk: 'Надіслати запрошення партнеру',
      vi: 'Gửi Lời Mời Tiếp Thị Liên Kết',
      zh: '发送附属邀请',
    }),
  },
} satisfies Dictionary;

export default sendInvitationModalContent;
