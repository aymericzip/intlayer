import { getBlogMetadataRecord } from '@intlayer/docs';
import { localeRecord, t, type Dictionary } from 'intlayer';

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
