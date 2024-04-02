import type { ContentModule } from 'intlayer';

const nestedContent: ContentModule = {
  id: 'nested_id_1',
  text: 'here the fist id',

  nestedContent: {
    id: 'nested_id_2',
    text: 'here the second id',
  },
};

export default nestedContent;
