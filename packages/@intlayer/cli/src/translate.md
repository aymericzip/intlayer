const localeList = ['en', 'fr', 'es'];

I want to make a translation script to review and complete the translations of a dictionary

unmergedDictionariesRecord is a record of dictionaries
it can contained

- per locale content declaration (using 'locale' declaration)
- multilingual content declaration (using 'multilingual' declaration)

  All unmerged dictionaries will then be merged into a single dictionary

if the locale key is not declared, the dictionary is considered as multilingual
it will be this files that we will have to interact with

```ts
const unmergedDictionariesRecord = {
  "hello-word": [
    {
      key: "hello-world",
      locale: "en",
      content: {
        welcome: "Welcome to Our App",
      },
      filePath: "hello-world-1.en.json",
    },
    {
      key: "hello-world",
      locale: "en",
      content: {
        officialStarter: "the official Vue + Vite starter",
      },
      filePath: "hello-world-2.en.json",
    },
    {
      key: "hello-world",
      content: {
        welcome: {
          nodeType: "translation",
          translation: {
            fr: "Bienvenue dans Notre Application",
            es: "Bienvenido a Nuestra Aplicación",
          },
        },
        officialStarter: {
          nodeType: "translation",
          translation: {
            fr: "le starter officiel Vue + Vite",
            es: "el starter oficial Vue + Vite",
          },
        },
        nonMultilingual: "This is a non-multilingual key",
      },
      filePath: "hello-world-3.json",
    },
  ],

  home: [
    {
      key: "home",
      content: {
        // ...
      },
      filePath: "home-1.json",
    },
    // ...
  ],
};
```

dictionariesRecord is a record of dictionaries, and contains multiple locales

```ts
const dictionariesRecord = {
  "hello-word": {
    key: "hello-world",
    content: {
      welcome: {
        nodeType: "translation",
        translation: {
          en: "Welcome to Our App",
          fr: "Bienvenue dans Notre Application",
          es: "Bienvenido a Nuestra Aplicación",
        },
      },
      officialStarter: {
        nodeType: "translation",
        translation: {
          fr: "le starter officiel Vue + Vite",
          en: "the official Vue + Vite starter",
          es: "el starter oficial Vue + Vite",
        },
      },
      nonMultilingual: "This is a non-multilingual key",
    },
  },
  home: {
    key: "home",
    content: {
      // ...
    },
  },
};
```

```ts
const locale = "es";
const dictionaryKey = "hello-word";
```

Tooling that can be used in the tranlation process

```ts
const processedDictionaty = getLocalisedContent(
  dictionariesRecord[dictionaryKey],
  locale
);
 result: {
  welcome: 'Bienvenido a Nuestra Aplicación',
  officialStarter: 'el starter oficial Vue + Vite',
  nonMultilingual: 'This is a non-multilingual key',
};
```

The objective will be to develop a `translate` function. This function will be complexe and flexible. so the code should be well designed.

Arguement of the function will be:

- ## sourceLocale: string,

- locales: string, string[], undefined

  - will iterate for one or multiple locales.
  - if this arguement is not declared. It will take the locale list from the configuration file

- filePath: string, string[], undefined

  - will pick one specific unmergedDictionaries based on his filePath
  - if not declared, it will list make the job for each dictionaries on the project

- mode?: 'complete' | 'review' | 'missing-only'

  - complete: Translate all keys (even if the locale key already exists, it may suggest better translations).
  - review: Show differences or suggestions for improvement on already translated keys.
  - missing-only: Only translate missing keys in the given locale(s). (This could be default.)

- gitDiff: boolean, undefined

  - if true it will only run on dictionaries that have unpushed changes
  - if false or undefined it will run on all dictionaries

- keys: string, stirng[]

  - will filter the dictionaries based on the key

- excludedKeys?: string, string[], undefined

  - will filter the dictionaries based on the key

- filter?: (entry: DictionaryEntry) => boolean;

  - will offer custom filter

- pathFilter?: string, string[], undefined

  - will filter the dictionaries based on the glob pattern
