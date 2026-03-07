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

export type ProjectStatus = 'pending_scan' | 'active' | 'scan_failed';

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
  /** Map of package name → version for all detected intlayer-related packages */
  packageDetails?: Record<string, string>;
  lastScanDate?: string;
  scanDetails?: ScanDetails;
  owner?: string;
  status?: ProjectStatus;
  isOwner?: boolean;
}

export type SubmitStep = 'START' | 'SUCCESS' | 'ERROR' | 'UNAUTHENTICATED';

export type ScanStep =
  | 'SCANNING_START'
  | 'SCANNING_SUCCESS'
  | 'VERIFY_GITHUB_START'
  | 'VERIFY_GITHUB_SUCCESS'
  | 'SCREENSHOT_START'
  | 'SCREENSHOT_SUCCESS'
  | 'SUCCESS'
  | 'ERROR';
