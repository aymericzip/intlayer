import { Link } from '@components/Link/Link';
import type { ProjectConfiguration } from '@intlayer/backend';
import { H3, H4, H5, Tag } from '@intlayer/design-system';
import { getLocaleName, type Locale } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ConfigDetailsProps = {
  projectConfig?: ProjectConfiguration;
};

export const ConfigDetails: FC<ConfigDetailsProps> = ({ projectConfig }) => {
  const { locale } = useLocale();
  const {
    noConfig,
    updateConfig,
    pushConfigDocLink,
    title,
    i18nSection,
    editorSection,
  } = useIntlayer('project-config-detail');

  if (!projectConfig) {
    return (
      <div className="flex flex-col gap-4">
        <H3 className="mb-8">{title}</H3>

        <div className="flex flex-col gap-2 rounded-lg bg-card p-4 text-sm">
          <strong className="block text-neutral">{noConfig.message}</strong>
          <Link
            label={pushConfigDocLink.label.value}
            href={`${PagesRoutes.Doc_IntlayerCMS}#using-the-cms`}
            color="text"
          >
            {pushConfigDocLink.text}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <H3>{title}</H3>
      <div>
        <H4>{i18nSection.title}</H4>
        <div>
          <H5 className="mb-3">{i18nSection.localeListTitle}</H5>

          <div className="flex flex-row flex-wrap gap-2">
            {projectConfig.internationalization.locales.map((localeEl) => (
              <Tag key={localeEl} size="sm">
                {getLocaleName(localeEl as Locale, locale)}
              </Tag>
            ))}
          </div>
          <H5 className="mb-3">{i18nSection.defaultLocaleTitle}</H5>

          <Tag size="sm">
            {getLocaleName(
              projectConfig.internationalization?.defaultLocale,
              locale
            )}
          </Tag>
        </div>

        <H4>{editorSection.title}</H4>
        <div>
          <H5 className="mb-3">{editorSection.applicationURL.title}</H5>
          <Tag size="sm">
            {projectConfig.editor.applicationURL ? (
              <Link
                href={projectConfig.editor.applicationURL}
                label={editorSection.applicationURL.label.value}
                color="text"
              >
                {projectConfig.editor.applicationURL}
              </Link>
            ) : (
              '-'
            )}
          </Tag>

          <H5 className="mb-3">{editorSection.cmsURL.title}</H5>
          {projectConfig.editor.cmsURL ? (
            <Tag size="sm">
              <Link
                href={projectConfig.editor.cmsURL}
                label={editorSection.cmsURL.label.value}
                color="text"
              >
                {projectConfig.editor.cmsURL}
              </Link>
            </Tag>
          ) : (
            '-'
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-card p-4 text-sm">
        <strong className="block text-neutral">{updateConfig.message}</strong>
        <Link
          label={pushConfigDocLink.label.value}
          href={`${PagesRoutes.Doc_IntlayerCMS}#using-the-cms`}
          color="text"
        >
          {pushConfigDocLink.text}
        </Link>
      </div>
    </div>
  );
};
