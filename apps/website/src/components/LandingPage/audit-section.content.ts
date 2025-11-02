import { type Dictionary, t } from 'intlayer';

const auditSectionContent = {
  key: 'audit-section',
  content: {
    title: t({
      en: 'Test your multilingual setup',
      fr: 'Testez votre configuration multilingue',
    }),
    placeholder: t({
      en: 'Enter a domain or website',
      fr: 'Entrez un domaine ou un site web',
    }),
    submitLabel: t({
      en: 'Submit audit',
      fr: 'Lancer l’audit',
    }),
  },
  title: 'Audit section',
  description:
    'Dictionary for the audit section on the landing page that lets users submit a domain for audit.',
  tags: ['landing page', 'audit', 'multilingual'],
} satisfies Dictionary;

export default auditSectionContent;
