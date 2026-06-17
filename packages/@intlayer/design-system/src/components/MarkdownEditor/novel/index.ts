// Components
export {
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorContentProps,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
  useEditor,
} from './components';

// Extensions
export {
  AIHighlight,
  addAIHighlight,
  CharacterCount,
  Color,
  Command,
  CustomKeymap,
  createSuggestionItems,
  GlobalDragHandle,
  HighlightExtension,
  HorizontalRule,
  handleCommandNavigation,
  ImageResizer,
  InputRule,
  MarkdownExtension,
  Placeholder,
  removeAIHighlight,
  renderItems,
  StarterKit,
  type SuggestionItem,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
  Youtube,
} from './extensions';

// Plugins
export {
  createImageUpload,
  handleImageDrop,
  handleImagePaste,
  type ImageUploadOptions,
  type UploadFn,
  UploadImagesPlugin,
} from './plugins';

// Utils
export {
  getAllContent,
  getPrevText,
  getUrlFromString,
  isValidUrl,
} from './utils';

// Store
export { queryStore, rangeStore, useQuery, useRange } from './utils/atoms';
