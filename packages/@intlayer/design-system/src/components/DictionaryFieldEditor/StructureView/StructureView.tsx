import {
  type KeyPath,
  type ContentNode,
  getContentNodeByKeyPath,
  getSectionType,
  isSameKeyPath,
  NodeType,
} from '@intlayer/core';
import {
  useEditedContentActions,
  useFocusDictionary,
  useFocusDictionaryActions,
} from '@intlayer/editor-react';
import { Plus, Trash } from 'lucide-react';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { camelCaseToSentence } from '../../../utils/camelCase';
import { Button } from '../../Button';
import { Container } from '../../Container';
import { EditableFieldInput } from '../../EditableField';
import { NodeTypeSelector } from '../NodeTypeSelector';
import { structureViewContent } from './structureView.content';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

type NodeWrapperProps = {
  sectionKey: string;
  dictionaryKey: string;
  keyPath: KeyPath[];
  section: ContentNode;
};

const NodeView: FC<NodeWrapperProps> = ({
  sectionKey,
  section,
  keyPath,
  dictionaryKey,
}) => {
  const nodeType = getSectionType(section);
  const { focusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  const { renameEditedContent, addEditedContent } = useEditedContentActions();

  const { titleInput, deleteButton } = useDictionary(structureViewContent);

  const handleRenameNodeKey = (keyName: string) => {
    renameEditedContent(dictionaryKey, keyName, keyPath);
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
      background="hoverable"
      className="min-w-80 gap-2 px-5 py-2"
      backgroundColor="contrast"
      aria-selected={isSameKeyPath(keyPath, focusedContent?.keyPath ?? [])}
      onClick={() => setFocusedContentKeyPath(keyPath)}
    >
      <form className="flex w-full flex-col items-start justify-between gap-3">
        <div className="w-full">
          <div className="flex w-full items-center justify-between gap-10">
            <EditableFieldInput
              name="key"
              aria-label="Key"
              placeholder={titleInput.placeholder.value}
              defaultValue={sectionKey}
              onSave={(value) => handleRenameNodeKey(value)}
              variant="invisible"
            />
            <Button
              label={deleteButton.label.value}
              variant="hoverable"
              size="icon-sm"
              color="text"
              className="translate-x-2"
              Icon={Trash}
              onClick={() => {
                addEditedContent(dictionaryKey, undefined, keyPath);

                const parentKeyPath: KeyPath[] = keyPath.slice(0, -1);
                setFocusedContentKeyPath(parentKeyPath);
              }}
            />
          </div>

          <span className="text-neutral dark:text-neutral-dark ml-3 text-sm">
            ({camelCaseToSentence(sectionKey)})
          </span>
        </div>

        <NodeTypeSelector
          keyPath={keyPath}
          dictionaryKey={dictionaryKey}
          section={section}
        />
      </form>

      {nodeType === NodeType.Object && (
        <StructureView {...{ keyPath, section, dictionaryKey }} />
      )}
    </Container>
  );
};

type StructureViewProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  section: ContentNode;
};

export const StructureView: FC<StructureViewProps> = ({
  section: sectionProp,
  keyPath,
  dictionaryKey,
}) => {
  const section = getContentNodeByKeyPath(sectionProp, keyPath);
  const { addNodeButton } = useDictionary(structureViewContent);
  const { setFocusedContentKeyPath } = useFocusDictionaryActions();
  const { addEditedContent } = useEditedContentActions();

  if (!section || typeof section !== 'object') {
    return <div>Not an object</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex w-full flex-col gap-2">
        {Object.keys(section).map((key) => (
          <li key={key} className="flex">
            <NodeView
              key={key}
              sectionKey={key}
              section={section?.[key as keyof typeof section]}
              keyPath={[...keyPath, { type: NodeType.Object, key }]}
              dictionaryKey={dictionaryKey}
            />
          </li>
        ))}
      </ul>
      <Button
        label={addNodeButton.label.value}
        variant="hoverable"
        size="md"
        color="text"
        Icon={Plus}
        className="w-80"
        onClick={() => {
          const newKey = 'newKey';
          addEditedContent(dictionaryKey, {}, [
            ...keyPath,
            { type: NodeType.Object, key: newKey },
          ]);
          setFocusedContentKeyPath([
            ...keyPath,
            { type: NodeType.Object, key: newKey },
          ]);
        }}
      >
        {addNodeButton.text}
      </Button>
    </div>
  );
};
