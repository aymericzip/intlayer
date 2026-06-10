import type { ProjectConfiguration } from '@intlayer/backend';
import {
  usePushProjectConfiguration,
  useSession,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyButton } from '@intlayer/design-system/copy-button';
import { H3, H4, H5 } from '@intlayer/design-system/headers';
import { CodeBlock } from '@intlayer/design-system/ide';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { Website_Doc_IntlayerCMS } from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { useToast } from '@intlayer/design-system/toaster';
import { useMutation } from '@tanstack/react-query';
import { createDefu } from 'defu';
import { getLocaleName, type Locale } from 'intlayer';
import { GitBranch, Pencil, SlidersHorizontal, Upload } from 'lucide-react';
import { type FC, useRef, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { parseConfigContent } from '../RepositoryLink/parseConfigContent';
import { ConfigEditionForm } from './ConfigEditionForm';
import { ConfigFilePreviewModal } from './ConfigFilePreviewModal';
import { ConfigImportFlow } from './ConfigImportFlow';

const defu = createDefu((obj, key, value) => {
  if (Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});

type ConfigDetailsProps = {
  projectConfig?: ProjectConfiguration;
};

export const ConfigDetails: FC<ConfigDetailsProps> = ({ projectConfig }) => {
  const { locale } = useLocale();
  const { session } = useSession();
  const { project } = session ?? {};
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportFlowOpen, setIsImportFlowOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<{
    content: string;
    parsedConfig: ProjectConfiguration;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { mutateAsync: parseConfig, isPending: isParsingConfig } = useMutation({
    mutationFn: (content: string) => parseConfigContent({ data: { content } }),
  });
  const { mutate: pushProjectConfiguration, isPending: isPushingConfig } =
    usePushProjectConfiguration();
  const {
    noConfig,
    updateConfig,
    pushConfigDocLink,
    title,
    i18nSection,
    editorSection,
    aiSection,
  } = useIntlayer('project-config-detail');
  const { editButton, uploadFileButton, loadFromRepoButton } = useIntlayer(
    'config-edition-form'
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const content = await file.text();
      const parsedConfig = await parseConfig(content);
      setFilePreview({
        content,
        parsedConfig: parsedConfig as ProjectConfiguration,
      });
    } catch (error) {
      toast({
        title: 'Failed to parse configuration file',
        description: (error as Error).message,
        variant: 'error',
      });
    } finally {
      e.target.value = '';
    }
  };

  const handleConfirmUpload = () => {
    if (!filePreview) return;
    const merged = defu(filePreview.parsedConfig, project?.configuration ?? {});
    pushProjectConfiguration(merged as ProjectConfiguration, {
      onSuccess: () => {
        setFilePreview(null);
        toast({ title: 'Configuration updated', variant: 'success' });
      },
      onError: (error: any) => {
        toast({
          title: 'Failed to push configuration',
          description: (error as Error).message,
          variant: 'error',
        });
      },
    });
  };

  if (!projectConfig) {
    return (
      <div className="flex flex-col gap-4">
        <div className="mb-8 flex items-center gap-2">
          <SlidersHorizontal className="size-5" />
          <H3 className="mb-0">{title}</H3>
        </div>

        <Container
          background="none"
          border
          roundedSize="2xl"
          className="flex flex-col gap-2 p-4 text-sm"
        >
          <strong className="block text-neutral">{noConfig.message}</strong>

          <div className="my-2 flex items-center gap-2 rounded-xl bg-text/90 px-2 py-1">
            <CodeBlock lang="bash">{`npx intlayer login\nnpx intlayer config push`}</CodeBlock>
            <CopyButton
              className="text-text-opposite"
              content="npx intlayer config push"
            />
          </div>
          <Link
            label={pushConfigDocLink.label.value}
            to={`${Website_Doc_IntlayerCMS}#using-the-cms`}
            color="text"
          >
            {pushConfigDocLink.text}
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="mb-2 flex items-center gap-2">
          <SlidersHorizontal className="size-5" />
          <H3 className="mb-0">{title}</H3>
        </div>
        {isProjectAdmin && projectConfig && (
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              accept=".ts,.js,.mjs,.cjs,.json"
              className="hidden"
              onChange={handleFileChange}
            />
            <PopoverStatic identifier="config-upload">
              <Button
                variant="hoverable"
                size="icon-md"
                color="text"
                Icon={Upload}
                label={uploadFileButton.ariaLabel.value}
                isLoading={isParsingConfig}
                onClick={() => fileInputRef.current?.click()}
              />
              <PopoverStatic.Detail identifier="config-upload" xAlign="end">
                <Container padding="sm" roundedSize="xl">
                  <span className="text-nowrap">
                    {uploadFileButton.popover}
                  </span>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>

            <PopoverStatic identifier="config-import-repo">
              <Button
                variant="hoverable"
                size="icon-md"
                color="text"
                Icon={GitBranch}
                label={loadFromRepoButton.ariaLabel.value}
                onClick={() => setIsImportFlowOpen(true)}
              />
              <PopoverStatic.Detail
                identifier="config-import-repo"
                xAlign="end"
              >
                <Container padding="sm" roundedSize="xl">
                  <span className="text-nowrap">
                    {loadFromRepoButton.popover}
                  </span>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>

            <PopoverStatic identifier="config-edit">
              <Button
                variant="hoverable"
                size="icon-md"
                color="text"
                Icon={Pencil}
                label={editButton.ariaLabel.value}
                onClick={() => setIsEditModalOpen(true)}
              />
              <PopoverStatic.Detail identifier="config-edit" xAlign="end">
                <Container padding="sm" roundedSize="xl">
                  <span className="text-nowrap">{editButton.popover}</span>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>
          </div>
        )}
      </div>

      {isProjectAdmin && projectConfig && (
        <>
          <ConfigEditionForm
            projectConfig={projectConfig}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
          <ConfigImportFlow
            isOpen={isImportFlowOpen}
            onClose={() => setIsImportFlowOpen(false)}
          />
          <ConfigFilePreviewModal
            isOpen={!!filePreview}
            onClose={() => setFilePreview(null)}
            fileContent={filePreview?.content ?? ''}
            onConfirm={handleConfirmUpload}
            isLoading={isPushingConfig}
          />
        </>
      )}

      <div className="flex flex-col gap-6">
        <div>
          <div className="flex flex-col gap-1">
            <H4>{i18nSection.title}</H4>
            <p className="text-neutral text-xs">{i18nSection.description}</p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-2">
              <H5>{i18nSection.localeListTitle}</H5>
              <div className="flex flex-row flex-wrap gap-2">
                {projectConfig.internationalization?.locales?.map(
                  (localeEl) => (
                    <Tag key={localeEl} size="sm">
                      {getLocaleName(localeEl as Locale, locale)}
                    </Tag>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <H5>{i18nSection.defaultLocaleTitle}</H5>
              {projectConfig.internationalization?.defaultLocale && (
                <div className="flex">
                  <Tag size="sm">
                    {getLocaleName(
                      projectConfig.internationalization.defaultLocale,
                      locale
                    )}
                  </Tag>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-neutral/20 border-dotted" />

        <div>
          <div className="flex flex-col gap-1">
            <H4>{editorSection.title}</H4>
            <p className="text-neutral text-xs">{editorSection.description}</p>
          </div>
          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <div className="flex flex-col gap-2">
              <H5>{editorSection.applicationURL.title}</H5>
              <div className="flex">
                <Tag size="sm">
                  {projectConfig.editor?.applicationURL ? (
                    <Link
                      to={projectConfig.editor?.applicationURL}
                      label={editorSection.applicationURL.label.value}
                      color="text"
                    >
                      {projectConfig.editor?.applicationURL}
                    </Link>
                  ) : (
                    '-'
                  )}
                </Tag>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <H5>{editorSection.cmsURL.title}</H5>
              <div className="flex">
                <Tag size="sm">
                  {projectConfig.editor?.cmsURL ? (
                    <Link
                      to={projectConfig.editor?.cmsURL}
                      label={editorSection.cmsURL.label.value}
                      color="text"
                    >
                      {projectConfig.editor?.cmsURL}
                    </Link>
                  ) : (
                    '-'
                  )}
                </Tag>
              </div>
            </div>
          </div>
        </div>

        {projectConfig.ai && (
          <>
            <hr className="border-neutral/20 border-dotted" />

            <div>
              <div className="flex flex-col gap-1">
                <H4>{aiSection.title}</H4>
                <p className="text-neutral text-xs">{aiSection.description}</p>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <H5>{aiSection.provider.title}</H5>
                    <div className="flex">
                      <Tag size="sm">
                        {String(projectConfig.ai.provider ?? '-')}
                      </Tag>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <H5>{aiSection.model.title}</H5>
                    <div className="flex">
                      <Tag size="sm">
                        {String(projectConfig.ai.model ?? '-')}
                      </Tag>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <H5>{aiSection.apiKey.title}</H5>
                    <div className="flex">
                      <Tag size="sm">
                        {projectConfig.ai.apiKey
                          ? aiSection.apiKey.configured
                          : aiSection.apiKey.notConfigured}
                      </Tag>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <H5>{aiSection.applicationContext.title}</H5>
                  <p className="text-neutral-dark text-sm dark:text-neutral">
                    {(projectConfig.ai.applicationContext as string) || '-'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-card p-4 text-sm">
        <strong className="block text-neutral">{updateConfig.message}</strong>
        <Link
          label={pushConfigDocLink.label.value}
          to={`${Website_Doc_IntlayerCMS}#using-the-cms`}
          color="text"
        >
          {pushConfigDocLink.text}
        </Link>
      </div>
    </div>
  );
};
