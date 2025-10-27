'use client';

import {
  getDefaultNode,
  getNodeChildren,
  getNodeType,
  isSameKeyPath,
} from '@intlayer/core';
import {
  useConfiguration,
  useEditedContentActions,
  useFocusDictionary,
  useFocusDictionaryActions,
} from '@intlayer/editor-react';
import {
  type KeyPath,
  type LocalDictionaryId,
  NodeType,
  type TypedNode,
} from '@intlayer/types';
import type { ContentNode } from 'intlayer';
import { Plus, Trash } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { camelCaseToSentence } from '../../../utils/camelCase';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../../Button';
import { Container } from '../../Container';
import { EditableFieldInput } from '../../EditableField';
import { InputVariant } from '../../Input';
import { NodeTypeSelector } from '../NodeTypeSelector';

type NodeTypeViewProps = {
  dictionaryLocalId: LocalDictionaryId;
  keyPath: KeyPath[];
  section: ContentNode;
  onNodeTypeChange: (content?: ContentNode) => void;
};

const NodeTypeView: FC<NodeTypeViewProps> = ({
  section,
  dictionaryLocalId,
  keyPath,
  onNodeTypeChange: onNodeTypeChangeProp,
}) => {
  const locales = useConfiguration()?.internationalization.locales ?? [];
  const nodeType = getNodeType(section);
  const children = getNodeChildren(section);

  const onNodeTypeChange = (content?: ContentNode) => {
    const transformedContent = getDefaultNode(
      nodeType,
      locales,
      content
    ) as ContentNode;

    onNodeTypeChangeProp(transformedContent);
  };

  if (
    nodeType === NodeType.Translation ||
    nodeType === NodeType.Condition ||
    nodeType === NodeType.Gender ||
    nodeType === NodeType.Enumeration
  ) {
    const firstKey = Object.keys(
      (section as unknown as TypedNode)[nodeType as keyof typeof section]
    )[0];
    const childrenKeyPath = [
      ...keyPath,
      { type: nodeType, key: firstKey },
    ] as KeyPath[];

    return (
      <div className="flex w-full flex-col gap-1">
        <NodeTypeSelector
          section={section}
          onValueChange={(nodeType) =>
            onNodeTypeChangeProp(
              getDefaultNode(nodeType, locales) as ContentNode
            )
          }
        />

        <NodeTypeView
          section={children}
          keyPath={childrenKeyPath}
          dictionaryLocalId={dictionaryLocalId}
          onNodeTypeChange={onNodeTypeChange}
        />
      </div>
    );
  }

  if (nodeType === NodeType.Array) {
    const childrenKeyPath = [...keyPath, { type: nodeType, key: 0 } as KeyPath];
    return (
      <div className="flex w-full flex-col gap-1">
        <NodeTypeSelector
          section={section}
          onValueChange={(nodeType) =>
            onNodeTypeChangeProp(
              getDefaultNode(nodeType, locales) as ContentNode
            )
          }
        />

        <NodeTypeView
          section={children}
          keyPath={childrenKeyPath}
          dictionaryLocalId={dictionaryLocalId}
          onNodeTypeChange={onNodeTypeChange}
        />
      </div>
    );
  }

  if (nodeType === NodeType.Object) {
    return (
      <>
        <NodeTypeSelector
          section={section}
          onValueChange={(nodeType) =>
            onNodeTypeChangeProp(
              getDefaultNode(nodeType, locales) as ContentNode
            )
          }
        />
        <div className="mt-6 ml-10">
          <StructureView
            keyPath={keyPath}
            section={section}
            dictionaryLocalId={dictionaryLocalId}
          />
        </div>
      </>
    );
  }

  return (
    <NodeTypeSelector
      section={section}
      onValueChange={(nodeType) =>
        onNodeTypeChangeProp(getDefaultNode(nodeType, locales) as ContentNode)
      }
    />
  );
};

type NodeWrapperProps = {
  sectionKey?: string;
  dictionaryLocalId: LocalDictionaryId;
  keyPath: KeyPath[];
  section: ContentNode;
};

