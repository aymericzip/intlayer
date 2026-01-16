/**
 * Smoke test for Vue runtime markdown processor.
 *
 * This tests the critical paths:
 * 1. Fragment handling (symbols should not get slots)
 * 2. Component overrides (should get slots)
 * 3. Native tags (should not get slots)
 * 4. Props merging (className vs class)
 */

import { describe, expect, it, vi } from 'vitest';
import { defineComponent, Fragment, h } from 'vue';
import { vueRuntime } from './runtime';

describe('Vue Runtime', () => {
  describe('createElement', () => {
    it('should pass children directly for native HTML tags', () => {
      const result = vueRuntime.createElement(
        'div',
        { class: 'test' },
        'Hello'
      );

      expect(result).toBeDefined();
      // VNode for div with direct children
      expect((result as any).type).toBe('div');
    });

    it('should pass children directly for Fragment (symbol)', () => {
      // Fragment is a symbol in Vue - should NOT get slots
      const child1 = h('span', null, 'Child 1');
      const child2 = h('span', null, 'Child 2');

      const result = vueRuntime.createElement(Fragment, null, child1, child2);

      expect(result).toBeDefined();
      // Fragment should have type as symbol
      expect(typeof (result as any).type).toBe('symbol');
      // Children should be passed directly, not as slots
      expect((result as any).children).toBeDefined();
    });

    it('should wrap children in slots for user-defined components', () => {
      const MyComponent = defineComponent({
        props: ['msg'],
        setup(props, { slots }) {
          return () => h('div', null, slots.default?.());
        },
      });

      const result = vueRuntime.createElement(
        MyComponent,
        { msg: 'hello' },
        'Child content'
      );

      expect(result).toBeDefined();
      // Component vnode should have children as slots object
      const vnode = result as any;
      expect(typeof vnode.children).toBe('object');
      expect(typeof vnode.children?.default).toBe('function');
    });

    it('should wrap children in slots for functional components', () => {
      const FunctionalComponent = (props: any, { slots }: any) => {
        return h('div', null, slots.default?.());
      };

      const result = vueRuntime.createElement(
        FunctionalComponent,
        null,
        'Child content'
      );

      expect(result).toBeDefined();
      const vnode = result as any;
      // Functional component should also get slots
      expect(typeof vnode.children?.default).toBe('function');
    });

    it('should handle empty children for all types', () => {
      // Native tag
      const div = vueRuntime.createElement('div', { class: 'test' });
      expect(div).toBeDefined();

      // Fragment
      const frag = vueRuntime.createElement(Fragment, null);
      expect(frag).toBeDefined();

      // Component
      const Comp = defineComponent({ setup: () => () => h('div') });
      const comp = vueRuntime.createElement(Comp, null);
      expect(comp).toBeDefined();
    });
  });

  describe('normalizeProps', () => {
    it('should convert className to class', () => {
      const props = { className: 'my-class', id: 'test' };
      const normalized = vueRuntime.normalizeProps?.('div', props);

      expect(normalized?.class).toBe('my-class');
      expect(normalized?.className).toBeUndefined();
      expect(normalized?.id).toBe('test');
    });

    it('should convert htmlFor to for', () => {
      const props = { htmlFor: 'input-id' };
      const normalized = vueRuntime.normalizeProps?.('label', props);

      expect(normalized?.for).toBe('input-id');
      expect(normalized?.htmlFor).toBeUndefined();
    });

    it('should convert dangerouslySetInnerHTML to innerHTML', () => {
      const props = { dangerouslySetInnerHTML: { __html: '<b>test</b>' } };
      const normalized = vueRuntime.normalizeProps?.('div', props);

      expect(normalized?.innerHTML).toBe('<b>test</b>');
      expect(normalized?.dangerouslySetInnerHTML).toBeUndefined();
    });
  });

  describe('cloneElement', () => {
    it('should clone VNode with new props', () => {
      const original = h('div', { class: 'original' }, 'Content');
      const cloned = vueRuntime.cloneElement?.(original, { id: 'new-id' });

      expect(cloned).toBeDefined();
      expect((cloned as any).props?.id).toBe('new-id');
    });
  });

  describe('Fragment export', () => {
    it('should export Vue Fragment', () => {
      expect(vueRuntime.Fragment).toBe(Fragment);
    });
  });
});
