// Server components nested inside client components must be synchronous
// React can't serialize async functions across the server/client boundary
// Solution: pre-compute translations/formats in the parent and pass as props

type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
          {label}:
        </span>
        <span className="font-bold text-2xl text-zinc-900 dark:text-zinc-50">
          {formattedCount}
        </span>
      </div>
      <button
        aria-label={label}
        className="cursor-not-allowed rounded-md bg-green-600 px-4 py-2 font-medium text-white opacity-75 transition-colors hover:bg-green-700"
        disabled
      >
        {increment} (Server Component - Static)
      </button>
    </div>
  );
};

export default ServerComponent;
