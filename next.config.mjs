/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com"], // Cho phép hiển thị ảnh từ Google
    },
    async rewrites() {
        return [
            { source: "/dat-san/:path*", destination: "/sports-field-booking/:path*" },
        ];
    },
};

export default nextConfig;
