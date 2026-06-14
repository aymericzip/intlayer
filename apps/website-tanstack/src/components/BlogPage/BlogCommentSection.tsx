'use client';

import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { getIntlayer } from 'intlayer';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';

type CommentStatus = 'pending' | 'approved' | 'rejected';

type BlogCommentPublicAPI = {
  id: string;
  blogSlug: string;
  authorName: string;
  content: string;
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
};

type SubmitState = 'idle' | 'success';

type BlogCommentSectionProps = {
  blogSlug: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
const COMMENTS_API_BASE = `${BACKEND_URL}/api/blog-comments`;

const fetchApprovedComments = async (
  blogSlug: string
): Promise<BlogCommentPublicAPI[]> => {
  const response = await fetch(`${COMMENTS_API_BASE}/${blogSlug}`);

  if (!response.ok) return [];

  const json = await response.json();

  return (json.data ?? []) as BlogCommentPublicAPI[];
};

const postComment = async (payload: {
  blogSlug: string;
  authorName: string;
  authorEmail: string;
  content: string;
}): Promise<void> => {
  const dictionary = getIntlayer('blog-comment-section');

  const response = await fetch(COMMENTS_API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(dictionary.failedToSubmitComment as unknown as string);
  }
};

const commentSchema = z.object({
  authorName: z.string().min(1).max(100),
  authorEmail: z.email().max(254),
  content: z.string().min(1).max(5000),
});

type CommentFormData = z.infer<typeof commentSchema>;

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

type CommentFormProps = {
  blogSlug: string;
  onSuccess: () => void;
  onCancel: () => void;
};

const CommentForm: FC<CommentFormProps> = ({
  blogSlug,
  onSuccess,
  onCancel,
}) => {
  const content = useIntlayer('blog-comment-section');
  const { form, isSubmitting } = useForm(commentSchema);

  const handleSubmit = async (data: CommentFormData) => {
    await postComment({ blogSlug, ...data });
    form.reset();
    onSuccess();
  };

  return (
    <Container
      roundedSize="xl"
      padding="lg"
      border
      borderColor="neutral"
      transparency="sm"
    >
      <Form schema={commentSchema} onSubmitSuccess={handleSubmit} {...form}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Form.Input
            name="authorName"
            label={content.name.value}
            placeholder={content.yourName.value}
            isRequired
          />
          <Form.Input
            name="authorEmail"
            type="email"
            label={content.email.value}
            placeholder="your@email.com"
            isRequired
          />
        </div>

        <Form.TextArea
          name="content"
          label={content.comment.value}
          placeholder={content.shareYourThoughts.value}
          rows={4}
          isRequired
          className="resize-y"
        />

        <div className="flex items-center gap-3">
          <Form.Button
            type="submit"
            variant="default"
            color="text"
            size="md"
            isLoading={isSubmitting}
            label={content.submitComment.value}
          >
            {content.submitComment}
          </Form.Button>
          <Form.Button
            type="button"
            variant="hoverable"
            color="neutral"
            size="md"
            label={content.cancel.value}
            onClick={onCancel}
          >
            {content.cancel}
          </Form.Button>
        </div>

        <p className="text-neutral text-xs">
          {content.commentsAreModeratedAndWill}
        </p>
      </Form>
    </Container>
  );
};

/**
 * Blog comment section — displays approved comments and provides a submission
 * form. New comments are held in "pending" state until an admin approves them.
 */
export const BlogCommentSection: FC<BlogCommentSectionProps> = ({
  blogSlug,
}) => {
  const content = useIntlayer('blog-comment-section');

  const [comments, setComments] = useState<BlogCommentPublicAPI[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    fetchApprovedComments(blogSlug)
      .then(setComments)
      .catch(() => {});
  }, [blogSlug]);

  const handleSuccess = () => {
    setSubmitState('success');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSubmitState('idle');
  };

  return (
    <section className="mt-12 border-border border-t pt-10">
      <h3 className="mb-6 font-medium text-lg text-text">{content.comments}</h3>

      {/* Approved comments list */}
      {comments.length === 0 && submitState !== 'success' ? (
        <p className="mb-8 border-dotted text-neutral text-sm">
          {content.noCommentsYetBeThe}
        </p>
      ) : (
        <ul className="mb-8 flex flex-col gap-4">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Container
                roundedSize="xl"
                padding="md"
                border
                borderColor="neutral"
                transparency="sm"
                gap="sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-text">
                    {comment.authorName}
                  </span>
                  <time
                    dateTime={comment.createdAt}
                    className="text-neutral text-xs"
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <p className="whitespace-pre-wrap text-sm text-text-secondary">
                  {comment.content}
                </p>
              </Container>
            </li>
          ))}
        </ul>
      )}

      {/* Success banner */}
      {submitState === 'success' && (
        <Container
          roundedSize="xl"
          padding="sm"
          border
          borderColor="success"
          transparency="sm"
          className="mb-6 text-sm text-success"
        >
          {content.yourCommentHasBeenSubmitted}
        </Container>
      )}

      {/* Toggle form */}
      {!showForm && submitState !== 'success' && (
        <Form.Button
          type="button"
          variant="hoverable"
          color="text"
          size="sm"
          label={content.addAComment.value}
          onClick={() => setShowForm(true)}
        >
          {content.addAComment}
        </Form.Button>
      )}

      {/* Comment form */}
      {showForm && (
        <CommentForm
          blogSlug={blogSlug}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
};
