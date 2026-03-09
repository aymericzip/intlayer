import { Schema } from 'mongoose';
import type { ShowcaseProjectDocument } from '@/types/showcaseProject.types';

const scanDetailsSchema = new Schema(
  {
    score: { type: Number },
    langTag: { type: String },
    htmlDir: { type: String },
    hreflangs: { type: [String] },
    hasXDefault: { type: Boolean },
    hasCanonical: { type: Boolean },
    hasLocalizedLinks: { type: Boolean },
    allAnchorsLocalized: { type: Boolean },
    robotsTxt: {
      accessible: { type: Boolean },
      disallowWithoutLocaleAlternates: { type: Boolean },
    },
    sitemapXml: {
      urlsDiscoveredCount: { type: Number },
      alternatesPresent: { type: Boolean },
      xDefaultPresent: { type: Boolean },
    },
  },
  { _id: false }
);

export const showcaseProjectSchema = new Schema<ShowcaseProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    logoUrl: { type: String },
    websiteUrl: { type: String, required: true, unique: true },
    githubUrl: { type: String },
    tags: { type: [String], default: [] },
    upvotes: { type: Number, default: 0 },
    upvoters: { type: [String], default: [] },
    downvotes: { type: Number, default: 0 },
    downvoters: { type: [String], default: [] },
    isOpenSource: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    intlayerVersion: { type: String },
    libsUsed: { type: [String], default: [] },
    packageDetails: { type: Map, of: String, default: {} },
    lastScanDate: { type: Date },
    scanDetails: { type: scanDetailsSchema },
    owner: { type: String },
    status: {
      type: String,
      enum: ['pending_scan', 'active', 'scan_failed'],
      default: 'pending_scan',
    },
  },
  { timestamps: false }
);
