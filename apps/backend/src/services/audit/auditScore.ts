import { mutateScore, type Score, toScorePercent } from '@intlayer/engine/scan';
import type { AuditEvent } from './types';

/**
 * Final score (0-100) of a completed audit, computed from its events the same
 * way the SSE controller tracks it live.
 */
export const getAuditScorePercent = (events: AuditEvent[]): number =>
  toScorePercent(
    events.reduce<Score>((score, event) => mutateScore(score, event), {
      score: 0,
      totalScore: 0,
    })
  );
