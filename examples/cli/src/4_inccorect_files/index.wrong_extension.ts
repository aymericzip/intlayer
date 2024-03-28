import type { ContentModule } from 'intlayer';

const wrongExtensionContent: ContentModule = {
  id: 'wrong_extention_file',
  text: 'This file has a wrong extention and should not be included in the final bundle.',
};

export default wrongExtensionContent;
