import { camelCaseToSentence } from '@intlayer/config/client';
import type { KeyPath, Locale } from '@intlayer/types';
import type { FC } from 'react';
import { Breadcrumb, type BreadcrumbLink } from '../Breadcrumb';
import type { LinkColor } from '../Link';

type KeyPathBreadcrumbProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  onClickKeyPath?: (keyPath: KeyPath[]) => void;
  locale?: Locale;
  color?: LinkColor | `${LinkColor}`;
  showDictionaryKey?: boolean;
};

export const KeyPathBreadcrumb: FC<KeyPathBreadcrumbProps> = ({
  keyPath,
  dictionaryKey,
  onClickKeyPath,
  locale,
  color,
  showDictionaryKey = true,
}) => {
  const formattedKeyPath: BreadcrumbLink[] = [
    ...(showDictionaryKey
      ? [
          {
            text: camelCaseToSentence(dictionaryKey),
            onClick: onClickKeyPath ? () => onClickKeyPath([]) : undefined,
          },
        ]
      : []),
    ...keyPath.map((el, index) => ({
      onClick: onClickKeyPath
        ? () =>
            // With keyPath = [{type: NodeType.Object, key: '0'}, {type: NodeType.Array, key: '0'}, {type: NodeType.Object, key: '1'}]
            // If index is 0 -> onFocusKeyPath([{type: NodeType.Object, key: '0'}])
            // If index is 1 -> onFocusKeyPath([{type: NodeType.Object, key: '0'}, {type: NodeType.Array, key: '0'}])
            onClickKeyPath?.(keyPath.slice(0, index + 1))
        : undefined,

      text: el.key?.toString() ?? '',
    })),
  ];

  return (
    <Breadcrumb
      links={formattedKeyPath}
      locale={locale}
      elementType="location"
      color={color}
    />
  );
};
