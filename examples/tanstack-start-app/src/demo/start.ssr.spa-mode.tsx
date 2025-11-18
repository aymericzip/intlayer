import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getPunkSongs } from '@/data/demo.punk-songs';

export const Route = createFileRoute('/{-$locale}/demo/start/ssr/spa-mode')({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  const [punkSongs, setPunkSongs] = useState<
    Awaited<ReturnType<typeof getPunkSongs>>
  >([]);

  useEffect(() => {
    getPunkSongs().then(setPunkSongs);
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-800 to-black p-4 text-white"
      style={{
        backgroundImage:
          'radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 font-bold text-3xl text-green-400">
          SPA Mode - Punk Songs
        </h1>
        <ul className="space-y-3">
          {punkSongs.map((song) => (
            <li
              key={song.id}
              className="rounded-lg border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-sm"
            >
              <span className="font-medium text-lg text-white">
                {song.name}
              </span>
              <span className="text-white/60"> - {song.artist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
