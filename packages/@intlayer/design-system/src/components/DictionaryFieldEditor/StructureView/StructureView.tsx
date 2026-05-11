'use client';

import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@components/Button';
import { Container } from '@components/Container';
import { EditableFieldInput } from '@components/EditableField';
import { InputVariant } from '@components/Input';
import { camelCaseToSentence } from '@intlayer/config/client';
import {
  getDefaultNode,
  getNodeChildren,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import { isSameKeyPath } from '@intlayer/core/utils';
import {
  useConfiguration,
  useEditedContentActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { LocalDictionaryId, TypedNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ContentNode } from 'intlayer';
import { Plus, Trash } from 'lucide-react';
import { type FC, memo, useMemo, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';
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
  const locales = useConfiguration()?.internationalization?.locales ?? [];

  // Memoize node type and children calculations
  const nodeType = useMemo(() => getNodeType(section), [section]);
  const children = useMemo(() => getNodeChildren(section), [section]);

  const onNodeTypeChange = (content?: ContentNode) => {
    const transformedContent = getDefaultNode(
      nodeType,
      locales,
      content
    ) as ContentNode;

    onNodeTypeChangeProp(transformedContent);
  };

  if (
    nodeType === NodeTypes.TRANSLATION ||
    nodeType === NodeTypes.CONDITION ||
    nodeType === NodeTypes.GENDER ||
    nodeType === NodeTypes.ENUMERATION ||
    nodeType === NodeTypes.PLURAL
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

  if (nodeType === NodeTypes.ARRAY) {
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

  if (nodeType === NodeTypes.OBJECT) {
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

export const NodeView: FC<NodeWrapperProps> = memo(
  ({ sectionKey, section, keyPath, dictionaryLocalId }) => {
    const { focusedContent, setFocusedContentKeyPath } =
      useFocusUnmergedDictionary();
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
  }
);

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
  const { setFocusedContentKeyPath } = useFocusUnmergedDictionary();
  const { addEditedContent } = useEditedContentActions();

  // 1. Memoize keys to avoid unnecessary virtualizer resets
  const keys = useMemo(
    () => (section && typeof section === 'object' ? Object.keys(section) : []),
    [section]
  );

  // 2. Setup virtualization for large objects
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: keys.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // Estimated height for a NodeView
    overscan: 5,
  });

  if (!section || typeof section !== 'object') {
    return <div>Not an object</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={parentRef}
        className="flex max-h-[800px] flex-col gap-4 overflow-y-auto pr-2"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const key = keys[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="pb-4"
              >
                <NodeView
                  sectionKey={key}
                  section={section?.[key as keyof typeof section]}
                  keyPath={[
                    ...keyPath,
                    { type: NodeTypes.OBJECT, key } as KeyPath,
                  ]}
                  dictionaryLocalId={dictionaryLocalId}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Button
        label={addNodeButton.label.value}
        variant={ButtonVariant.HOVERABLE}
        size={ButtonSize.MD}
        color={ButtonColor.TEXT}
        Icon={Plus}
        className="mt-2 flex-1"
        onClick={() => {
          const newKey = 'newKey';
          const newKeyPath = [
            ...keyPath,
            { type: NodeTypes.OBJECT, key: newKey },
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
