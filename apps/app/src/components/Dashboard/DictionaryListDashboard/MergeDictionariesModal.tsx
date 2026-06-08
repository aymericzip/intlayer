import { mergeDictionaries } from '@intlayer/core/dictionaryManipulator';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Form } from '@intlayer/design-system/form';
import { Checkbox } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import { cn } from '@intlayer/design-system/utils';
import type { Dictionary } from '@intlayer/types/dictionary';
import { ArrowRight, Eye } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DictionaryPreviewModal } from './DictionaryPreviewModal';

type MergeDictionariesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pairs: [Dictionary, Dictionary][];
  onConfirm: (pairs: { target: Dictionary; source: Dictionary }[]) => void;
  isMerging?: boolean;
};

type PairState = {
  swapped: boolean;
  selected: boolean;
};

export const MergeDictionariesModal: FC<MergeDictionariesModalProps> = ({
  isOpen,
  onClose,
  pairs,
  onConfirm,
  isMerging,
}) => {
  const { mergeDictionariesModal } = useIntlayer('dictionary-list');

  const [pairStates, setPairStates] = useState<PairState[]>(() =>
    pairs.map(() => ({ swapped: false, selected: true }))
  );
  const [previewDict, setPreviewDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPairStates(pairs.map(() => ({ swapped: false, selected: true })));
    }
  }, [isOpen, pairs.length]);

  const allSelected = pairStates.every((s) => s.selected);
  const someSelected = pairStates.some((s) => s.selected);

  const toggleSelectAll = () => {
    const next = !allSelected;
    setPairStates((prev) => prev.map((s) => ({ ...s, selected: next })));
  };

  const toggleSelected = (i: number) =>
    setPairStates((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, selected: !s.selected } : s))
    );

  const toggleSwapped = (i: number) =>
    setPairStates((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, swapped: !s.swapped } : s))
    );

  const resolvedPairs = useMemo(
    () =>
      pairs.map((pair, i) => {
        const { swapped } = pairStates[i] ?? { swapped: false };
        return {
          source: swapped ? pair[1] : pair[0],
          target: swapped ? pair[0] : pair[1],
        };
      }),
    [pairs, pairStates]
  );

  const dictLabel = (dict: Dictionary) => dict.localId ?? dict.key;

  const handleConfirm = () => {
    const selected = resolvedPairs.filter((_, i) => pairStates[i]?.selected);
    onConfirm(selected);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={mergeDictionariesModal.title.value}
        size="xl"
        padding="md"
        hasCloseButton
      >
        <div className="flex flex-col gap-4">
          <p className="text-neutral text-sm">
            {mergeDictionariesModal.description}
          </p>

          <div className="flex items-center gap-2 border-text/10 border-b pb-2">
            <Checkbox
              name="select-all-pairs"
              checked={allSelected}
              onChange={toggleSelectAll}
              color="text"
              size="sm"
            />
            <span className="font-medium text-sm">
              {mergeDictionariesModal.selectAll}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {pairs.map((pair, i) => {
              const state = pairStates[i] ?? { swapped: false, selected: true };
              const { source, target } = resolvedPairs[i];
              const merged = mergeDictionaries([target, source]);

              return (
                <Container
                  key={`${pair[0].key}-${i}`}
                  roundedSize="xl"
                  border
                  className={cn(
                    'flex flex-col gap-3 p-4 transition-opacity',
                    !state.selected && 'opacity-40'
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <Checkbox
                      name={`select-pair-${i}`}
                      checked={state.selected}
                      onChange={() => toggleSelected(i)}
                      color="text"
                      size="sm"
                      className="mt-0.5 shrink-0"
                    />

                    <div className="flex w-auto justify-center gap-3">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="font-medium text-neutral text-xs uppercase tracking-wide">
                          {mergeDictionariesModal.sourceLabel(state.swapped)}
                        </span>
                        <Button
                          variant="hoverable"
                          color="text"
                          size="sm"
                          Icon={Eye}
                          label={mergeDictionariesModal.previewButton.value}
                          onClick={() => setPreviewDict(source)}
                          className="max-w-full self-start overflow-hidden"
                        >
                          <span className="truncate">{dictLabel(source)}</span>
                        </Button>
                      </div>

                      <Button
                        variant="hoverable"
                        color="text"
                        size="icon-sm"
                        Icon={() => (
                          <ArrowRight
                            className={cn(
                              'size-4 text-text/60 transition-transform',
                              state.swapped && 'rotate-180'
                            )}
                          />
                        )}
                        label={mergeDictionariesModal.swapButton.value}
                        onClick={() => toggleSwapped(i)}
                        className="shrink-0"
                      />

                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="font-medium text-neutral text-xs uppercase tracking-wide">
                          {mergeDictionariesModal.targetLabel(state.swapped)}
                        </span>
                        <Button
                          variant="hoverable"
                          color="text"
                          size="sm"
                          Icon={Eye}
                          label={mergeDictionariesModal.previewButton.value}
                          onClick={() => setPreviewDict(target)}
                          className="max-w-full self-start overflow-hidden"
                        >
                          <span className="truncate">{dictLabel(target)}</span>
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="hoverable"
                      color="text"
                      size="sm"
                      Icon={Eye}
                      label={mergeDictionariesModal.previewResultButton.value}
                      onClick={() => setPreviewDict(merged)}
                      className="shrink-0"
                    >
                      {mergeDictionariesModal.previewResultButton}
                    </Button>
                  </div>
                </Container>
              );
            })}
          </div>

          <div className="flex justify-end gap-2 max-md:flex-col">
            <Form.Button
              variant="outline"
              color="text"
              label={mergeDictionariesModal.cancelButton.label.value}
              type="button"
              isFullWidth={true}
              className="w-auto"
              onClick={onClose}
            >
              {mergeDictionariesModal.cancelButton.text}
            </Form.Button>
            <Form.Button
              variant="outline"
              color="error"
              label={mergeDictionariesModal.confirmButton.label.value}
              isFullWidth={true}
              className="w-auto"
              isLoading={isMerging}
              disabled={isMerging || !someSelected}
              onClick={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
            >
              {mergeDictionariesModal.confirmButton.text}
            </Form.Button>
          </div>
        </div>
      </Modal>

      <DictionaryPreviewModal
        isOpen={!!previewDict}
        onClose={() => setPreviewDict(null)}
        dictionary={previewDict}
      />
    </>
  );
};
