import type { Locales } from '@intlayer/config/client';
import type { KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { Breadcrumb, type BreadcrumbLink } from '../Breadcrumb';

type KeyPathBreadcrumbProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  onClickKeyPath: (keyPath: KeyPath[]) => void;
  locale?: Locales;
};

export const KeyPathBreadcrumb: FC<KeyPathBreadcrumbProps> = ({
  keyPath,
  dictionaryKey,
  onClickKeyPath,
  locale,
}) => {
  const formattedKeyPath: BreadcrumbLink[] = [
    { text: dictionaryKey, onClick: () => onClickKeyPath([]) },
    ...keyPath.map((el, index) => ({
      onClick: () =>
        onClickKeyPath(
          keyPath
            // With keyPath = [{type: NodeType.Object, key: '0'}, {type: NodeType.Array, key: '0'}, {type: NodeType.Object, key: '1'}]
            // If index is 0 -> onFocusKeyPath([{type: NodeType.Object, key: '0'}])
            // If index is 1 -> onFocusKeyPath([{type: NodeType.Object, key: '0'}, {type: NodeType.Array, key: '0'}])
            .slice(0, index + 1)
        ),
      text: el.key.toString(),
    })),
  ];

  return <Breadcrumb links={formattedKeyPath} locale={locale} />;
};
