/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
