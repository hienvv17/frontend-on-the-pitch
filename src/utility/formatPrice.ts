export const formatPrice = (price: number): string => {
  const temp = Number(price);
  return temp.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
