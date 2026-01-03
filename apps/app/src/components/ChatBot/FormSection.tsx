import { Form, useForm } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ArrowUp, Eraser } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, type ReactNode, useCallback, useEffect, useRef } from 'react';
import {
  type FormSectionSchemaData,
  useFormSectionSchema,
} from './useFormSectionSchema';

type FormSectionProps = {
  nbMessages: number;
  askNewQuestion: (newQuestion: string) => void;
  clear: () => void;
  additionalButtons?: ReactNode;
  isActive?: boolean;
};

export const FormSection: FC<FormSectionProps> = ({
  nbMessages,
  askNewQuestion,
  clear,
  additionalButtons,
  isActive,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const schema = useFormSectionSchema();
  const { form, isSubmitting } = useForm(schema);
  const { sendQuestionButton, clearButton, textArea } =
    useIntlayer('chat-form-section');

  const handleSubmit = useCallback(
    (data: FormSectionSchemaData) => {
      if (!data.question) return;

      askNewQuestion(data.question);
      form.reset({ question: '' });
    },
    [askNewQuestion, form.reset]
  );

  const handleClear = useCallback(() => {
    clear();
    form.reset({ question: '' });
  }, [clear, form.reset]);

  const hasClearButton = nbMessages >= 1;

  useEffect(() => {
    if (!isActive) return;

    // Small delay to ensure the component is fully mounted and visible
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isActive]);

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
        autoFocus={isActive}
        onKeyDown={
          // Submit the form when the user presses the Enter key
          (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(form.getValues());
            }
          }
        }
      />
      <div className="ml-auto flex items-center justify-between gap-2 max-md:w-full">
        {additionalButtons}

        <Form.Button
          label={clearButton.label.value}
          type="button"
          color="text"
          variant="outline"
          size="icon-md"
          disabled={isSubmitting || !hasClearButton}
          Icon={Eraser}
          onClick={handleClear}
          className={cn(!hasClearButton && 'opacity-0')}
        />

        <Form.Button
          label={sendQuestionButton.label.value}
          type="submit"
          color="text"
          isLoading={isSubmitting}
          Icon={ArrowUp}
          size="icon-md"
        />
      </div>
    </Form>
  );
};
