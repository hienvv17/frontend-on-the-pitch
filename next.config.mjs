/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
    },
    async rewrites() {
        return [
            { source: "/dat-san/:path*", destination: "/sports-field-booking/:path*" },
        ];
    },
};

export default nextConfig;
