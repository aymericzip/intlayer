import * as os from 'node:os';
import { ps } from './ps';
import { wmic } from './wmic';

type Platform =
  | 'darwin'
  | 'sunos'
  | 'freebsd'
  | 'netbsd'
  | 'win'
  | 'linux'
  | 'aix';
type Method = 'ps' | 'wmic';

type ProcessList = [number, number][]; // [PPID, PID][]

interface ListOptions {
  root?: boolean;
  advanced?: boolean;
}

type ProcessInfo = { pid: number; ppid?: number };
type ResultType<T extends ListOptions | undefined> = T extends {
  advanced: true;
}
  ? ProcessInfo[]
  : number[];

type ProcessListCallback = (err: Error | null, list?: ProcessList) => void;
type ListCallback<T extends ListOptions | undefined> = (
  err: Error | null,
  list?: ResultType<T>
) => void;

type ProcessListFn = (callback: ProcessListCallback) => void;

const platformToMethod: Record<Platform, Method> = {
  darwin: 'ps',
  sunos: 'ps',
  freebsd: 'ps',
  netbsd: 'ps',
  win: 'wmic',
  linux: 'ps',
  aix: 'ps',
};

const methodToFn: Record<Method, ProcessListFn> = {
  ps,
  wmic,
};

let platform: string = os.platform();
if (platform.startsWith('win')) {
  platform = 'win';
}

const method: Method | undefined = platformToMethod[platform as Platform];

/**
 * Gets the list of all the pids of the system.
 */
const getAll = (callback: ProcessListCallback): void => {
  if (method === undefined) {
    callback(
      new Error(
        os.platform() +
          ' is not supported yet, please open an issue (https://github.com/simonepri/pidtree)'
      ),
      undefined
    );
    return;
  }

  const listFn = methodToFn[method];
  listFn(callback);
};

/**
 * Get the list of children and grandchildren pids of the given PID.
 * @param PID A PID. If -1 will return all the pids.
 * @param options Optional options object.
 * @param callback Called when the list is ready.
 */
const pidtree = <T extends ListOptions | undefined>(
  PID: number | string,
  options: T | ListCallback<T> | undefined,
  callback?: ListCallback<T>
): void => {
  let normalizedOptions: ListOptions;
  let normalizedCallback: ListCallback<T>;

  if (typeof options === 'function') {
    normalizedCallback = options;
    normalizedOptions = {};
  } else {
    normalizedCallback = callback!;
    normalizedOptions = typeof options === 'object' ? options : {};
  }

  const parsedPID = parseInt(String(PID), 10);
  if (Number.isNaN(parsedPID) || parsedPID < -1) {
    normalizedCallback(
      new TypeError('The pid provided is invalid') as Error,
      undefined
    );
    return;
  }

  getAll((err, processList) => {
    if (err) {
      normalizedCallback(err, undefined);
      return;
    }

    if (!processList) {
      normalizedCallback(new Error('Failed to get process list'), undefined);
      return;
    }

    // If the user wants the whole list just return it
    if (parsedPID === -1) {
      const result = processList.map(([ppid, pid]) =>
        normalizedOptions.advanced ? { ppid, pid } : pid
      ) as ResultType<T>;

      normalizedCallback(null, result);
      return;
    }

    let root: ProcessInfo | number | undefined;
    for (let l = 0; l < processList.length; l++) {
      if (processList[l][1] === parsedPID) {
        root = normalizedOptions.advanced
          ? { ppid: processList[l][0], pid: parsedPID }
          : parsedPID;
        break;
      }

      if (processList[l][0] === parsedPID) {
        root = normalizedOptions.advanced ? { pid: parsedPID } : parsedPID; // Special pids like 0 on *nix
      }
    }

    if (root === undefined) {
      normalizedCallback(new Error('No matching pid found'), undefined);
      return;
    }

    // Build the adjacency Hash Map (pid -> [children of pid])
    const tree: Record<number, number[]> = {};
    const listCopy = [...processList];
    while (listCopy.length > 0) {
      const element = listCopy.pop()!;
      if (tree[element[0]]) {
        tree[element[0]].push(element[1]);
      } else {
        tree[element[0]] = [element[1]];
      }
    }

    // Starting by the PID provided by the user, traverse the tree using the
    // adjacency Hash Map until the whole subtree is visited.
    // Each pid encountered while visiting is added to the pids array.
    let idx = 0;
    const pids: (ProcessInfo | number)[] = [root];
    while (idx < pids.length) {
      const curpid = normalizedOptions.advanced
        ? (pids[idx++] as ProcessInfo).pid
        : (pids[idx++] as number);
      if (!tree[curpid]) continue;
      const length = tree[curpid].length;
      for (let j = 0; j < length; j++) {
        pids.push(
          normalizedOptions.advanced
            ? { ppid: curpid, pid: tree[curpid][j] }
            : tree[curpid][j]
        );
      }

      delete tree[curpid];
    }

    if (!normalizedOptions.root) {
      pids.shift(); // Remove root
    }

    normalizedCallback(null, pids as ResultType<T>);
  });
};

const pify = <T extends ListOptions | undefined>(
  fn: typeof pidtree,
  arg1: number | string,
  arg2: T | undefined
): Promise<ResultType<T>> => {
  return new Promise((resolve, reject) => {
    fn(arg1, arg2, (err, data) => {
      if (err) return reject(err);
      if (data === undefined) {
        return reject(new Error('No data returned'));
      }
      resolve(data);
    });
  });
};

// Node versions prior to 4.0.0 do not define have `startsWith`.
/* istanbul ignore if */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (suffix: string): boolean {
    return this.substring(0, suffix.length) === suffix;
  };
}

/**
 * Get the list of children pids of the given pid.
 * @param pid A PID. If -1 will return all the pids.
 * @param options Optional options object.
 * @param callback Called when the list is ready. If not provided a promise is returned instead.
 * @returns Only when the callback is not provided.
 */
export const list = <T extends ListOptions | undefined>(
  pid: number | string,
  options?: T | ListCallback<T>,
  callback?: ListCallback<T>
): Promise<ResultType<T>> | undefined => {
  if (typeof options === 'function') {
    pidtree(pid, undefined, options);
    return;
  }

  if (typeof callback === 'function') {
    pidtree(pid, options, callback);
    return;
  }

  return pify(pidtree, pid, options);
};
