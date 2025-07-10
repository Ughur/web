'use client';

import useSWR from 'swr';
import { Music, Radio } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SpotifyWidget() {
  const { data, error } = useSWR('/api/spotify', fetcher);

  if (error)
    return <div className='card-text'>Failed to load Spotify data</div>;

  return (
    <div className='card p-5 space-y-2'>
      <div className='flex items-center gap-2'>
        {data?.isPlaying ? (
          <Music className='icon-primary' />
        ) : (
          <Radio className='icon-primary' />
        )}
        <h2>{data?.isPlaying ? 'now_playing.song' : 'last_played.song'}</h2>
      </div>
      {data && (data.title || data.artist) ? (
        <Link href={data.songUrl} target='_blank'>
          <div className='flex items-center gap-4 p-2 rounded-md hover:bg-gray-800 transition-colors'>
            {data.albumImageUrl ? (
              <Image
                src={data.albumImageUrl}
                alt={data.album}
                width={64}
                height={64}
                className='w-16 h-16 rounded-md'
              />
            ) : null}
            <div className='flex flex-col'>
              <p className='font-bold text-white'>{data.title}</p>
              <p className='card-text'>{data.artist}</p>
            </div>
          </div>
        </Link>
      ) : (
        <p className='card-text text-accent-cyan'>
          Status: Not currently playing anything.
        </p>
      )}
    </div>
  );
}
