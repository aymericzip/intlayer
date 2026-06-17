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
} from './novel';

/**
 * Builds the list of slash-command suggestions. The image command needs the
 * runtime `uploadFn`, hence the factory.
 *
 * @param uploadFn - Novel upload handler used by the "Image" command.
 * @param content - The internationalized content object from useIntlayer.
 */
export const getSuggestionItems = (
  uploadFn: UploadFn,
  content: any
): SuggestionItem[] =>
  createSuggestionItems([
    {
      title: content.text.value,
      description: content.textDesc.value,
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
      title: content.todoList.value,
      description: content.todoListDesc.value,
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <CheckSquare className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: content.heading1.value,
      description: content.heading1Desc.value,
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
      title: content.heading2.value,
      description: content.heading2Desc.value,
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
      title: content.heading3.value,
      description: content.heading3Desc.value,
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
      title: content.bulletList.value,
      description: content.bulletListDesc.value,
      searchTerms: ['unordered', 'point'],
      icon: <List className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: content.numberedList.value,
      description: content.numberedListDesc.value,
      searchTerms: ['ordered'],
      icon: <ListOrdered className="size-10" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: content.quote.value,
      description: content.quoteDesc.value,
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
      title: content.code.value,
      description: content.codeDesc.value,
      searchTerms: ['codeblock'],
      icon: <Code className="size-10" />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: content.image.value,
      description: content.imageDesc.value,
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
      title: content.youtube.value,
      description: content.youtubeDesc.value,
      searchTerms: ['video', 'youtube', 'embed'],
      icon: <YoutubeLogo className="size-10" />,
      command: ({ editor, range }) => {
        const videoLink = prompt(content.youtubePrompt.value);
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
          alert(content.youtubeError.value);
        }
      },
    },
  ]);

/**
 * Builds the slash-command extension wired to the given upload handler.
 *
 * @param uploadFn - Novel upload handler used by the "Image" command.
 * @param content - The internationalized content object from useIntlayer.
 */
export const createSlashCommand = (uploadFn: UploadFn, content: any) => {
  const suggestionItems = getSuggestionItems(uploadFn, content);

  const slashCommand = Command.configure({
    suggestion: {
      items: () => suggestionItems,
      render: renderItems,
    },
  });

  return { slashCommand, suggestionItems };
};
