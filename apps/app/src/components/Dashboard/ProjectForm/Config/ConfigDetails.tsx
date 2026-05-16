import type { ProjectConfiguration } from '@intlayer/backend';
import { CopyButton } from '@intlayer/design-system';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H3, H4, H5 } from '@intlayer/design-system/headers';
import { useSession } from '@intlayer/design-system/hooks';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Website_Doc_IntlayerCMS } from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { getLocaleName, type Locale } from 'intlayer';
import { Pencil } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { ConfigEditionForm } from './ConfigEditionForm';

type ConfigDetailsProps = {
  projectConfig?: ProjectConfiguration;
};

export const ConfigDetails: FC<ConfigDetailsProps> = ({ projectConfig }) => {
  const { locale } = useLocale();
  const { session } = useSession();
  const isProjectAdmin = session?.roles?.includes('project_admin');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    noConfig,
    updateConfig,
    pushConfigDocLink,
    title,
    i18nSection,
    editorSection,
    aiSection,
  } = useIntlayer('project-config-detail');
  const { editButton } = useIntlayer('config-edition-form');

  if (!projectConfig) {
    return (
      <div className="flex flex-col gap-4">
        <H3 className="mb-8">{title}</H3>

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
        <H3>{title}</H3>
        {isProjectAdmin && projectConfig && (
          <Button
            variant="hoverable"
            size="icon-md"
            color="text"
            Icon={Pencil}
            label={editButton.ariaLabel.value}
            onClick={() => setIsEditModalOpen(true)}
          />
        )}
      </div>

      {isProjectAdmin && projectConfig && (
        <ConfigEditionForm
          projectConfig={projectConfig}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        <H4>{i18nSection.title}</H4>
        <div className="flex flex-col gap-4">
          <H5>{i18nSection.localeListTitle}</H5>

          <div className="flex flex-row flex-wrap gap-2">
            {projectConfig.internationalization?.locales?.map((localeEl) => (
              <Tag key={localeEl} size="sm">
                {getLocaleName(localeEl as Locale, locale)}
              </Tag>
            ))}
          </div>
          <H5>{i18nSection.defaultLocaleTitle}</H5>

          {projectConfig.internationalization?.defaultLocale && (
            <Tag size="sm">
              {getLocaleName(
                projectConfig.internationalization.defaultLocale,
                locale
              )}
            </Tag>
          )}
        </div>

        <H4>{editorSection.title}</H4>
        <div className="flex flex-col gap-4">
          <H5>{editorSection.applicationURL.title}</H5>
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

          <H5>{editorSection.cmsURL.title}</H5>
          {projectConfig.editor?.cmsURL ? (
            <Tag size="sm">
              <Link
                to={projectConfig.editor?.cmsURL}
                label={editorSection.cmsURL.label.value}
                color="text"
              >
                {projectConfig.editor?.cmsURL}
              </Link>
            </Tag>
          ) : (
            '-'
          )}
        </div>

        {projectConfig.ai && (
          <>
            <H4>{aiSection.title}</H4>
            <div className="flex flex-col gap-4">
              <H5>{aiSection.provider.title}</H5>
              <Tag size="sm">{String(projectConfig.ai.provider ?? '-')}</Tag>

              <H5>{aiSection.model.title}</H5>
              <Tag size="sm">{String(projectConfig.ai.model ?? '-')}</Tag>

              <H5>{aiSection.apiKey.title}</H5>
              <Tag size="sm">
                {(projectConfig.ai as any).apiKeyConfigured
                  ? aiSection.apiKey.configured
                  : aiSection.apiKey.notConfigured}
              </Tag>

              <H5>{aiSection.applicationContext.title}</H5>
              <p className="text-neutral-dark text-sm dark:text-neutral">
                {String(projectConfig.ai.applicationContext ?? '-')}
              </p>
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
