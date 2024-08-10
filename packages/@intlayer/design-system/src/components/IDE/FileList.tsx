import type { HTMLAttributes, FC } from 'react';
import { FileTree } from './FileTree';
import {
  StyledContainer,
  StyledTabBar,
  StyledWindowButtonContainer,
  StyledCloseButton,
  StyledMinimizeButton,
  StyledMaximizeButton,
  StyledWindow,
  StyledAbsolute,
  StyledDivColTemplate,
} from './IDE';

export type FileListProps = {
  filePaths: string[];
  isDarkMode?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const FileList: FC<FileListProps> = ({
  filePaths,
  isDarkMode,
  ...props
}) => (
  <StyledContainer roundedSize="3xl" transparency="none" {...props}>
    <StyledTabBar>
      <StyledWindowButtonContainer>
        <StyledCloseButton />
        <StyledMinimizeButton />
        <StyledMaximizeButton />
      </StyledWindowButtonContainer>
    </StyledTabBar>
    <StyledWindow>
      <StyledAbsolute>
        <StyledDivColTemplate>
          <FileTree filesPaths={filePaths} />
        </StyledDivColTemplate>
      </StyledAbsolute>
    </StyledWindow>
  </StyledContainer>
);
