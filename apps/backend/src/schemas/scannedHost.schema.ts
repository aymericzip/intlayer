import type {
  RoutingStrategy,
  TechnologyCategory,
} from '@intlayer/engine/scan/detection';
import mongoose, { type Document, Schema } from 'mongoose';

/**
 * Where a scan comes from:
 * - `scan`: single-page audit run from the website / app scanner
 * - `recursive`: page of a recursive audit job
 * - `extension`: technologies detected by the Chrome extension popup
 * - `background`: audit queued automatically after an extension report
 */
export type HostScanSource = 'scan' | 'recursive' | 'extension' | 'background';

/** A technology detected on a host, as stored. */
export type HostTechnology = {
  id: string;
  name: string;
  category: TechnologyCategory;
  version?: string;
};

/** One scan of a page of the host. */
export type HostScan = {
  url: string;
  source: HostScanSource;
  /** Audit score (0-100). Absent for extension reports, which run no audit. */
  score?: number;
  title?: string;
  technologies: HostTechnology[];
  routingStrategy?: RoutingStrategy;
  locales?: string[];
  scannedAt: Date;
};

export interface IScannedHost extends Document {
  /** Lower-cased hostname, e.g. `www.example.com`. */
  host: string;
  /** Stack of the most recent scan. */
  technologies: HostTechnology[];
  routingStrategy?: RoutingStrategy;
  locales?: string[];
  title?: string;
  /** Score of the most recent audit (extension reports carry none). */
  lastScore?: number;
  lastScannedAt: Date;
  /** Claim of the last automatic backend audit, see `claimBackgroundScan`. */
  backgroundScanClaimedAt?: Date;
  /** Latest scans, oldest first, capped to `MAX_SCANS_PER_HOST`. */
  scans: HostScan[];
  scanCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const hostTechnologySchema = new Schema<HostTechnology>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    version: { type: String },
  },
  { _id: false }
);

const hostScanSchema = new Schema<HostScan>(
  {
    url: { type: String, required: true },
    source: {
      type: String,
      enum: ['scan', 'recursive', 'extension', 'background'],
      required: true,
    },
    score: { type: Number, min: 0, max: 100 },
    title: { type: String },
    technologies: { type: [hostTechnologySchema], default: [] },
    routingStrategy: { type: String },
    locales: { type: [String], default: undefined },
    scannedAt: { type: Date, required: true },
  },
  { _id: false }
);

export const scannedHostSchema = new Schema<IScannedHost>(
  {
    host: { type: String, required: true, unique: true },
    technologies: { type: [hostTechnologySchema], default: [] },
    routingStrategy: { type: String },
    locales: { type: [String], default: undefined },
    title: { type: String },
    lastScore: { type: Number, min: 0, max: 100 },
    lastScannedAt: { type: Date, required: true },
    backgroundScanClaimedAt: { type: Date },
    scans: { type: [hostScanSchema], default: [] },
    scanCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

scannedHostSchema.index({ 'technologies.id': 1 });
scannedHostSchema.index({ 'technologies.category': 1 });
scannedHostSchema.index({ lastScannedAt: -1 });

export const ScannedHostModel = mongoose.model<IScannedHost>(
  'ScannedHost',
  scannedHostSchema
);
