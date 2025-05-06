//demo data
export const sportName = [
  { id: 1, value: "soccer", label: "Đá banh" },
  { id: 2, value: "badminton", label: "Cầu lông" },
  { id: 3, value: "tennis", label: "Tennis" },
];

export const sportBranch = [
  { id: 1, value: "q9", label: "Quận 9" },
  { id: 2, value: "q10", label: "Quận 10" },
  { id: 3, value: "q2", label: "Quận 2" },
  { id: 4, value: "q7", label: "Quận 7" },
];

export const stadiumList = {
  soccer: {
    title: "Sân bóng đá",
    intro:
      "Nơi diễn ra các trận đấu bóng đá, từ những trận giao hữu cho đến các giải đấu chuyên nghiệp. Một trận bóng hấp dẫn không thể thiếu sân bóng đá đạt chuẩn, tạo điều kiện tốt nhất để cầu thủ thể hiện kỹ năng, chiến thuật và tinh thần đồng đội.",
    fields: [
      {
        id: 1,
        name: "Sân Q10-1",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151739/image_12_ub4gfu.png",
        location: "Quận 10",
        price: "250.000 VND/h",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Sân Q9-3",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png",
        location: "Quận 9",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        id: 3,
        name: "Sân Q2-1",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151485/gwltrhxdykgamkak2vwx.png",
        location: "Quận 2",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        id: 4,
        name: "Sân Q7-1",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151740/image_11_zmvwsc.png",
        location: "Quận 7",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        id: 5,
        name: "Sân Q9-2",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151739/image_12_ub4gfu.png",
        location: "Quận 9",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        id: 6,
        name: "Sân Q10-2",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151740/image_11_zmvwsc.png",
        location: "Quận 10",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        id: 7,
        name: "Sân Q2-2",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151485/gwltrhxdykgamkak2vwx.png",
        location: "Quận 2",
        price: "220.000 VND/h",
        rating: 4.0,
      },
    ],
  },
  badminton: {
    title: "Sân cầu lông",
    intro:
      "Mặt sân chất lượng giúp người chơi di chuyển linh hoạt, giảm chấn thương và tối ưu hóa khả năng thi đấu. Cầu lông là môn thể thao phổ biến, hấp dẫn với nhịp độ nhanh, giúp rèn luyện sức khỏe, sự nhanh nhẹn và phản xạ, phù hợp với mọi lứa tuổi.",
    fields: [
      {
        name: "Sân ABC",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151740/badminton_01_srchly.png",
        location: "Quận 10",
        price: "250.000 VND/h",
        rating: 4.5,
      },
      {
        name: "Sân XYZ",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151740/badminton_02_oktnko.png",
        location: "Quận 7",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        name: "Sân XYZ",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151740/badminton_03_mtbjvf.png",
        location: "Quận 9",
        price: "220.000 VND/h",
        rating: 4.6,
      },
      {
        name: "Sân XYZ",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151740/badminton_04_ijzbab.png",
        location: "Quận 2",
        price: "220.000 VND/h",
        rating: 5.0,
      },
    ],
  },
  tennis: {
    title: " Sân tennis",
    intro:
      "Nơi lý tưởng để rèn luyện sức khỏe, cải thiện thể lực và nâng cao kỹ thuật cho người chơi ở mọi trình độ. Với kích thước tiêu chuẩn, sân được thiết kế để tối ưu hóa trải nghiệm thi đấu, đi kèm hệ thống lưới, vạch kẻ rõ ràng.",
    fields: [
      {
        name: "Sân ABC",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151742/tennis_01_revj66.png",
        location: "Quận 10",
        price: "250.000 VND/h",
        rating: 4.5,
      },
      {
        name: "Sân XYZ",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151742/tennis_02_obcdvd.png",
        location: "Quận 7",
        price: "220.000 VND/h",
        rating: 4.0,
      },
      {
        name: "Sân XYZ",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151742/tennis_03_pkhufu.png",
        location: "Quận 9",
        price: "220.000 VND/h",
        rating: 4.6,
      },
      {
        name: "Sân XYZ",
        image:
          "https://res.cloudinary.com/dv8qmimg8/image/upload/v1743151742/tennis_04_rjjzxt.png",
        location: "Quận 2",
        price: "220.000 VND/h",
        rating: 5.0,
      },
    ],
  },
};
