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
        'rounded-xl p-4',
        type === ChatBumbleType.QUESTION &&
          'bg-text dark:bg-text-dark text-text-dark dark:text-text ml-auto w-[90%] max-w-xl rounded-tr-none',
        type === ChatBumbleType.ANSWER && 'w-full'
      )}
      {...props}
    >
      <MarkdownRenderer isDarkMode={resolvedTheme === 'dark'}>
        {children}
      </MarkdownRenderer>
    </div>
  );
};
