/** biome-ignore-all lint/a11y/noLabelWithoutControl: form labels are custom components */
'use client';

import type { EnvironmentAPI } from '@intlayer/backend';
import {
  useAddEnvironment,
  useDeleteEnvironment,
  useMigrateEnvironment,
  useResetToProductionEnvironment,
  useSelectEnvironment,
  useSession,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Checkbox, Input, Radio } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { Select } from '@intlayer/design-system/select';
import { Tag } from '@intlayer/design-system/tag';
import { ArrowRight, Layers, Plus, Trash2 } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

const PRODUCTION_SENTINEL_ID = 'production';

type EnvironmentEntry = {
  id: string;
  name: string;
  isDefault: boolean;
  isVirtual: boolean;
};

const buildEnvironmentEntries = (
  projectEnvironments: EnvironmentAPI[]
): EnvironmentEntry[] => {
  const defaultEnvironment = projectEnvironments.find((env) => env.isDefault);
  const nonDefaultEnvironments = projectEnvironments.filter(
    (env) => !env.isDefault
  );

  const productionEntry: EnvironmentEntry = defaultEnvironment
    ? {
        id: String(defaultEnvironment.id),
        name: defaultEnvironment.name,
        isDefault: true,
        isVirtual: defaultEnvironment.id === PRODUCTION_SENTINEL_ID,
      }
    : {
        id: PRODUCTION_SENTINEL_ID,
        name: 'production',
        isDefault: true,
        isVirtual: true,
      };

  return [
    productionEntry,
    ...nonDefaultEnvironments.map((env) => ({
      id: String(env.id),
      name: env.name,
      isDefault: false,
      isVirtual: false,
    })),
  ];
};

type MigrateModalState = { sourceId: string; targetId: string } | null;

