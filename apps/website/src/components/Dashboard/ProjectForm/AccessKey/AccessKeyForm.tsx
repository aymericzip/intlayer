'use client';

import type { OAuth2Access } from '@intlayer/backend';
import {
  useForm,
  Form,
  useAuth,
  Modal,
  CopyToClipboard,
  H3,
} from '@intlayer/design-system';
import {
  useDeleteAccessKey,
  useRefreshAccessKey,
} from '@intlayer/design-system/hooks';
import { KeyRound, RefreshCcw, Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { AccessKeyCreationForm } from './AccessKeyCreationForm';
import { getAccessKeySchema } from './AccessKeyFormSchema';

const AccessKeyItem: FC<{ value: OAuth2Access }> = ({ value: accessKey }) => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { deleteAccessKey, isLoading: isDeleting } = useDeleteAccessKey();
  const { refreshAccessKey, isLoading: isRefreshing } = useRefreshAccessKey();
  const { rights, modal, labels } = useIntlayer('access-key-form');

  const isLoading = isDeleting || isRefreshing;

  const handleDelete = () => {
    deleteAccessKey(accessKey.clientId).then(() =>
      setIsDeletionModalOpen(false)
    );
  };

  const handleUpdate = () => {
    refreshAccessKey(accessKey.clientId).then(() =>
      setIsUpdateModalOpen(false)
    );
  };

  return (
    <>
      <Modal
        isOpen={isDeletionModalOpen}
        onClose={() => setIsDeletionModalOpen(false)}
        size="lg"
        title={modal.deleteTitle.value}
        hasCloseButton
        className="p-3"
      >
        <p className="text-neutral dark:text-neutral text-sm">
          {modal.deleteMessage}
        </p>
        <Form.Button
          variant="outline"
          label={modal.deleteButtonLabel.value}
          color="error"
          isFullWidth={true}
          className="mt-10 w-auto"
          isLoading={isDeleting}
          disabled={isLoading}
          onClick={handleDelete}
        >
          {modal.deleteConfirmText}
        </Form.Button>
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        size="lg"
        title="Are you sure you want to update this access key?"
        className="p-3"
        hasCloseButton
      >
        <p className="text-neutral dark:text-neutral text-sm">
          {modal.updateMessage}
        </p>
        <Form.Button
          variant="outline"
          label={modal.updateButtonLabel.value}
          color="text"
          isFullWidth={true}
          className="mt-10 w-auto"
          isLoading={isRefreshing}
          disabled={isLoading}
          onClick={handleUpdate}
        >
          {modal.updateConfirmText}
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
            <span className="text-sm font-bold">{labels.clientId}</span>
            <CopyToClipboard
              text={accessKey.clientId}
              className="break-all text-xs"
            >
              {accessKey.clientId}
            </CopyToClipboard>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-wrap text-sm font-bold">
              {labels.clientSecret}
            </span>
            {accessKey.clientSecret.endsWith('*') ? (
              <span className="text-wrap break-all text-sm">
                {accessKey.clientSecret}
              </span>
            ) : (
              <CopyToClipboard
                text={accessKey.clientSecret}
                className="break-all text-xs"
              >
                {accessKey.clientSecret}
              </CopyToClipboard>
            )}
          </div>
          <div>
            <label className="text-wrap text-sm font-bold">
              {rights.title}
            </label>

            <span className="text-neutral dark:text-neutral-dark block text-wrap break-all text-xs">
              <span className="font-bold">{rights.organization}</span>
              {accessKey?.rights?.organization.read ? rights.read : '- '}
              {accessKey?.rights?.organization.write ? rights.write : '- '}
              {accessKey?.rights?.organization.admin ? rights.admin : '-'}
            </span>
            <span className="text-neutral dark:text-neutral-dark block text-wrap break-all text-xs">
              <span className="font-bold">{rights.project}</span>
              {accessKey?.rights?.project.read ? rights.read : '- '}
              {accessKey?.rights?.project.write ? rights.write : '- '}
              {accessKey?.rights?.project.admin ? rights.admin : '-'}
            </span>
            <span className="text-neutral dark:text-neutral-dark block text-wrap break-all text-xs">
              <span className="font-bold">{rights.dictionary}</span>
              {accessKey?.rights?.dictionary.read ? rights.read : '- '}
              {accessKey?.rights?.dictionary.write ? rights.write : '- '}
              {accessKey?.rights?.dictionary.admin ? rights.admin : '-'}
            </span>
          </div>
          <div className="flex gap-3">
            <div className="text-neutral dark:text-neutral-dark flex flex-1 flex-col gap-1">
              <label className="text-wrap text-sm font-bold">
                {labels.addedOn}
              </label>
              <span className="break-all text-xs">
                {new Date(accessKey.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-neutral dark:text-neutral-dark flex flex-1 flex-col gap-1">
              <label className="text-wrap text-sm font-bold">
                {labels.expireOn}
              </label>
              <span className="break-all text-xs">
                {accessKey.expiresAt
                  ? new Date(accessKey.expiresAt).toLocaleDateString()
                  : '-'}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 max-sm:flex-col">
            <Form.Button
              variant="outline"
              label={labels.refreshButtonLabel.value}
              color="text"
              isFullWidth={false}
              className="w-auto"
              onClick={() => setIsUpdateModalOpen(true)}
              Icon={RefreshCcw}
              isLoading={isRefreshing}
              disabled={isLoading}
            >
              {labels.refreshButtonText}
            </Form.Button>
            <Form.Button
              variant="outline"
              label={labels.deleteButtonLabel.value}
              color="error"
              isFullWidth={false}
              className="w-auto"
              onClick={() => setIsDeletionModalOpen(true)}
              Icon={Trash}
              isLoading={isDeleting}
              disabled={isLoading}
            >
              {labels.deleteButtonText}
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

  const nbAccessKeys = project?.oAuth2Access.length ?? 0;

  return (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        hasCloseButton
      >
        <div className="p-3">
          <AccessKeyCreationForm
            onAccessKeyCreated={(response) => {
              if (!response.data) {
                return;
              }
              setIsCreationModalOpen(false);
            }}
          />
        </div>
      </Modal>

      <Form
        className="w-full"
        schema={AccessKeyFormSchema}
        onSubmitSuccess={() => Promise.resolve()}
        onSubmitError={() => Promise.resolve()}
        {...form}
      >
        <H3 className="mb-8"> {title}</H3>
        <span className="text-neutral dark:text-neutral-dark text-sm">
          {description}
        </span>
        <Form.Label>{title}</Form.Label>
        {project?.oAuth2Access.map((accessKey) => (
          <AccessKeyItem key={String(accessKey._id)} value={accessKey} />
        ))}
        {nbAccessKeys === 0 && (
          <span className="mt-6 text-center text-sm">{noAccessKeys}</span>
        )}
        <blockquote className="border-card dark:border-card-dark text-neutral dark:text-neutral-dark mb-6 flex flex-col gap-3 border-l-4 pl-5">
          <ul className="">
            {tuto.map((el) => (
              <li key={el.value}>
                <span className="text-neutral dark:text-neutral-dark text-center text-sm">
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
