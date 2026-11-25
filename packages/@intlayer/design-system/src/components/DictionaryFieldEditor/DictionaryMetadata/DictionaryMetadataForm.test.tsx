import type { Dictionary } from '@intlayer/types/dictionary';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DictionaryMetadataForm } from './DictionaryMetadataForm';

const editorState = vi.hoisted(() => ({
  editedContent: {} as Record<string, Partial<Dictionary>>,
  setEditedDictionary: vi.fn(),
}));

vi.mock('@intlayer/editor-react', () => ({
  useEditedContent: () => editorState,
}));

vi.mock('react-intlayer', () => {
  const label = (value: string) =>
    Object.assign(String(value), { value }) as unknown as string;

  return {
    useIntlayer: () => ({
      description: 'Description',
      fieldName: label('Field'),
      fieldValue: label('Value'),
      addField: label('Add field'),
      removeField: label('Remove field'),
    }),
  };
});

const dictionary = {
  key: 'blog',
  localId: 'blog::local::src/blog/article1.fr.content.md',
  locale: 'fr',
  metadata: { title: 'Mon article', tags: ['news'] },
  content: {},
} as unknown as Dictionary;

describe('DictionaryMetadataForm', () => {
  beforeEach(() => {
    editorState.editedContent = {};
    editorState.setEditedDictionary.mockClear();
  });

  it('writes an edited value into the edited dictionary', () => {
    render(<DictionaryMetadataForm dictionary={dictionary} />);

    fireEvent.change(screen.getByDisplayValue('Mon article'), {
      target: { value: 'Nouveau titre' },
    });

    expect(editorState.setEditedDictionary).toHaveBeenCalledWith(
      expect.objectContaining({
        localId: dictionary.localId,
        metadata: { title: 'Nouveau titre', tags: ['news'] },
      })
    );
  });

  it('removes a field', () => {
    render(<DictionaryMetadataForm dictionary={dictionary} />);

    fireEvent.click(screen.getAllByLabelText('Remove field')[1]!);

    expect(editorState.setEditedDictionary).toHaveBeenCalledWith(
      expect.objectContaining({ metadata: { title: 'Mon article' } })
    );
  });

  it('shows the saved metadata again once the edits are discarded', () => {
    editorState.editedContent = {
      [dictionary.localId!]: { metadata: { title: 'Brouillon' } },
    };
    const { rerender } = render(
      <DictionaryMetadataForm dictionary={dictionary} />
    );
    expect(screen.getByDisplayValue('Brouillon')).toBeTruthy();

    editorState.editedContent = {};
    rerender(<DictionaryMetadataForm dictionary={dictionary} />);

    expect(screen.getByDisplayValue('Mon article')).toBeTruthy();
  });
});
