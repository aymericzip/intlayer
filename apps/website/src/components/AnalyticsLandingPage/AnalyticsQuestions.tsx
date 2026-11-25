import { useIntlayer } from 'react-intlayer';
import { CommonQuestionsSection } from '~/components/LandingPage/CommonQuestionsSection/CommonQuestions';

/** Supplies the analytics FAQ to the shared landing-page question section. */
export const AnalyticsQuestions = () => {
  const content = useIntlayer('analytics-questions');

  return (
    <CommonQuestionsSection
      title={content.title}
      description={content.description}
      questions={content.questions}
      link={{
        to: '/doc/concept/analytics',
        label: content.documentation,
        text: content.documentation,
      }}
      footer={
        <a
          href="https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites"
          className="text-center text-sm text-text/70 underline underline-offset-4"
        >
          {content.seoReference}
        </a>
      }
    />
  );
};
