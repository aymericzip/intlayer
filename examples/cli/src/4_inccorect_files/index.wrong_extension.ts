import type { Dictionary } from 'intlayer';

const wrongExtensionContent = {
  key: 'wrong_extention_file',
  content: {
    text: 'This file has a wrong extention and should not be included in the final bundle.',
  },
} satisfies Dictionary;

export default wrongExtensionContent;
