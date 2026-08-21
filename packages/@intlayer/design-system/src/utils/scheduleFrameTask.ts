type FrameTask = () => void;

const pendingTasks = new Set<FrameTask>();
let frameRequestId: number | null = null;

const runPendingTasks = () => {
  frameRequestId = null;

  // Snapshot first: a task may queue another one, which belongs to the next
  // frame rather than to this loop.
  const tasks = [...pendingTasks];
  pendingTasks.clear();

  for (const task of tasks) task();
};

/**
 * Queues a layout-reading task, and runs every queued task inside a single
 * animation frame callback.
 *
 * A component reading `offsetTop` or `getBoundingClientRect()` from its own
 * `requestAnimationFrame` makes the browser recompute layout once per
 * component: React flushes the state updates of one callback before the next
 * callback runs, so every read after the first one is a forced reflow. Sharing
 * one callback keeps all the reads in the same batch, and React commits once,
 * after the last measurement.
 *
 * @param task - The measurement to run on the next frame. Queuing the same
 * function twice before the frame runs schedules it once.
 * @returns A function cancelling the task, and the frame itself once nothing
 * else is queued.
 *
 * @example
 * const cancelMeasurement = scheduleFrameTask(() => setWidth(el.offsetWidth));
 */
export const scheduleFrameTask = (task: FrameTask): (() => void) => {
  if (typeof requestAnimationFrame === 'undefined') return () => {};

  pendingTasks.add(task);

  frameRequestId ??= requestAnimationFrame(runPendingTasks);

  return () => {
    pendingTasks.delete(task);

    if (pendingTasks.size === 0 && frameRequestId !== null) {
      cancelAnimationFrame(frameRequestId);
      frameRequestId = null;
    }
  };
};
