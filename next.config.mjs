/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/builder',
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  