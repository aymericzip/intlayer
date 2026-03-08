import { CodeBlock } from '@intlayer/design-system';
import { FileText, Globe, Link as LinkIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { FieldItem } from './FieldItem';
import type { AuditDataList, MergedData } from './types';

type FieldItemData = {
  key: AuditDataList<string>;
  icon: ReactNode;
  label: string;
  description: ReactNode;
};

type AnalyzerPageResultsProps = {
  data: MergedData;
  url: string;
  isLoading?: boolean;
};

export const AnalyzerPageResults: FC<AnalyzerPageResultsProps> = memo(
  ({ data, url, isLoading }) => {
    const { fields, fieldsDescription } = useIntlayer('analyzer-results');

    const fieldsList: FieldItemData[] = [
      {
        key: `url_htmlLang\\${url}`,
        icon: <Globe size={16} />,
        label: fields.langTag.value,
        description: fieldsDescription.langTag.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
      {
        key: `url_htmlDir\\${url}`,
        icon: <Globe size={16} />,
        label: fields.htmlDir.value,
        description: fieldsDescription.htmlDir.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
      {
        key: `url_hreflang\\${url}`,
        icon: <FileText size={16} />,
        label: fields.hreflangs.value,
        description: fieldsDescription.hreflangs.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
      {
        key: `url_hasXDefault\\${url}`,
        icon: <FileText size={16} />,
        label: fields.hasXDefault.value,
        description: fieldsDescription.hasXDefault.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
      {
        key: `url_hasCanonical\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.canonical.value,
        description: fieldsDescription.canonical.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
      {
        key: `url_hasLocalizedLinks\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.localizedLinks.value,
        description: fieldsDescription.localizedLinks.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
      {
        key: `url_allAnchorsLocalized\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.allAnchorsLocalized.value,
        description: fieldsDescription.allAnchorsLocalized.use({
          code: ({ children, className }) => (
            <CodeBlock lang={className as 'ts'}>{children as string}</CodeBlock>
          ),
        }),
      },
    ];

    return (
      <div className="flex flex-col gap-2 pt-2 text-left text-sm">
        <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 pt-2 sm:grid-cols-3">
          {fieldsList.map((item) => (
            <FieldItem
              key={item.key}
              id={item.key}
              icon={item.icon}
              details={item.description}
              label={item.label}
              event={data[item.key]}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    );
  }
);
