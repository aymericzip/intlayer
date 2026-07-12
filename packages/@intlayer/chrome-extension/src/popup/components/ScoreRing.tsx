import type { FC } from 'react';

/** Color bucket matching the CLI score thresholds. */
const scoreColorClass = (score: number): string => {
  if (score >= 80) return 'score-good';
  if (score >= 50) return 'score-medium';
  return 'score-bad';
};

/** Circular gauge displaying the 0–100 audit score. */
export const ScoreRing: FC<{ score: number }> = ({ score }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  return (
    <div className={`score-ring ${scoreColorClass(score)}`}>
      <svg
        viewBox="0 0 64 64"
        width="64"
        height="64"
        role="img"
        aria-label={`Score ${score} out of 100`}
      >
        <circle
          className="score-ring-track"
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="6"
        />
        <circle
          className="score-ring-value"
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
      <span className="score-ring-label">{score}</span>
    </div>
  );
};
