import { cx } from 'class-variance-authority';
import { CodeBlockShiki } from 'tiptap-extension-code-block-shiki';
import {
  AIHighlight,
  CharacterCount,
  Color,
  CustomKeymap,
  GlobalDragHandle,
  HighlightExtension,
  HorizontalRule,
  MarkdownExtension,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
  UploadImagesPlugin,
  Youtube,
} from './novel-';

const aiHighlight = AIHighlight;

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer'
    ),
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx('opacity-40 rounded-lg border border-stone-200'),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx('not-prose pl-2'),
  },
});

const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx('flex gap-2 items-start my-4'),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx('mt-4 mb-6 border-t border-muted-foreground'),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-3 -mt-2'),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-3 -mt-2'),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2'),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-4 border-primary'),
    },
  },
  // Disabled in favor of the shiki-powered `codeBlock` extension below.
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false',
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
});

/**
 * Code block with syntax highlighting powered by shiki (the same highlighter
 * the rest of the design-system uses in `IDE/CodeBlockShiki` and
 * `MarkDownRender`). Languages are lazy-loaded on demand and the dual
 * `github-light` / `github-dark` themes emit `--shiki-dark` CSS variables that
 * `markdown-editor.css` toggles under `[data-theme="dark"]`.
 */
const codeBlock = CodeBlockShiki.configure({
  defaultLanguage: null,
  defaultTheme: 'github-light',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  HTMLAttributes: {
    class: cx(
      'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium'
    ),
  },
});

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
  inline: false,
});

const characterCount = CharacterCount.configure();

const markdownExtension = MarkdownExtension.configure({
  html: true,
  tightLists: true,
  tightListClass: 'tight',
  bulletListMarker: '-',
  linkify: false,
  breaks: false,
  transformPastedText: false,
  transformCopiedText: false,
});

/**
 * Default Tiptap/Novel extensions powering the MarkdownEditor.
 *
 * The slash-command extension is intentionally not included here because it
 * needs a runtime image-upload handler; it is appended by the editor itself.
 */
export const defaultExtensions = [
  starterKit,
  Placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlock,
  youtube,
  characterCount,
  TiptapUnderline,
  markdownExtension,
  HighlightExtension,
  TextStyle,
  Color,
  CustomKeymap,
  GlobalDragHandle,
];
