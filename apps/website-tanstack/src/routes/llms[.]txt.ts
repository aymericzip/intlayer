import { createFileRoute } from '@tanstack/react-router';
import llmsContent from '../assets/llms.txt?raw';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: () => {
        const siteUrl = import.meta.env.VITE_URL as string;
        const dynamicContent = llmsContent.replace(
          /https:\/\/intlayer\.org/g,
          siteUrl
        );
        return new Response(dynamicContent, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
