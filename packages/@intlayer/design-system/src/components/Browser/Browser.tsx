'use client';

import { cva } from 'class-variance-authority';
import { RotateCw } from 'lucide-react';
import {
  type CSSProperties,
  type FC,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { cn } from '../../utils/cn';

const browserVariants = cva(
  'flex w-full flex-col overflow-hidden rounded-xl bg-background shadow-[0_4px_12px_rgba(0,0,0,0.4),0_0_1px_rgba(0,0,0,0.2)]',
  {
    variants: {
      size: {
        xs: 'h-[400px]',
        sm: 'h-[500px]',
        md: 'h-[600px]',
        lg: 'h-[800px]',
        xl: 'h-[1000px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type BrowserProps = {
  /** Initial URL to load in the iframe */
  initialUrl?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Inline styles for the container */
  style?: CSSProperties;
  /** Size of the browser window */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Accessible label for screen readers describing the browser purpose */
  'aria-label'?: string;
};

/**
 * Browser component that renders an iframe with a visible, editable URL bar.
 * Allows users to view, edit, and navigate to different URLs within an embedded browser interface.
 *
 * Features:
 * - Editable URL bar with strict validation (before navigation)
 * - Automatic protocol addition (adds https:// if missing)
 * - Integrated reload button inside the URL input
 * - Error handling with visual feedback for invalid URLs
 * - Responsive iframe with standardized sizes
 * - Full accessibility support with ARIA attributes
 * - Sandbox security for iframe content
 * - Dark-themed UI matching modern browser aesthetics
 * - Cross-browser compatibility (Chrome, Firefox, Safari)
 *
 * @example
 * // Basic usage
 * <Browser initialUrl="https://example.com" size="md" />
 *
 * @example
 * // With custom size and styling
 * <Browser
 *   initialUrl="https://example.com"
 *   size="lg"
 *   className="shadow-2xl"
 *   aria-label="Documentation viewer"
 * />
 *
 * @example
 * // For content preview
 * <Browser
 *   initialUrl="https://youtube.com/embed/VIDEO_ID"
 *   size="xl"
 *   aria-label="Video content browser"
 * />
 *
 * @param initialUrl - The initial URL to load in the iframe (default: 'https://example.com')
 * @param className - Additional CSS classes for the main container element
 * @param style - Inline CSS styles for the main container element
 * @param size - Size of the browser window: 'xs' (400px), 'sm' (500px), 'md' (600px), 'lg' (800px), 'xl' (1000px). Defaults to 'md'
 * @param aria-label - Accessible label for screen readers describing the browser's purpose (default: 'Embedded browser')
 */
export const Browser: FC<BrowserProps> = ({
  initialUrl = 'https://example.com',
  className,
  style,
  size = 'md',
  'aria-label': ariaLabel,
}) => {
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false); // show errors only after attempt
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load internationalized content
  const content = useIntlayer('browser');

  useEffect(() => {
    setInputUrl(initialUrl);
    setCurrentUrl(initialUrl);
    setError(null);
    setSubmitted(false);
  }, [initialUrl]);

  // --- Validation helpers ----------------------------------------------------
  const isValidHostname = (host: string) => {
    // allowed chars
    if (!/^[a-z0-9.-]+$/i.test(host)) return false;
    // no leading/trailing dot or hyphen
    if (/^[-.]/.test(host) || /[-.]$/.test(host)) return false;
    // no double dots
    if (host.includes('..')) return false;
    // must have at least one dot
    if (!host.includes('.')) return false;

    return true;
  };

  const normalizeUrl = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || /\s/.test(trimmed)) throw new Error('Invalid');

    // Add https:// if protocol is missing
    const candidate = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    const url = new URL(candidate);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('Only http(s) is allowed');
    }

    if (!isValidHostname(url.hostname)) {
      throw new Error('Invalid host');
    }

    return url.toString();
  };

  const validateAndNavigate = (url: string) => {
    try {
      const validated = normalizeUrl(url);
      setCurrentUrl(validated);
      setInputUrl(validated);
      setError(null);
    } catch {
      setError(content.errorMessage.value);
    }
  };
  // --------------------------------------------------------------------------

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    validateAndNavigate(inputUrl);
  };

  const handleReload = () => {
    if (iframeRef.current) {
      const url = iframeRef.current.src;
      iframeRef.current.src = '';
      iframeRef.current.src = url;
    }
  };

  const showError = submitted && !!error;

  return (
    <section
      className={cn(browserVariants({ size }), className)}
      style={style}
      aria-label={ariaLabel ?? content.ariaLabel.value}
    >
      {/* Top bar */}
      <div className="relative z-10 flex shrink-0 flex-col gap-1 rounded-t-xl bg-neutral-900 px-4 py-2.5 shadow-[0_3px_4px_0_rgba(0,0,0,0.25)]">
        <form onSubmit={handleSubmit} className="relative flex-1" noValidate>
          <label htmlFor="browser-url" className="sr-only">
            {content.urlLabel.value}
          </label>
          <input
            id="browser-url"
            type="text"
            inputMode="url"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              if (showError) setError(null);
            }}
            placeholder={content.urlPlaceholder.value}
            className={cn(
              'w-full rounded-lg px-4 py-2 pr-11 text-sm leading-[1.4]',
              'bg-neutral-950 text-neutral-300',
              'placeholder:text-neutral-400',
              'transition-all focus:outline-none focus:ring-1 focus:ring-neutral-400/30',
              showError ? 'border border-red-500' : 'border border-transparent'
            )}
            aria-label={content.urlLabel.value}
            aria-invalid={showError}
            aria-describedby={showError ? 'browser-url-error' : undefined}
          />

          {/* Absolutely positioned button inside the input */}
          <button
            type="button"
            onClick={handleReload}
            className={cn(
              '-translate-y-1/2 absolute top-1/2 right-2',
              'flex h-8 w-8 items-center justify-center rounded-md',
              'transition-colors hover:bg-neutral-800',
              'focus:outline-none focus:ring-1 focus:ring-neutral-400/30'
            )}
            title={content.reloadButtonTitle.value}
            aria-label={content.reloadButtonTitle.value}
            tabIndex={0}
          >
            <RotateCw size={18} className="text-neutral-400" strokeWidth={2} />
          </button>

          {/* invisible submit to allow Enter to work semantically */}
          <button type="submit" className="sr-only absolute" tabIndex={-1} />
        </form>

        {/* subtle inline error text */}
        {showError && (
          <p
            id="browser-url-error"
            role="alert"
            aria-live="assertive"
            className="px-1 text-red-400 text-xs"
          >
            {error}
          </p>
        )}
      </div>

      {/* Iframe */}
      <div className="relative z-0 min-h-0 w-full flex-1 overflow-hidden rounded-b-xl bg-background">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          title={content.iframeTitle.value}
          className="h-full w-full rounded-b-xl border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
          loading="lazy"
          aria-live="polite"
        />
      </div>
    </section>
  );
};
