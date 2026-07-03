/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node<T> {
  value: T;
  next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export class Queue<T> {
  #head: Node<T> | undefined;
  #tail: Node<T> | undefined;
  #size!: number;

  constructor() {
    this.clear();
  }

  enqueue(value: T): void {
    const node = new Node(value);

    if (this.#head) {
      this.#tail!.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }

    this.#size++;
  }

  dequeue(): T | undefined {
    const current = this.#head;
    if (!current) {
      return;
    }

    this.#head = current.next;
    this.#size--;
    return current.value;
  }

  peek(): T | undefined {
    if (!this.#head) {
      return;
    }

    return this.#head.value;

    // TODO: Node.js 18.
    // return this.#head?.value;
  }

  clear(): void {
    this.#head = undefined;
    this.#tail = undefined;
    this.#size = 0;
  }

  get size(): number {
    return this.#size;
  }

  *[Symbol.iterator](): Generator<T, void, unknown> {
    let current = this.#head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  *drain(): Generator<T | undefined, void, unknown> {
    while (this.#head) {
      yield this.dequeue();
    }
  }
}

export const pLimit = (concurrency: number) => {
  validateConcurrency(concurrency);

  const queue = new Queue<() => void>();
  let activeCount = 0;

  const idleWaiters: Array<() => void> = [];
  const notifyIdleIfNeeded = (): void => {
    if (activeCount === 0 && queue.size === 0) {
      while (idleWaiters.length) idleWaiters.pop()?.();
    }
  };

  const resumeNext = (): void => {
    // Process the next queued function if we're under the concurrency limit
    if (activeCount < concurrency && queue.size > 0) {
      activeCount++;
      queue.dequeue()?.();
    }
  };

  const next = (): void => {
    activeCount--;
    resumeNext();
  };

  const run = async (
    fn: (...args: any[]) => Promise<any>,
    resolve: (value: Promise<any>) => void,
    arguments_: any[]
  ): Promise<void> => {
    // Execute the function and capture the result promise
    const result = (async () => fn(...arguments_))();

    // Resolve immediately with the promise (don't wait for completion)
    resolve(result);

    // Wait for the function to complete (success or failure)
    // We catch errors here to prevent unhandled rejections,
    // but the original promise rejection is preserved for the caller
    try {
      await result;
    } catch {}

    // Decrement active count and process next queued function
    next();
  };

  const enqueue = (
    fn: (...args: any[]) => Promise<any>,
    resolve: (value: Promise<any>) => void,
    arguments_: any[]
  ): void => {
    // Queue the internal resolve function instead of the run function
    // to preserve the asynchronous execution context.
    new Promise<void>((internalResolve) => {
      queue.enqueue(internalResolve);
    }).then(run.bind(undefined, fn, resolve, arguments_));

    // Start processing immediately if we haven't reached the concurrency limit
    if (activeCount < concurrency) {
      resumeNext();
    }
  };

  const generator = (
    fn: (...args: any[]) => Promise<any>,
    ...arguments_: any[]
  ): Promise<any> =>
    new Promise<any>((resolve) => {
      enqueue(fn, resolve, arguments_);
    });

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.size,
    },
    clearQueue: {
      value() {
        queue.clear();
        notifyIdleIfNeeded();
      },
    },
    concurrency: {
      get: () => concurrency,

      set(newConcurrency: number) {
        validateConcurrency(newConcurrency);
        concurrency = newConcurrency;

        queueMicrotask(() => {
          while (activeCount < concurrency && queue.size > 0) {
            resumeNext();
          }
        });
      },
    },
    map: {
      async value<T, R>(
        array: T[],
        fn: (value: T, index: number) => Promise<R>
      ): Promise<R[]> {
        const promises = array.map((value, index) => this(fn, value, index));
        return Promise.all(promises);
      },
    },
    onIdle: {
      /**
       * Resolves when `activeCount === 0` and the queue is empty.
       * Use this to wait for completion without holding a list of Promises.
       */
      value(): Promise<void> {
        if (activeCount === 0 && queue.size === 0) return Promise.resolve();
        return new Promise<void>((resolve) => idleWaiters.push(resolve));
      },
    },
  });

  return generator;
};

const validateConcurrency = (concurrency: number): void => {
  if (
    !(
      (Number.isInteger(concurrency) ||
        concurrency === Number.POSITIVE_INFINITY) &&
      concurrency > 0
    )
  ) {
    throw new TypeError('Expected `concurrency` to be a number from 1 and up');
  }
};
