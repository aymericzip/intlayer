import { Dictionary } from '@intlayer/types';

// Testing the NEW merge logic
const existingContent = {
  myKey: {
    nodeType: 'translation',
    title: 'Copy button component',
    description: 'French localization for the copy button component',
    tags: ['component', 'copy-button'],
    translation: {
      en: 'Old English Value',
      fr: 'Old French Value',
    },
  },
};

const extractedContent = {
  myKey: 'New English Value (Should not overwrite)',
  newKey: 'Brand New Key',
};

const defaultLocale = 'en';

const mergedContent: any = {};

for (const [key, value] of Object.entries(extractedContent)) {
  const existingEntry = existingContent?.[
    key as keyof typeof existingContent
  ] as any;

  if (
    existingEntry &&
    existingEntry.nodeType === 'translation' &&
    existingEntry.translation
  ) {
    mergedContent[key] = {
      ...existingEntry,
      nodeType: 'translation',
      translation: {
        ...existingEntry.translation,
        [defaultLocale]: existingEntry.translation[defaultLocale] ?? value,
      },
    };
  } else {
    mergedContent[key] = {
      nodeType: 'translation',
      translation: {
        [defaultLocale]: value,
      },
    };
  }
}

console.log(JSON.stringify(mergedContent, null, 2));
