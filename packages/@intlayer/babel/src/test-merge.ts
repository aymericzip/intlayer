import { Dictionary } from '@intlayer/types';

// Let's test the merge logic
const existingContent = {
  myKey: {
    nodeType: 'translation',
    translation: {
      en: 'Old English Value',
      fr: 'Old French Value',
    },
  },
};

const extractedContent = {
  myKey: 'New English Value',
  newKey: 'Brand New Key',
};

const defaultLocale = 'en';

const mergedContent: any = {};

for (const [key, value] of Object.entries(extractedContent)) {
  const existingEntry = existingContent?.[key];

  console.log('Checking key:', key);
  console.log('existingEntry:', existingEntry);

  if (
    existingEntry &&
    existingEntry.nodeType === 'translation' &&
    existingEntry.translation
  ) {
    // Key exists in both - preserve existing translations, update default locale
    mergedContent[key] = {
      nodeType: 'translation',
      translation: {
        ...existingEntry.translation,
        [defaultLocale]: value,
      },
    };
  } else {
    // New key - add with default locale only
    mergedContent[key] = {
      nodeType: 'translation',
      translation: {
        [defaultLocale]: value,
      },
    };
  }
}

console.log(JSON.stringify(mergedContent, null, 2));
