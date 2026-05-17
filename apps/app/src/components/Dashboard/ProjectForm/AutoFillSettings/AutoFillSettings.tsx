import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3, H4 } from '@intlayer/design-system/headers';
import { useSession, useUpdateProject } from '@intlayer/design-system/hooks';
import { Save } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { z } from 'zod';

const autoFillSchema = z.object({
  autoFill: z.boolean(),
});

type AutoFillFormData = z.infer<typeof autoFillSchema>;

export const AutoFillSettings: FC = () => {
  const { session } = useSession();
  const { project } = session ?? {};
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { title, autoFillOnPushToggle, saveButton } =
    useIntlayer('auto-fill-settings');

  const defaultValues: AutoFillFormData = {
    autoFill: project?.autoFill ?? false,
  };

  const { form } = useForm(autoFillSchema, { defaultValues });

  useEffect(() => {
    form.reset({ autoFill: project?.autoFill ?? false });
  }, [project?.autoFill]);

  const handleSave = (data: AutoFillFormData) => {
    updateProject({ autoFill: data.autoFill });
  };

  return (
    <Form
      schema={autoFillSchema}
      onSubmitSuccess={handleSave}
      className="flex w-full flex-col gap-8"
      {...form}
    >
      <H3>{title}</H3>

      <Container
        roundedSize="2xl"
        border
        borderColor="text"
        className="flex flex-col gap-4 px-6 py-4"
      >
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <H4>{autoFillOnPushToggle.label}</H4>
            <p className="max-w-md text-neutral text-sm">
              {autoFillOnPushToggle.description}
            </p>
          </div>
          <div className="flex-0">
            <Form.SwitchSelector
              name="autoFill"
              disabled={!isProjectAdmin}
              color="text"
              size="sm"
            />
          </div>
        </div>
      </Container>

      {isProjectAdmin && (
        <div className="flex justify-end border-neutral/30 border-t border-dotted pt-3">
          <Form.Button
            type="submit"
            label={saveButton.ariaLabel.value}
            color="text"
            isLoading={isUpdating}
            disabled={!isProjectAdmin}
            isFullWidth={false}
            Icon={Save}
          >
            {saveButton.text}
          </Form.Button>
        </div>
      )}
    </Form>
  );
};
