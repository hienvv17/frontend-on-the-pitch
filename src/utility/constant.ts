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
  "(M00) Vui lòng chọn môn thể thao.",
  "(M01) Vui lòng chọn cụm sân.",
  "(M02) Gửi yêu cầu thành công.",
  "(M03) Giờ trả sân phải lớn hơn giờ vào sân ít nhất 1 giờ.",
  "(M04) Giờ vào sân không hợp lệ, vui lòng chọn giờ khác.",
  "(M05) Giờ trả sân không hợp lệ, vui lòng chọn giờ khác.",
  "(M06) Đã hết giờ đặt sân cho hôm nay, vui lòng chọn ngày khác.",
];

export const openTime = "05:00";
export const closeTime = "23:00";
