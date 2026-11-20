import type { Locale } from '@intlayer/types/allLocales';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

/** Locales every notification email is translated into. */
export type EmailLocale =
  | 'en'
  | 'en-GB'
  | 'fr'
  | 'es'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'de'
  | 'ar'
  | 'it'
  | 'pt'
  | 'hi'
  | 'tr'
  | 'pl'
  | 'id'
  | 'vi'
  | 'uk'
  | 'he-IL';

/**
 * Copy of the recipient locale, English when the locale has no translation.
 *
 * @param localeCopies - Copy per email locale.
 * @param locale - The recipient locale.
 */
export const resolveLocaleCopy = <Copy,>(
  localeCopies: Record<EmailLocale, Copy>,
  locale?: Locale
): Copy => localeCopies[locale as EmailLocale] ?? localeCopies.en;

/** Copy shared by every notification email. */
export type CommonEmailCopy = {
  /** Supports the `{username}` placeholder. */
  greeting: string;
  support: string;
  supportLink: string;
  /** Supports the `{username}` placeholder. */
  footer: string;
};

const commonEmailCopies: Record<EmailLocale, CommonEmailCopy> = {
  en: {
    greeting: 'Hey {username}!',
    support: 'If you run into problems, please contact support by visiting',
    supportLink: 'our support page',
    footer:
      'This email was intended for {username}. If you were not expecting this email, you can ignore it.',
  },
  'en-GB': {
    greeting: 'Hey {username}!',
    support: 'If you run into problems, please contact support by visiting',
    supportLink: 'our support page',
    footer:
      'This email was intended for {username}. If you were not expecting this email, you can ignore it.',
  },
  fr: {
    greeting: 'Salut {username} !',
    support: 'En cas de problème, contactez le support en visitant',
    supportLink: 'notre page de support',
    footer:
      "Cet e-mail était destiné à {username}. Si vous ne l'attendiez pas, vous pouvez l'ignorer.",
  },
  es: {
    greeting: '¡Hola {username}!',
    support: 'Si tienes problemas, contacta con el soporte visitando',
    supportLink: 'nuestra página de soporte',
    footer:
      'Este correo estaba destinado a {username}. Si no lo esperabas, puedes ignorarlo.',
  },
  ru: {
    greeting: 'Привет, {username}!',
    support: 'Если возникнут проблемы, обратитесь в поддержку на',
    supportLink: 'нашей странице поддержки',
    footer:
      'Это письмо предназначено для {username}. Если вы не ожидали его, просто проигнорируйте.',
  },
  ja: {
    greeting: 'こんにちは、{username}さん！',
    support:
      '問題が発生した場合は、次のページからサポートにお問い合わせください：',
    supportLink: 'サポートページ',
    footer:
      'このメールは {username} さん宛てです。心当たりがない場合は、このメールを無視してください。',
  },
  ko: {
    greeting: '안녕하세요, {username}님!',
    support: '문제가 있으면 다음 페이지에서 지원팀에 문의하세요:',
    supportLink: '지원 페이지',
    footer:
      '이 이메일은 {username}님에게 발송되었습니다. 예상하지 못한 이메일이라면 무시하셔도 됩니다.',
  },
  zh: {
    greeting: '您好，{username}！',
    support: '如果遇到问题，请访问',
    supportLink: '我们的支持页面',
    footer: '此邮件发送给 {username}。如果您没有预期收到此邮件，可以忽略它。',
  },
  de: {
    greeting: 'Hallo {username}!',
    support: 'Bei Problemen wenden Sie sich bitte an den Support über',
    supportLink: 'unsere Support-Seite',
    footer:
      'Diese E-Mail war für {username} bestimmt. Wenn Sie diese E-Mail nicht erwartet haben, können Sie sie ignorieren.',
  },
  ar: {
    greeting: 'مرحبًا {username}!',
    support: 'إذا واجهت أي مشكلة، يرجى التواصل مع الدعم عبر',
    supportLink: 'صفحة الدعم',
    footer:
      'هذه الرسالة موجهة إلى {username}. إذا لم تكن تتوقعها، يمكنك تجاهلها.',
  },
  it: {
    greeting: 'Ciao {username}!',
    support: 'In caso di problemi, contatta il supporto visitando',
    supportLink: 'la nostra pagina di supporto',
    footer:
      'Questa email era destinata a {username}. Se non te la aspettavi, puoi ignorarla.',
  },
  pt: {
    greeting: 'Olá {username}!',
    support: 'Se tiver problemas, entre em contato com o suporte visitando',
    supportLink: 'nossa página de suporte',
    footer:
      'Este e-mail foi destinado a {username}. Se você não esperava este e-mail, pode ignorá-lo.',
  },
  hi: {
    greeting: 'नमस्ते {username}!',
    support: 'यदि आपको कोई समस्या आती है, तो कृपया सहायता से संपर्क करें:',
    supportLink: 'हमारा सहायता पृष्ठ',
    footer:
      'यह ईमेल {username} के लिए था। यदि आप इस ईमेल की अपेक्षा नहीं कर रहे थे, तो आप इसे अनदेखा कर सकते हैं।',
  },
  tr: {
    greeting: 'Merhaba {username}!',
    support: 'Sorun yaşarsanız lütfen destek ekibiyle iletişime geçin:',
    supportLink: 'destek sayfamız',
    footer:
      'Bu e-posta {username} için gönderildi. Bu e-postayı beklemiyorsanız, görmezden gelebilirsiniz.',
  },
  pl: {
    greeting: 'Cześć {username}!',
    support: 'W razie problemów skontaktuj się z pomocą techniczną na',
    supportLink: 'naszej stronie wsparcia',
    footer:
      'Ten e-mail był przeznaczony dla {username}. Jeśli się go nie spodziewałeś, możesz go zignorować.',
  },
  id: {
    greeting: 'Halo {username}!',
    support: 'Jika Anda mengalami masalah, silakan hubungi dukungan melalui',
    supportLink: 'halaman dukungan kami',
    footer:
      'Email ini ditujukan untuk {username}. Jika Anda tidak mengharapkan email ini, Anda dapat mengabaikannya.',
  },
  vi: {
    greeting: 'Xin chào {username}!',
    support: 'Nếu gặp sự cố, vui lòng liên hệ bộ phận hỗ trợ qua',
    supportLink: 'trang hỗ trợ của chúng tôi',
    footer:
      'Email này được gửi cho {username}. Nếu bạn không mong đợi email này, bạn có thể bỏ qua.',
  },
  uk: {
    greeting: 'Привіт, {username}!',
    support: 'Якщо виникнуть проблеми, зверніться до служби підтримки на',
    supportLink: 'нашій сторінці підтримки',
    footer:
      'Цей лист призначений для {username}. Якщо ви не очікували його, просто проігноруйте.',
  },
  'he-IL': {
    greeting: 'היי {username}!',
    support: 'אם נתקלתם בבעיה, פנו לתמיכה דרך',
    supportLink: 'דף התמיכה שלנו',
    footer:
      'הודעה זו נועדה עבור {username}. אם לא ציפיתם להודעה זו, ניתן להתעלם ממנה.',
  },
};

