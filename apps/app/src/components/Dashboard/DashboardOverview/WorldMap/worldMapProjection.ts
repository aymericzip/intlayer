import type { LiveVisitor } from '@intlayer/backend-contract/analytics';

/**
 * Natural Earth 1 projection parameters the outlines in `worldMapPaths.ts`
 * were fitted with (d3-geo `geoNaturalEarth1().fitSize([960, 470])`, no
 * rotation), so live coordinates land exactly on the pre-projected map.
 */
const PROJECTION_SCALE = 177.61248501421676;
const PROJECTION_TRANSLATE_X = 480;
const PROJECTION_TRANSLATE_Y = 271.01988022290067;

const DEGREES_TO_RADIANS = Math.PI / 180;

/**
 * Projects a longitude / latitude (degrees) to map viewBox coordinates with
 * the Natural Earth 1 formula (same polynomial as d3-geo).
 */
export const projectCoordinates = (
  longitude: number,
  latitude: number
): [x: number, y: number] => {
  const lambda = longitude * DEGREES_TO_RADIANS;
  const phi = latitude * DEGREES_TO_RADIANS;
  const phi2 = phi * phi;
  const phi4 = phi2 * phi2;

  const rawX =
    lambda *
    (0.8707 -
      0.131979 * phi2 +
      phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4)));
  const rawY =
    phi *
    (1.007226 +
      phi2 *
        (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)));

  return [
    PROJECTION_TRANSLATE_X + PROJECTION_SCALE * rawX,
    PROJECTION_TRANSLATE_Y - PROJECTION_SCALE * rawY,
  ];
};

/**
 * Longitude / latitude centroid of each country's largest landmass, used to
 * place visitors whose CDN reported no city coordinates. Generated alongside
 * `worldMapPaths.ts` (d3-geo `geoCentroid`).
 */
export const COUNTRY_CENTROIDS: Readonly<
  Record<string, readonly [longitude: number, latitude: number]>
> = {
  AE: [54.2, 23.9],
  AF: [66, 33.8],
  AL: [20, 41.1],
  AM: [45, 40.2],
  AO: [17.5, -12.3],
  AR: [-64.7, -34.6],
  AT: [14.1, 47.6],
  AU: [134.2, -25.6],
  AZ: [47.7, 40.3],
  BA: [17.8, 44.2],
  BD: [90.3, 23.8],
  BE: [4.6, 50.7],
  BF: [-1.8, 12.3],
  BG: [25.2, 42.8],
  BI: [29.9, -3.4],
  BJ: [2.3, 9.6],
  BN: [114.9, 4.7],
  BO: [-64.7, -16.7],
  BR: [-53.2, -10.7],
  BS: [-77.9, 24.5],
  BT: [90.5, 27.4],
  BW: [23.8, -22.1],
  BY: [28, 53.5],
  BZ: [-88.7, 17.2],
  CA: [-97.9, 58.4],
  CD: [23.6, -2.8],
  CF: [20.4, 6.5],
  CG: [15.1, -0.8],
  CH: [8.1, 46.8],
  CI: [-5.6, 7.6],
  CL: [-71.2, -35.9],
  CM: [12.6, 5.7],
  CN: [103.4, 36.7],
  CO: [-73.1, 3.9],
  CR: [-84.2, 10],
  CU: [-78.9, 21.6],
  CY: [33, 34.9],
  CZ: [15.3, 49.8],
  DE: [10.3, 51.1],
  DJ: [42.5, 11.8],
  DK: [9.3, 56.2],
  DO: [-70.5, 18.9],
  DZ: [2.6, 28.1],
  EC: [-78.4, -1.5],
  EE: [25.8, 58.6],
  EG: [29.9, 26.5],
  EH: [-12.2, 24.3],
  ER: [38.7, 15.4],
  ES: [-3.6, 40.3],
  ET: [39.6, 8.6],
  FI: [26.1, 64.3],
  FJ: [178, -17.8],
  FK: [-59.4, -51.7],
  FR: [2.3, 46.6],
  GA: [11.7, -0.6],
  GB: [-2.6, 53.8],
  GE: [43.5, 42.2],
  GH: [-1.2, 7.9],
  GL: [-42, 73.2],
  GM: [-15.4, 13.5],
  GN: [-11.1, 10.5],
  GQ: [10.4, 1.6],
  GR: [22.5, 39.3],
  GT: [-90.4, 15.7],
  GW: [-15.1, 12],
  GY: [-59, 4.8],
  HN: [-86.6, 14.8],
  HR: [16.6, 45],
  HT: [-72.7, 18.9],
  HU: [19.3, 47.2],
  ID: [114, -0.3],
  IE: [-8, 53.2],
  IL: [35, 31.5],
  IN: [79.5, 22.8],
  IQ: [43.8, 33],
  IR: [54.5, 32.5],
  IS: [-18.8, 65.1],
  IT: [12.4, 43.4],
  JM: [-77.3, 18.1],
  JO: [36.8, 31.2],
  JP: [136.7, 36],
  KE: [37.8, 0.6],
  KG: [74.6, 41.5],
  KH: [104.9, 12.7],
  KP: [127.1, 40.1],
  KR: [127.8, 36.4],
  KW: [47.6, 29.3],
  KZ: [67.2, 48.4],
  LA: [103.8, 18.4],
  LB: [35.9, 33.9],
  LK: [80.7, 7.7],
  LR: [-9.4, 6.4],
  LS: [28.2, -29.6],
  LT: [23.9, 55.3],
  LU: [6, 49.8],
  LV: [24.8, 56.8],
  LY: [18, 27],
  MA: [-8.7, 29.8],
  MD: [28.4, 47.2],
  ME: [19.3, 42.8],
  MG: [46.7, -19.3],
  MK: [21.7, 41.6],
  ML: [-3.6, 17.2],
  MM: [96.5, 20.9],
  MN: [103, 47],
  MR: [-10.3, 20.2],
  MW: [34.2, -13.2],
  MX: [-102.2, 23.9],
  MY: [114.7, 3.5],
  MZ: [35.5, -17.2],
  NA: [17.1, -22],
  NC: [165.5, -21.3],
  NE: [9.3, 17.3],
  NG: [8, 9.5],
  NI: [-85, 12.8],
  NL: [5.5, 52.3],
  NO: [12.4, 64.1],
  NP: [84, 28.2],
  NZ: [170.6, -44],
  OM: [56.1, 20.6],
  PA: [-80.1, 8.5],
  PE: [-74.4, -9.1],
  PG: [144.3, -6.6],
  PH: [121.6, 15.7],
  PK: [69.2, 29.9],
  PL: [19.3, 52.1],
  PR: [-66.5, 18.2],
  PS: [35.3, 31.9],
  PT: [-8.1, 39.6],
  PY: [-58.4, -23.2],
  QA: [51.2, 25.3],
  RO: [25, 45.9],
  RS: [20.8, 44.2],
  RU: [95.7, 65.9],
  RW: [29.9, -2],
  SA: [44.6, 24.1],
  SB: [159.1, -7.9],
  SD: [29.8, 16],
  SE: [16.1, 62.4],
  SI: [14.9, 46.1],
  SK: [19.5, 48.7],
  SL: [-11.8, 8.5],
  SN: [-14.5, 14.4],
  SO: [45.7, 4.7],
  SR: [-55.9, 4.1],
  SS: [30.2, 7.3],
  SV: [-88.9, 13.7],
  SY: [38.5, 35],
  SZ: [31.4, -26.5],
  TD: [18.6, 15.3],
  TF: [69.5, -49.3],
  TG: [1, 8.4],
  TH: [101, 15],
  TJ: [71, 38.6],
  TL: [126, -8.8],
  TM: [59.3, 39.1],
  TN: [9.5, 34.1],
  TR: [35.4, 39.1],
  TT: [-61.3, 10.4],
  TW: [121, 23.7],
  TZ: [34.7, -6.3],
  UA: [31.3, 49.2],
  UG: [32.4, 1.3],
  US: [-98.7, 39.9],
  UY: [-56, -32.8],
  UZ: [63.4, 41.8],
  VE: [-66.2, 7.2],
  VN: [106.3, 16.6],
  VU: [166.9, -15.2],
  XK: [20.9, 42.6],
  YE: [47.5, 15.9],
  ZA: [25.2, -28.9],
  ZM: [27.8, -13.4],
  ZW: [29.8, -18.9],
};

