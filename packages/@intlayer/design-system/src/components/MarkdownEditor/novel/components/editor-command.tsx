import type { Range } from '@tiptap/core';
import { Command } from 'cmdk';
import type { ComponentPropsWithoutRef, FC, Ref } from 'react';
import { createContext, useEffect } from 'react';
import type tunnel from 'tunnel-rat';
import { queryStore, rangeStore, useQuery } from '../utils/atoms';

export const EditorCommandTunnelContext = createContext(
  {} as ReturnType<typeof tunnel>
);

interface EditorCommandOutProps {
  readonly query: string;
  readonly range: Range;
}

export const EditorCommandOut: FC<EditorCommandOutProps> = ({
  query,
  range,
}) => {
  useEffect(() => {
    queryStore.setValue(query);
  }, [query]);

  useEffect(() => {
    rangeStore.setValue(range);
  }, [range]);

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        const commandRef = document.querySelector('#slash-command');

        if (commandRef)
          commandRef.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: e.key,
              cancelable: true,
              bubbles: true,
            })
          );

        return false;
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <EditorCommandTunnelContext.Consumer>
      {(tunnelInstance) => <tunnelInstance.Out />}
    </EditorCommandTunnelContext.Consumer>
  );
};

export const EditorCommand: FC<
  ComponentPropsWithoutRef<typeof Command> & {
    readonly ref?: Ref<HTMLDivElement>;
  }
> = ({ children, className, ref, ...rest }) => {
  const query = useQuery();

  return (
    <EditorCommandTunnelContext.Consumer>
      {(tunnelInstance) => (
        <tunnelInstance.In>
          <Command
            ref={ref}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            id="slash-command"
            className={className}
            {...rest}
          >
            <Command.Input
              value={query}
              onValueChange={queryStore.setValue}
              style={{ display: 'none' }}
            />
            {children}
          </Command>
        </tunnelInstance.In>
      )}
    </EditorCommandTunnelContext.Consumer>
  );
};
export const EditorCommandList = Command.List;
