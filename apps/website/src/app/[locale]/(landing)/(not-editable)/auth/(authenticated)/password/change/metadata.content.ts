import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'change-password-metadata',
  content: {
    title: t({
      en: 'Change Password | Intlayer',
      fr: 'Changer le mot de passe | Intlayer',
      es: 'Cambiar la contraseña | Intlayer',
      de: 'Passwort ändern | Intlayer',
      ja: 'パスワードを変更 | Intlayer',
      ko: '비밀번호 변경 | Intlayer',
      zh: '更改密码 | Intlayer',
      it: 'Cambia la password | Intlayer',
      pt: 'Alterar senha | Intlayer',
      hi: 'पासवर्ड बदलें | Intlayer',
      ar: 'تغيير كلمة المرور | Intlayer',
      ru: 'Сменить пароль | Intlayer',
      'en-GB': 'Change Password | Intlayer',
    }),
    description: t({
      en: 'Secure your account by changing your current password. Keep your Intlayer account safe with a new password.',
      fr: 'Sécurisez votre compte en changeant votre mot de passe actuel. Gardez votre compte Intlayer en sécurité avec un nouveau mot de passe.',
      es: 'Asegura tu cuenta cambiando tu contraseña actual. Mantén segura tu cuenta de Intlayer con una nueva contraseña.',
      de: 'Sichern Sie Ihr Konto, indem Sie Ihr aktuelles Passwort ändern. Halten Sie Ihr Intlayer-Konto mit einem neuen Passwort sicher.',
      ja: '現在のパスワードを変更することでアカウントを保護します。新しいパスワードでIntlayerアカウントを安全に保ちます。',
      ko: '현재 비밀번호를 변경하여 계정을 보호하세요. 새 비밀번호로 Intlayer 계정을 안전하게 유지하세요.',
      zh: '通过更改当前密码来保护您的帐户。使用新密码保护您的Intlayer帐户。',
      it: 'Metti al sicuro il tuo account cambiando la tua password attuale. Mantieni il tuo account Intlayer al sicuro con una nuova password.',
      pt: 'Proteja sua conta alterando sua senha atual. Mantenha sua conta Intlayer segura com uma nova senha.',
      hi: 'अपनी वर्तमान पासवर्ड बदलकर अपने खाते को सुरक्षित करें। एक नए पासवर्ड के साथ अपने Intlayer खाते को सुरक्षित रखें।',
      ar: 'قم بتأمين حسابك عن طريق تغيير كلمة المرور الحالية. حافظ على أمان حسابك في Intlayer مع كلمة مرور جديدة.',
      ru: 'Обеспечьте безопасность своей учетной записи, изменив текущий пароль. Держите свою учетную запись Intlayer в безопасности с помощью нового пароля.',
      'en-GB':
        'Secure your account by changing your current password. Keep your Intlayer account safe with a new password.',
    }),

    keywords: t<string[]>({
      en: [
        'Change password',
        'Account security',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      'en-GB': [
        'Change password',
        'Account security',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      fr: [
        'Changer le mot de passe',
        'Sécurité du compte',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      es: [
        'Cambiar la contraseña',
        'Seguridad de la cuenta',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      de: [
        'Passwort ändern',
        'Kontosicherheit',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ja: [
        'パスワード変更',
        'アカウントのセキュリティ',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ko: ['비밀번호 변경', '계정 보안', 'Intlayer', 'React', 'JavaScript'],
      zh: ['更改密码', '账户安全', 'Intlayer', 'React', 'JavaScript'],
      it: [
        'Cambia la password',
        'Sicurezza del conto',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      pt: [
        'Alterar senha',
        'Segurança da conta',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      hi: [
        'पासवर्ड बदलें',
        'खाते की सुरक्षा',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ar: [
        'تغيير كلمة المرور',
        'أمان الحساب',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ru: [
        'Сменить пароль',
        'Безопасность аккаунта',
        'Intlayer',
        'React',
        'JavaScript',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
