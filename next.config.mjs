/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "res.cloudinary.com",],
    },
    async rewrites() {
        return [
            { source: "/dat-san/:path*", destination: "/sports-field-booking/:path*" },
            { source: "/khach-hang/thong-tin-tai-khoan", destination: "/user/my-info" },
            { source: "/khach-hang/lich-su-dat-san", destination: "/user/booking-history" },
            // { source: "/khach-hang/danh-gia-cua-toi", destination: "/user/my-review" },
            { source: "/chinh-sach-hoan-tien", destination: "/refund-policy" },
            { source: "/lien-he", destination: "/contact" },
            { source: "/payment-result", destination: "/payment-result" },
        ];
    },
};

export default nextConfig;
