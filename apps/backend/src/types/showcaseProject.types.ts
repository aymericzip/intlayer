import type { Document, Model, Types } from 'mongoose';

export interface ShowcaseScanDetails {
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

export type ShowcaseProjectStatus = 'pending_scan' | 'active' | 'scan_failed';

export interface ShowcaseProject {
  _id: Types.ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  websiteUrl: string;
  githubUrl?: string;
  tags: string[];
  upvoters: string[];
  downvoters: string[];
  isOpenSource: boolean;
  createdAt: Date;
  intlayerVersion?: string;
  libsUsed: string[];
  /** Map of package name → version for all detected intlayer-related packages */
  packageDetails?: Record<string, string>;
  lastScanDate?: Date;
  scanDetails?: ShowcaseScanDetails;
  owner?: string;
  status?: ShowcaseProjectStatus;
}

export interface ShowcaseProjectData {
  title: string;
  description: string;
  imageUrl?: string;
  logoUrl?: string;
  websiteUrl: string;
  githubUrl?: string;
  tags?: string[];
  isOpenSource?: boolean;
  intlayerVersion?: string;
  libsUsed?: string[];
  packageDetails?: Record<string, string>;
  scanDetails?: ShowcaseScanDetails;
  owner?: string;
  status?: ShowcaseProjectStatus;
}

export interface ShowcaseProjectAPI
  extends Omit<
    ShowcaseProject,
    '_id' | 'createdAt' | 'lastScanDate' | 'upvoters' | 'downvoters'
  > {
  id: string;
  upvotes: number;
  isUpVoted: boolean;
  downvotes: number;
  isDownVoted: boolean;
  createdAt: string;
  lastScanDate?: string;
  isOwner?: boolean;
}

export type ShowcaseProjectDocument = ShowcaseProject & Document;

export type ShowcaseProjectModelType = Model<ShowcaseProjectDocument>;
