import { Link } from '@intlayer/design-system/link';
import { Tag } from '@intlayer/design-system/tag';
import { File } from 'lucide-react';
import type { FC } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';

/** Fields read from the doc and blog metadata dictionaries. */
type FileMetadataEntry = {
  docKey: IntlayerNode<string>;
  /** Missing on a few entries (e.g. the readme). */
  title?: IntlayerNode<string>;
  url: IntlayerNode<string>;
};

const FileReferenceTag: FC<{
  fileTitle: IntlayerNode | string;
  fileUrl: string;
}> = ({ fileTitle, fileUrl }) => (
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
  // Widened: the literal union of every entry is too large for the checker
  const docData: FileMetadataEntry[] = useIntlayer('doc-metadata');
  const blogData: FileMetadataEntry[] = useIntlayer('blog-metadata');

  const uniqFiles = [...new Set(relatedFiles)];

  if (relatedFiles.length === 0) return <></>;

  return (
    <div className="ps-4">
      <span className="text-muted-foreground text-sm">{relatedFilesLabel}</span>
      <div className="flex min-w-full flex-row gap-2 overflow-x-auto pb-1">
        {uniqFiles.map((fileKey) => {
          const fileData = [...docData, ...blogData].find(
            (docEl) => docEl.docKey.value === fileKey
          );

          if (!fileData) return <></>;

          return (
            <FileReferenceTag
              key={fileKey}
              fileTitle={fileData.title ?? fileData.docKey}
              fileUrl={fileData.url.value}
            />
          );
        })}
      </div>
    </div>
  );
};
