import { type Dictionary, insert, t } from 'intlayer';

const pushDictionariesButtonContent = {
  key: 'push-dictionaries-button',
  content: {
    label: insert(
      t({
        en: 'Push the {{count}} dictionaries to the CMS',
        'en-GB': 'Push the {{count}} dictionaries to the CMS',
        fr: 'Envoyer les {{count}} dictionnaires vers le CMS',
        es: 'Enviar los {{count}} diccionarios al CMS',
        de: 'Die {{count}} Wörterbücher an das CMS senden',
        it: 'Invia i {{count}} dizionari al CMS',
        pt: 'Enviar os {{count}} dicionários para o CMS',
        ru: 'Отправить {{count}} словарей в CMS',
        ja: '{{count}} 件の辞書を CMS にプッシュ',
        ko: '{{count}}개의 사전을 CMS에 푸시',
        zh: '将 {{count}} 个字典推送到 CMS',
        ar: 'إرسال {{count}} قواميس إلى نظام إدارة المحتوى',
        hi: '{{count}} शब्दकोशों को CMS पर भेजें',
        tr: '{{count}} sözlüğü CMS’e gönder',
      })
    ),
    missingCount: insert(
      t({
        en: '{{count}} not in the CMS yet',
        'en-GB': '{{count}} not in the CMS yet',
        fr: '{{count}} absents du CMS',
        es: '{{count}} aún no están en el CMS',
        de: '{{count}} noch nicht im CMS',
        it: '{{count}} non ancora nel CMS',
        pt: '{{count}} ainda não estão no CMS',
        ru: 'Ещё нет в CMS: {{count}}',
        ja: 'CMS 未登録: {{count}} 件',
        ko: 'CMS에 아직 없음: {{count}}개',
        zh: '{{count}} 个尚未在 CMS 中',
        ar: '{{count}} غير موجودة في نظام إدارة المحتوى بعد',
        hi: '{{count}} अभी CMS में नहीं हैं',
        tr: '{{count}} henüz CMS’de yok',
      })
    ),
    awaitingLogin: t({
      en: 'Sign in to the CMS in the opened tab, the push starts right after.',
      'en-GB':
        'Sign in to the CMS in the opened tab, the push starts right after.',
      fr: 'Connectez-vous au CMS dans l’onglet ouvert, l’envoi démarre juste après.',
      es: 'Inicia sesión en el CMS en la pestaña abierta, el envío empieza justo después.',
      de: 'Melden Sie sich im geöffneten Tab beim CMS an, danach startet das Senden.',
      it: 'Accedi al CMS nella scheda aperta, l’invio parte subito dopo.',
      pt: 'Entre no CMS na aba aberta, o envio começa logo em seguida.',
      ru: 'Войдите в CMS в открывшейся вкладке, отправка начнётся сразу после.',
      ja: '開いたタブで CMS にサインインすると、すぐにプッシュが始まります。',
      ko: '열린 탭에서 CMS에 로그인하면 바로 푸시가 시작됩니다.',
      zh: '请在打开的标签页中登录 CMS，随后将立即开始推送。',
      ar: 'سجّل الدخول إلى نظام إدارة المحتوى في التبويب المفتوح، ويبدأ الإرسال مباشرة بعد ذلك.',
      hi: 'खुले टैब में CMS में साइन इन करें, उसके तुरंत बाद भेजना शुरू होगा।',
      tr: 'Açılan sekmede CMS’e giriş yapın, gönderim hemen ardından başlar.',
    }),
  },
} satisfies Dictionary;

export default pushDictionariesButtonContent;
