import type { ContentModule } from 'intlayer';

const customContent: ContentModule = {
  id: 'custom_content',
  introductionText: 'example of text',
  nestedText: {
    paragraphText: 'second example of text',
    nestedText2: {
      paragraphText: 'third example of text',
    },
  },
};
export default customContent;
