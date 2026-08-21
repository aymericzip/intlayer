import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { scheduleFrameTask } from './scheduleFrameTask';

/** Frame callbacks queued by the scheduler, keyed by their handle. */
let queuedFrames = new Map<number, FrameRequestCallback>();
let nextFrameHandle = 1;

const runQueuedFrames = () => {
  const frames = [...queuedFrames.values()];
  queuedFrames.clear();

  for (const frame of frames) frame(performance.now());
};

beforeEach(() => {
  queuedFrames = new Map();
  nextFrameHandle = 1;

  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    const handle = nextFrameHandle++;
    queuedFrames.set(handle, callback);
    return handle;
  });

  vi.stubGlobal('cancelAnimationFrame', (handle: number) => {
    queuedFrames.delete(handle);
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('scheduleFrameTask', () => {
  test('runs every queued task inside a single frame', () => {
    const runOrder: string[] = [];

    scheduleFrameTask(() => runOrder.push('first'));
    scheduleFrameTask(() => runOrder.push('second'));
    scheduleFrameTask(() => runOrder.push('third'));

    expect(queuedFrames.size).toBe(1);

    runQueuedFrames();

    expect(runOrder).toEqual(['first', 'second', 'third']);
  });

  test('queues the same task once', () => {
    const task = vi.fn();

    scheduleFrameTask(task);
    scheduleFrameTask(task);

    runQueuedFrames();

    expect(task).toHaveBeenCalledTimes(1);
  });

  test('runs a task queued from within a frame on the next frame', () => {
    const followUpTask = vi.fn();

    scheduleFrameTask(() => {
      scheduleFrameTask(followUpTask);
    });

    runQueuedFrames();
    expect(followUpTask).not.toHaveBeenCalled();

    runQueuedFrames();
    expect(followUpTask).toHaveBeenCalledTimes(1);
  });

  test('cancelling a task leaves the other ones queued', () => {
    const keptTask = vi.fn();
    const cancelledTask = vi.fn();

    scheduleFrameTask(keptTask);
    const cancel = scheduleFrameTask(cancelledTask);

    cancel();

    expect(queuedFrames.size).toBe(1);

    runQueuedFrames();

    expect(keptTask).toHaveBeenCalledTimes(1);
    expect(cancelledTask).not.toHaveBeenCalled();
  });

  test('cancelling the last task releases the frame', () => {
    const task = vi.fn();

    const cancel = scheduleFrameTask(task);
    cancel();

    expect(queuedFrames.size).toBe(0);

    // A later task still gets a frame of its own.
    scheduleFrameTask(task);
    expect(queuedFrames.size).toBe(1);

    runQueuedFrames();
    expect(task).toHaveBeenCalledTimes(1);
  });
});
