import { getConfiguration } from '@intlayer/config';
import { getBlogMetadataRecord } from '@intlayer/docs';
import { localeRecord as localeRecordCore, t, type Dictionary } from 'intlayer';

const configuration = getConfiguration();

const localeRecord: typeof localeRecordCore = (callback) =>
  localeRecordCore(
    callback,
    configuration.internationalization.locales,
    configuration.internationalization.defaultLocale
  );

const getBlogMetadata = () =>
  t(
    localeRecord(async ({ locale }) => {
      const record = await getBlogMetadataRecord(locale);

      return Object.values(record);
    })
  );

const blogDataContent: any = {
  key: 'blog-metadata',
  content: getBlogMetadata(),
} satisfies Dictionary;

export default blogDataContent;
