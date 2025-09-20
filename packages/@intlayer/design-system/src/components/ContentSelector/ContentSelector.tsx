'use client';

import type { FC, ReactNode } from 'react';
import { PressableSpan } from '../PressableSpan';

/**
 * Props for the ContentSelector component
 */
type ContentSelectorProps = {
  /**
   * The content to be displayed and made selectable
   * @example
   * ```tsx
   * <ContentSelector onSelect={() => startEditing()}>
   *   <h1>Selectable Heading</h1>
   * </ContentSelector>
   * ```
   */
  children: ReactNode;

  /**
   * Callback function triggered when content is selected via long press or keyboard
   * @example
   * ```tsx
   * <ContentSelector
   *   onSelect={() => setEditMode(true)}
   *   onUnselect={() => setEditMode(false)}
   * >
   *   Click content to edit
   * </ContentSelector>
   * ```
   */
  onSelect: () => void;

  /**
   * Optional callback function triggered when clicking outside the selected content
   * Used to deselect the content and exit edit/selection mode
   * @example
   * ```tsx
   * <ContentSelector
   *   onSelect={() => enterEditMode()}
   *   onUnselect={() => exitEditMode()}
   * >
   *   Editable content with auto-deselect
   * </ContentSelector>
   * ```
   */
  onUnselect?: () => void;

  /**
   * External control for the selection state
   * When provided, overrides the internal selection state
   * @example
   * ```tsx
   * <ContentSelector
   *   isSelecting={isInEditMode}
   *   onSelect={() => {}}
   * >
   *   Externally controlled content
   * </ContentSelector>
   * ```
   */
  isSelecting?: boolean;

  /**
   * Duration in milliseconds for long press detection
   * @default 400
   * @example
   * ```tsx
   * <ContentSelector
   *   pressDuration={600}
   *   onSelect={() => activateSlowSelection()}
   * >
   *   Requires longer press
   * </ContentSelector>
   * ```
   */
  pressDuration?: number;

  /**
   * Additional CSS classes for styling the selectable content
   * @example
   * ```tsx
   * <ContentSelector
   *   className="border-2 border-dashed border-blue-300"
   *   onSelect={() => {}}
   * >
   *   Styled selectable content
   * </ContentSelector>
   * ```
   */
  className?: string;

  /**
   * ARIA label for accessibility
   * Provides context about what happens when the content is selected
   * @example
   * ```tsx
   * <ContentSelector
   *   aria-label="Select to edit this content"
   *   onSelect={() => {}}
   * >
   *   Content with accessibility context
   * </ContentSelector>
   * ```
   */
  'aria-label'?: string;

  /**
   * ID of element providing additional description
   * @example
   * ```tsx
   * <ContentSelector
   *   aria-describedby="help-text"
   *   onSelect={() => {}}
   * >
   *   Content with help
   * </ContentSelector>
   * <div id="help-text">Long press to edit</div>
   * ```
   */
  'aria-describedby'?: string;
};

/**
 * ContentSelector - A higher-level wrapper around PressableSpan for content selection
 *
 * This component provides a semantic interface for making any content selectable through
 * long press gestures. It's specifically designed for content management interfaces
 * where users need to select text, images, or other elements to perform actions like
 * editing, moving, or applying operations.
 *
 * ## Key Features
 * - **Content Selection**: Makes any React content selectable via long press
 * - **Visual Feedback**: Inherits outline-based selection indicators from PressableSpan
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Click Outside**: Automatic deselection when clicking elsewhere
 * - **External Control**: Can be controlled externally for complex selection states
 *
 * ## Use Cases
 * - Content management systems with inline editing
 * - Text and media selection interfaces
 * - Interactive documentation with selectable sections
 * - Dashboard widgets with configurable content
 * - Form builders with selectable form elements
 *
 * ## Accessibility
 * - Inherits all accessibility features from PressableSpan
 * - Keyboard navigation with Tab, Enter, Space, and Escape
 * - Screen reader announcements for selection states
 * - Focus management and proper ARIA attributes
 *
 * @example
 * Basic content selection:
 * ```tsx
 * <ContentSelector onSelect={() => setIsEditing(true)}>
 *   <p>This paragraph becomes selectable</p>
 * </ContentSelector>
 * ```
 *
 * @example
 * With deselection handling:
 * ```tsx
 * <ContentSelector
 *   onSelect={() => setSelectedContent(contentId)}
 *   onUnselect={() => setSelectedContent(null)}
 * >
 *   <div className="content-block">
 *     <h2>Selectable Content Block</h2>
 *     <p>Long press to select this entire block</p>
 *   </div>
 * </ContentSelector>
 * ```
 *
 * @example
 * Controlled selection state:
 * ```tsx
 * <ContentSelector
 *   isSelecting={selectedItems.includes(itemId)}
 *   onSelect={() => selectItem(itemId)}
 *   onUnselect={() => deselectItem(itemId)}
 * >
 *   <ContentCard data={cardData} />
 * </ContentSelector>
 * ```
 */

export const ContentSelector: FC<ContentSelectorProps> = ({
  children,
  onSelect,
  onUnselect,
  isSelecting,
  pressDuration,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => (
  <PressableSpan
    onPress={onSelect}
    onClickOutside={onUnselect}
    isSelecting={isSelecting}
    pressDuration={pressDuration}
    className={className}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
  >
    {children}
  </PressableSpan>
);
