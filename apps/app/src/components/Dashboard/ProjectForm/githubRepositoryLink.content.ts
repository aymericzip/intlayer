import { type Dictionary, t } from 'intlayer';

const githubRepositoryLinkContent = {
  key: 'github-repository-link',
  content: {
    authentication: {
      failed: t({
        en: 'GitHub authentication failed:',
        'en-GB': 'GitHub authentication failed:',
        ru: 'Ошибка аутентификации GitHub:',
        ja: 'GitHub認証に失敗しました:',
        fr: "Échec de l'authentification GitHub :",
        ko: 'GitHub 인증 실패:',
        zh: 'GitHub 身份验证失败：',
        es: 'Error de autenticación de GitHub:',
        de: 'GitHub-Authentifizierung fehlgeschlagen:',
        ar: 'فشل المصادقة على GitHub:',
        it: 'Autenticazione GitHub non riuscita:',
        pt: 'Falha na autenticação do GitHub:',
        hi: 'GitHub प्रमाणीकरण विफल:',
        tr: 'GitHub kimlik doğrulaması başarısız:',
        pl: 'Uwierzytelnianie GitHub nie powiodło się:',
        id: 'Autentikasi GitHub gagal:',
        vi: 'Xác thực GitHub thất bại:',
      }),
      clientIdNotConfigured: t({
        en: 'GitHub Client ID is not configured',
        'en-GB': 'GitHub Client ID is not configured',
        ru: 'GitHub Client ID не настроен',
        ja: 'GitHub Client IDが設定されていません',
        fr: "L'ID client GitHub n'est pas configuré",
        ko: 'GitHub Client ID가 구성되지 않았습니다',
        zh: '未配置 GitHub Client ID',
        es: 'El ID de cliente de GitHub no está configurado',
        de: 'GitHub Client-ID ist nicht konfiguriert',
        ar: 'معرف عميل GitHub غير مُكوّن',
        it: "L'ID client di GitHub non è configurato",
        pt: 'O ID do cliente do GitHub não está configurado',
        hi: 'GitHub Client ID कॉन्फ़िगर नहीं है',
        tr: 'GitHub Client ID yapılandırılmamış',
        pl: 'GitHub Client ID nie jest skonfigurowany',
        id: 'ID Klien GitHub tidak dikonfigurasi',
        vi: 'ID khách hàng GitHub chưa được cấu hình',
      }),
    },
  },
} satisfies Dictionary;

export default githubRepositoryLinkContent;
