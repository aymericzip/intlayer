import { getDocMetadataRecord } from '@intlayer/docs';
import { type Dictionary, localeRecord, t } from 'intlayer';

const getDocMetadata = () =>
  t(
    localeRecord(async ({ locale }) => {
      const record = await getDocMetadataRecord(locale);

      return Object.values(record);
    })
  );

const docDataContent: any = {
  key: 'doc-metadata',
  fill: false,
  content: getDocMetadata(),
} satisfies Dictionary;

export default docDataContent;
