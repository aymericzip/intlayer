import { Link, Tag } from '@intlayer/design-system';
import { File } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

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

export const FileReference: FC<{
  relatedFiles: string[];
}> = ({ relatedFiles }) => {
  const { relatedFilesLabel } = useIntlayer('chat-form-related-files');
  const docData = useIntlayer('doc-metadata');
  const blogData = useIntlayer('blog-metadata');

  const uniqFiles = [...new Set(relatedFiles)];

  if (relatedFiles.length === 0) return <></>;

  return (
    <div className="pl-4">
      <span className="text-neutral text-sm">{relatedFilesLabel}</span>
      <div className="flex min-w-full flex-row gap-2 overflow-x-auto pb-1">
        {uniqFiles.map((fileKey) => {
          const fileData = [...docData, ...blogData]?.find(
            (docEl) => docEl.docKey === fileKey
          );

          if (!fileData) return <></>;

          return (
            <FileReferenceTag
              key={fileKey}
              fileTitle={fileData.title.value}
              fileUrl={fileData.url.value}
            />
          );
        })}
      </div>
    </div>
  );
};
