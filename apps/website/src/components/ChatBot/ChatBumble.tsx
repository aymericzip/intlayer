import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { cn } from '@intlayer/design-system/utils';
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
  return (
    <div
      className={cn(
        type === ChatBumbleType.QUESTION &&
          'mr-4 ml-auto w-auto max-w-[90%] whitespace-pre-wrap rounded-lg rounded-tr-none bg-card px-8 py-2 text-foreground',
        type === ChatBumbleType.ANSWER && 'w-full px-4'
      )}
      {...props}
    >
      {type === ChatBumbleType.ANSWER ? (
        <MarkdownRenderer>{children}</MarkdownRenderer>
      ) : (
        children
      )}
    </div>
  );
};
