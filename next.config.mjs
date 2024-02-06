/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV = 'production'

const nextConfig = {
    // basePath: ''
    output: 'export',
    // Optional: Change the output directory `out` -> `dist`
    distDir: 'dist',
};

export default nextConfig;
