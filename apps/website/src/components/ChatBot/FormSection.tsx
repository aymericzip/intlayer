import { Form, useForm } from '@intlayer/design-system/form';
import { cn } from '@intlayer/design-system/utils';
import { ArrowUp, Eraser } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import {
  type FC,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import {
  type FormSectionSchemaData,
  useFormSectionSchema,
} from './useFormSectionSchema';

type FormSectionProps = {
  nbMessages: number;
  userMessages: string[];
  askNewQuestion: (newQuestion: string) => void;
  clear: () => void;
  additionalButtons?: ReactNode;
  isActive?: boolean;
  isLoading?: boolean;
};

export const FormSection: FC<FormSectionProps> = ({
  nbMessages,
  userMessages = [],
  askNewQuestion,
  clear,
  additionalButtons,
  isActive,
  isLoading,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const schema = useFormSectionSchema();
  const { form, isSubmitting } = useForm(schema);
  const { sendQuestionButton, clearButton, textArea } =
    useIntlayer('chat-form-section');
  const historyIndexRef = useRef<number>(-1);
  const draftRef = useRef<string>('');

  const handleSubmit = (data: FormSectionSchemaData) => {
    if (!data.question) return;

    askNewQuestion(data.question);
    form.reset({ question: '' });
    historyIndexRef.current = -1;
    draftRef.current = '';
  };

  const handleClear = () => {
    clear();
    form.reset({ question: '' });
    historyIndexRef.current = -1;
    draftRef.current = '';
  };

  const hasClearButton = nbMessages >= 1;

  useEffect(() => {
    if (!isActive) return;

    // Small delay to ensure the component is fully mounted and visible
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isActive]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitting && !isLoading) {
        form.handleSubmit(handleSubmit)();
      }
      return;
    }

    const { value } = e.currentTarget;

    if (e.key === 'ArrowUp') {
      if (userMessages.length === 0) return;
      e.preventDefault();

      let nextIndex: number;
      if (historyIndexRef.current === -1) {
        draftRef.current = value;
        nextIndex = userMessages.length - 1;
      } else if (historyIndexRef.current > 0) {
        nextIndex = historyIndexRef.current - 1;
      } else {
        return;
      }

      historyIndexRef.current = nextIndex;
      form.setValue('question', userMessages[nextIndex]);
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = userMessages[nextIndex].length;
          inputRef.current.selectionEnd = userMessages[nextIndex].length;
        }
      });
    } else if (e.key === 'ArrowDown' && historyIndexRef.current !== -1) {
      e.preventDefault();

      if (historyIndexRef.current === userMessages.length - 1) {
        historyIndexRef.current = -1;
        const draft = draftRef.current;
        form.setValue('question', draft);
        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = draft.length;
            inputRef.current.selectionEnd = draft.length;
          }
        });
      } else {
        const nextIndex = historyIndexRef.current + 1;
        historyIndexRef.current = nextIndex;
        const msg = userMessages[nextIndex];
        form.setValue('question', msg);
        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = msg.length;
            inputRef.current.selectionEnd = msg.length;
          }
        });
      }
    }
  };

  return (
    <Form
      className="item-end flex h-auto flex-col items-end justify-center gap-3 px-4 py-3"
      schema={schema}
      onSubmitSuccess={handleSubmit}
      {...form}
    >
      <Form.AutoSizedTextArea
        name="question"
        rows={2}
        ref={inputRef}
        maxRows={10}
        placeholder={textArea.placeholder.value}
        aria-label={textArea.label.value}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <div className="ml-auto flex items-center justify-end gap-2 max-md:w-full">
        {additionalButtons}

        <Form.Button
          label={clearButton.label.value}
          type="button"
          color="text"
          variant="outline"
          size="icon-md"
          disabled={isSubmitting || isLoading || !hasClearButton}
          Icon={Eraser}
          onClick={handleClear}
          className={cn(!hasClearButton && 'opacity-0')}
        />

        <Form.Button
          label={sendQuestionButton.label.value}
          type="submit"
          color="text"
          isLoading={isSubmitting || isLoading}
          Icon={ArrowUp}
          size="icon-md"
        />
      </div>
    </Form>
  );
};
