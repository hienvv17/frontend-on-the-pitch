export const formatPrice = (price: number): string => {
  const temp = Number(price) * 1000;
  return temp.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
