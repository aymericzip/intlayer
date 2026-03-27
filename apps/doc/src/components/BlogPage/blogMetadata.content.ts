import { getBlogMetadataRecord } from '@intlayer/docs';
import { type Dictionary, localeRecord, t } from 'intlayer';

const getBlogMetadata = () =>
  t(
    localeRecord(async ({ locale }) => {
      const record = await getBlogMetadataRecord(locale);

      return Object.values(record);
    })
  );

const blogDataContent: any = {
  key: 'blog-metadata',
  fill: false,
  content: getBlogMetadata(),
} satisfies Dictionary;

export default blogDataContent;
