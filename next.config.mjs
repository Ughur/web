import _removeImports from 'next-remove-imports';

const removeImports = _removeImports();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default removeImports(nextConfig);
