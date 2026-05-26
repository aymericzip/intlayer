import type { ReviewerProfileAPI } from '@intlayer/backend';
import {
  useCreateMission,
  useGetDictionaries,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Checkbox } from '@intlayer/design-system/input';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { App_ReviewerMarketplace_Dashboard_Mission_Path } from '@intlayer/design-system/routes';
import { AutoSizedTextArea } from '@intlayer/design-system/text-area';
import { useNavigate } from '@tanstack/react-router';
import { Plus, X } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocalePicker } from '#components/LocalePicker';

type BookingModalProps = {
  reviewer: ReviewerProfileAPI;
  isOpen: boolean;
  onClose: () => void;
};

export const BookingModal: FC<BookingModalProps> = ({
  reviewer,
  isOpen,
  onClose,
}) => {
  const content = useIntlayer('booking-modal');

  const [selectedDictIds, setSelectedDictIds] = useState<string[]>([]);
  const [sourceLocale, setSourceLocale] = useState('en');
  const [targetLocales, setTargetLocales] = useState<string[]>(['fr']);
  const [notes, setNotes] = useState('');

  const navigate = useNavigate();
  const { data: dictsData, isLoading: dictsLoading } = useGetDictionaries();
  const { mutate: createMutation, isPending: sending } = useCreateMission();

  const dictionaries = dictsData?.data ?? [];

  const toggleDict = (id: string) =>
    setSelectedDictIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );

  const addTargetLocale = () => setTargetLocales((prev) => [...prev, 'en']);
  const removeTargetLocale = (index: number) =>
    setTargetLocales((prev) => prev.filter((_, i) => i !== index));
  const updateTargetLocale = (index: number, locale: string) =>
    setTargetLocales((prev) => prev.map((l, i) => (i === index ? locale : l)));

  const handleSend = () => {
    createMutation(
      {
        reviewerId: reviewer.id,
        dictionaryIds: selectedDictIds,
        sourceLocale,
        targetLocales,
        notes,
      },
      {
        onSuccess: (data) => {
          const missionId = data?.data?.id;
          if (missionId) {
            navigate({
              to: App_ReviewerMarketplace_Dashboard_Mission_Path as any,
              params: { missionId } as any,
            });
          }
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={content.title}
      hasCloseButton
      size="lg"
      padding="lg"
      isScrollable
    >
      <div className="flex flex-col gap-6">
        <p className="text-neutral text-sm">{content.subtitle}</p>

        <div className="flex w-full flex-row flex-wrap justify-around gap-3">
          {/* Source language */}
          <div className="flex flex-col gap-2">
            <label htmlFor="sourceLocale" className="font-medium text-sm">
              {content.sourceLocaleLabel}
            </label>
            <LocalePicker
              identifier="sourceLocale"
              value={sourceLocale}
              onChange={setSourceLocale}
            />
          </div>
          <span className="my-auto flex h-full flex-y-1 items-center">→</span>
          {/* Target languages */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">
              {content.targetLocalesLabel}
            </span>
            <div className="flex flex-col gap-2">
              {targetLocales.map((locale, index) => (
                <div
                  key={`locale-${String(index)}`}
                  className="flex items-center gap-2"
                >
                  <div className="flex-1">
                    <LocalePicker
                      identifier={`targetLocale-${index}`}
                      value={locale}
                      onChange={(l) => updateTargetLocale(index, l)}
                    />
                  </div>
                  {targetLocales.length > 1 && (
                    <Button
                      variant="hoverable"
                      color="text"
                      size="sm"
                      label={content.removeLanguage.value}
                      onClick={() => removeTargetLocale(index)}
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="hoverable"
                color="text"
                size="sm"
                label={content.addLanguage.value}
                onClick={addTargetLocale}
                className="self-start"
                Icon={Plus}
              >
                {content.addLanguage}
              </Button>
            </div>
          </div>
        </div>

        {/* Dictionaries (optional context for reviewer) */}
        <div className="flex flex-col gap-2">
          <span className="w-full font-medium text-sm">
            {content.selectDictionariesLabel}
          </span>

          {dictsLoading ? (
            <Loader />
          ) : dictionaries.length === 0 ? (
            <p className="text-neutral text-sm">
              {content.noDictionariesFound}
            </p>
          ) : (
            <Container
              background="none"
              border
              borderColor="card"
              roundedSize="xl"
              padding="md"
              className="flex max-h-48 flex-col gap-3 overflow-y-auto"
            >
              {dictionaries.length > 0 && (
                <Checkbox
                  id="dict-select-all"
                  name="dict-select-all"
                  size="sm"
                  color="text"
                  checked={selectedDictIds.length === dictionaries.length}
                  onChange={() =>
                    setSelectedDictIds(
                      selectedDictIds.length === dictionaries.length
                        ? []
                        : dictionaries.map((dictionary) => dictionary.id)
                    )
                  }
                  label={content.selectAll.value}
                  labelClassName="font-normal px-2 py-1"
                />
              )}
              {dictionaries.map((dictionary) => (
                <Checkbox
                  key={dictionary.id}
                  id={`dict-${dictionary.id}`}
                  name={`dict-${dictionary.id}`}
                  size="sm"
                  color="text"
                  checked={selectedDictIds.includes(dictionary.id)}
                  onChange={() => toggleDict(dictionary.id)}
                  label={dictionary.key}
                  labelClassName="font-normal px-2 py-1"
                />
              ))}
            </Container>
          )}
        </div>

        {/* Message to reviewer */}
        <div className="flex flex-col gap-2">
          <label htmlFor="booking-notes" className="font-medium text-sm">
            {content.notesLabel}
          </label>
          <AutoSizedTextArea
            id="booking-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder={content.notesPlaceholder.value}
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          />
        </div>

        <Button
          label={sending ? content.sending.value : content.sendRequest.value}
          disabled={!sourceLocale || targetLocales.length === 0 || sending}
          isLoading={sending}
          onClick={handleSend}
          isFullWidth
        >
          {sending ? content.sending : content.sendRequest}
        </Button>
      </div>
    </Modal>
  );
};
