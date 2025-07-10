import { NextResponse } from 'next/server';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export async function GET() {
  const { access_token } = await getAccessToken();

  const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store', // Disable caching
  });

  if (nowPlayingResponse.status === 200) {
    const song = await nowPlayingResponse.json();

    if (song && song.is_playing) {
      const isPlaying = song.is_playing;
      const title = song.item.name;
      const artist = song.item.artists
        .map((_artist: { name: string }) => _artist.name)
        .join(', ');
      const album = song.item.album.name;
      const albumImageUrl = song.item.album.images[0].url;
      const songUrl = song.item.external_urls.spotify;

      return NextResponse.json({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
      });
    }
  }

  // If not currently playing, get the most recently played song
  const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store', // Disable caching
  });

  if (recentlyPlayedResponse.status !== 200) {
    return NextResponse.json({ isPlaying: false });
  }

  const recentSongs = await recentlyPlayedResponse.json();

  if (!recentSongs.items || recentSongs.items.length === 0) {
    return NextResponse.json({ isPlaying: false });
  }

  const lastPlayedSong = recentSongs.items[0].track;

  const title = lastPlayedSong.name;
  const artist = lastPlayedSong.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(', ');
  const album = lastPlayedSong.album.name;
  const albumImageUrl = lastPlayedSong.album.images[0].url;
  const songUrl = lastPlayedSong.external_urls.spotify;

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying: false,
    songUrl,
    title,
  });
}
