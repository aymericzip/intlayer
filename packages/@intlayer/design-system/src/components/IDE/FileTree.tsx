/* eslint-disable sonarjs/no-selector-parameter */
'use client';

import { ChevronRight } from 'lucide-react';
import { useState, type FC } from 'react';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { createFileTree, type FilePath } from './createFileTree';

type FileTreeProps = {
  filesPaths: string[];
  activeFile?: string;
  onClickFile?: (filePath: string) => void;
  prePaths?: string[];
};

const concatFilePath = (paths: string[]) => paths.join('/');

type FileItemProps = {
  filesPaths: string[];
  subPath?: FilePath[];
  path: string;
  onClickFile?: (title: string) => void;
  activeFile?: string;
  prePaths: string[];
  isFile: boolean;
};

const FileItem: FC<FileItemProps> = ({
  filesPaths,
  path,
  subPath,
  onClickFile,
  activeFile,
  prePaths,
  isFile,
}) => {
  const [subPathOpen, setSubPathOpen] = useState(true);

  const level = prePaths.length + 1;
  const currentPath = concatFilePath([
    ...prePaths.slice(level - 1, level),
    path,
  ]);
  const totalPath = concatFilePath([...prePaths, path]);

  const filteredFilePaths = filesPaths
    .map(
      (path) => path.replace(/^\/?/, '') // This regex matches the first slash, if it exists, at the start of the string)
    )
    .filter((filePath) => filePath.startsWith(currentPath));

  const newPath = filteredFilePaths.map((path) =>
    path.replace(currentPath, '').replace(/^\/?/, '')
  );

  const isActive = totalPath === activeFile;

  const indentation = new Array(level).fill('  ').join('');

  return (
    <>
      <button
        className={cn(
          'flex w-full items-start justify-start whitespace-pre text-nowrap px-2 py-1 text-xs transition',
          isActive
            ? 'bg-neutral-200 dark:bg-neutral-700'
            : 'cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-900'
        )}
        key={path}
        onClick={() => {
          if (isFile) {
            onClickFile?.(totalPath);
          } else {
            setSubPathOpen(!subPathOpen);
          }
        }}
      >
        <span className={cn('whitespace-pre', isFile && 'ml-2')}>
          {indentation}
        </span>

        {!isFile && (
          <ChevronRight
            className={cn(`transition`, subPathOpen && `rotate-90 transform`)}
            size={16}
          />
        )}
        {path}
      </button>
      {subPath && (
        <MaxHeightSmoother
          isHidden={!subPathOpen}
          className="overflow-x-hidden"
        >
          <FileTree
            filesPaths={newPath}
            activeFile={activeFile}
            onClickFile={onClickFile}
            prePaths={[...prePaths, path]}
          />
        </MaxHeightSmoother>
      )}
    </>
  );
};

export const FileTree: FC<FileTreeProps> = ({
  filesPaths,
  activeFile,
  onClickFile,
  prePaths = [],
}) => {
  const fileTree = createFileTree(filesPaths);

  return (
    <div className="text-neutral dark:text-neutral-dark flex size-full flex-col items-start justify-start py-1">
      {fileTree.map(({ path, subPath, isFile }) => (
        <FileItem
          key={path}
          isFile={isFile}
          subPath={subPath}
          path={path}
          onClickFile={onClickFile}
          activeFile={activeFile}
          prePaths={prePaths}
          filesPaths={filesPaths}
        />
      ))}
    </div>
  );
};
