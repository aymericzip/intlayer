import type { Dictionary } from 'intlayer';

const functionContent = {
  key: 'function',
  content: {
    text: () => 'This is the content render by a function',
  },
} satisfies Dictionary;

export default functionContent;
