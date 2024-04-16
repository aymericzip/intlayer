import { type QuantityContent, getEnumerationContent } from '@intlayer/core';
import { contentRender } from './ContentEditor/contentRender';

export const getEnumeration = <Content>(
  enumerationContent: QuantityContent<Content>,
  quantity: number
): Content => {
  const result: Content = getEnumerationContent<Content>(
    enumerationContent,
    quantity
  );

  if (typeof result === 'string') {
    return contentRender(result) as Content;
  }

  return result;
};
