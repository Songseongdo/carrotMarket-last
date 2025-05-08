// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		forceSwcTransforms: true,
	},
	transpilePackages: ["recoil"],
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				hostname: "avatars.githubusercontent.com",
			},
			{
				hostname: "imagedelivery.net",
			},
		],
	},
};

module.exports = nextConfig;
