import { Form, useForm } from '@intlayer/design-system';
import { ArrowUp, Eraser } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useCallback, type FC, type ReactNode } from 'react';
import {
  useFormSectionSchema,
  type FormSectionSchemaData,
} from './useFormSectionSchema';

type FormSectionProps = {
  nbMessages: number;
  askNewQuestion: (newQuestion: string) => void;
  clear: () => void;
  additionalButtons?: ReactNode;
};

export const FormSection: FC<FormSectionProps> = ({
  nbMessages,
  askNewQuestion,
  clear,
  additionalButtons,
}) => {
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
        maxRows={10}
        placeholder={textArea.placeholder.value}
        aria-label={textArea.label.value}
        className="scrollbar-hide h-10 w-full rounded-3xl border-none px-4 py-2"
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
      <div className="ml-auto flex items-center gap-2 max-md:w-full">
        {additionalButtons}
        {nbMessages > 1 && (
          <Form.Button
            label={clearButton.label.value}
            type="button"
            color="text"
            variant="outline"
            size="icon-md"
            className="max-md:w-full"
            disabled={isSubmitting}
            Icon={Eraser}
            onClick={handleClear}
          />
        )}
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
