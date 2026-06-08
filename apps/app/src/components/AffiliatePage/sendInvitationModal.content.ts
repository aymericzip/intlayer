import { type Dictionary, t } from 'intlayer';

const sendInvitationModalContent = {
  key: 'send-invitation-modal',
  content: {
    sendAffiliateInvitation: t({
      en: 'Send Affiliate Invitation',
      ru: 'Отправить приглашение партнеру',
      ja: 'アフィリエイトの招待状を送信',
      fr: "Envoyer une invitation d'affiliation",
      ko: '제휴 초대장 보내기',
      zh: '发送附属邀请',
      es: 'Enviar invitación de afiliado',
      de: 'Affiliate-Einladung senden',
      ar: 'إرسال دعوة انضمام',
      it: 'Invia invito di affiliazione',
      'en-GB': 'Send Affiliate Invitation',
      pt: 'Enviar convite de afiliado',
      hi: 'सहबद्ध निमंत्रण भेजें',
      tr: 'Ortaklık Daveti Gönder',
      pl: 'Wyślij zaproszenie partnerskie',
      id: 'Kirim Undangan Afiliasi',
      vi: 'Gửi Lời Mời Tiếp Thị Liên Kết',
      uk: 'Надіслати запрошення партнеру',
    }),

    inviteSomeoneToJoinThe: t({
      en: 'Invite someone to join the affiliate program. They will receive an email with a link to complete their setup.',
      ru: 'Пригласите кого-нибудь присоединиться к партнерской программе. Они получат электронное письмо со ссылкой для завершения настройки.',
      ja: 'アフィリエイトプログラムに参加するよう誰かを招待します。設定を完了するためのリンクが記載されたメールが届きます。',
      fr: "Invitez quelqu'un à rejoindre le programme d'affiliation. Il recevra un e-mail avec un lien pour finaliser sa configuration.",
      ko: '제휴 프로그램에 참여하도록 누군가를 초대합니다. 그들은 설정을 완료할 수 있는 링크가 포함된 이메일을 받게 됩니다.',
      zh: '邀请某人加入联属网络营销计划。他们将收到一封包含链接的电子邮件，以完成其设置。',
      es: 'Invite a alguien a unirse al programa de afiliados. Recibirán un correo electrónico con un enlace para completar su configuración.',
      de: 'Laden Sie jemanden ein, am Affiliate-Programm teilzunehmen. Sie erhalten eine E-Mail mit einem Link zur Vervollständigung ihrer Einrichtung.',
      ar: 'قم بدعوة شخص ما للانضمام إلى برنامج الشراكة. سيتلقون بريدًا إلكترونيًا يحتوي على رابط لإكمال الإعداد الخاص بهم.',
      it: "Invita qualcuno a unirsi al programma di affiliazione. Riceveranno un'e-mail con un link per completare la configurazione.",
      'en-GB':
        'Invite someone to join the affiliate program. They will receive an email with a link to complete their setup.',
      pt: 'Convide alguém para participar do programa de afiliados. Eles receberão um e-mail com um link para concluir a configuração.',
      hi: 'सहबद्ध कार्यक्रम में शामिल होने के लिए किसी को आमंत्रित करें। उन्हें अपना सेटअप पूरा करने के लिए एक लिंक के साथ एक ईमेल प्राप्त होगा।',
      tr: 'Birini ortaklık programına katılmaya davet edin. Kurulumlarını tamamlamaları için bir bağlantı içeren bir e-posta alacaklar.',
      pl: 'Zaproś kogoś do dołączenia do programu partnerskiego. Otrzymają wiadomość e-mail z linkiem do zakończenia konfiguracji.',
      id: 'Undang seseorang untuk bergabung dengan program afiliasi. Mereka akan menerima email dengan tautan untuk menyelesaikan pengaturan mereka.',
      vi: 'Mời ai đó tham gia chương trình tiếp thị liên kết. Họ sẽ nhận được email có liên kết để hoàn tất thiết lập.',
      uk: 'Запросіть когось приєднатися до партнерської програми. Вони отримають електронного листа з посиланням для завершення налаштування.',
    }),
  },
} satisfies Dictionary;

export default sendInvitationModalContent;
