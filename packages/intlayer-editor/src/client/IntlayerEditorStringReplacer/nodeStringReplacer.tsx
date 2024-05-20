import type { KeyPath } from '@intlayer/core';

export const intlayerStringIdentifier = '+intlayer+';
export const intlayerRegexIdentifier = '^\\+intlayer\\+';

type DecodeIntlayerResult = {
  content: string;
  keyPath: KeyPath[];
  dictionaryId: string;
  dicgionaryPath: string;
};

export const encodeIntlayerString = (
  value: string,
  keyPath: KeyPath[],
  dictionaryId: string,
  dicgionaryPath: string
): string =>
  `${intlayerStringIdentifier}${value}++${dictionaryId}++${dicgionaryPath}++${JSON.stringify(keyPath)}`;

export const decodeIntlayerString = (value: string): DecodeIntlayerResult => {
  if (typeof value === 'string') {
    try {
      const [
        contentWithIdentifier,
        dictionaryId,
        dicgionaryPath,
        keyPathString,
      ] = value.split('++');

      if (keyPathString && keyPathString !== 'undefined') {
        const content = contentWithIdentifier.replace(
          intlayerStringIdentifier,
          ''
        );

        const keyPath = JSON.parse(keyPathString);

        return { content, keyPath, dictionaryId, dicgionaryPath };
      }
    } catch (e) {
      console.error('Error decoding intlayer string', e);
    }
  }
  return { content: value, keyPath: [], dictionaryId: '', dicgionaryPath: '' };
};
