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

export interface ShowcaseProject {
  _id: Types.ObjectId;
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
  createdAt: Date;
  intlayerVersion?: string;
  libsUsed: string[];
  lastScanDate?: Date;
  scanDetails?: ShowcaseScanDetails;
}

export interface ShowcaseProjectData {
  title: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  websiteUrl: string;
  githubUrl?: string;
  tags?: string[];
  isOpenSource?: boolean;
  intlayerVersion?: string;
  libsUsed?: string[];
  scanDetails?: ShowcaseScanDetails;
}

export interface ShowcaseProjectAPI
  extends Omit<ShowcaseProject, '_id' | 'createdAt' | 'lastScanDate'> {
  id: string;
  createdAt: string;
  lastScanDate?: string;
}

export type ShowcaseProjectDocument = ShowcaseProject & Document;

export type ShowcaseProjectModelType = Model<ShowcaseProjectDocument>;
