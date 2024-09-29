import type { KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { Breadcrumb, type BreadcrumbLink } from '../Breadcrumb';

type KeyPathBreadcrumbProps = {
  dictionaryId: string;
  keyPath: KeyPath[];
  onClickKeyPath: (keyPath: KeyPath[]) => void;
};

export const KeyPathBreadcrumb: FC<KeyPathBreadcrumbProps> = ({
  keyPath,
  dictionaryId,
  onClickKeyPath,
}) => {
  const formattedKeyPath: BreadcrumbLink[] = [
    { text: dictionaryId, onClick: () => onClickKeyPath([]) },
    ...keyPath.map((el, index) => ({
      onClick: () =>
        onClickKeyPath(
          keyPath
            // With keyPath = [{type: 'ObjectExpression', key: '0'}, {type: 'ArrayExpression', key: '0'}, {type: 'ObjectExpression', key: '1'}]
            // If index is 0 -> onFocusKeyPath([{type: 'ObjectExpression', key: '0'}])
            // If index is 1 -> onFocusKeyPath([{type: 'ObjectExpression', key: '0'}, {type: 'ArrayExpression', key: '0'}])
            .slice(0, index + 1)
        ),
      text: el.key.toString(),
    })),
  ];

  return <Breadcrumb links={formattedKeyPath} />;
};
