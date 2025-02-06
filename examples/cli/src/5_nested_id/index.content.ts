import type { Dictionary } from 'intlayer';

const nestedContent = {
  key: 'nested_key_1',
  content: {
    text: 'here the fist key',

    nestedContent: {
      key: 'nested_key_2',
      text: 'here the second key',
    },
  },
} satisfies Dictionary;

export default nestedContent;
