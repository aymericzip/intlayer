import type { TranslatorProfileAPI } from '@intlayer/backend';
import {
  useCreateMission,
  useEstimateMission,
  useGetDictionaries,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { useNavigate } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { type FC, useState } from 'react';

type BookingModalProps = {
  translator: TranslatorProfileAPI;
  onClose: () => void;
};

type Step = 'select' | 'estimate' | 'confirm';

export const BookingModal: FC<BookingModalProps> = ({
  translator,
  onClose,
}) => {
  const [step, setStep] = useState<Step>('select');
  const [selectedDictIds, setSelectedDictIds] = useState<string[]>([]);
  const [sourceLocale, setSourceLocale] = useState('en');
  const [targetLocales, setTargetLocales] = useState('fr');
  const [notes, setNotes] = useState('');

  const navigate = useNavigate();
  const { data: dictsData, isLoading: dictsLoading } = useGetDictionaries();
  const {
    mutate: estimateMutation,
    data: estimateData,
    isPending: estimating,
  } = useEstimateMission();
  const { mutate: createMutation, isPending: creating } = useCreateMission();

  const dictionaries = dictsData?.data ?? [];
  const estimate = estimateData?.data ?? null;

  const toggleDict = (id: string) => {
    setSelectedDictIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleEstimate = () => {
    estimateMutation(
      {
        dictionaryIds: selectedDictIds,
        sourceLocale,
        pricePerHour: translator.pricePerHour,
      },
      { onSuccess: () => setStep('estimate') }
    );
  };

  const handleConfirm = () => {
    createMutation(
      {
        translatorId: translator.id,
        dictionaryIds: selectedDictIds,
        sourceLocale,
        targetLocales: targetLocales
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean),
        notes,
      },
      {
        onSuccess: (data) => {
          const missionId = data?.data?.id;
          if (missionId) {
            navigate({
              to: '/{-$locale}/translator-marketplace/dashboard/mission/$missionId' as any,
              params: { missionId } as any,
            });
          }
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Book Translator</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'select' && (
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="sourceLocale"
                className="mb-1 block font-medium text-sm"
              >
                Source locale
              </label>
              <input
                id="sourceLocale"
                type="text"
                value={sourceLocale}
                onChange={(e) => setSourceLocale(e.target.value)}
                placeholder="en"
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="targetLocales"
                className="mb-1 block font-medium text-sm"
              >
                Target locales (comma-separated)
              </label>
              <input
                id="targetLocales"
                type="text"
                value={targetLocales}
                onChange={(e) => setTargetLocales(e.target.value)}
                placeholder="fr, de, es"
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>

            <div>
              <span className="mb-1 block font-medium text-sm">
                Select dictionaries to translate
              </span>
              {dictsLoading ? (
                <Loader />
              ) : dictionaries.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No dictionaries found.
                </p>
              ) : (
                <div className="max-h-48 overflow-y-auto rounded-md border border-border">
                  {dictionaries.map((dict) => (
                    <label
                      key={dict.id}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDictIds.includes(dict.id)}
                        onChange={() => toggleDict(dict.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{dict.key}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={
                selectedDictIds.length === 0 || !sourceLocale || estimating
              }
              onClick={handleEstimate}
              className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
            >
              {estimating ? 'Calculating...' : 'Calculate price estimate →'}
            </button>
          </div>
        )}

        {step === 'estimate' && estimate && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-muted p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Word count</p>
                  <p className="font-bold text-lg">
                    {estimate.wordCount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated hours</p>
                  <p className="font-bold text-lg">
                    {estimate.estimatedHours.toFixed(1)}h
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Total price</p>
                  <p className="font-bold text-2xl">
                    ${(estimate.totalPrice / 100).toFixed(2)}{' '}
                    <span className="font-normal text-muted-foreground text-sm">
                      {estimate.currency.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="mb-1 block font-medium text-sm">
                Notes for the translator (optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any specific instructions or context..."
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('select')}
                className="flex-1 rounded-lg border border-border py-2.5 text-sm"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={creating}
                className="flex-1 rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
              >
                {creating ? 'Booking...' : 'Confirm booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
