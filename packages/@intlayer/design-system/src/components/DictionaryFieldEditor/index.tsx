import type { Locales } from '@intlayer/config/client';
import {
  NodeType,
  type Dictionary,
  type DictionaryValue,
  type KeyPath,
} from '@intlayer/core';
import type { FC } from 'react';
import tw from 'twin.macro';
import { Breadcrumb, type BreadcrumbLink } from '../Breadcrumb';
import { NodeWrapper } from './NodeWrapper';

export type FieldContent = {
  keyPath: KeyPath[];
  newValue: string;
};

interface DictionaryFieldEditorProps {
  dictionary: Dictionary;
  keyPath: KeyPath[];
  onContentChange: (keyPath: KeyPath[], newValue: string) => void;
  onValidEdition: () => void;
  onCancelEdition: () => void;
  locale: Locales;
  editedContent?: FieldContent[];
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

const StyledContainer = tw.div`flex-1 flex flex-col gap-10 flex-col w-full h-full`;
const StyledColumnLayout = tw.div`flex flex-row gap-2 flex-1 h-full`;
const StyledColumn1 = tw.div`max-md:hidden`;
const StyledColumn2 = tw.div`max-sm:hidden`;
const StyledColumn3 = tw.div`flex-1 flex items-start max-md:justify-center rounded-xl border-text dark:border-text-dark sm:border-[1.5px] p-2`;

const getSection = (
  dictionary: Dictionary,
  keyPath: KeyPath[]
): DictionaryValue => {
  let section = dictionary as DictionaryValue;

  for (const key of keyPath) {
    if (key.type === 'ObjectExpression' || key.type === 'ArrayExpression') {
      section = section[key.key as keyof typeof section];
    } else if (key.type === NodeType.Translation) {
      section =
        section[NodeType.Translation as keyof typeof section][
          key.key as keyof typeof section
        ];
    } else if (key.type === NodeType.Enumeration) {
      section =
        section[NodeType.Enumeration as keyof typeof section][
          key.key as keyof typeof section
        ];
    }
  }

  return section;
};

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onContentChange,
  keyPath,
  onCancelEdition,
  onValidEdition,
  onFocusKeyPath,
  ...props
}) => {
  const formattedKeyPath: BreadcrumbLink[] = [
    { text: dictionary.id, onClick: () => onFocusKeyPath([]) },
    ...keyPath.map((el, index) => ({
      onClick: () =>
        onFocusKeyPath(
          keyPath
            // With keyPath = [{type: 'ObjectExpression', key: '0'}, {type: 'ArrayExpression', key: '0'}, {type: 'ObjectExpression', key: '1'}]
            // If index is 0 -> onFocusKeyPath([{type: 'ObjectExpression', key: '0'}])
            // If index is 1 -> onFocusKeyPath([{type: 'ObjectExpression', key: '0'}, {type: 'ArrayExpression', key: '0'}])
            .slice(0, index + 1)
        ),
      text: el.key.toString(),
    })),
  ];

  const keyPathLength = keyPath.length;

  const columns1KeyPath = keyPath.slice(0, keyPathLength - 2);
  const section1 = getSection(dictionary, columns1KeyPath);

  const columns2KeyPath = keyPath.slice(0, keyPathLength - 1);
  const section2 = getSection(dictionary, columns2KeyPath);

  const columns3KeyPath = keyPath;
  const section3 = getSection(dictionary, columns3KeyPath);

  return (
    <StyledContainer>
      <Breadcrumb links={formattedKeyPath} />
      <StyledColumnLayout>
        {section1 && columns2KeyPath?.length > 0 && (
          <StyledColumn1>
            <NodeWrapper
              {...props}
              keyPath={columns1KeyPath}
              section={section1}
              onFocusKeyPath={onFocusKeyPath}
            />
          </StyledColumn1>
        )}
        {section2 && columns3KeyPath?.length > 0 && (
          <StyledColumn2>
            <NodeWrapper
              {...props}
              keyPath={columns2KeyPath}
              section={section2}
              onFocusKeyPath={onFocusKeyPath}
            />
          </StyledColumn2>
        )}
        <StyledColumn3>
          <NodeWrapper
            {...props}
            keyPath={columns3KeyPath}
            section={section3}
            onContentChange={(content) =>
              onContentChange(content.keyPath, content.newValue)
            }
            onFocusKeyPath={onFocusKeyPath}
          />
        </StyledColumn3>
      </StyledColumnLayout>
    </StyledContainer>
  );
};
