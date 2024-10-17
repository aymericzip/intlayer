import type { DeclarationContent } from 'intlayer';

const functionContent = {
  key: 'function',
  content: {
    text: () => 'This is the content render by a function',
  },
} satisfies DeclarationContent;

export default functionContent;
