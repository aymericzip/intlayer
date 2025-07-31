import { checkLastUpdateTime } from './checkLastUpdateTime';
import { formatTimeDiff } from './formatTimeDiff';

type GetTimeRangeResult = {
  relativeTime: Date;
  absoluteTime: Date;
};

/**
 * Threshold that helps us differentiate between a numeric *timestamp* (ms from epoch)
 * and a numeric *duration* (ms ago).
 * 50 years expressed in milliseconds is far greater than any reasonable
 * "relative" duration we expect the helper to receive (e.g. a couple of years).
 */
const TIMESTAMP_THRESHOLD_MS = 50 * 365 * 24 * 60 * 60 * 1000; // 50 years

/**
 * Normalises the input date representation into a pair:
 *   1. `relativeTime` – a Date instance whose epoch-time equals the duration
 *      between `now` and the absolute date.
 *   2. `absoluteTime` – the concrete point in time represented as a Date.
 *
 * Rules for interpreting the input:
 *   • Date  => treated as an absolute time.
 *   • string => parsed via the Date constructor => absolute time.
 *   • number:
 *       – if the value is larger than the TIMESTAMP_THRESHOLD_MS we assume it
 *         is a unix timestamp (absolute time).
 *       – otherwise we treat it as a *relative* duration expressed in
 *         milliseconds.
 */
const normaliseInputDate = (
  date: Date | number | string,
  now: Date = new Date()
): GetTimeRangeResult => {
  // Case 1: Already a Date instance
  if (date instanceof Date) {
    return {
      absoluteTime: date,
      relativeTime: new Date(now.getTime() - date.getTime()),
    };
  }

  // Case 2: Numeric value – decide between timestamp vs relative ms.
  if (typeof date === 'number') {
    if (date > TIMESTAMP_THRESHOLD_MS) {
      // Treat as *unix timestamp* (absolute)
      const absoluteTime = new Date(date);
      return {
        absoluteTime,
        relativeTime: new Date(now.getTime() - absoluteTime.getTime()),
      };
    }

    // Treat as a *relative* duration (milliseconds in the past)
    const relativeMs = date;
    return {
      // Relative duration expressed as a Date object starting at the epoch
      relativeTime: new Date(relativeMs),
      // The concrete date obtained by subtracting the duration from *now*
      absoluteTime: new Date(now.getTime() - relativeMs),
    };
  }

  // Case 3: String representation – let Date parse it.
  if (typeof date === 'string') {
    const absoluteTime = new Date(date);
    if (Number.isNaN(absoluteTime.getTime())) {
      throw new Error(`Invalid date string provided: ${date}`);
    }

    return {
      absoluteTime,
      relativeTime: new Date(now.getTime() - absoluteTime.getTime()),
    };
  }

  throw new Error(`Unsupported date format: ${date}`);
};

type CheckFileModifiedRangeResult = {
  isSkipped: boolean;
  message: string;
};

type CheckFileModifiedRangeOptions = {
  skipIfModifiedBefore?: Date | number | string;
  skipIfModifiedAfter?: Date | number | string;
};

export const checkFileModifiedRange = (
  filePath: string,
  options: CheckFileModifiedRangeOptions
): CheckFileModifiedRangeResult => {
  const fileLastUpdateTime = checkLastUpdateTime(filePath);
  const { skipIfModifiedBefore, skipIfModifiedAfter } = options;

  // Normalise the provided thresholds to concrete dates.
  const now = new Date();
  const minDate = skipIfModifiedBefore
    ? normaliseInputDate(skipIfModifiedBefore, now).absoluteTime
    : undefined;
  const maxDate = skipIfModifiedAfter
    ? normaliseInputDate(skipIfModifiedAfter, now).absoluteTime
    : undefined;

  // Determine if the file should be skipped.
  let shouldSkip = false;

  if (minDate instanceof Date && maxDate instanceof Date) {
    // Skip when the modification time falls *within* the range [minDate, maxDate]
    shouldSkip = fileLastUpdateTime >= minDate && fileLastUpdateTime <= maxDate;
  } else if (minDate instanceof Date) {
    // Only lower bound – skip when the file was modified *after* minDate
    shouldSkip = fileLastUpdateTime >= minDate;
  } else if (maxDate) {
    // Only upper bound – skip when the file was modified *after* maxDate
    shouldSkip = fileLastUpdateTime >= maxDate;
  }

  if (shouldSkip) {
    // For the sake of the message we compute the relative time to *now* using
    // whichever bound was responsible for the skip logic.
    const referenceDate = (
      minDate && maxDate
        ? // When both bounds are present, the *range* caused the skip so we use
          // the distance between the two bounds as the relative duration.
          new Date(Math.abs(maxDate.getTime() - minDate.getTime()))
        : (minDate ?? maxDate)
    )!;

    const relativeTime = new Date(now.getTime() - referenceDate.getTime());

    return {
      isSkipped: true,
      message: `Skipping file because it has been modified within the last ${formatTimeDiff(relativeTime)} - ${filePath}`,
    };
  }

  return {
    isSkipped: false,
    message: `File ${filePath} can be processed - ${filePath}`,
  };
};
