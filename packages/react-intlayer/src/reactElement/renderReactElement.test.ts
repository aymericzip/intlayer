import { createElement, Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { renderReactElement } from './renderReactElement';

describe('renderReactElement', () => {
  it('should render a simple string', () => {
    const element = 'Hello World' as any;
    const result = renderReactElement(element);
    expect(result).toBe('Hello World');
  });

  it('should render a simple number', () => {
    const element = 123 as any;
    const result = renderReactElement(element);
    expect(result).toBe(123);
  });

  it('should render null', () => {
    const element = null as any;
    const result = renderReactElement(element);
    expect(result).toBe(null);
  });

  it('should render a React element', () => {
    const element = createElement('div', { id: 'test' }, 'Hello');
    const result = renderReactElement(element);
    expect(result.type).toBe('div');
    expect(result.props.id).toBe('test');
    // React simplifies single child to a non-array
    expect(result.props.children).toBe('Hello');
  });

  it('should render a React element with multiple children', () => {
    const element = createElement('div', { id: 'test' }, 'Hello', ' ', 'World');
    const result = renderReactElement(element);
    expect(result.type).toBe('div');
    expect(result.props.children).toEqual(['Hello', ' ', 'World']);
  });

  it('should render a React element with children including null and numbers', () => {
    const element = createElement(
      'div',
      {},
      'Hello',
      123,
      null,
      createElement('span', {}, 'World')
    );
    const result = renderReactElement(element as any);
    expect(result.type).toBe('div');
    expect(result.props.children).toHaveLength(4);
    expect(result.props.children[0]).toBe('Hello');
    expect(result.props.children[1]).toBe(123);
    expect(result.props.children[2]).toBe(null);
    expect(result.props.children[3].type).toBe('span');
    expect(result.props.children[3].props.children).toBe('World');
  });

  it('should render Fragments correctly', () => {
    const element = createElement(
      Fragment,
      null,
      createElement('span', null, 'test')
    );
    const result = renderReactElement(element);
    // Fragment type is a symbol or object depending on React version/env
    expect(result.type).toBe(Fragment);
    expect(result.props.children.type).toBe('span');
  });

  it('should handle nested structures similar to insertion plugin', () => {
    // Simulated result from splitAndJoinInsertion
    const element = createElement(
      Fragment,
      null,
      createElement(Fragment, { key: 0 }, 'test '),
      createElement(
        Fragment,
        { key: 1 },
        createElement('span', null, '2000000')
      )
    );

    const result = renderReactElement(element);
    expect(result.type).toBe(Fragment);
    expect(result.props.children).toHaveLength(2);
    expect(result.props.children[0].type).toBe(Fragment);
    expect(result.props.children[0].props.children).toBe('test ');
    expect(result.props.children[1].type).toBe(Fragment);
    expect(result.props.children[1].props.children.type).toBe('span');
    expect(result.props.children[1].props.children.props.children).toBe(
      '2000000'
    );
  });
});
