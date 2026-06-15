'use client';

import { useAddDictionary, useGetProjects } from '@api/index';
import { useSession } from '@api/useAuth';
import {
  Form,
  FormButton,
  FormInput,
  FormMultiSelect,
  FormSelect,
  useForm,
} from '@components/Form';
import { MultiSelect, Select } from '@components/Select';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import {
  type DictionaryFormData,
  QUALIFIER_TYPES,
  type QualifierType,
  useDictionarySchema,
} from './useDictionaryFormSchema';

type DictionaryCreationFormProps = {
  onDictionaryCreated?: () => void;
};

/**
 * Inner component rendered inside Form's FormProvider context so useWatch works.
 */
const DictionaryCreationFormFields: FC<{
  isSubmitting: boolean;
  isPending: boolean;
  projectsData: ReturnType<typeof useGetProjects>['data'];
}> = ({ isSubmitting, isPending, projectsData }) => {
  const {
    keyInput,
    createDictionaryButton,
    projectInput,
    qualifierTypeSelect,
    itemInput,
    variantInput,
    metaIdInput,
  } = useIntlayer('dictionary-form');

  const qualifierType = (useWatch({ name: 'qualifierType' }) ??
    'none') as QualifierType;

  return (
    <>
      <FormInput
        name="key"
        label={keyInput.label.value}
        placeholder={keyInput.placeholder.value}
        isRequired
      />

      <FormMultiSelect name="projectIds" label={projectInput.label.value}>
        <MultiSelect.Trigger
          getBadgeValue={(value) =>
            projectsData?.data?.find((project) => String(project.id) === value)
              ?.name ?? value
          }
        >
          <MultiSelect.Input placeholder={projectInput.placeholder.value} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.List>
            {projectsData?.data?.map((project) => (
              <MultiSelect.Item
                key={String(project.id)}
                value={String(project.id)}
              >
                {project.name}
              </MultiSelect.Item>
            ))}
          </MultiSelect.List>
        </MultiSelect.Content>
      </FormMultiSelect>

      <FormSelect
        name="qualifierType"
        label={qualifierTypeSelect.label.value}
        description={qualifierTypeSelect.description.value}
      >
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {QUALIFIER_TYPES.map((type) => (
            <Select.Item key={type} value={type}>
              {
                (
                  qualifierTypeSelect as Record<
                    string,
                    { value: string } | string
                  >
                )[type]
              }
            </Select.Item>
          ))}
        </Select.Content>
      </FormSelect>

      <AnimatePresence mode="wait">
        {qualifierType === 'item' && (
          <motion.div
            key="item-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <FormInput
              name="item"
              type="number"
              label={itemInput.label.value}
              placeholder={itemInput.placeholder.value}
              description={itemInput.description.value}
              min={1}
            />
          </motion.div>
        )}

        {qualifierType === 'variant' && (
          <motion.div
            key="variant-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <FormInput
              name="variant"
              label={variantInput.label.value}
              placeholder={variantInput.placeholder.value}
              description={variantInput.description.value}
            />
          </motion.div>
        )}

        {qualifierType === 'meta' && (
          <motion.div
            key="meta-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <FormInput
              name="metaId"
              label={metaIdInput.label.value}
              placeholder={metaIdInput.placeholder.value}
              description={metaIdInput.description.value}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FormButton
        className="mt-12 ml-auto"
        type="submit"
        color="text"
        isLoading={isSubmitting || isPending}
        label={createDictionaryButton.ariaLabel.value}
        isFullWidth
      >
        {createDictionaryButton.text}
      </FormButton>
    </>
  );
};

export const DictionaryCreationForm: FC<DictionaryCreationFormProps> = ({
  onDictionaryCreated,
}) => {
  const { session } = useSession();
  const { project } = session ?? {};
  const { mutate: addDictionary, isPending } = useAddDictionary();
  const { data: projectsData } = useGetProjects();
  const DictionarySchema = useDictionarySchema(String(project?.id));
  const { form, isSubmitting } = useForm(DictionarySchema, {
    defaultValues: {
      projectIds: [project?.id],
      qualifierType: 'none',
    },
  });

  const onSubmitSuccess = (data: DictionaryFormData) => {
    const qualifiers: Record<string, unknown> = {};
    if (data.qualifierType === 'item' && data.item !== undefined) {
      qualifiers.item = data.item;
    } else if (data.qualifierType === 'variant' && data.variant) {
      qualifiers.variant = data.variant;
    } else if (data.qualifierType === 'meta' && data.metaId) {
      qualifiers.meta = { id: data.metaId };
    }

    addDictionary(
      {
        dictionary: {
          key: data.key,
          projectIds: data.projectIds,
          ...qualifiers,
        },
      },
      {
        onSuccess: () => {
          onDictionaryCreated?.();
        },
      }
    );
  };

  return (
    <Form
      schema={DictionarySchema}
      onSubmitSuccess={onSubmitSuccess}
      className="m-auto w-full max-w-100"
      {...form}
    >
      <DictionaryCreationFormFields
        isSubmitting={isSubmitting}
        isPending={isPending}
        projectsData={projectsData}
      />
    </Form>
  );
};
