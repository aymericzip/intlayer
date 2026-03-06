import { Container } from '@intlayer/design-system';
import { CircleCheck, Info } from 'lucide-react';
import type { FC } from 'react';

interface ScanRowProps {
  label: string;
  status: boolean;
  value?: string;
  info: string;
}

export const ScanRow: FC<ScanRowProps> = ({ label, status, value, info }) => (
  <Container
    className="flex items-center justify-between border-transparent transition-all hover:border-neutral/10"
    roundedSize="2xl"
    padding="sm"
    transparency="lg"
  >
    <div className="flex items-center gap-2">
      {status ? (
        <CircleCheck className="size-4 text-success" />
      ) : (
        <Info className="size-4 text-neutral/20" />
      )}
      <span className="font-medium text-sm text-text/80">{label}</span>
      <div className="group relative">
        <Info className="size-3 cursor-help text-neutral/20" />
        <div className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-56 rounded-lg border border-neutral/10 bg-text p-2 text-[10px] text-text-opposite opacity-0 shadow-xl transition-all group-hover:opacity-100">
          {info}
        </div>
      </div>
    </div>
    <Container
      roundedSize="xl"
      padding="sm"
      transparency="lg"
      className={`py-0.5 font-bold text-xs ${status ? 'bg-success/10 text-success' : 'bg-neutral/10 text-neutral'}`}
    >
      {value || (status ? 'YES' : 'NO')}
    </Container>
  </Container>
);
