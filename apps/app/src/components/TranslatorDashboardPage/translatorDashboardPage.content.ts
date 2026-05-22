import { type Dictionary, t } from 'intlayer';

const translatorDashboardPageContent = {
  key: 'translator-dashboard-page',
  content: {
    title: t({
      en: 'Translator Dashboard',
      fr: 'Tableau de bord du traducteur',
      es: 'Panel del traductor',
    }),
    notRegisteredMessage: t({
      en: 'You are not registered as a translator yet. Fill in the form below to start accepting translation missions.',
      fr: "Vous n'êtes pas encore inscrit en tant que traducteur. Remplissez le formulaire ci-dessous pour commencer à accepter des missions de traduction.",
      es: 'Aún no está registrado como traductor. Rellene el formulario a continuación para comenzar a aceptar misiones de traducción.',
    }),
    status: {
      active: t({
        en: 'Active',
        fr: 'Actif',
        es: 'Activo',
      }),
      pendingActivation: t({
        en: 'Pending activation',
        fr: "En attente d'activation",
        es: 'Pendiente de activación',
      }),
    },
    missionsCount: t({
      en: 'missions',
      fr: 'missions',
      es: 'misiones',
    }),
    avgRating: t({
      en: 'avg rating',
      fr: 'note moyenne',
      es: 'calificación promedio',
    }),
    perHour: t({
      en: 'hr',
      fr: 'h',
      es: 'hr',
    }),
    myMissionsTitle: t({
      en: 'My Missions',
      fr: 'Mes missions',
      es: 'Mis misiones',
    }),
  },
} satisfies Dictionary;

export default translatorDashboardPageContent;
