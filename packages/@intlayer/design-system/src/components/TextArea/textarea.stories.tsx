import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { TextArea } from '.';
import { InputVariant } from '../Input';

/**
 * ## TextArea Component
 *
 * A flexible multi-line text input component that extends standard HTML textarea
 * functionality with design system styling, validation states, and consistent theming.
 *
 * ### Key Features
 * - **Multiple Variants**: Default, invisible, error, success, and warning styles
 * - **Validation Integration**: Built-in validation styling with `validationStyleEnabled`
 * - **Consistent Theming**: Matches design system color palette and spacing
 * - **Accessibility**: Full support for screen readers and keyboard navigation
 * - **Responsive**: Adapts to different screen sizes and containers
 *
 * ### Use Cases
 * - Form fields requiring multi-line input
 * - Comment and feedback systems
 * - Content creation interfaces
 * - Message composition
 * - Description and notes fields
 *
 * ### Accessibility Features
 * - Proper label association via `htmlFor` or `aria-labelledby`
 * - Error messaging with `aria-describedby` and `aria-invalid`
 * - Keyboard navigation and focus management
 * - High contrast validation colors
 */
const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible multi-line text input component with validation states and design system integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text displayed when textarea is empty',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'Current value for controlled component',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      description: 'Initial content for uncontrolled component',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    rows: {
      description: 'Number of visible text lines',
      control: { type: 'number', min: 1, max: 20 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    cols: {
      description: 'Number of visible character columns',
      control: { type: 'number', min: 10, max: 100 },
      table: {
        type: { summary: 'number' },
      },
    },
    disabled: {
      description: 'Whether the textarea is disabled',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      description: 'Whether the textarea is read-only',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      description: 'Visual variant affecting appearance and styling',
      control: { type: 'select' },
      options: Object.values(InputVariant),
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'InputVariant.DEFAULT' },
      },
    },
    validationStyleEnabled: {
      description: 'Enable validation styling based on aria-invalid attribute',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      description: 'Maximum number of characters allowed',
      control: { type: 'number', min: 1 },
      table: {
        type: { summary: 'number' },
      },
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ## Basic Examples
 *
 * Fundamental usage patterns for common scenarios.
 */

/**
 * ### Default TextArea
 *
 * Standard textarea with default styling and basic configuration.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-md space-y-3">
      <TextArea {...args} />

      <div className="text-sm text-gray-600">
        Standard textarea with default styling, perfect for most form
        applications.
      </div>
    </div>
  ),
  args: {
    placeholder: 'Type your message here...',
    rows: 4,
    variant: InputVariant.DEFAULT,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Type your message here...');

    await expect(textarea).toBeInTheDocument();
    await expect(textarea).toHaveAttribute('rows', '4');
  },
};

/**
 * ### Size and Layout Variations
 *
 * Different dimensions and layout configurations for various use cases.
 */
export const SizeVariations: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">Different Sizes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Compact (2 rows)
            </label>
            <TextArea
              placeholder="Brief message..."
              rows={2}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Standard (4 rows)
            </label>
            <TextArea
              placeholder="Standard message length..."
              rows={4}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Large (8 rows)
            </label>
            <TextArea
              placeholder="Long form content..."
              rows={8}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Fixed Width (40 cols)
            </label>
            <TextArea
              placeholder="Fixed column width..."
              rows={4}
              cols={40}
              className="font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 max-w-2xl">
        Choose appropriate sizes based on expected content length. Use `cols`
        for fixed-width layouts like code editors, and `rows` for content
        height.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different sizes are rendered
    const compactTextarea = canvas.getByPlaceholderText('Brief message...');
    const standardTextarea = canvas.getByPlaceholderText(
      'Standard message length...'
    );

    await expect(compactTextarea).toHaveAttribute('rows', '2');
    await expect(standardTextarea).toHaveAttribute('rows', '4');
  },
};

/**
 * ## Visual Variants
 *
 * Different styling variants for various contexts and states.
 */

/**
 * ### Styling Variants
 *
 * Available visual variants showing different appearance options.
 */
export const StyleVariants: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Default</label>
          <TextArea
            placeholder="Default styling with borders..."
            variant={InputVariant.DEFAULT}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Invisible</label>
          <TextArea
            placeholder="Minimal styling, no borders..."
            variant={InputVariant.INVISIBLE}
            rows={3}
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm font-medium text-blue-900 mb-2">
          Variant Usage Guide
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Default:</strong> Standard form fields with clear
            boundaries
          </li>
          <li>
            • <strong>Invisible:</strong> Inline editing, seamless content
            integration
          </li>
        </ul>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const defaultTextarea = canvas.getByPlaceholderText(
      'Default styling with borders...'
    );
    const invisibleTextarea = canvas.getByPlaceholderText(
      'Minimal styling, no borders...'
    );

    await expect(defaultTextarea).toBeInTheDocument();
    await expect(invisibleTextarea).toBeInTheDocument();
  },
};

/**
 * ## Validation States
 *
 * Examples showing validation feedback and error handling.
 */

/**
 * ### Validation Styling
 *
 * Textareas with validation states for form feedback.
 */
