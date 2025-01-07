import { getBlogDataArray } from '@components/BlogPage/blogData';
import { getDocDataArray } from '@components/DocPage/docData';
import { Tag, Link } from '@intlayer/design-system';
import { File } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { FC } from 'react';

const FileReferenceTag: FC<{ fileTitle: string; fileUrl: string }> = ({
  fileTitle,
  fileUrl,
}) => (
  <Tag size="sm">
    <Link
      label="See the documentation"
      className="flex flex-row flex-nowrap items-center gap-2 text-nowrap"
      href={fileUrl}
      color="text"
      target="_blank"
    >
      <File className="size-3" />
      {fileTitle}
    </Link>
  </Tag>
);

export const FileReference: FC<{ relatedFiles: string[] }> = ({
  relatedFiles,
}) => {
  const { relatedFilesLabel } = useIntlayer('chat-form-related-files');
  const { locale } = useLocale();
  const docArray = getDocDataArray(locale);
  const blogArray = getBlogDataArray(locale);

  if (relatedFiles.length === 0) return <></>;

  return (
    <div className="pl-4">
      <span className="text-neutral dark:text-emerald-dark text-sm">
        {relatedFilesLabel}
      </span>
      <div className="flex min-w-full flex-row gap-2 overflow-x-auto pb-1">
        {relatedFiles.map((fileKey) => {
          const fileData =
            docArray.find((docEl) => docEl.docName === fileKey) ??
            blogArray.find((blogEl) => blogEl.blogName === fileKey);

          if (!fileData) return <></>;

          return (
            <FileReferenceTag
              key={fileKey}
              fileTitle={fileData.title}
              fileUrl={fileData.url}
            />
          );
        })}
      </div>
    </div>
  );
};
