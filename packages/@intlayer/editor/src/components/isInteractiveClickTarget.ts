/** Elements whose click already does something in the application. */
const INTERACTIVE_ELEMENT_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'summary',
  'option',
  'video[controls]',
  'audio[controls]',
  '[contenteditable=""]',
  '[contenteditable="true"]',
  '[onclick]',
  ...[
    'button',
    'link',
    'checkbox',
    'radio',
    'switch',
    'tab',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'combobox',
    'slider',
    'spinbutton',
    'textbox',
  ].map((role) => `[role="${role}"]`),
].join(',');

/** Tag prefix of the editor's own elements, which are never app controls. */
const EDITOR_ELEMENT_PREFIX = 'intlayer-';

const isEditorElement = (element: Element): boolean => {
  if (element.localName.startsWith(EDITOR_ELEMENT_PREFIX)) return true;

  const root = element.getRootNode();

  // Internals of the editor elements (their `role="button"` wrapper, slots…)
  return (
    root instanceof ShadowRoot &&
    root.host.localName.startsWith(EDITOR_ELEMENT_PREFIX)
  );
};

/**
 * Whether a click on editable content lands on something the application
 * handles itself: a link, a button, a form control, or an ancestor rendered as
 * clickable (`cursor: pointer`, the mark of delegated handlers such as React
 * `onClick`). Such clicks keep their behavior; the content is then selected
 * with a long press or a modifier click instead.
 *
 * The cursor is only read on ancestors of the editor elements: content inside
 * them inherits the selector's own pointer cursor.
 *
 * @param event - Click event, read through its composed path
 */
export const isInteractiveClickTarget = (event: Event): boolean => {
  const elements = event
    .composedPath()
    .filter((node): node is Element => node instanceof Element);

  const outermostEditorIndex = elements.findLastIndex(isEditorElement);

  return elements.some((element, index) => {
    if (isEditorElement(element)) return false;
    if (element.matches(INTERACTIVE_ELEMENT_SELECTOR)) return true;

    const isAncestorOfEditorElement = index > outermostEditorIndex;

    return (
      isAncestorOfEditorElement &&
      getComputedStyle(element).cursor === 'pointer'
    );
  });
};
