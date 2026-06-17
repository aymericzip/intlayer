import { YoutubeLogo } from '@components/SocialNetworks';
import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  Text,
  TextQuote,
} from 'lucide-react';
import {
  Command,
  createSuggestionItems,
  renderItems,
  type SuggestionItem,
  type UploadFn,
} from './novel-';

/**
 * Builds the list of slash-command suggestions. The image command needs the
 * runtime `uploadFn`, hence the factory.
 *
 * @param uploadFn - Novel upload handler used by the "Image" command.
 */
export const getSuggestionItems = (uploadFn: UploadFn): SuggestionItem[] =>
  createSuggestionItems([
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: <Text className="size-10" />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run();
      },
    },
    {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <CheckSquare className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: <Heading1 className="size-10" />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium'],
      icon: <Heading2 className="size-10" />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small'],
      icon: <Heading3 className="size-10" />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: <List className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: <ListOrdered className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote'],
      icon: <TextQuote className="size-10" />,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock'],
      icon: <Code className="size-10" />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: 'Image',
      description: 'Upload an image from your computer.',
      searchTerms: ['photo', 'picture', 'media'],
      icon: <ImageIcon className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
          if (input.files?.length) {
            const file = input.files[0];
            const pos = editor.view.state.selection.from;
            uploadFn(file, editor.view, pos);
          }
        };
        input.click();
      },
    },
    {
      title: 'Youtube',
      description: 'Embed a Youtube video.',
      searchTerms: ['video', 'youtube', 'embed'],
      icon: <YoutubeLogo className="size-10" />,
      command: ({ editor, range }) => {
        const videoLink = prompt('Please enter Youtube Video Link');
        // From https://regexr.com/3dj5t
        const ytRegex =
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

        if (videoLink && ytRegex.test(videoLink)) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setYoutubeVideo({ src: videoLink })
            .run();
        } else if (videoLink !== null) {
          alert('Please enter a correct Youtube Video Link');
        }
      },
    },
  ]);

/**
 * Builds the slash-command extension wired to the given upload handler.
 *
 * @param uploadFn - Novel upload handler used by the "Image" command.
 */
export const createSlashCommand = (uploadFn: UploadFn) => {
  const suggestionItems = getSuggestionItems(uploadFn);

  const slashCommand = Command.configure({
    suggestion: {
      items: () => suggestionItems,
      render: renderItems,
    },
  });

  return { slashCommand, suggestionItems };
};
