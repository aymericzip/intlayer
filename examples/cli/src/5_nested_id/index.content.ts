import type { ContentModule } from 'intlayer';

const tsContent: ContentModule = {
  id: 'nested-id-1',
  text: 'here the fist id',

  nestedContent: {
    id: 'nested-id-2',
    text: 'here the second id',
  },
};

export default tsContent;
