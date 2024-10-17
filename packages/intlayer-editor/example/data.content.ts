import type { DeclarationContent } from 'intlayer';

const customContent: DeclarationContent = {
  key: 'custom_content',
  content: {
    introductionText: 'example of text',
    nestedText: {
      paragraphText: 'second example of text',
      nestedText2: {
        paragraphText: 'third example of text',
      },
    },
  },
};
export default customContent;
