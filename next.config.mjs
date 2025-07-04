import _removeImports from 'next-remove-imports';

const removeImports = _removeImports();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default removeImports(nextConfig);
