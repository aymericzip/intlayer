import type { DeclarationContent } from 'intlayer';

const wrongExtensionContent = {
  key: 'wrong_extention_file',
  content: {
    text: 'This file has a wrong extention and should not be included in the final bundle.',
  },
} satisfies DeclarationContent;

export default wrongExtensionContent;
