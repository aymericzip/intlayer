export type AnalyzerResultsProps = {
  data: any;
  url: string;
  loading?: boolean;
  partialSummary?: Record<string, any>;
};

export type PageGroup = {
  defaultUrl: string;
  alternates: Array<{ hreflang?: string; url: string }>;
};

export type BatchResult = {
  url: string;
  data?: any;
  loading?: boolean;
  error?: string;
  progress?: number;
  currentStep?: string;
};
