import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod/mini';
import { getValueAtPath, setValueAtPath } from './formPath';
import { createFormInstance } from './formStore';

const schema = z.object({
  name: z.string().check(z.minLength(2, 'Too short')),
  grants: z.optional(z.record(z.string(), z.boolean())),
});

describe('formPath', () => {
  it('reads and writes nested dot paths without mutating the source', () => {
    const source = { grants: { 'dictionary:read': true }, name: 'a' };
    const updated = setValueAtPath(source, 'grants.dictionary:write', false);

    expect(getValueAtPath(updated, 'grants.dictionary:write')).toBe(false);
    expect(getValueAtPath(updated, 'grants.dictionary:read')).toBe(true);
    expect(getValueAtPath(source, 'grants.dictionary:write')).toBeUndefined();
    expect(getValueAtPath(updated, 'missing.path')).toBeUndefined();
  });
});

describe('createFormInstance', () => {
  it('computes validity from the default values and each change', () => {
    const form = createFormInstance(schema, { defaultValues: { name: 'a' } });

    expect(form.getState().isValid).toBe(false);
    form.setValue('name', 'ab');
    expect(form.getState().isValid).toBe(true);
  });

  it('in onSubmit mode, shows errors only once submitted, then on change', async () => {
    const form = createFormInstance(schema, { defaultValues: { name: '' } });
    const onValid = vi.fn();

    form.setValue('name', 'a');
    expect(form.getState().errors).toEqual({});

    await form.handleSubmit(onValid)();
    expect(onValid).not.toHaveBeenCalled();
    expect(form.getState().errors).toEqual({ name: 'Too short' });
    expect(form.getState().isSubmitted).toBe(true);

    form.setValue('name', 'ab');
    expect(form.getState().errors).toEqual({});
  });

  it('in onChange mode, shows the changed field error immediately', () => {
    const form = createFormInstance(schema, { mode: 'onChange' });

    form.setValue('name', 'a');
    expect(form.getState().errors).toEqual({ name: 'Too short' });
  });

  it('submits the parsed values and tracks isSubmitting', async () => {
    const form = createFormInstance(schema, { defaultValues: { name: 'ok' } });
    const submittingStates: boolean[] = [];
    const onValid = vi.fn(() => {
      submittingStates.push(form.getState().isSubmitting);
    });
    const preventDefault = vi.fn();

    await form.handleSubmit(onValid)({ preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(onValid).toHaveBeenCalledWith({ name: 'ok' });
    expect(submittingStates).toEqual([true]);
    expect(form.getState().isSubmitting).toBe(false);
  });

  it('focuses the first invalid registered element', async () => {
    const form = createFormInstance(schema);
    const element = { focus: vi.fn() } as unknown as HTMLElement;

    form.registerElement('name', element);
    await form.handleSubmit(vi.fn())();

    expect(element.focus).toHaveBeenCalled();
  });

  it('reset restores defaults, and passed values become the new defaults', () => {
    const form = createFormInstance(schema, { defaultValues: { name: 'a' } });

    form.setValue('name', 'changed');
    form.reset();
    expect(form.getValues('name')).toBe('a');

    form.reset({ name: 'next' });
    form.setValue('name', 'changed');
    form.reset();
    expect(form.getValues('name')).toBe('next');
  });

  it('watch fires on value changes only, until unsubscribed', async () => {
    const form = createFormInstance(schema, { defaultValues: { name: 'ok' } });
    const callback = vi.fn();
    const unsubscribe = form.watch(callback);

    await form.handleSubmit(vi.fn())();
    expect(callback).not.toHaveBeenCalled();

    form.setValue('grants.project:admin', true);
    expect(callback).toHaveBeenCalledWith({
      name: 'ok',
      grants: { 'project:admin': true },
    });

    unsubscribe();
    form.setValue('name', 'other');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
