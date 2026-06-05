import type { TFunction } from 'i18next';

type ServerComponentProps = {
  // Translation function passed from parent server component
  // Server components can't use hooks, so translations come via props
  t: TFunction<'about'>;
  locale: string;
  count: number;
};

/**
 * Server component example - receives translations as props
 * Can be nested inside client components (async server components)
 * Cannot use React hooks, so all data must come from props or async operations
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Format number server-side using locale
  // This runs on the server during SSR, improving initial page load
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="m-0 font-bold text-5xl text-white">{formatted}</p>
      {/* Use translation function passed as prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-semibold text-white text-xl">
          {t('counter.label')}
        </span>
        <span className="text-sm italic opacity-80">
          {t('counter.description')}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
