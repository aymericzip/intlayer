'use client';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Popover } from '@components/Popover';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { cn } from '@utils/cn';
import { TriangleAlert } from 'lucide-react';
import { type FC, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useContentGrid } from './ContentGridContext';
import type { ContentRow } from './flattenContentRows';
import { formatTypeChain } from './gridRows';

/** Node types offered by the picker, grouped by purpose. */
const TYPE_GROUPS = [
  {
    groupKey: 'groupPrimitives',
    nodeTypes: [NodeTypes.TEXT, NodeTypes.NUMBER, NodeTypes.BOOLEAN],
  },
  { groupKey: 'groupMultilingual', nodeTypes: [NodeTypes.TRANSLATION] },
  {
    groupKey: 'groupConditional',
    nodeTypes: [
      NodeTypes.ENUMERATION,
      NodeTypes.PLURAL,
      NodeTypes.GENDER,
      NodeTypes.SELECT,
      NodeTypes.CONDITION,
    ],
  },
  {
    groupKey: 'groupRichText',
    nodeTypes: [NodeTypes.MARKDOWN, NodeTypes.HTML, NodeTypes.INSERTION],
  },
  {
    groupKey: 'groupStructural',
    nodeTypes: [
      NodeTypes.OBJECT,
      NodeTypes.ARRAY,
      NodeTypes.NESTED,
      NodeTypes.FILE,
    ],
  },
] as const satisfies {
  groupKey: string;
  nodeTypes: NodeType[];
}[];

export type TypeBadgeProps = {
  row: ContentRow;
  className?: string;
};

/**
 * Type chip of a row. Clicking it opens the type picker: the shape is edited
 * where the content is read, which replaces the separate Structure tab.
 */
export const TypeBadge: FC<TypeBadgeProps> = ({ row, className }) => {
  const { changeRowType, getIsTypeChangeLossless } = useContentGrid();
  const content = useIntlayer('content-grid');
  const nodeTypeLabels = useIntlayer('node-type-selector');
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [pendingType, setPendingType] = useState<NodeType | undefined>();

  const label = formatTypeChain(row.typeChain);
  const isReadonly = row.leafKind === 'readonly';
  const currentType = row.typeChain[0];

  const getTypeLabel = (nodeType: NodeType): string => {
    const labels: Partial<Record<NodeType, string>> = {
      [NodeTypes.TEXT]: nodeTypeLabels.text.value,
      [NodeTypes.NUMBER]: nodeTypeLabels.number.value,
      [NodeTypes.BOOLEAN]: nodeTypeLabels.boolean.value,
      [NodeTypes.TRANSLATION]: nodeTypeLabels.multilingual.value,
      [NodeTypes.ENUMERATION]: nodeTypeLabels.enumeration.value,
      [NodeTypes.PLURAL]: nodeTypeLabels.plural.value,
      [NodeTypes.GENDER]: nodeTypeLabels.gender.value,
      [NodeTypes.SELECT]: nodeTypeLabels.select.value,
      [NodeTypes.CONDITION]: nodeTypeLabels.condition.value,
      [NodeTypes.MARKDOWN]: nodeTypeLabels.markdown.value,
      [NodeTypes.HTML]: content.htmlType.value,
      [NodeTypes.INSERTION]: nodeTypeLabels.insertion.value,
      [NodeTypes.OBJECT]: nodeTypeLabels.node.value,
      [NodeTypes.ARRAY]: nodeTypeLabels.array.value,
      [NodeTypes.NESTED]: nodeTypeLabels.nest.value,
      [NodeTypes.FILE]: nodeTypeLabels.file.value,
    };
    return labels[nodeType] ?? nodeType;
  };

  const close = () => pickerRef.current?.hidePopover();

  /** Resets the search and the pending confirmation once the picker closes. */
  const handleOpenChange = (isNextOpen: boolean) => {
    setIsOpen(isNextOpen);
    if (isNextOpen) return;

    setQuery('');
    setPendingType(undefined);
  };

  const applyType = (nodeType: NodeType) => {
    changeRowType(row, nodeType);
    close();
  };

  const selectType = (nodeType: NodeType) => {
    if (nodeType === currentType) return close();
    if (getIsTypeChangeLossless(row, nodeType)) return applyType(nodeType);
    setPendingType(nodeType);
  };

  const chipClassName = cn(
    'inline-flex shrink-0 items-center rounded-md border border-neutral/30 px-1.5 py-0.5 font-mono text-[10px] text-neutral leading-none',
    className
  );

  if (isReadonly) {
    return (
      <span className={chipClassName} title={content.readonlyTooltip.value}>
        {content.readonlyChip}
      </span>
    );
  }

  const normalizedQuery = query.trim().toLowerCase();

  return (
    <Popover identifier="type-picker" className="inline-flex shrink-0">
      <Popover.Trigger
        identifier="type-picker"
        className={cn(
          chipClassName,
          'cursor-pointer transition-colors hover:border-text hover:text-text'
        )}
        aria-label={`${content.changeType.value}: ${label}`}
        aria-expanded={isOpen}
        dir="ltr"
      >
        {label}
      </Popover.Trigger>

      <Popover.Panel
        ref={pickerRef}
        identifier="type-picker"
        onOpenChange={handleOpenChange}
        roundedSize="xl"
        className="min-w-74 p-2"
      >
        {isOpen && pendingType && (
          <div className="flex flex-col gap-3 p-1">
            <p className="flex items-start gap-2 text-sm text-warning">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {content.resetWarning}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                label={content.cancel.value}
                variant="outline"
                color="text"
                size="sm"
                onClick={() => setPendingType(undefined)}
              >
                {content.cancel}
              </Button>
              <Button
                label={content.changeType.value}
                color="error"
                variant="outline"
                size="sm"
                onClick={() => applyType(pendingType)}
              >
                {content.changeType}
              </Button>
            </div>
          </div>
        )}
        {isOpen && !pendingType && (
          <div className="flex flex-col gap-4">
            <Input
              size="sm"
              className="bg-text-opposite"
              autoFocus={isOpen}
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder={content.typeSearchPlaceholder.value}
              aria-label={content.typeSearchPlaceholder.value}
            />
            <div className="flex max-h-xl flex-col gap-2 overflow-y-auto">
              {TYPE_GROUPS.map(({ groupKey, nodeTypes }) => {
                const matchingTypes = nodeTypes.filter(
                  (nodeType) =>
                    normalizedQuery === '' ||
                    nodeType.toLowerCase().includes(normalizedQuery) ||
                    getTypeLabel(nodeType)
                      .toLowerCase()
                      .includes(normalizedQuery)
                );

                if (matchingTypes.length === 0) return null;

                return (
                  <div key={groupKey} className="flex flex-col">
                    <span className="px-2 py-1 text-neutral text-xs">
                      {content[groupKey]}
                    </span>
                    {matchingTypes.map((nodeType) => (
                      <button
                        key={nodeType}
                        type="button"
                        onClick={() => selectType(nodeType)}
                        aria-current={nodeType === currentType}
                        className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 text-start text-sm hover:bg-text/10 aria-current:bg-text/10 aria-current:font-semibold"
                      >
                        <span>{getTypeLabel(nodeType)}</span>
                        <span
                          className="font-mono text-[10px] text-neutral"
                          dir="ltr"
                        >
                          {nodeType}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};
