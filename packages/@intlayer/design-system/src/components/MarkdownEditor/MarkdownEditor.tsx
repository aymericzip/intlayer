'use client';

import { useAuthEnable } from '@api/hooks/utils';
import type { AssetAPI } from '@intlayer/backend-contract/asset';
import { cn } from '@utils/cn';
import { type FC, useMemo, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AssetLibraryModal } from './AssetLibraryModal';
import { defaultExtensions } from './extensions';
import { GenerativeMenuSwitch } from './generative/GenerativeMenuSwitch';
import {
  type CreateEditorUploadFnOptions,
  createEditorUploadFn,
} from './imageUpload';
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
  ImageResizer,
} from './novel';
import { ColorSelector } from './selectors/ColorSelector';
import { LinkSelector } from './selectors/LinkSelector';
import { NodeSelector } from './selectors/NodeSelector';
import { TextButtons } from './selectors/TextButtons';
import { createSlashCommand } from './slashCommand';

const Divider = () => <div className="h-full w-px shrink-0 bg-border" />;

export type MarkdownEditorProps = {
  /** Initial markdown value. */
  defaultValue?: string;
  /** Called with the serialized markdown on every change. */
  onChange?: (markdown: string) => void;
  /** Whether the document can be edited. Defaults to `true`. */
  editable?: boolean;
  /** Enables the AI bubble menu ("Ask AI"). Defaults to `true`. */
  enableAI?: boolean;
  /**
   * Custom image uploader. When omitted, images are embedded inline as base64
   * data URLs (no backend required).
   */
  uploadImage?: CreateEditorUploadFnOptions['uploadImage'];
  /** Maximum allowed image size in megabytes. Defaults to `20`. */
  maxImageSizeMb?: number;
  /**
   * Lists the project's uploaded assets in the slash menu ("Asset library").
   * Only effective when a user and a project are authenticated. Defaults to
   * `true`.
   */
  enableAssetLibrary?: boolean;
  /** Class applied to the editor surface. */
  className?: string;
};

/**
 * Notion-style WYSIWYG markdown editor built on Novel / Tiptap.
 *
 * Features a slash command menu, a formatting bubble menu (node / link / color
 * / inline marks), image upload (drop / paste / slash), insertion from the
 * project asset library, and an optional AI assistant wired to the Intlayer AI
 * backend.
 *
 * The value contract is markdown: pass `defaultValue` as a markdown string and
 * read changes from `onChange`.
 */
export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  defaultValue,
  onChange,
  editable = true,
  enableAI = true,
  uploadImage,
  maxImageSizeMb,
  enableAssetLibrary = true,
  className,
}) => {
  const [openAI, setOpenAI] = useState(false);
  const [isAssetLibraryOpen, setIsAssetLibraryOpen] = useState(false);
  const assetTargetEditorRef = useRef<EditorInstance | null>(null);
  const content = useIntlayer('markdown-editor');
  const { enable: isAuthenticatedOnProject } = useAuthEnable({
    requireUser: true,
    requireProject: true,
  });
  const isAssetLibraryEnabled = enableAssetLibrary && isAuthenticatedOnProject;

  const uploadFn = useMemo(
    () => createEditorUploadFn({ uploadImage, maxSizeMb: maxImageSizeMb }),
    [uploadImage, maxImageSizeMb]
  );

  const { extensions, suggestionItems } = useMemo(() => {
    const { slashCommand, suggestionItems: items } = createSlashCommand(
      uploadFn,
      content,
      {
        onOpenAssetLibrary: isAssetLibraryEnabled
          ? (editor) => {
              assetTargetEditorRef.current = editor;
              setIsAssetLibraryOpen(true);
            }
          : undefined,
      }
    );

    return {
      extensions: [...defaultExtensions, slashCommand],
      suggestionItems: items,
    };
  }, [uploadFn, content, isAssetLibraryEnabled]);

  const closeAssetLibrary = () => {
    setIsAssetLibraryOpen(false);
    assetTargetEditorRef.current?.commands.focus();
  };

  const insertAsset = (asset: AssetAPI) => {
    assetTargetEditorRef.current
      ?.chain()
      .focus()
      .setImage({
        src: asset.publicUrl,
        alt: asset.alt ?? asset.originalName,
        title: asset.caption,
      })
      .run();
    setIsAssetLibraryOpen(false);
  };

  const handleUpdate = ({ editor }: { editor: EditorInstance }) => {
    onChange?.(editor.storage.markdown.getMarkdown() as string);
  };

  const toolbar = (
    <>
      <NodeSelector />
      <Divider />
      <LinkSelector />
      <Divider />
      <TextButtons />
      <Divider />
      <ColorSelector />
    </>
  );

  return (
    <div className="relative w-full">
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          editable={editable}
          initialContent={defaultValue ?? ''}
          extensions={extensions}
          className={cn('min-h-[350px] w-full max-w-full', className)}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              // Content typography (headings, lists, spacing) is defined in
              // `markdown-editor.css`, scoped to `.ProseMirror` — this project
              // has no Tailwind `prose` plugin.
              class: 'max-w-full ps-6 focus:outline-none',
            },
          }}
          onUpdate={handleUpdate}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-lg border bg-card px-1 py-2 text-foreground shadow-xl transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              {content.noResults.value}
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-start text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex size-10 items-center justify-center rounded-md border border-card bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          {enableAI ? (
            <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
              {toolbar}
            </GenerativeMenuSwitch>
          ) : (
            <EditorBubble
              options={{ placement: 'top' }}
              className="flex w-fit max-w-[90vw] rounded-lg border-[1.3px] bg-card/95 text-foreground shadow-xl backdrop-blur [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl"
            >
              {toolbar}
            </EditorBubble>
          )}
        </EditorContent>
      </EditorRoot>

      {isAssetLibraryEnabled && (
        <AssetLibraryModal
          isOpen={isAssetLibraryOpen}
          onClose={closeAssetLibrary}
          onSelect={insertAsset}
        />
      )}
    </div>
  );
};
