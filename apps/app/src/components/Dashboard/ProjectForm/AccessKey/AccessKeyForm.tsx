'use client';

import type { OAuth2AccessAPI } from '@intlayer/backend';
import {
  Container,
  CopyToClipboard,
  Form,
  H3,
  HideShow,
  Modal,
  useForm,
} from '@intlayer/design-system';
import {
  useDeleteAccessKey,
  useRefreshAccessKey,
  useSession,
} from '@intlayer/design-system/hooks';
import { KeyRound, RefreshCcw, Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { AccessKeyCreationForm } from './AccessKeyCreationForm';
import { getAccessKeySchema } from './AccessKeyFormSchema';

const AccessKeyItem: FC<{ value: OAuth2AccessAPI }> = ({
  value: accessKey,
}) => {
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { mutate: deleteAccessKey, isPending: isDeleting } =
    useDeleteAccessKey();
  const { mutate: refreshAccessKey, isPending: isRefreshing } =
    useRefreshAccessKey();
  const { rights, modal, labels } = useIntlayer('access-key-form');

  const isLoading = isDeleting || isRefreshing;

  const handleDelete = () =>
    deleteAccessKey(accessKey.clientId, {
      onSuccess: () => {
        setIsDeletionModalOpen(false);
      },
    });

  const handleUpdate = () =>
    refreshAccessKey(accessKey.clientId, {
      onSuccess: () => {
        setIsUpdateModalOpen(false);
      },
    });

  return (
    <>
      <Modal
        isOpen={isDeletionModalOpen}
        onClose={() => setIsDeletionModalOpen(false)}
        size="lg"
        title={modal.deleteTitle.value}
        hasCloseButton
        isScrollable="y"
      >
        <p className="text-neutral text-sm">{modal.deleteMessage}</p>
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
        title={modal.updateTitle.value}
        className="p-3"
        hasCloseButton
        isScrollable="y"
      >
        <p className="text-neutral text-sm">{modal.updateMessage}</p>
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
      <Container
        key={String(accessKey.id)}
        roundedSize="2xl"
        border={true}
        borderColor="text"
        className="flex flex-col gap-3 px-6 py-4"
      >
        <div className="flex items-center justify-center px-3 pb-3">
          <KeyRound className="size-5" size={16} />
          <span className="m-auto w-full text-center font-bold text-lg">
            {accessKey.name}
          </span>
        </div>
        <div className="flex pt-3">
          <div className="flex items-center justify-center p-5"></div>
          <div className="flex flex-col gap-4 pb-3">
            <div className="flex flex-col gap-1">
              <CopyToClipboard
                text={accessKey.clientId}
                className="text-wrap font-bold text-sm"
              >
                {labels.clientId}
              </CopyToClipboard>
              <HideShow
                text={accessKey.clientId}
                visiblePrefixChars={6}
                className="ml-1 p-1 text-neutral text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <CopyToClipboard
                text={accessKey.clientSecret}
                className="p-1 font-bold text-sm"
                disable={accessKey.clientSecret.endsWith('*')}
              >
                {labels.clientSecret}
              </CopyToClipboard>
              {accessKey.clientSecret.endsWith('*') ? (
                <span className="ml-1 break-all p-1 text-neutral text-sm">
                  {accessKey.clientSecret}
                </span>
              ) : (
                <HideShow
                  text={accessKey.clientSecret}
                  visiblePrefixChars={6}
                  className="ml-1 p-1 text-neutral text-sm"
                />
              )}
            </div>
            <div>
              <span className="text-wrap font-bold text-sm">
                {rights.title}
              </span>

              <span className="block text-wrap break-all text-neutral text-xs">
                <span className="ml-1 font-bold">{rights.organization}</span>
                {accessKey?.grants?.includes('organization:read')
                  ? rights.read
                  : '- '}
                {accessKey?.grants?.includes('organization:write')
                  ? rights.write
                  : '- '}
                {accessKey?.grants?.includes('organization:admin')
                  ? rights.admin
                  : '-'}
              </span>
              <span className="block text-wrap break-all text-neutral text-xs">
                <span className="ml-1 font-bold">{rights.project}</span>
                {accessKey?.grants?.includes('project:read')
                  ? rights.read
                  : '- '}
                {accessKey?.grants?.includes('project:write')
                  ? rights.write
                  : '- '}
                {accessKey?.grants?.includes('project:admin')
                  ? rights.admin
                  : '-'}
              </span>
              <span className="block text-wrap break-all text-neutral text-xs">
                <span className="ml-1 font-bold">{rights.dictionary}</span>
                {accessKey?.grants?.includes('dictionary:read')
                  ? rights.read
                  : '- '}
                {accessKey?.grants?.includes('dictionary:write')
                  ? rights.write
                  : '- '}
                {accessKey?.grants?.includes('dictionary:admin')
                  ? rights.admin
                  : '-'}
              </span>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-wrap font-bold text-sm">
                  {labels.addedOn}
                </span>
                <span className="ml-1 break-all text-neutral text-xs">
                  {new Date(accessKey.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-wrap font-bold text-sm">
                  {labels.expireOn}
                </span>
                <span className="ml-1 break-all text-neutral text-xs">
                  {accessKey.expiresAt
                    ? new Date(accessKey.expiresAt).toLocaleDateString()
                    : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-3 max-sm:flex-col">
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
      </Container>
    </>
  );
};

export const AccessKeyForm: FC = () => {
  const { session } = useSession();
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
        isScrollable="y"
        padding="md"
      >
        <AccessKeyCreationForm
          onAccessKeyCreated={(response) => {
            if (!response.data) {
              return;
            }
            setIsCreationModalOpen(false);
          }}
        />
      </Modal>

      <Form
        className="w-full flex-1 overflow-auto"
        schema={AccessKeyFormSchema}
        onSubmitSuccess={() => Promise.resolve()}
        onSubmitError={() => Promise.resolve()}
        {...form}
      >
        <H3>{title}</H3>
        <span className="text-neutral text-sm">{description}</span>
        {project?.oAuth2Access.map((accessKey) => (
          <AccessKeyItem key={String(accessKey.id)} value={accessKey} />
        ))}
        {nbAccessKeys === 0 ? (
          <span className="mb-6 text-center text-neutral text-sm">
            {noAccessKeys}
          </span>
        ) : (
          <>
            <blockquote className="mb-6 flex flex-col gap-3 border-card border-l-4 pl-5 text-neutral">
              <ul className="">
                {tuto.map((el: (typeof tuto)[number]) => (
                  <li key={el.value}>
                    <span className="text-center text-neutral text-sm">
                      {el}
                    </span>
                  </li>
                ))}
              </ul>
            </blockquote>
            <span className="text-error text-sm">{warningMessage}</span>
          </>
        )}

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
