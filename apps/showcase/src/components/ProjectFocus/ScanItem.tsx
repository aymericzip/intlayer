import { Container } from '@intlayer/design-system';
import { Info } from 'lucide-react';
import type { FC, ReactNode } from 'react';

interface ScanItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  info: string;
  success?: boolean;
}

export const ScanItem: FC<ScanItemProps> = ({
  icon,
  label,
  value,
  info,
  success,
}) => (
  <Container
    className="flex flex-col shadow-sm transition-all"
    roundedSize="2xl"
    padding="md"
    gap="sm"
    transparency="lg"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-[10px] text-neutral uppercase tracking-widest">
        {icon}
        <span>{label}</span>
      </div>
      <div className="group relative">
        <Info className="size-3.5 cursor-help text-neutral/30" />
        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg border border-neutral/10 bg-text p-2 text-[10px] text-text-opposite opacity-0 shadow-xl transition-all group-hover:opacity-100">
          {info}
        </div>
      </div>
    </div>
    <div
      className={`font-bold text-lg ${success === true ? 'text-success' : success === false ? 'text-error' : 'text-text'}`}
    >
      {value}
    </div>
  </Container>
);
