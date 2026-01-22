import { MarkdownRenderer } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useTheme } from 'next-themes';
import type { FC, HTMLAttributes } from 'react';

export enum ChatBumbleType {
  QUESTION = 'question',
  ANSWER = 'answer',
}

type ChatBumbleProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  type: ChatBumbleType;
  children: string;
};

export const ChatBumble: FC<ChatBumbleProps> = ({
  children,
  type,
  ...props
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        type === ChatBumbleType.QUESTION &&
          'mr-4 ml-auto w-auto max-w-[90%] whitespace-pre-wrap rounded-xl rounded-tr-none bg-text/95 px-8 py-2 text-text-opposite',
        type === ChatBumbleType.ANSWER && 'w-full px-4'
      )}
      {...props}
    >
      {type === ChatBumbleType.ANSWER ? (
        <MarkdownRenderer isDarkMode={resolvedTheme === 'dark'}>
          {children}
        </MarkdownRenderer>
      ) : (
        children
      )}
    </div>
  );
};
