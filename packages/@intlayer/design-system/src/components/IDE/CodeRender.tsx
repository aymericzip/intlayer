import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  okaidia,
  // solarizedlight,
  coldarkCold,
  // darcula,
  // gruvboxDark,
  // gruvboxLight,
  // nord,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import tw from 'twin.macro';

type CodeCompProps = {
  children: string;
  language: string;
  isDarkMode?: boolean;
  showLineNumbers?: boolean;
};

const StyledContainer = styled.div<{ $showLineNumbers: boolean }>(
  ({ $showLineNumbers }) => [tw`relative p-3`, $showLineNumbers && tw`ml-0`]
);
const StyledCopyButton = tw.button`top-3 right-3 absolute`;
const StyledCopyIcon = tw(CopyIcon)`w-4 h-4`;
const StyledCopyCheckIcon = tw(CopyCheckIcon)`w-4 h-4`;

export const Code: FC<CodeCompProps> = ({
  children,
  language,
  isDarkMode,
  showLineNumbers = true,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <StyledContainer $showLineNumbers={showLineNumbers}>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <StyledCopyButton>
          {copied ? <StyledCopyCheckIcon /> : <StyledCopyIcon />}
        </StyledCopyButton>
      </CopyToClipboard>
      <SyntaxHighlighter
        lineProps={{
          style: { whiteSpace: 'pre-wrap' },
        }}
        wrapLines={true}
        customStyle={{
          display: undefined,
          overflowX: undefined,
          overflowY: 'scroll',
          padding: undefined,
          color: undefined,
          background: 'inherit',
          margin: undefined,
        }}
        language={language ?? 'javascript'}
        style={isDarkMode ? okaidia : coldarkCold}
        showLineNumbers={showLineNumbers}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </StyledContainer>
  );
};