export const ValidationStates: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Valid Input</label>
          <TextArea
            defaultValue="This is a valid message that meets all requirements."
            validationStyleEnabled={true}
            aria-invalid={false}
            rows={3}
            className="w-full"
          />
          <div className="text-sm text-green-600 mt-1">
            ✓ Message looks good!
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Invalid Input
          </label>
          <TextArea
            defaultValue="Too short"
            validationStyleEnabled={true}
            aria-invalid={true}
            rows={3}
            className="w-full"
          />
          <div className="text-sm text-red-600 mt-1">
            ✗ Message must be at least 20 characters long.
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            With Character Limit
          </label>
          <TextArea
            placeholder="Maximum 100 characters..."
            maxLength={100}
            rows={3}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-1">
            Characters remaining will be shown as you type.
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const validTextarea = canvas.getByDisplayValue(
      'This is a valid message that meets all requirements.'
    );
    const invalidTextarea = canvas.getByDisplayValue('Too short');

    await expect(validTextarea).toHaveAttribute('aria-invalid', 'false');
    await expect(invalidTextarea).toHaveAttribute('aria-invalid', 'true');
  },
};

/**
 * ## Interactive Examples
 *
 * Real-world usage scenarios with dynamic behavior.
 */

/**
 * ### Interactive Form Field
 *
 * Complete form field example with validation and character counting.
 */
export const InteractiveFormField: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const maxLength = 200;

    const validateMessage = (value: string) => {
      if (value.length < 10) {
        setError('Message must be at least 10 characters long');
      } else if (value.length > maxLength) {
        setError(`Message cannot exceed ${maxLength} characters`);
      } else {
        setError('');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setMessage(value);
      validateMessage(value);
    };

    const handleSubmit = () => {
      if (!error && message.length >= 10) {
        alert(`Message submitted: "${message}"`);
        setMessage('');
        setError('');
      }
    };

    const remainingChars = maxLength - message.length;
    const isValid = !error && message.length >= 10;

    return (
      <div className="w-full max-w-lg space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="feedback-message"
            className="block text-sm font-semibold text-gray-700"
          >
            Your Feedback
          </label>

          <TextArea
            id="feedback-message"
            value={message}
            onChange={handleChange}
            placeholder="Share your thoughts with us..."
            rows={4}
            maxLength={maxLength}
            validationStyleEnabled={true}
            aria-invalid={!!error}
            aria-describedby={error ? 'feedback-error' : 'feedback-help'}
            className="w-full"
          />

          <div className="flex justify-between items-center text-sm">
            <div>
              {error ? (
                <span id="feedback-error" className="text-red-600" role="alert">
                  {error}
                </span>
              ) : (
                <span id="feedback-help" className="text-gray-500">
                  Minimum 10 characters required
                </span>
              )}
            </div>

            <span
              className={`text-sm ${
                remainingChars < 20
                  ? 'text-red-500 font-medium'
                  : 'text-gray-400'
              }`}
            >
              {remainingChars} remaining
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Feedback
        </button>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-medium text-gray-700 mb-1">
            Form State
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>
              Characters: {message.length}/{maxLength}
            </div>
            <div>Valid: {isValid ? '✓ Yes' : '✗ No'}</div>
            <div>Error: {error || 'None'}</div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText('Your Feedback');

    // Test typing and validation
    await userEvent.type(textarea, 'Hello');
    await expect(
      canvas.getByText(/must be at least 10 characters/)
    ).toBeInTheDocument();

    // Type more to clear error
    await userEvent.type(textarea, ' world! This is a test.');
    await expect(canvas.getByText('None')).toBeInTheDocument();
  },
};

/**
 * ### Comment System Example
 *
 * A realistic comment form with threading and interaction features.
 */
export const CommentSystem: Story = {
  render: () => {
    const [comments, setComments] = useState([
      {
        id: 1,
        author: 'Sarah Chen',
        content:
          'Great article! I particularly liked the section about accessibility best practices.',
        timestamp: '2 hours ago',
        replies: [
          {
            id: 11,
            author: 'Mike Johnson',
            content: 'Agreed! The WCAG examples were very helpful.',
            timestamp: '1 hour ago',
          },
        ],
      },
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState('');

    const addComment = () => {
      if (newComment.trim().length < 3) return;

      const comment = {
        id: Date.now(),
        author: 'You',
        content: newComment,
        timestamp: 'just now',
        replies: [],
      };

      setComments([...comments, comment]);
      setNewComment('');
    };

    const addReply = (commentId: number) => {
      if (replyContent.trim().length < 3) return;

      const reply = {
        id: Date.now(),
        author: 'You',
        content: replyContent,
        timestamp: 'just now',
      };

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );
      setReplyContent('');
      setReplyingTo(null);
    };

    return (
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({comments.length})
          </h3>

          {/* New Comment Form */}
          <div className="space-y-3 mb-6">
            <TextArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Join the discussion..."
              rows={3}
              className="w-full"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {500 - newComment.length} characters remaining
              </span>
              <button
                onClick={addComment}
                disabled={newComment.trim().length < 3}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {comment.author}
                    </span>
                    <span className="text-sm text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 ml-4 space-y-2">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="border-l border-gray-100 pl-3 py-2"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">
                            {reply.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {reply.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-3 ml-4 space-y-2">
                    <TextArea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      rows={2}
                      className="w-full"
                      maxLength={300}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => addReply(comment.id)}
                        disabled={replyContent.trim().length < 3}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test comment system
    const commentTextarea = canvas.getByPlaceholderText(
      'Join the discussion...'
    );
    await expect(commentTextarea).toBeInTheDocument();

    // Test reply functionality
    const replyButton = canvas.getByText('Reply');
    await userEvent.click(replyButton);

    const replyTextarea = canvas.getByPlaceholderText(/Reply to Sarah Chen/);
    await expect(replyTextarea).toBeInTheDocument();
  },
};
