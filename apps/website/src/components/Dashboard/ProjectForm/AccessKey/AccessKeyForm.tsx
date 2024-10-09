'use client';

import { OAuth2Access } from '@intlayer/backend';
import {
  useForm,
  Form,
  useToast,
  useAuth,
  Modal,
  CopyToClipboard,
} from '@intlayer/design-system';
import { KeyRound, RefreshCcw, Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { AccessKeyCreationForm } from './AccessKeyCreationForm';
import { getAccessKeySchema } from './AccessKeyFormSchema';
import {
  useDeleteAccessKey,
  useRefreshAccessKey,
} from '@intlayer/design-system/hooks';

const AccessKeyItem: FC<{ value: OAuth2Access }> = ({ value: accessKey }) => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { deleteAccessKey, isLoading: isDeleting } = useDeleteAccessKey();
  const { refreshAccessKey, isLoading: isRefreshing } = useRefreshAccessKey();
  const { toast } = useToast();

  const isLoading = isDeleting || isRefreshing;

  const handleDelete = () =>
    deleteAccessKey(accessKey.clientId)
      .then(() => {
        toast({
          title: 'Access key deleted',
          description: 'The access key has been successfully deleted',
        });
        setIsDeletionModalOpen(false);
      })
      .catch((error) => {
        console.error(error);

        toast({
          title: 'An error occurred',
          description: 'An error occurred while deleting the access key',
          variant: 'error',
        });
      });

  const handleUpdate = () =>
    refreshAccessKey(accessKey.clientId)
      .then(() => {
        toast({
          title: 'Access key updated',
          description: 'The access key has been successfully updated',
        });
        setIsUpdateModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'An error occurred',
          description: 'An error occurred while updating the access key',
          variant: 'error',
        });
      });

  return (
    <>
      <Modal
        isOpen={isDeletionModalOpen}
        onClose={() => setIsDeletionModalOpen(false)}
        size="lg"
        title="Are you sure you want to delete this access key?"
        hasCloseButton
      >
        <p className="text-neutral dark:text-neutral text-sm">
          This action CANNOT be undone. This will permanently delete the SSH key
          and if you’d like to use it in the future, you will need to upload it
          again.
        </p>
        <Form.Button
          variant="outline"
          label="Delete the access key"
          color="error"
          isFullWidth={true}
          className="mt-10 w-auto"
          isLoading={isDeleting}
          isDisabled={isLoading}
          onClick={handleDelete}
        >
          I understand, delete the access key
        </Form.Button>
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        size="lg"
        title="Are you sure you want to update this access key?"
        hasCloseButton
      >
        <p className="text-neutral dark:text-neutral text-sm">
          This action CANNOT be undone. This will permanently delete the SSH key
          and if you’d like to use it in the future, you will need to upload it
          again.
        </p>
        <Form.Button
          variant="outline"
          label="Delete the access key"
          color="text"
          isFullWidth={true}
          className="mt-10 w-auto"
          isLoading={isRefreshing}
          isDisabled={isLoading}
          onClick={handleUpdate}
        >
          I understand, update the access key
        </Form.Button>
      </Modal>
      <div
        key={String(accessKey._id)}
        className="border-text dark:border-text-dark flex rounded-lg border-2 p-3"
      >
        <div className="flex items-center justify-center p-5">
          <KeyRound className="size-5" size={16} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base font-bold">{accessKey.name}</span>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">clientId:</span>
            <CopyToClipboard
              text={accessKey.clientId}
              className="break-all text-xs"
            >
              {accessKey.clientId}
            </CopyToClipboard>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-wrap text-sm font-bold">clientSecret:</span>
            <CopyToClipboard
              text={accessKey.clientSecret}
              className="break-all text-xs"
            >
              {accessKey.clientSecret}
            </CopyToClipboard>
          </div>
          <div className="flex-te flex gap-3">
            <div className="text-neutral dark:text-neutral-dark flex flex-1 flex-col gap-1">
              <span className="text-wrap text-sm font-bold">Added on:</span>
              <span className="break-all text-xs">
                {new Date(accessKey.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-neutral dark:text-neutral-dark flex flex-1 flex-col gap-1">
              <span className="text-wrap text-sm font-bold">Expire on:</span>
              <span className="break-all text-xs">
                {accessKey.expiresAt
                  ? new Date(accessKey.expiresAt).toLocaleDateString()
                  : '-'}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Form.Button
              variant="outline"
              label="Refresh the access key secret key"
              color="text"
              isFullWidth={false}
              className="w-auto"
              onClick={() => setIsUpdateModalOpen(true)}
              Icon={RefreshCcw}
              isLoading={isRefreshing}
              isDisabled={isLoading}
            >
              Refresh
            </Form.Button>
            <Form.Button
              variant="outline"
              label="Delete the access key"
              color="error"
              isFullWidth={false}
              className="w-auto"
              onClick={() => setIsDeletionModalOpen(true)}
              Icon={Trash}
              isLoading={isDeleting}
              isDisabled={isLoading}
            >
              Delete
            </Form.Button>
          </div>
        </div>
      </div>
    </>
  );
};

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

  const nbAccessKeys =
    project?.oAuth2Access.length ?? 0 + createdAccessKey.length;

  return (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        hasCloseButton
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
