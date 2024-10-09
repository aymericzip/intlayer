'use client';

import { OAuth2Access } from '@intlayer/backend';
import {
  useForm,
  Form,
  // useToast,
  useAuth,
  Modal,
} from '@intlayer/design-system';
import { KeyRound } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { AccessKeyCreationForm } from './AccessKeyCreationForm';
import { getAccessKeySchema } from './AccessKeyFormSchema';

const AccessKeyItem: FC<{ value: OAuth2Access }> = ({ value: accessKey }) => (
  <div
    key={String(accessKey._id)}
    className="border-text dark:border-text-dark flex gap-5 rounded-md border-2 p-3"
  >
    <div className="flex items-center justify-center">
      <KeyRound className="size-5" size={16} />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold">{accessKey.name}</span>
      <span className="text-sm">
        clientId:
        <span className="break-all">{accessKey.clientId}</span>
      </span>
      <span className="text-wrap text-sm">
        clientSecret:
        <span className="break-all">{accessKey.clientSecret}</span>
      </span>
    </div>
  </div>
);

export const AccessKeyForm: FC = () => {
  const { session } = useAuth();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [createdAccessKey, setCreatedAccessKey] = useState<OAuth2Access[]>([]);
  const AccessKeyFormSchema = getAccessKeySchema();
  const { form, isSubmitting } = useForm(AccessKeyFormSchema);
  const {
    title,
    description,
    noAccessKeys,
    createAccessKey,
    tuto,
    warningMessage,
  } = useIntlayer('access-key-form');
  // const { toast } = useToast();

  const nbAccessKeys =
    project?.oAuth2Access.length ?? 0 + createdAccessKey.length;

  return (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <AccessKeyCreationForm
          onAccessKeyCreated={(response) => {
            if (!response.data) {
              return;
            }
            setIsCreationModalOpen(false);
            setCreatedAccessKey((prev) => [
              ...prev,
              response.data as OAuth2Access,
            ]);
          }}
        />
      </Modal>
      <Form
        className="w-full"
        schema={AccessKeyFormSchema}
        onSubmitSuccess={() => Promise.resolve()}
        onSubmitError={() => Promise.resolve()}
        {...form}
      >
        <Form.Label>{title}</Form.Label>
        <span className="text-neutral dark:text-neutral-dark text-sm">
          {description}
        </span>
        {project?.oAuth2Access.map((accessKey) => (
          <AccessKeyItem key={String(accessKey._id)} value={accessKey} />
        ))}
        {createdAccessKey.map((accessKey) => (
          <AccessKeyItem key={String(accessKey._id)} value={accessKey} />
        ))}

        {nbAccessKeys === 0 && (
          <span className="mt-6 text-center text-sm">{noAccessKeys}</span>
        )}
        <blockquote className="border-card dark:border-card-dark  text-neutral dark:text-neutral-dark mb-6 flex flex-col gap-3 border-l-4 pl-5">
          <ul className="">
            {tuto.map((el) => (
              <li key={el.value}>
                <span className="text-neutral dark:text-neutral-dark  text-center text-sm">
                  {el}
                </span>
              </li>
            ))}
          </ul>
        </blockquote>
        <span className="text-error dark:text-error-dark text-sm">
          {warningMessage}
        </span>
        <Form.Button
          className="w-full"
          type="submit"
          color="text"
          isLoading={isSubmitting}
          label={createAccessKey.label.value}
          onClick={() => setIsCreationModalOpen(true)}
        >
          {createAccessKey.text}
        </Form.Button>
      </Form>
    </>
  );
};
