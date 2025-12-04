import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getFilterMissingContentPerLocale } from './getFilterMissingContentPerLocale';

describe('getFilterMissingContentPerLocale', () => {
  it('should return all content when target is empty', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Home',
          about: 'About',
        },
        buttons: {
          submit: 'Submit',
        },
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {},
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual(source.content);
  });

  it('should return all content when target is undefined', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Home',
          about: 'About',
        },
      },
    };

    const result = getFilterMissingContentPerLocale(source, undefined);

    expect(result.content).toEqual(source.content);
  });

  it('should return only missing content when some translations exist', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Home',
          about: 'About',
          contact: 'Contact',
        },
        buttons: {
          submit: 'Submit',
          cancel: 'Cancel',
        },
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Accueil',
          about: 'À propos',
          // contact is missing
        },
        buttons: {
          submit: 'Envoyer',
          // cancel is missing
        },
      },
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual({
      navigation: {
        contact: 'Contact',
      },
      buttons: {
        cancel: 'Cancel',
      },
    });
  });

  it('should return empty content when all translations exist', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Home',
        },
        buttons: {
          submit: 'Submit',
        },
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Accueil',
        },
        buttons: {
          submit: 'Envoyer',
        },
      },
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual({});
  });

  it('should handle deeply nested content', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        footer: {
          social: {
            follow: 'Follow us',
            twitter: 'Twitter',
            facebook: 'Facebook',
          },
          legal: {
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
          },
        },
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {
        footer: {
          social: {
            follow: 'Suivez-nous',
            // twitter and facebook missing
          },
          legal: {
            privacy: 'Politique de confidentialité',
            // terms missing
          },
        },
      },
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual({
      footer: {
        social: {
          twitter: 'Twitter',
          facebook: 'Facebook',
        },
        legal: {
          terms: 'Terms of Service',
        },
      },
    });
  });

  it('should handle arrays', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        items: ['Item 1', 'Item 2', 'Item 3'],
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {
        items: ['Élément 1', 'Élément 2'],
        // Third item is missing
      },
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual({
      items: ['Item 3'],
    });
  });

  it('should consider empty strings as translated', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        optional: '',
        required: 'Value',
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {
        optional: '',
        // required is missing
      },
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual({
      required: 'Value',
    });
  });

  it('should handle completely new sections', () => {
    const source: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Home',
        },
        newSection: {
          title: 'New',
          subtitle: 'Brand New',
        },
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {
        navigation: {
          home: 'Accueil',
        },
        // newSection doesn't exist
      },
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.content).toEqual({
      newSection: {
        title: 'New',
        subtitle: 'Brand New',
      },
    });
  });

  it('should preserve dictionary metadata', () => {
    const source: Dictionary = {
      key: 'common',
      title: 'Common translations',
      description: 'Test',
      tags: ['test'],
      content: {
        test: 'value',
      },
    };

    const target: Dictionary = {
      key: 'common',
      content: {},
    };

    const result = getFilterMissingContentPerLocale(source, target);

    expect(result.key).toBe(source.key);
    expect(result.title).toBe(source.title);
    expect(result.description).toBe(source.description);
    expect(result.tags).toEqual(source.tags);
  });
});