export const EnvironmentsForm: FC = () => {
  const content = useIntlayer('environments-form');

  const { session } = useSession();
  const { project, environment: activeEnvironment } = session ?? {};
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const projectEnvironments: EnvironmentAPI[] = (project?.environments ??
    []) as any[];
  const environmentEntries = buildEnvironmentEntries(projectEnvironments);

  const { mutate: addEnvironment, isPending: isAdding } = useAddEnvironment();
  const { mutate: deleteEnvironment, isPending: isDeleting } =
    useDeleteEnvironment();
  const { mutate: selectEnvironment, isPending: isSelectingEnvironment } =
    useSelectEnvironment();
  const { mutate: resetToProduction, isPending: isResettingToProduction } =
    useResetToProductionEnvironment();
  const { mutate: migrateEnvironment, isPending: isMigrating } =
    useMigrateEnvironment();

  const isSelecting = isSelectingEnvironment || isResettingToProduction;

  const activeEntryId =
    activeEnvironment && !activeEnvironment.isDefault
      ? String(activeEnvironment.id)
      : PRODUCTION_SENTINEL_ID;

  const [newEnvironmentName, setNewEnvironmentName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [migrateModal, setMigrateModal] = useState<MigrateModalState>(null);
  const [migrateStrategy, setMigrateStrategy] = useState<
    'overwrite' | 'fill-missing'
  >('fill-missing');
  const [migrateContent, setMigrateContent] = useState(true);
  const [migrateConfiguration, setMigrateConfiguration] = useState(false);

  const handleSelectEntry = (entry: EnvironmentEntry) => {
    if (entry.id === activeEntryId || isSelecting) return;
    if (entry.isDefault || entry.id === PRODUCTION_SENTINEL_ID) {
      resetToProduction();
    } else {
      selectEnvironment(entry.id);
    }
  };

  const handleAddEnvironment = () => {
    const trimmed = newEnvironmentName.trim().replace(/\s+/g, '_');

    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'production') {
      setValidationError(content.cannotCreateAnEnvironmentNamed.value);
      return;
    }
    const nameAlreadyExists = projectEnvironments.some(
      (env) => env.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (nameAlreadyExists) {
      setValidationError(
        content.anEnvironmentNamedTrimmedAlready({ trimmed: trimmed })
      );
      return;
    }
    setValidationError(null);
    addEnvironment(
      { name: trimmed },
      {
        onSuccess: () => {
          setNewEnvironmentName('');
          setShowAddForm(false);
        },
      }
    );
  };

  const handleCloseMigrateModal = () => setMigrateModal(null);

  const handleMigrate = () => {
    if (!migrateModal) return;
    migrateEnvironment(
      {
        sourceEnvironmentId: migrateModal.sourceId,
        targetEnvironmentId: migrateModal.targetId,
        strategy: migrateStrategy,
        migrateContent,
        migrateConfiguration,
      },
      { onSuccess: handleCloseMigrateModal }
    );
  };

  const migrateSourceEntry = migrateModal
    ? environmentEntries.find((e) => e.id === migrateModal.sourceId)
    : null;
  const migrateTargetEntry = migrateModal
    ? environmentEntries.find((e) => e.id === migrateModal.targetId)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Layers className="size-5" />
        <h3 className="font-semibold text-base">{content.title}</h3>
      </div>

      <div className="flex flex-col gap-2">
        {environmentEntries.map((entry) => {
          const isActive = entry.id === activeEntryId;
          return (
            <Container
              key={entry.id}
              background="none"
              border
              borderColor="neutral"
              roundedSize="2xl"
              padding="sm"
              className="flex-row items-center justify-between"
            >
              <PopoverStatic identifier={`env-popover-${entry.id}`}>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => handleSelectEntry(entry)}
                  disabled={isSelecting}
                >
                  <Radio
                    name="active-environment"
                    color="text"
                    size="sm"
                    checked={isActive}
                    readOnly
                    aria-label={content.switchButton({ name: entry.name })}
                  />
                  <span className="font-medium text-sm">{entry.name}</span>
                  {entry.isDefault && (
                    <Tag roundedSize="full" size="sm">
                      {content.defaultBadge}
                    </Tag>
                  )}
                </button>
                <PopoverStatic.Detail identifier={`env-popover-${entry.id}`}>
                  <span className="text-nowrap p-2 text-xs">
                    {content.switchButton({ name: entry.name })}
                  </span>
                </PopoverStatic.Detail>
              </PopoverStatic>

              {!entry.isDefault && (
                <Button
                  variant="hoverable"
                  color="text"
                  className="hover:text-error"
                  size="icon-sm"
                  Icon={Trash2}
                  label={content.deleteName({ name: entry.name })}
                  onClick={() => deleteEnvironment(entry.id)}
                  isLoading={isDeleting}
                  disabled={!isProjectAdmin || isDeleting}
                />
              )}
            </Container>
          );
        })}
      </div>

      {showAddForm && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              value={newEnvironmentName}
              onChange={(e) => {
                setNewEnvironmentName(e.target.value.replace(/\s+/g, '_'));
                if (validationError) setValidationError(null);
              }}
              placeholder={content.newEnvPlaceholder.value}
              onKeyDown={(e) => e.key === 'Enter' && handleAddEnvironment()}
              autoFocus
            />
            <Button
              variant="outline"
              color="text"
              size="sm"
              onClick={handleAddEnvironment}
              isLoading={isAdding}
              label={content.createButton.value}
            >
              {content.createButton}
            </Button>
          </div>
          {validationError && (
            <span className="font-medium text-error text-xs">
              {validationError}
            </span>
          )}
          <Container
            className="my-2 bg-text/90 text-text-opposite"
            roundedSize="xl"
            border
            borderColor="neutral"
            padding="sm"
          >
            {content.matches}
          </Container>
        </div>
      )}

      <div className="flex w-full gap-2">
        {environmentEntries.length >= 2 && (
          <Button
            variant="outline"
            color="text"
            size="sm"
            Icon={ArrowRight}
            label={content.migrateModal.migrateContentButton.value}
            onClick={() =>
              setMigrateModal({
                sourceId: PRODUCTION_SENTINEL_ID,
                targetId:
                  environmentEntries.find((e) => !e.isDefault)?.id ?? '',
              })
            }
            className="grow"
            disabled={!isProjectAdmin}
          >
            {content.migrateModal.title}
          </Button>
        )}
        <Button
          variant="outline"
          color="text"
          size="sm"
          Icon={Plus}
          label={content.addButton.label.value}
          onClick={() =>
            setShowAddForm((prev) => {
              const next = !prev;
              if (next) {
                setNewEnvironmentName('');
                setValidationError(null);
              }
              return next;
            })
          }
          className="grow"
          disabled={!isProjectAdmin}
        >
          {content.addButton.label}
        </Button>
      </div>

      <Modal
        isOpen={!!migrateModal}
        onClose={handleCloseMigrateModal}
        title={content.migrateContentBetweenEnvironments.value}
        hasCloseButton
        size="md"
        padding="md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="font-medium text-neutral/70 text-xs">
                {content.from}
              </span>
              <Select
                value={migrateModal?.sourceId ?? ''}
                onValueChange={(value) =>
                  setMigrateModal((prev) =>
                    prev ? { ...prev, sourceId: value } : prev
                  )
                }
              >
                <Select.Trigger className="w-full">
                  <Select.Value
                    placeholder={
                      content.migrateModal.selectSourcePlaceholder.value
                    }
                  />
                </Select.Trigger>
                <Select.Content>
                  {environmentEntries
                    .filter((e) => e.id !== migrateModal?.targetId)
                    .map((entry) => (
                      <Select.Item key={entry.id} value={entry.id}>
                        {entry.name}
                        {entry.isDefault ? ' (default)' : ''}
                      </Select.Item>
                    ))}
                </Select.Content>
              </Select>
            </div>

            <ArrowRight className="mt-5 size-4 shrink-0 text-text/60" />

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="font-medium text-neutral/70 text-xs">
                {content.to}
              </span>
              <Select
                value={migrateModal?.targetId ?? ''}
                onValueChange={(value) =>
                  setMigrateModal((prev) =>
                    prev ? { ...prev, targetId: value } : prev
                  )
                }
              >
                <Select.Trigger className="w-full">
                  <Select.Value
                    placeholder={
                      content.migrateModal.selectTargetPlaceholder.value
                    }
                  />
                </Select.Trigger>
                <Select.Content>
                  {environmentEntries
                    .filter((e) => e.id !== migrateModal?.sourceId)
                    .map((entry) => (
                      <Select.Item key={entry.id} value={entry.id}>
                        {entry.name}
                        {entry.isDefault ? ' (default)' : ''}
                      </Select.Item>
                    ))}
                </Select.Content>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                type="checkbox"
                name="migrate-content"
                checked={migrateContent}
                onChange={(e) => setMigrateContent(e.target.checked)}
                className="accent-text"
              />
              {content.dictionaryContent}
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                type="checkbox"
                name="migrate-configuration"
                checked={migrateConfiguration}
                onChange={(e) => setMigrateConfiguration(e.target.checked)}
                className="accent-text"
              />
              {content.configuration}
            </label>
          </div>

          {migrateModal?.targetId && (
            <div className="flex flex-col gap-2 px-4 pt-4">
              <span className="font-medium text-sm">
                {content.migrateModal.strategyLabel}{' '}
                <strong>
                  {migrateTargetEntry?.name ?? migrateModal.targetId}
                </strong>
                :
              </span>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <Radio
                  name="migrate-strategy"
                  size="sm"
                  checked={migrateStrategy === 'fill-missing'}
                  onChange={() => setMigrateStrategy('fill-missing')}
                />
                {content.migrateModal.fillMissing}
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <Radio
                  name="migrate-strategy"
                  size="sm"
                  checked={migrateStrategy === 'overwrite'}
                  onChange={() => setMigrateStrategy('overwrite')}
                />
                {content.migrateModal.overwrite}
              </label>
            </div>
          )}

          {migrateModal?.sourceId && migrateModal.targetId && (
            <p className="text-neutral/70 text-xs">
              {content.copiesAllDictionariesFrom}{' '}
              <strong>{migrateSourceEntry?.name}</strong> into{' '}
              <strong>{migrateTargetEntry?.name}</strong>.
            </p>
          )}

          <div className="flex w-full items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              color="text"
              isFullWidth
              label={content.migrateModal.cancelButton.value}
              onClick={handleCloseMigrateModal}
            >
              {content.migrateModal.cancelButton}
            </Button>
            <Button
              color="text"
              isFullWidth
              label={content.runMigration.value}
              onClick={handleMigrate}
              isLoading={isMigrating}
              disabled={!migrateModal?.sourceId || !migrateModal?.targetId}
              Icon={ArrowRight}
            >
              {content.migrateModal.title}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
