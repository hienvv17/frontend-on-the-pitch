export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  BRANCHES: '/branches',
  SPORT_CATEGORIES: '/sport-categories',
  SPORT_FIELDS: 'sport-fields',
  FILED_BOOKINGS: '/field-bookings',
  USERS: '/users',
};

export const publicRoutes = [ROUTES.LOGIN];
export const ACCESS_TOKEN = 'accessToken';
export const USERNAME = 'username';
export const DEFAULT_IMG = '/image/defaultPicture.png';
export const ALTER_IMG = [
  'https://ik.imagekit.io/onthepitch/football-alter.jpg?updatedAt=1746764599468',
  'https://ik.imagekit.io/onthepitch/tennis-alter.jpg?updatedAt=1746764599532',
  'https://ik.imagekit.io/onthepitch/PICKLEBALL-alter.jpg?updatedAt=1746764599545',
  'https://ik.imagekit.io/onthepitch/badminton-alter.png?updatedAt=1746764599644',
];

export const msgDetail = [
  'Vui lòng chọn môn thể thao',
  'Vui lòng chọn cụm sân',
  'Gửi yêu cầu thành công',
  'Giờ trả sân phải lớn hơn giờ vào sân ít nhất 1 giờ',
  'Giờ vào sân không hợp lệ, vui lòng chọn giờ khác',
  'Giờ trả sân không hợp lệ, vui lòng chọn giờ khác',
  'Đã hết giờ đặt sân cho hôm nay, vui lòng chọn ngày khác',
  'File quá lớn. Vui lòng chọn file dưới 2 MB',
  'Số điện thoại không hợp lệ',
  'Phiên hết hạn, bạn đã bị đăng xuất',
  'Đã hủy thay đổi',
  'Cập nhật thông tin tài khoản thành công',
  'Vui lòng nhập đúng định dạng email. Định dạng đúng ...@...',
  'Email hợp lệ',
  'Vui lòng chọn thời gian thuê sân ít nhất 1 giờ',
  'Vui lòng chọn ngày',
  'Đang xử lý...',
  'Đã đặt sân thành công.',
  'Đã sao chép mã: ',
  'Lỗi sao chép mã!',
  'Gửi thông tin hoàn tiền thành công',
  'Lỗi gửi thông tin hoàn tiền!',
  'Vui lòng nhập lý do',
  'Gửi đánh giá thành công',
  'Gửi đánh giá thất bại',
  'Email không được trống',
];

export const openTime = '05:00';
export const closeTime = '23:00';

export const PROTECTED_ROUTES = ['/user', '/khach-hang'];

// export const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

//https://regex101.com/r/O9oCj8/1
// export const emailRegex = /^[^\.\s][\w\-\.{2,}]+@([\w-]+\.)+[\w-]{2,}$/;

//https://ihateregex.io/expr/email-2/
// export const emailRegex =
//   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// https://voz.vn/t/regex-co-phai-cai-co-cu-phap-xau-nhat-khong.78044/page-2
export const emailRegex =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
// export const emailRegex = /^[a-z0-9][a-z0-9!#$%&'*+/=?^_`{|}~.-]*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
