/** @type {import('next').NextConfig} */

// development
//
// const url = process.env.NODE_ENV === 'production' ? 'https://main.d2tbs37qbv8atx.amplifyapp.com/' : 'http://localhost:3000/';

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	env: {
		BASE_URL: 'http://localhost:3000/',
	},
};

module.exports = nextConfig;
