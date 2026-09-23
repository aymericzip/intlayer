import { cn } from '@intlayer/design-system/utils';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';

/** Color bucket matching the CLI score thresholds. */
const getScoreColorClassName = (score: number): string => {
  if (score >= 80) return 'text-success';
  if (score >= 50) return 'text-warning';
  return 'text-error';
};

/** Circular gauge displaying the 0–100 audit score. */
export const ScoreRing: FunctionComponent<{ score: number }> = ({ score }) => {
  const { scoreLabel } = useIntlayer('audit-section');
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  return (
    <div
      className={cn('relative size-16 shrink-0', getScoreColorClassName(score))}
    >
      <svg
        viewBox="0 0 64 64"
        width="64"
        height="64"
        role="img"
        aria-label={scoreLabel({ score }).value}
      >
        <circle
          className="stroke-text/10"
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="6"
        />
        <circle
          className="stroke-current transition-[stroke-dasharray] duration-400"
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-bold text-base">
        {score}
      </span>
    </div>
  );
};
