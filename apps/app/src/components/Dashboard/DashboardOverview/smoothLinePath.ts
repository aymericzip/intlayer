/** A chart point in SVG coordinates. */
export type ChartPoint = readonly [x: number, y: number];

/**
 * Tangent slopes of a monotone cubic interpolation (Fritsch–Carlson): the
 * curve never overshoots the data, so a zero stays on the baseline.
 */
const getMonotoneTangents = (points: readonly ChartPoint[]): number[] => {
  const secantSlopes = points
    .slice(1)
    .map(
      ([x, y], index) => (y - points[index][1]) / (x - points[index][0] || 1)
    );

  return points.map((_point, index) => {
    if (index === 0) return secantSlopes[0];
    if (index === points.length - 1) return secantSlopes[index - 1];

    const previousSlope = secantSlopes[index - 1];
    const nextSlope = secantSlopes[index];

    // Local extremum or flat segment: flat tangent keeps the curve in range
    if (previousSlope * nextSlope <= 0) return 0;

    // Harmonic mean bounds the tangent between both secants
    return (2 * previousSlope * nextSlope) / (previousSlope + nextSlope);
  });
};

/**
 * Builds a smooth SVG path (`M … C …`) through `points`, sorted by `x`.
 * Monotone between points: no bump above a peak nor below the baseline.
 */
export const buildSmoothLinePath = (points: readonly ChartPoint[]): string => {
  if (points.length === 0) return '';

  const [firstX, firstY] = points[0];
  if (points.length === 1) return `M${firstX},${firstY}`;

  const tangents = getMonotoneTangents(points);

  const curveSegments = points.slice(1).map(([x, y], index) => {
    const [previousX, previousY] = points[index];
    const controlOffset = (x - previousX) / 3;

    const firstControlY = previousY + tangents[index] * controlOffset;
    const secondControlY = y - tangents[index + 1] * controlOffset;

    return `C${previousX + controlOffset},${firstControlY} ${x - controlOffset},${secondControlY} ${x},${y}`;
  });

  return `M${firstX},${firstY} ${curveSegments.join(' ')}`;
};
