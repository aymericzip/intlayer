export interface ScanDetails {
  score: number;
  langTag: string;
  htmlDir: string;
  hreflangs: string[];
  hasXDefault: boolean;
  hasCanonical: boolean;
  hasLocalizedLinks: boolean;
  allAnchorsLocalized: boolean;
  robotsTxt: {
    accessible: boolean;
    disallowWithoutLocaleAlternates: boolean;
  };
  sitemapXml: {
    urlsDiscoveredCount: number;
    alternatesPresent: boolean;
    xDefaultPresent: boolean;
  };
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  websiteUrl: string;
  githubUrl?: string;
  tags: string[];
  upvotes: number;
  upvoters: string[];
  isOpenSource: boolean;
  createdAt: string; // Dates are serialized as strings in server functions
  intlayerVersion?: string;
  libsUsed: string[];
  lastScanDate?: string;
  scanDetails?: ScanDetails;
}

export type SubmitStep =
  | 'START'
  | 'SCANNING_START'
  | 'SCANNING_SUCCESS'
  | 'VERIFY_GITHUB_START'
  | 'VERIFY_GITHUB_SUCCESS'
  | 'DB_SCREENSHOT_START'
  | 'SUCCESS'
  | 'ERROR';
