'use client';

import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';
import { ContentSelectorWrapper } from '../ContentSelectorWrapper';
import {
  decodeIntlayerString,
  intlayerRegexIdentifier,
  intlayerStringIdentifier,
} from './nodeStringReplacer';

const replacableElParams: string[] = [
  'textContent',
  'ariaLabel',
  'ariaDescription',
  'href',
  'alt',
  'innerHTML',
];

const getIntlayerElements = (): Element[] => {
  const elements = document.querySelectorAll('body *');
  return Array.prototype.filter.call(elements, (element: Element) =>
    replacableElParams.some((param) =>
      RegExp(intlayerRegexIdentifier).test(
        element[param as keyof typeof element] as string
      )
    )
  );
};

export const IntlayerEditorStringReplacer: FC<PropsWithChildren> = ({
  children,
}) => {
  const [elements, setElements] = useState<Element[]>([]);

  const replaceIntlayerString = useCallback(() => {
    const allElement = getIntlayerElements();

    if (allElement?.length > 0) {
      setElements(allElement);

      allElement.forEach((el) => {
        type Key = keyof typeof el;

        replacableElParams
          .filter((param) =>
            ((el[param as keyof typeof el] ?? '') as string).startsWith(
              intlayerStringIdentifier
            )
          )
          .forEach((key) => {
            if (typeof el[key as Key] === 'string') {
              const { content, keyPath } = decodeIntlayerString(
                (el[key as Key] as string) ?? ''
              );

              if (keyPath.length > 0) {
                if (key === 'textContent') {
                  el.setAttribute('data-intlayer', el.textContent ?? '');

                  if (
                    el.children.length === 0 &&
                    typeof el.textContent === 'string'
                  ) {
                    el.textContent = '';
                  }
                } else {
                  (el[key as Key] as string) = content;
                }
              }
            }
          });
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // Timeout use to run the replacement after all content rendered
      replaceIntlayerString();
    }, 5);
  }, [children, replaceIntlayerString]);

  return (
    <>
      {children}
      {elements
        .filter((el) => el.children.length === 0)
        .map((el) => {
          const { content, keyPath, dictionaryId, dicgionaryPath } =
            decodeIntlayerString(el.getAttribute('data-intlayer') ?? '');

          // I would like to render this componenet into the DOM, how can do it?
          return createPortal(
            <ContentSelectorWrapper
              dictionaryId={dictionaryId}
              keyPath={keyPath}
              dictionaryPath={dicgionaryPath}
            >
              {content}
            </ContentSelectorWrapper>,
            el
          );
        })}
    </>
  );
};
