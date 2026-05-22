import type { TranslatorProfileAPI } from '@intlayer/backend';
import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  useRegisterAsTranslator,
  useUpdateTranslatorProfile,
  useUploadTranslatorCoverPicture,
  useUploadTranslatorMainPicture,
} from '@intlayer/design-system/hooks';
import { Input } from '@intlayer/design-system/input';
import { ImageIcon, Plus, Trash2 } from 'lucide-react';
import { type ChangeEvent, type FC, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocalePicker } from '#components/LocalePicker';

type TranslatorOnboardingProps = {
  existingProfile?: TranslatorProfileAPI;
};

type LangPair = { from: string; to: string };

const Field: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="font-medium text-sm">{label}</span>
    {children}
  </div>
);

export const TranslatorOnboarding: FC<TranslatorOnboardingProps> = ({
  existingProfile,
}) => {
  const content = useIntlayer('translator-onboarding');

  const [bio, setBio] = useState(existingProfile?.bio ?? '');
  const [pricePerHour, setPricePerHour] = useState(
    existingProfile ? existingProfile.pricePerHour / 100 : 50
  );
  const [languagePairs, setLanguagePairs] = useState<
    (LangPair & { id: string })[]
  >(
    (existingProfile?.languagePairs ?? [{ from: 'en', to: 'fr' }]).map((p) => ({
      ...p,
      id: Math.random().toString(),
    }))
  );
  const [saved, setSaved] = useState(false);

  const { mutate: register, isPending: registering } =
    useRegisterAsTranslator();
  const { mutate: update, isPending: updating } = useUpdateTranslatorProfile();
  const { mutate: uploadMain, isPending: uploadingMain } =
    useUploadTranslatorMainPicture();
  const { mutate: uploadCover } = useUploadTranslatorCoverPicture();

  const mainPicInputRef = useRef<HTMLInputElement>(null);
  const coverPicInputRef = useRef<HTMLInputElement>(null);

  const handleMainPicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMain(file);
    e.target.value = '';
  };

  const handleCoverPicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadCover(file);
    e.target.value = '';
  };

  const addPair = () =>
    setLanguagePairs((prev) => [
      ...prev,
      { from: '', to: '', id: Math.random().toString() },
    ]);
  const removePair = (i: number) =>
    setLanguagePairs((prev) => prev.filter((_, idx) => idx !== i));
  const updatePair = (i: number, field: 'from' | 'to', val: string) =>
    setLanguagePairs((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [field]: val } : p))
    );

  const handleSubmit = () => {
    const payload = {
      bio,
      pricePerHour: Math.round(pricePerHour * 100),
      languagePairs: languagePairs
        .filter((p) => p.from && p.to)
        .map(({ from, to }) => ({ from, to })),
    };
    if (existingProfile) {
      update(payload, { onSuccess: () => setSaved(true) });
    } else {
      register(payload, { onSuccess: () => setSaved(true) });
    }
  };

  const isPending = registering || updating;

  return (
    <Container
      roundedSize="3xl"
      padding="xl"
      border
      borderColor="neutral"
      className="w-full"
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-semibold text-lg">
          {existingProfile
            ? content.editYourProfile.value
            : content.registerAsTranslator.value}
        </h2>

        <Field label={content.bio.value}>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder={content.tellClientsAboutYourExperience.value}
            className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral/40 focus:ring-1 focus:ring-neutral"
          />
        </Field>

        {existingProfile && (
          <>
            <input
              ref={mainPicInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleMainPicChange}
            />
            <Field label={content.mainPicture.value}>
              <Avatar
                size="2xl"
                src={existingProfile.mainPicture}
                isLoading={uploadingMain}
                onClick={() => mainPicInputRef.current?.click()}
                hoverable
                alt={content.uploadMainPicture.value}
              />
            </Field>

            <input
              ref={coverPicInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleCoverPicChange}
            />
            <Field label={content.coverPicture.value}>
              <button
                type="button"
                onClick={() => coverPicInputRef.current?.click()}
                className="group relative h-24 w-full overflow-hidden rounded-xl border border-neutral/20 bg-neutral/5 transition-opacity hover:opacity-80"
                aria-label={content.uploadCoverPicture.value}
              >
                {existingProfile.coverPicture ? (
                  <img
                    src={existingProfile.coverPicture}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-neutral/30 border-dashed">
                    <ImageIcon size={20} className="text-neutral/40" />
                  </div>
                )}
              </button>
            </Field>
          </>
        )}

        <Field label={content.pricePerHour.value}>
          <Input
            id="pricePerHour"
            type="number"
            min={1}
            value={pricePerHour}
            onChange={(e) => setPricePerHour(Number(e.target.value))}
            className="w-32"
          />
        </Field>

        <Field label={content.languagePairs.value}>
          <div className="flex flex-col gap-3">
            {languagePairs.map((pair, i) => (
              <div key={pair.id} className="flex items-center gap-2">
                <LocalePicker
                  identifier={`lang-from-${i}`}
                  value={pair.from}
                  onChange={(val) => updatePair(i, 'from', val)}
                  placeholder={content.fromEgEn.value}
                />
                <span className="text-neutral/60">→</span>
                <LocalePicker
                  identifier={`lang-to-${i}`}
                  value={pair.to}
                  onChange={(val) => updatePair(i, 'to', val)}
                  placeholder={content.toEgFr.value}
                />
                {languagePairs.length > 1 && (
                  <Button
                    type="button"
                    variant="hoverable"
                    color="text"
                    size="icon-sm"
                    onClick={() => removePair(i)}
                    label={content.removeLanguagePair.value}
                    Icon={Trash2}
                  />
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="hoverable"
              color="text"
              size="sm"
              onClick={addPair}
              label={content.add.value}
              Icon={Plus}
              className="self-start"
            >
              {content.add}
            </Button>
          </div>
        </Field>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            color="text"
            onClick={handleSubmit}
            isLoading={isPending}
            disabled={isPending}
            label={
              existingProfile
                ? content.saveChanges.value
                : content.register.value
            }
          >
            {isPending
              ? content.saving
              : existingProfile
                ? content.saveChanges
                : content.register}
          </Button>

          {saved && (
            <p className="text-neutral text-sm">
              {content.profileSavedSuccessfully}
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};
