import { getConfiguration } from '@intlayer/config';
import { getDocMetadataRecord } from '@intlayer/docs';
import { localeRecord as localeRecordCore, t, type Dictionary } from 'intlayer';

const configuration = getConfiguration();

const localeRecord: typeof localeRecordCore = (callback) =>
  localeRecordCore(
    callback,
    configuration.internationalization.locales,
    configuration.internationalization.defaultLocale
  );

const getDocMetadata = () =>
  t(
    localeRecord(async ({ locale }) => {
      const record = await getDocMetadataRecord(locale);

      return Object.values(record);
    })
  );

const docDataContent: any = {
  key: 'doc-metadata',
  content: getDocMetadata(),
} satisfies Dictionary;

export default docDataContent;
