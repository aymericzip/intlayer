import type { FC, HTMLAttributes } from 'react';
import { Container } from '../Container';
import { FileTree } from './FileTree';

export type FileListProps = {
  filePaths: string[];
} & HTMLAttributes<HTMLDivElement>;

export const FileList: FC<FileListProps> = ({ filePaths, ...props }) => (
  <Container
    className="flex size-full flex-col justify-start overflow-auto shadow-lg"
    roundedSize="3xl"
    transparency="none"
    {...props}
  >
    <div className="flex w-auto flex-row items-center justify-start gap-1 rounded-t-3xl bg-neutral-200 text-neutral text-xs dark:bg-neutral-950">
      <div className="mx-2 flex items-center justify-start gap-2 p-1">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
      </div>
    </div>
    <div className="relative flex size-full flex-1 flex-row justify-start shadow-lg">
      <div className="absolute top-0 left-0 size-full">
        <div className="flex size-full">
          <FileTree filesPaths={filePaths} />
        </div>
      </div>
    </div>
  </Container>
);
