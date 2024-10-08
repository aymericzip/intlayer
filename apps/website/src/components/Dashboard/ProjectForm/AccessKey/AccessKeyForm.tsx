'use client';

import { OAuth2Access } from '@intlayer/backend';
import {
  useForm,
  Form,
  // useToast,
  useAuth,
  Modal,
} from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { AccessKeyCreationForm } from './AccessKeyCreationForm';
import { getAccessKeySchema } from './AccessKeyFormSchema';

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
          <div key={String(accessKey._id)} className="flex flex-col gap-2">
            <span className="text-center text-sm">{accessKey.name}</span>
            <span className="text-center text-sm">{accessKey.clientId}</span>
            <span className="text-center text-sm">
              {accessKey.clientSecret}
            </span>
          </div>
        ))}
        {createdAccessKey.map((accessKey) => (
          <div key={String(accessKey._id)} className="flex flex-col gap-2">
            <span className="text-center text-sm">{accessKey.name}</span>
            <span className="text-center text-sm">{accessKey.clientId}</span>
            <span className="text-center text-sm">
              {accessKey.clientSecret}
            </span>
          </div>
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
