import { describe, expect, it } from 'vitest';
import { extractErrorMessage } from './extractErrorMessage';

describe('extractErrorMessage', () => {
  it('returns message from JSON string with message field', () => {
    const input = JSON.stringify({ message: 'hello world' });
    expect(extractErrorMessage(input)).toBe('hello world');
  });

  it('returns string when JSON string is a raw string', () => {
    const input = JSON.stringify('just a string');
    expect(extractErrorMessage(input)).toBe('just a string');
  });

  it('returns original string when not valid JSON', () => {
    const input = 'not a json';
    expect(extractErrorMessage(input)).toBe('not a json');
  });

  it('parses Error.message when it is a JSON string with message', () => {
    const err = new Error(JSON.stringify({ message: 'boom' }));
    expect(extractErrorMessage(err)).toBe('boom');
  });

  it('returns Error.message when it is a plain string', () => {
    const err = new Error('boom msg');
    expect(extractErrorMessage(err)).toBe('boom msg');
  });

  it('prefers object.message when object passed directly', () => {
    const obj = { message: 'direct message' };
    expect(extractErrorMessage(obj)).toBe('direct message');
  });

  it('uses title and code when message is absent on object input', () => {
    const obj = { title: 'Error', code: 'E123' };
    expect(extractErrorMessage(obj)).toBe('Error (E123)');
  });

  it('uses title when only title is provided on object input', () => {
    const obj = { title: 'Only Title' };
    expect(extractErrorMessage(obj)).toBe('Only Title');
  });

  it('uses code when only code is provided on object input', () => {
    const obj = { code: 'ONLY_CODE' };
    expect(extractErrorMessage(obj)).toBe('ONLY_CODE');
  });

  it('falls back to String(object) when object is not serializable', () => {
    const obj: any = {};
    obj.self = obj; // circular
    expect(extractErrorMessage(obj)).toBe('[object Object]');
  });

  it('returns default message for undefined input', () => {
    expect(extractErrorMessage(undefined as any)).toBe(
      'An unknown error occurred'
    );
  });

  it('returns default message for non-string, non-object input', () => {
    expect(extractErrorMessage(123 as any)).toBe('An unknown error occurred');
  });

  it('parses Error.message JSON with title and code but no message', () => {
    const err = new Error(JSON.stringify({ title: 'Title', code: 'CODE' }));
    expect(extractErrorMessage(err)).toBe('Title (CODE)');
  });

  it('parses string JSON object without message but with title/code', () => {
    const input = JSON.stringify({ title: 'Server Error', code: '500' });
    expect(extractErrorMessage(input)).toBe('Server Error (500)');
  });
});
