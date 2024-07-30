'use client';

import { ChevronRight } from 'lucide-react';
import { useState, type FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { createFileTree, type FilePath } from './createFileTree';

type FileTreeProps = {
  filesPaths: string[];
  activeFile?: string;
  onClickFile?: (filePath: string) => void;
  prePaths?: string[];
};

const StyledFileBar = tw.div`w-full flex flex-col items-start justify-start py-1 text-neutral dark:text-neutral-dark`;
const StyledFile = styled.div<{ $isActive: boolean }>(({ $isActive }) => [
  tw`flex items-start justify-start transition text-nowrap text-xs w-full py-1 px-2 whitespace-pre`,
  $isActive
    ? tw`bg-neutral-200 dark:bg-neutral-700`
    : tw`hover:bg-neutral-300 dark:hover:bg-neutral-900 cursor-pointer`,
]);
const StyledIndentation = styled.span<{
  $isFile: boolean;
}>(({ $isFile }) => [tw`whitespace-pre`, $isFile && tw`ml-2`]);

const StyledChevron = styled(ChevronRight)<{
  $isActive: boolean;
}>(({ $isActive }) => [tw`transition`, $isActive && tw`transform rotate-90`]);

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
      <StyledFile
        $isActive={isActive}
        key={path}
        onClick={() => {
          if (isFile) {
            onClickFile?.(totalPath);
          } else {
            setSubPathOpen(!subPathOpen);
          }
        }}
      >
        <StyledIndentation $isFile={isFile}>{indentation}</StyledIndentation>

        {!isFile && <StyledChevron size={16} $isActive={subPathOpen} />}
        {path}
      </StyledFile>
      {subPath && (
        <MaxHeightSmoother isHidden={!subPathOpen}>
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
    <StyledFileBar>
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
    </StyledFileBar>
  );
};
