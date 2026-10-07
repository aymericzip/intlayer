import { Accordion, type AccordionProps } from '@components/Accordion';
import { Button } from '@components/Button';
import { useLocaleSwitcherContent } from '@components/LocaleSwitcherContentDropDown';
import {
  type ReorderProps,
  useDragReorder,
  VERTICAL_DROP_ZONE_CLASS_NAME,
} from '@hooks/useDragReorder';
import { camelCaseToSentence } from '@intlayer/config/client';
import {
  getContentNodeByKeyPath,
  getEmptyNode,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import { isSameKeyPath } from '@intlayer/core/utils';
import {
  useEditedContentActions,
  useEditorLocale,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { LocalDictionaryId } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { cn } from '@utils/cn';
import type { ContentNode, Dictionary } from 'intlayer';
import { ChevronRight, GripVertical, Plus } from 'lucide-react';
import { type FC, type ReactNode, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { getIsEditableSection } from '../getIsEditableSection';
import { useFieldReorder } from '../useFieldReorder';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

type GatedAccordionProps = AccordionProps & { children: ReactNode };

// Renders children only after the accordion is first opened (mount-once pattern).
// Prevents the entire recursive subtree from mounting on initial render.
const GatedAccordion: FC<GatedAccordionProps> = ({
  children,
  onToggle,
  ...props
}) => {
  const [hasOpened, setHasOpened] = useState(false);
  return (
    <Accordion
      {...props}
      onToggle={(isOpen) => {
        if (isOpen && !hasOpened) setHasOpened(true);
        onToggle?.(isOpen);
      }}
    >
      {hasOpened ? children : null}
    </Accordion>
  );
};

type ReorderableItemProps = {
  reorderProps: ReorderProps;
  children: ReactNode;
};

/** Draggable tree entry; the grip shows on hover. */
const ReorderableItem: FC<ReorderableItemProps> = ({
  reorderProps,
  children,
}) => (
  <div
    {...reorderProps}
    className={cn(
      'group/reorder flex w-full min-w-0 items-start gap-1 rounded-lg',
      'cursor-grab active:cursor-grabbing data-[dragging=true]:opacity-40',
      VERTICAL_DROP_ZONE_CLASS_NAME
    )}
  >
    <GripVertical
      aria-hidden
      className="mt-2.5 size-3.5 shrink-0 text-neutral opacity-0 transition-opacity group-hover/reorder:opacity-100"
    />
    <div className="min-w-0 flex-1">{children}</div>
  </div>
);

/** Keys of the reorderable children: object keys or array indexes. */
const getReorderableChildKeys = (section: ContentNode): string[] => {
  if (Array.isArray(section)) return section.map((_, index) => String(index));
  if (
    section &&
    typeof section === 'object' &&
    typeof (section as { nodeType?: unknown }).nodeType !== 'string'
  ) {
    return Object.keys(section);
  }
  return [];
};

export type NodeWrapperProps = {
  keyPath: KeyPath[];
  section: ContentNode;
  dictionary: Dictionary;
};

export const NavigationViewNode: FC<NodeWrapperProps> = ({
  section: sectionProp,
  keyPath,
  dictionary,
}) => {
  const { selectedLocales } = useLocaleSwitcherContent();

  const { locale: defaultLocale } = useLocale();
  const editorLocale = useEditorLocale();
  const currentLocale = editorLocale ?? selectedLocales[0] ?? defaultLocale;
  const section = getContentNodeByKeyPath(sectionProp, keyPath, currentLocale);
  const { addEditedContent } = useEditedContentActions();
  const { setFocusedContentKeyPath, focusedContent } =
    useFocusUnmergedDictionary();
  const { addNewElement, goToField } = useIntlayer('navigation-view');
  const nodeType = getNodeType(section);
  const getIsSelected = (keyPath: KeyPath[]) =>
    (focusedContent?.keyPath?.length ?? 0) > 0 &&
    isSameKeyPath(keyPath, focusedContent?.keyPath ?? []);
  const isEditableSubSection = getIsEditableSection(section);
  const { reorderField } = useIntlayer('content-grid');
  const { moveField } = useFieldReorder(dictionary);
  const isArraySection = Array.isArray(section);
  const { getReorderProps } = useDragReorder({
    itemIds: getReorderableChildKeys(section),
    orientation: 'vertical',
    title: reorderField.value,
    onMove: (sourceKey, targetKey) =>
      moveField(
        keyPath,
        isArraySection ? Number(sourceKey) : sourceKey,
        isArraySection ? Number(targetKey) : targetKey
      ),
  });

  if (!section) return <></>;

  if (isEditableSubSection) {
    return (
      <Button
        label={goToField.label.value}
        variant="hoverable"
        color="text"
        className="w-full"
        onClick={() => setFocusedContentKeyPath(keyPath)}
        IconRight={ChevronRight}
      >
        {camelCaseToSentence(keyPath[keyPath.length - 1]?.key as string)}
      </Button>
    );
  }

  if (typeof section === 'object') {
    if (nodeType === NodeTypes.REACT_NODE) {
      return <>React Node</>;
    }

    if (nodeType === NodeTypes.TRANSLATION) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {selectedLocales.map((translationKey) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeTypes.TRANSLATION, key: translationKey },
            ];

            return (
              <NavigationViewNode
                key={translationKey}
                keyPath={childKeyPath}
                section={sectionProp}
                dictionary={dictionary}
              />
            );
          })}
        </div>
      );
    }

    if (
      nodeType === NodeTypes.ENUMERATION ||
      nodeType === NodeTypes.PLURAL ||
      nodeType === NodeTypes.CONDITION
    ) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {Object.keys(
            (section as any)[nodeType as unknown as keyof typeof section]
          ).map((key) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: nodeType, key },
            ];

            return (
              <NavigationViewNode
                key={key}
                keyPath={childKeyPath}
                section={sectionProp}
                dictionary={dictionary}
              />
            );
          })}
        </div>
      );
    }

    if (nodeType === NodeTypes.ARRAY) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {(section as unknown as ContentNode[]).map((subSection, index) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeTypes.ARRAY, key: index },
            ];

            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <ReorderableItem
                  key={JSON.stringify(childKeyPath)}
                  reorderProps={getReorderProps(String(index))}
                >
                  <Button
                    label={`${goToField.label.value} ${index}`}
                    variant="hoverable"
                    color="text"
                    className="w-full"
                    onClick={() => setFocusedContentKeyPath(childKeyPath)}
                    IconRight={ChevronRight}
                    isActive={getIsSelected(childKeyPath)}
                  >
                    Item {index}
                  </Button>
                </ReorderableItem>
              );
            }

            return (
              <ReorderableItem
                key={JSON.stringify(childKeyPath)}
                reorderProps={getReorderProps(String(index))}
              >
                <GatedAccordion
                  label={`${goToField.label.value} ${index}`}
                  header={`Item ${index}`}
                  isActive={getIsSelected(childKeyPath)}
                  onClick={() => setFocusedContentKeyPath(childKeyPath)}
                >
                  <div className="mt-2 flex w-full max-w-full">
                    <div className="flex-1 ps-10">
                      <NavigationViewNode
                        keyPath={childKeyPath}
                        section={sectionProp}
                        dictionary={dictionary}
                      />
                    </div>
                  </div>
                </GatedAccordion>
              </ReorderableItem>
            );
          })}

          <Button
            label={addNewElement.label.value}
            variant="hoverable"
            color="neutral"
            textAlign="left"
            onClick={() => {
              const newKeyPath: KeyPath[] = [
                ...keyPath,
                {
                  type: NodeTypes.ARRAY,
                  key: (section as unknown as ContentNode[]).length,
                },
              ];
              const sectionArray = section as unknown as ContentNode[];
              const emptySectionEl =
                getEmptyNode(
                  sectionArray[
                    (sectionArray.length - 1) as keyof typeof sectionArray
                  ] as ContentNode
                ) ?? '';
              addEditedContent(
                dictionary.localId as LocalDictionaryId,
                emptySectionEl,
                newKeyPath,
                false
              );
              setFocusedContentKeyPath(newKeyPath);
            }}
            Icon={Plus}
          >
            {addNewElement.text}
          </Button>
        </div>
      );
    }

    if (typeof section.nodeType === 'string') {
      const childKeyPath: KeyPath[] = [
        ...keyPath,
        { type: section.nodeType } as KeyPath,
      ];

      return (
        <NavigationViewNode
          keyPath={childKeyPath}
          section={sectionProp}
          dictionary={dictionary}
        />
      );
    }

    const sectionArray = Object.keys(section);
    return (
      <div className="flex w-full max-w-full flex-col justify-between gap-2">
        {sectionArray.map((key) => {
          const childKeyPath: KeyPath[] = [
            ...keyPath,
            { type: NodeTypes.OBJECT, key },
          ];

          const subSection = getContentNodeByKeyPath(sectionProp, childKeyPath);
          const isEditableSubSection = getIsEditableSection(subSection);

          if (isEditableSubSection) {
            return (
              <ReorderableItem key={key} reorderProps={getReorderProps(key)}>
                <Button
                  label={`${goToField.label.value} ${key}`}
                  isActive={getIsSelected(childKeyPath)}
                  variant="hoverable"
                  color="text"
                  className="w-full"
                  onClick={() => setFocusedContentKeyPath(childKeyPath)}
                  IconRight={ChevronRight}
                >
                  {camelCaseToSentence(key)}
                </Button>
              </ReorderableItem>
            );
          }

          return (
            <ReorderableItem key={key} reorderProps={getReorderProps(key)}>
              <GatedAccordion
                label={`${goToField.label.value} ${key}`}
                isActive={getIsSelected(childKeyPath)}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={camelCaseToSentence(key)}
              >
                <div className="mt-2 flex w-full max-w-full">
                  <div className="flex-1 ps-10">
                    <NavigationViewNode
                      keyPath={childKeyPath}
                      section={sectionProp}
                      dictionary={dictionary}
                    />
                  </div>
                </div>
              </GatedAccordion>
            </ReorderableItem>
          );
        })}
      </div>
    );
  }

  return (
    <>
      Error loading section --
      {nodeType}
      --
      {JSON.stringify(section)}
      --
      {JSON.stringify(keyPath)}
    </>
  );
};
