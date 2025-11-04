import { getIntlayer } from 'intlayer';
import { z } from 'zod/v4';

export const useAnalyzerUrlSchema = () => {
  const { invalidUrlError } = getIntlayer('analyzer-form');

  const urlSchema = z
    .string()
    .min(3, { error: invalidUrlError })
    .transform((val) => {
      // Remove leading/trailing spaces
      let value = val.trim();

      // If missing protocol, add it (default to https)
      if (!/^https?:\/\//i.test(value)) {
        value = `https://${value}`;
      }

      return value;
    })
    .pipe(
      z.url({ error: invalidUrlError }).refine(
        (urlString) => {
          try {
            const url = new URL(urlString);
            // Validate protocol
            if (!(url.protocol === 'http:' || url.protocol === 'https:')) {
              return false;
            }

            // Only allow valid domain names or localhost (strict domain validation)
            const hostname = url.hostname;
            const hostnameIsLocalhost = /^localhost$/i.test(hostname);
            const hostnameIsValidDomain =
              /^(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/.test(hostname);

            return hostnameIsValidDomain || hostnameIsLocalhost;
          } catch {
            return false;
          }
        },
        { error: invalidUrlError.value }
      )
    );

  return z.object({
    url: urlSchema,
  });
};

export type AnalyzerFormData = z.infer<ReturnType<typeof useAnalyzerUrlSchema>>;
