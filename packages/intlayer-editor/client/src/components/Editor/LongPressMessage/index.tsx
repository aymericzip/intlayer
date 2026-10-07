import { Container } from '@intlayer/design-system/container';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@intlayer/design-system/utils';
import {
  type FileContent,
  MessageKey,
  useCrossFrameState,
} from '@intlayer/editor-react';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';

/** Bordered chip naming a gesture, such as "Long press" or "⌘ + click". */
const GestureChip: FunctionComponent<{ children: ComponentChildren }> = ({
  children,
}) => (
  <span className="mx-1 whitespace-nowrap rounded-md border border-neutral px-1.5">
    {children}
  </span>
);

export const LongPressMessage: FunctionComponent = () => {
  const { message, longPress, modifierClick } =
    useIntlayer('long-press-message');
  const { isMac } = useDevice();
  const hoveredContent = useCrossFrameState<FileContent | null>(
    MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED,
    null
  );

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className={cn(
        'ml-1 p-1 pr-2 text-sm text-text transition-opacity duration-100',
        hoveredContent?.dictionaryKey ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Single text block so the message wraps as prose, not flex columns */}
      <p className="leading-6">
        {hoveredContent?.dictionaryKey
          ? message({
              longPress: <GestureChip>{longPress}</GestureChip>,
              modifierClick: (
                <GestureChip>
                  {modifierClick({ modifierKey: isMac ? '⌘' : 'Ctrl' })}
                </GestureChip>
              ),
              dictionaryKey: (
                <strong className="wrap-break-word mx-1">
                  {hoveredContent.dictionaryKey}
                </strong>
              ),
            })
          : ''}
      </p>
    </Container>
  );
};