/** Visitors sharing one spot on the map (a city, or a country centroid). */
export type LiveMapPlace = {
  /** Stable key across refreshes: coordinates, or `country:<code>`. */
  key: string;
  /** Map viewBox coordinates. */
  x: number;
  y: number;
  /** City name, when known. */
  city?: string;
  /** ISO country code. */
  country: string;
  /** Visitors at this place, most recently active first. */
  visitors: LiveVisitor[];
};

/**
 * Groups live visitors by where they are on the map: by city coordinates when
 * the CDN reported them, else by country centroid. Visitors with neither (an
 * unknown country, or one too small for the 1:110m outlines) are left out.
 *
 * @param visitors - Live visitors, most recently active first.
 * @returns The places, largest first so small dots draw on top.
 */
export const groupVisitorsByPlace = (
  visitors: LiveVisitor[]
): LiveMapPlace[] => {
  const places = new Map<string, LiveMapPlace>();

  for (const visitor of visitors) {
    const hasCoordinates =
      visitor.latitude !== undefined && visitor.longitude !== undefined;
    const centroid = COUNTRY_CENTROIDS[visitor.country];

    if (!hasCoordinates && !centroid) continue;

    const [longitude, latitude] = hasCoordinates
      ? [visitor.longitude as number, visitor.latitude as number]
      : (centroid as readonly [number, number]);
    const key = hasCoordinates
      ? `${latitude},${longitude}`
      : `country:${visitor.country}`;

    const place = places.get(key);

    if (place) {
      place.visitors.push(visitor);
      place.city ??= visitor.city;
      continue;
    }

    const [x, y] = projectCoordinates(longitude, latitude);

    places.set(key, {
      key,
      x,
      y,
      city: hasCoordinates ? visitor.city : undefined,
      country: visitor.country,
      visitors: [visitor],
    });
  }

  return [...places.values()].sort(
    (placeA, placeB) => placeB.visitors.length - placeA.visitors.length
  );
};
