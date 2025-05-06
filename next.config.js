// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
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
