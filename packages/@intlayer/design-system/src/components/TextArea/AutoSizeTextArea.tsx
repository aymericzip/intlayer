'use client';

import { cn } from '@utils/cn';
import {
  type ChangeEventHandler,
  type FC,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { TextArea, type TextAreaProps } from './TextArea';

/**
 * Props for the AutoSizedTextArea component.
 *
 * Extends TextAreaProps with auto-sizing functionality and row limitations.
 *
 * @example
 * ```tsx
 * // Auto-sizing textarea that grows with content
 * <AutoSizedTextArea
 *   placeholder="Start typing and watch it grow..."
 *   autoSize={true}
 *   maxRows={10}
 * />
 *
 * // Limited height with scroll when exceeded
 * <AutoSizedTextArea
 *   value={longText}
 *   onChange={handleChange}
 *   autoSize={true}
 *   maxRows={5}
 *   className="max-h-[120px]"
 * />
 *
 * // Disable auto-sizing for fixed height
 * <AutoSizedTextArea
 *   autoSize={false}
 *   rows={3}
 *   placeholder="Fixed height textarea"
 * />
 * ```
 */
export type AutoSizedTextAreaProps = TextAreaProps & {
  /** Whether to automatically adjust height based on content */
  autoSize?: boolean;
  /** Maximum number of rows before scrolling is enabled */
  maxRows?: number;
};

const LINE_HEIGHT = 24; // px
const LINE_PADDING = 12; // px

/**
 * AutoSizedTextArea Component
 *
 * An enhanced textarea that automatically adjusts its height based on content,
 * providing a smooth user experience for variable-length text input.
 *
 * ## Features
 * - **Auto-Sizing**: Dynamically grows and shrinks based on content
 * - **Row Limits**: Configurable maximum rows before scrolling
 * - **Smooth Transitions**: Seamless height adjustments as user types
 * - **Scroll Management**: Automatic overflow handling when max height reached
 * - **Performance Optimized**: Efficient height calculations and updates
 *
 * ## Technical Details
 * - Line height: 24px with 12px padding
 * - Height calculation: `scrollHeight` vs `maxRows * lineHeight + padding`
 * - Resize: Disabled when auto-sizing is active for smooth experience
 * - Ref forwarding: Supports imperative access to textarea element
 *
 * ## Use Cases
 * - Chat message composition with dynamic sizing
 * - Comment forms that expand with content
 * - Note-taking interfaces with variable length
 * - Social media post creation
 * - Code snippet input with growth limits
 *
 * @example
 * ```tsx
 * // Chat-style auto-expanding textarea
 * const [message, setMessage] = useState('');
 *
 * <AutoSizedTextArea
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   placeholder="Type your message..."
 *   autoSize={true}
 *   maxRows={8}
 *   className="min-h-[40px]"
 *   onKeyDown={(e) => {
 *     if (e.key === 'Enter' && !e.shiftKey) {
 *       e.preventDefault();
 *       sendMessage(message);
 *       setMessage('');
 *     }
 *   }}
 * />
 *
 * // Note-taking with generous height limits
 * <AutoSizedTextArea
 *   defaultValue={note.content}
 *   onChange={handleNoteChange}
 *   placeholder="Write your notes here..."
 *   autoSize={true}
 *   maxRows={20}
 *   variant={InputVariant.DEFAULT}
 * />
 * ```
 */
export const AutoSizedTextArea: FC<AutoSizedTextAreaProps> = ({
  className,
  autoSize = true,
  onChange,
  maxRows = 999,
  ref,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => textAreaRef.current!);

  const adjustHeight = () => {
    const textAreaEl = textAreaRef.current;

    if (!textAreaEl || !autoSize) return;

    const textAreaStyle = textAreaEl.style;

    // Reset height to get accurate scrollHeight
    textAreaStyle.height = 'auto';
    const scrollHeight = textAreaEl.scrollHeight;
    const maxHeight = LINE_HEIGHT * maxRows + LINE_PADDING;
    const minHeight = LINE_HEIGHT + LINE_PADDING;

    // Set the new height
    textAreaStyle.height = `${Math.max(Math.min(scrollHeight, maxHeight), minHeight)}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [props.value, props.defaultValue, adjustHeight]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange?.(e);
    adjustHeight();
  };

  const setRef = (el: HTMLTextAreaElement | null) => {
    textAreaRef.current = el;
    if (el) {
      adjustHeight();
    }
  };

  return (
    <TextArea
      ref={setRef}
      onChange={handleChange}
      className={cn('overflow-y-auto', autoSize && 'resize-none', className)}
      {...props}
    />
  );
};
