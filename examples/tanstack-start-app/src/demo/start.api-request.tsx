import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

function getNames() {
  return fetch('/demo/api/names').then(
    (res) => res.json() as Promise<string[]>
  );
}

export const Route = createFileRoute('/{-$locale}/demo/start/api-request')({
  component: Home,
});

function Home() {
  const [names, setNames] = useState<Array<string>>([]);

  useEffect(() => {
    getNames().then(setNames);
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 text-white"
      style={{
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)',
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-4 text-2xl">Start API Request Demo - Names List</h1>
        <ul className="mb-4 space-y-2">
          {names.map((name) => (
            <li
              key={name}
              className="rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
            >
              <span className="text-lg text-white">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
