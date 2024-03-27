// contentlayer.config.ts
// import { type Locales, locales } from '@sayaup/common-i18n';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

// const localesObject: FieldDefs = locales.reduce(
//   (acc, locale) => {
//     acc[locale] = {
//       type: 'string',
//       default: '',
//     };
//     return acc;
//   },
//   {} as Record<Locales, StringFieldDef>
// );

export const Content = defineDocumentType(() => ({
  name: 'Content',
  filePathPattern: `**/*.content.json`,
  fields: {
    id: {
      type: 'string',
      default: '',
      required: true,
    },
    content: {
      type: 'json',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (content) => `/content/${content._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: '.', documentTypes: [Content] });