export const NodeView: FC<NodeWrapperProps> = ({
  sectionKey,
  section,
  keyPath,
  dictionaryLocalId,
}) => {
  const { focusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  const { renameEditedContent, addEditedContent } = useEditedContentActions();

  const { titleInput, deleteButton } = useIntlayer('structure-view');

  const handleRenameNodeKey = (keyName: string) => {
    renameEditedContent(dictionaryLocalId, keyName, keyPath);
    const prevKeyPath: KeyPath[] = keyPath.slice(0, -1);
    const lastKeyPath: KeyPath = keyPath[keyPath.length - 1];
    const newKeyPath: KeyPath[] = [
      ...prevKeyPath,
      { ...lastKeyPath, key: keyName } as KeyPath,
    ];
    setFocusedContentKeyPath(newKeyPath);
  };

  return (
    <Container
      transparency="xl"
      roundedSize="xl"
      className="w-full min-w-80 gap-2 overflow-auto px-5 py-2"
      border
      borderColor="text"
      background="none"
      aria-selected={isSameKeyPath(keyPath, focusedContent?.keyPath ?? [])}
      onClick={() => setFocusedContentKeyPath(keyPath)}
    >
      <div className="flex w-full flex-col items-start justify-between gap-3">
        {typeof sectionKey === 'string' && (
          <div className="w-full">
            <div className="flex w-full items-center justify-between gap-10">
              <EditableFieldInput
                name="key"
                aria-label="Key"
                placeholder={titleInput.placeholder.value}
                defaultValue={sectionKey}
                onSave={(value) => handleRenameNodeKey(value)}
                variant={InputVariant.INVISIBLE}
              />
              <Button
                label={deleteButton.label.value}
                variant={ButtonVariant.HOVERABLE}
                size={ButtonSize.ICON_SM}
                color={ButtonColor.TEXT}
                className="translate-x-2"
                Icon={Trash}
                onClick={() => {
                  addEditedContent(dictionaryLocalId, undefined, keyPath);

                  const parentKeyPath: KeyPath[] = keyPath.slice(0, -1);
                  setFocusedContentKeyPath(parentKeyPath);
                }}
              />
            </div>

            <span className="ml-3 text-neutral text-sm">
              ( {camelCaseToSentence(sectionKey)} )
            </span>
          </div>
        )}
        <NodeTypeView
          keyPath={keyPath}
          dictionaryLocalId={dictionaryLocalId}
          section={section}
          onNodeTypeChange={(content) => {
            addEditedContent(dictionaryLocalId, content, keyPath);
          }}
        />
      </div>
    </Container>
  );
};

type ObjectViewProps = {
  dictionaryLocalId: LocalDictionaryId;
  keyPath: KeyPath[];
  section: ContentNode;
};

export const ObjectView: FC<ObjectViewProps> = ({
  section,
  keyPath,
  dictionaryLocalId,
}) => {
  const { addNodeButton } = useIntlayer('structure-view');
  const { setFocusedContentKeyPath } = useFocusDictionaryActions();
  const { addEditedContent } = useEditedContentActions();

  if (!section || typeof section !== 'object') {
    return <div>Not an object</div>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <ul className="mr-auto flex flex-col gap-4">
        {Object.keys(section).map((key) => (
          <li key={key} className="flex w-full">
            <NodeView
              sectionKey={key}
              section={section?.[key as keyof typeof section]}
              keyPath={[...keyPath, { type: NodeType.Object, key }]}
              dictionaryLocalId={dictionaryLocalId}
            />
          </li>
        ))}
      </ul>
      <Button
        label={addNodeButton.label.value}
        variant={ButtonVariant.HOVERABLE}
        size={ButtonSize.MD}
        color={ButtonColor.TEXT}
        Icon={Plus}
        className="flex-1"
        onClick={() => {
          const newKey = 'newKey';
          const newKeyPath = [
            ...keyPath,
            { type: NodeType.Object, key: newKey },
          ] as KeyPath[];
          addEditedContent(dictionaryLocalId, '', newKeyPath);
          setFocusedContentKeyPath(newKeyPath);
        }}
      >
        {addNodeButton.text}
      </Button>
    </div>
  );
};

type StructureViewProps = {
  dictionaryLocalId: LocalDictionaryId;
  keyPath: KeyPath[];
  section: ContentNode;
};

export const StructureView: FC<StructureViewProps> = ({
  section,
  keyPath,
  dictionaryLocalId,
}) => {
  if (
    !section ||
    typeof section !== 'object' ||
    typeof section.nodeType === 'string'
  ) {
    return (
      <NodeView
        sectionKey={'content'}
        section={section}
        keyPath={keyPath}
        dictionaryLocalId={dictionaryLocalId}
      />
    );
  }

  return (
    <ObjectView
      section={section}
      keyPath={keyPath}
      dictionaryLocalId={dictionaryLocalId}
    />
  );
};
