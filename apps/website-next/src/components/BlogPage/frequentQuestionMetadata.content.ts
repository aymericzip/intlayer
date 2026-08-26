import { getFrequentQuestionMetadataRecord } from '@intlayer/docs';
import { type Dictionary, localeRecord, t } from 'intlayer';

const getFrequentQuestionMetadata = () =>
  t(
    localeRecord(async ({ locale }) => {
      const record = await getFrequentQuestionMetadataRecord(locale);

      return Object.values(record);
    })
  );

const frequentQuestionDataContent: any = {
  key: 'frequent-question-metadata',
  fill: false,
  content: getFrequentQuestionMetadata(),
} satisfies Dictionary;

export default frequentQuestionDataContent;