/**
 * Greeting, support line and footer in the recipient locale.
 *
 * @param locale - The recipient locale.
 */
export const getCommonEmailCopy = (locale?: Locale): CommonEmailCopy =>
  resolveLocaleCopy(commonEmailCopies, locale);

/** Replaces each `{name}` placeholder with its value. */
export const fillPlaceholders = (
  template: string,
  values: Record<string, string>
): string =>
  template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in values ? values[name] : placeholder
  );

/** Long date in the recipient locale, UTC so every reader sees one instant. */
export const formatEmailDate = (date: Date | string, locale?: Locale): string =>
  `${new Intl.DateTimeFormat(locale ?? 'en', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(date))} UTC`;

export type NotificationEmailLayoutProps = {
  locale?: Locale;
  previewText: string;
  heading: string;
  greeting: string;
  paragraphs: string[];
  button: { label: string; url: string };
  support: { text: string; linkLabel: string; url: string };
  footer: string;
};

/**
 * Shared layout of the plain notification emails: logo, heading, paragraphs,
 * one call to action, support line and footer. Right-to-left for Arabic.
 */
export const NotificationEmailLayout = ({
  locale,
  previewText,
  heading,
  greeting,
  paragraphs,
  button,
  support,
  footer,
}: NotificationEmailLayoutProps) => (
  <Html
    lang={locale ?? 'en'}
    dir={locale === 'ar' || locale === 'he-IL' ? 'rtl' : 'ltr'}
  >
    <Head />
    <Preview>{previewText}</Preview>
    <Tailwind config={{ presets: [pixelBasedPreset] }}>
      <Body className="m-auto px-2 font-sans">
        <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-solid border-[#eaeaea] bg-white p-5">
          <Section className="mt-8">
            <Img
              src="https://intlayer.org/apple-touch-icon.png"
              width="40"
              height="37"
              alt="Intlayer"
              className="mx-auto my-0"
            />
          </Section>
          <Heading className="mx-0 my-7.5 p-0 text-center text-2xl font-normal text-black">
            {heading}
          </Heading>
          <Text className="text-sm leading-6 text-black">{greeting}</Text>
          {paragraphs.map((paragraph) => (
            <Text key={paragraph} className="text-sm leading-6 text-black">
              {paragraph}
            </Text>
          ))}
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center text-xs font-semibold text-white no-underline"
              href={button.url}
            >
              {button.label}
            </Button>
          </Section>
          <Text className="text-sm leading-6 text-black">
            {support.text}{' '}
            <Link href={support.url} className="text-[#000000] no-underline">
              {support.linkLabel}
            </Link>
            .
          </Text>
          <Hr className="mx-0 my-6.5 w-full border border-solid border-[#eaeaea]" />
          <Text className="text-xs leading-6 text-[#666666]">{footer}</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
