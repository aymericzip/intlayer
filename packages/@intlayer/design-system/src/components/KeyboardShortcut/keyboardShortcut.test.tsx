import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
} from '@testing-library/react'; // 加上 createEvent
import { describe, expect, test, vi } from 'vitest';
import { KeyboardShortcut } from './KeyboardShortcut';

// 模拟 Mac 环境，确保 ⌘ 逻辑生效
vi.mock('@hooks/useDevice', () => ({
  useDevice: () => ({ isMac: true }),
}));

describe('KeyboardShortcut', () => {
  // ... 前面的测试保持不变 ...

  test('prevents default behavior when shortcut is triggered', async () => {
    const mockCallback = vi.fn();
    render(<KeyboardShortcut shortcut="⌘ + F" onTriggered={mockCallback} />);

    // 1. 使用 createEvent 创建一个标准的键盘事件
    const event = createEvent.keyDown(window, {
      key: 'f',
      metaKey: true,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      cancelable: true, // 必须为 true，否则 preventDefault 不起作用
    });

    // 2. 监听这个事件对象上的 preventDefault 方法
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    // 3. 发送这个已经挂载了监听器的事件
    await act(async () => {
      fireEvent(window, event);
    });

    // 4. 断言
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
