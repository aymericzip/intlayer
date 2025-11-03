'use client';
import { useState } from 'react';

export default function AnalyzerForm({
  onAnalyze,
  loading,
}: {
  onAnalyze: (url: string) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState('');

  const normalizeUrl = (input: string) => {
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
      return `https://${input}`;
    }
    return input;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onAnalyze(normalizeUrl(url));
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-lg gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
    >
      <input
        type="url"
        value={url}
        placeholder="https://yourwebsite.com"
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8EB3E] dark:bg-neutral-700 dark:text-neutral-100"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-5 py-2 font-medium text-white transition hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}
