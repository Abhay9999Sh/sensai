/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "randomuser.me"
            }
        ]
    }
};

export default nextConfig;

//as i m using external image link so , config in nextjs