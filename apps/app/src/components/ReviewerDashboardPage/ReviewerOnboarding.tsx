import type { ReviewerCategory, ReviewerProfileAPI } from '@intlayer/backend';
import {
  useRegisterAsReviewer,
  useSession,
  useUpdateReviewerProfile,
  useUploadReviewerCoverPicture,
  useUploadReviewerMainPicture,
  useUploadUserAvatar,
} from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Input } from '@intlayer/design-system/input';
import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { AutoSizedTextArea } from '@intlayer/design-system/text-area';
import { ImageIcon, Plus, Trash2 } from 'lucide-react';
import { type ChangeEvent, type FC, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocalePicker } from '#components/LocalePicker';

type ReviewerOnboardingProps = {
  existingProfile?: ReviewerProfileAPI;
};

type LangPair = { from: string; to: string };

const ALL_CATEGORIES: ReviewerCategory[] = [
  'copywriter',
  'translator',
  'proofreader',
  'technical_writer',
  'marketing',
];

const Field: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="font-medium text-sm">{label}</span>
    {children}
  </div>
);

export const ReviewerOnboarding: FC<ReviewerOnboardingProps> = ({
  existingProfile,
}) => {
  const content = useIntlayer('reviewer-onboarding');
  const { session } = useSession();
  const user = session?.user;

  const [bio, setBio] = useState(existingProfile?.bio ?? '');
  const [bioPreview, setBioPreview] = useState(false);
  const [pricePerHour, setPricePerHour] = useState(
    existingProfile ? existingProfile.pricePerHour / 100 : 50
  );
  const [categories, setCategories] = useState<ReviewerCategory[]>(
    existingProfile?.categories ?? []
  );
  const [languagePairs, setLanguagePairs] = useState<
    (LangPair & { id: string })[]
  >(
    (existingProfile?.languagePairs ?? [{ from: 'en', to: 'fr' }]).map((p) => ({
      ...p,
      id: Math.random().toString(),
    }))
  );
  const [socialLinks, _setSocialLinks] = useState({
    github: existingProfile?.socialLinks?.github ?? '',
    linkedin: existingProfile?.socialLinks?.linkedin ?? '',
    portfolio: existingProfile?.socialLinks?.portfolio ?? '',
  });
  const [saved, setSaved] = useState(false);

  const { mutate: register, isPending: registering } = useRegisterAsReviewer();
  const { mutate: update, isPending: updating } = useUpdateReviewerProfile();
  const { mutate: uploadProfile, isPending: uploadingProfile } =
    useUploadUserAvatar();
  const { mutate: uploadMain, isPending: uploadingMain } =
    useUploadReviewerMainPicture();
  const { mutate: uploadCover } = useUploadReviewerCoverPicture();

  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const mainPicInputRef = useRef<HTMLInputElement>(null);
  const coverPicInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadProfile(file);
    e.target.value = '';
  };

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

  const toggleCategory = (cat: ReviewerCategory) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const handleSubmit = () => {
    const payload = {
      bio,
      pricePerHour: Math.round(pricePerHour * 100),
      categories,
      languagePairs: languagePairs
        .filter((pair) => pair.from && pair.to)
        .map(({ from, to }) => ({ from, to })),
      socialLinks: {
        ...(socialLinks.github ? { github: socialLinks.github } : {}),
        ...(socialLinks.linkedin ? { linkedin: socialLinks.linkedin } : {}),
        ...(socialLinks.portfolio ? { portfolio: socialLinks.portfolio } : {}),
      },
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
            ? content.editYourProfile
            : content.registerAsReviewer}
        </h2>

        <Field label={content.bio.value}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 self-end text-xs">
              <Button
                type="button"
                variant="hoverable"
                isActive={bioPreview === false}
                label=""
                onClick={() => setBioPreview(false)}
              >
                {content.edit}
              </Button>
              <Button
                type="button"
                label=""
                isActive={bioPreview === true}
                variant="hoverable"
                onClick={() => setBioPreview(true)}
              >
                {content.preview}
              </Button>
            </div>
            {bioPreview ? (
              <div className="min-h-20 flex-col rounded-xl border border-input px-3 py-2 text-sm">
                {bio ? (
                  <MarkdownRenderer
                    wrapper={(props) => (
                      <div className="flex flex-col gap-3" {...props} />
                    )}
                  >
                    {bio}
                  </MarkdownRenderer>
                ) : (
                  <span className="text-neutral/40">
                    {content.tellClientsAboutYourExperience}
                  </span>
                )}
              </div>
            ) : (
              <AutoSizedTextArea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder={content.tellClientsAboutYourExperience.value}
                className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral/40 focus:ring-1 focus:ring-neutral"
              />
            )}
          </div>
        </Field>

        <Field label={content.categories.value}>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => {
              const checked = categories.includes(cat);

              return (
                <label
                  key={cat}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    checked
                      ? 'border-text bg-text/10 text-text'
                      : 'border-neutral/20 text-neutral hover:border-neutral/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-text"
                    checked={checked}
                    onChange={() => toggleCategory(cat)}
                  />
                  {content.categoryLabels[cat]}
                </label>
              );
            })}
          </div>
        </Field>

        {existingProfile && (
          <>
            <input
              ref={profilePicInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleProfilePicChange}
            />
            <Field label={content.profilePicture.value}>
              <Avatar
                size="2xl"
                src={user?.image}
                isLoading={uploadingProfile}
                onClick={() => profilePicInputRef.current?.click()}
                hoverable
                alt={content.uploadProfilePicture.value}
                className="mx-auto"
              />
            </Field>

            <input
              ref={mainPicInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleMainPicChange}
            />
            <Field label={content.mainPicture.value}>
              <button
                type="button"
                onClick={() => mainPicInputRef.current?.click()}
                className="group relative mx-auto aspect-video w-auto overflow-hidden rounded-xl border border-neutral/20 bg-neutral/5 transition-opacity hover:opacity-80"
                aria-label={content.uploadMainPicture.value}
              >
                {existingProfile.mainPicture ? (
                  <img
                    src={existingProfile.mainPicture}
                    alt={content.uploadMainPicture.value}
                    className="size-full max-w-lg cursor-pointer object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center border border-neutral/30 border-dashed">
                    <ImageIcon size={20} className="text-neutral/40" />
                  </div>
                )}
                {uploadingMain && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                )}
              </button>
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
                className="group relative aspect-16/5 w-full overflow-hidden rounded-xl border border-neutral/20 bg-neutral/5 transition-opacity hover:opacity-80"
                aria-label={content.uploadCoverPicture.value}
              >
                {existingProfile.coverPicture ? (
                  <img
                    src={existingProfile.coverPicture}
                    alt="Cover"
                    className="size-full cursor-pointer object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center border border-neutral/30 border-dashed">
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
            label={existingProfile ? content.saveChanges : content.register}
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
