import type { QuantityContent } from './enumeration';

type Key = keyof QuantityContent<string>;

export const getEnumerationContent = <Content>(
  enumerationContent: QuantityContent<Content>,
  quantity: number
): Content => {
  const numericKeys = Object.keys(enumerationContent);

  for (const key of numericKeys) {
    const isEqual =
      (!key.startsWith('>') &&
        !key.startsWith('<') &&
        !key.startsWith('=') &&
        parseFloat(key) === quantity) ||
      (key.startsWith('=') && parseFloat(key.slice(1)) === quantity);
    const isSuperior =
      key.startsWith('>') && quantity > parseFloat(key.slice(1));
    const isSuperiorOrEqual =
      key.startsWith('>=') && quantity >= parseFloat(key.slice(2));
    const isInferior =
      key.startsWith('<') && quantity < parseFloat(key.slice(1));
    const isInferiorOrEqual =
      key.startsWith('<=') && quantity <= parseFloat(key.slice(2));

    if (
      isEqual ||
      isSuperior ||
      isSuperiorOrEqual ||
      isInferior ||
      isInferiorOrEqual
    ) {
      return enumerationContent[key as Key];
    }
  }

  // Default or error handling if no keys match
  return enumerationContent['1'];
};
