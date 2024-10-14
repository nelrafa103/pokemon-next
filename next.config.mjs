/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"raw.githubusercontent.com"

		]
	},
	experimental: {
		instrumentationHook: true,
	},
};

export default nextConfig;
