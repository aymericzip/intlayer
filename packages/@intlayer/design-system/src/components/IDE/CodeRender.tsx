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
import tw from 'twin.macro';

type CodeCompProps = {
  children: string;
  language: string;
  isDarkMode?: boolean;
};

const StyledContainer = tw.div`relative`;
const StyledCopyButton = tw.button`top-3 right-3 absolute`;
const StyledCopyIcon = tw(CopyIcon)`w-4 h-4`;
const StyledCopyCheckIcon = tw(CopyCheckIcon)`w-4 h-4`;

export const Code: FC<CodeCompProps> = ({
  children,
  language,
  isDarkMode,
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
    <StyledContainer>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <StyledCopyButton>
          {copied ? <StyledCopyCheckIcon /> : <StyledCopyIcon />}
        </StyledCopyButton>
      </CopyToClipboard>
      <SyntaxHighlighter
        customStyle={{
          display: undefined,
          overflowX: undefined,
          padding: undefined,
          color: undefined,
          background: 'inherit',
          margin: undefined,
        }}
        language={language ?? 'javascript'}
        style={isDarkMode ? okaidia : coldarkCold}
        showLineNumbers
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </StyledContainer>
  );
};
