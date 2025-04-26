export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  BRANCHES: "/branches",
  SPORT_CATEGORIES: "/sport-categories",
  SPORT_FIELDS: "/sport-fields",
  FILED_BOOKINGS: "/field-bookings",
  USERS: "/users",
};

export const publicRoutes = [ROUTES.LOGIN];
export const ACCESS_TOKEN = "accessToken";
export const USERNAME = "username";
export const DEFAULT_IMG =
  "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151739/image_12_ub4gfu.png";

export const msgDetail = [
  "Vui lòng chọn môn thể thao.",
  "Vui lòng chọn cụm sân.",
  "Gửi yêu cầu thành công.",
  "Giờ trả sân phải lớn hơn giờ vào sân ít nhất 1 giờ.",
  "Giờ vào sân không hợp lệ, vui lòng chọn giờ khác.",
  "Giờ trả sân không hợp lệ, vui lòng chọn giờ khác.",
  "Đã hết giờ đặt sân cho hôm nay, vui lòng chọn ngày khác.",
];

export const openTime = "05:00";
export const closeTime = "23:00";

export const PROTECTED_ROUTES = ["/user", "/khach-hang"];
