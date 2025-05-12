
import { closeTime, openTime } from "./constant";

type TimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  sportFieldId: number;
};

type PriceBlock = {
  from: string;
  to: string;
  price: number; // Giá theo giờ
  hours: number; // Số giờ trong block
  total: number; // Tổng tiền cho block = price * hours
  source: "slot" | "default";
};

const toMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTimeString = (mins: number): string => {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

export const calculateUnitPrice = (
  timeSlots: TimeSlot[],
  start: string,
  end: string,
  defaultPricePerHour = 1000,
  voucherData?: {
    percentDiscount?: number;
    fixedDiscount?: number;
    maxDiscountAmount?: number;
    minBookingAmount?: number;
  }
): {
  total: number;
  breakdown: PriceBlock[];
  discountAmount: number;
  finalTotal: number;
} => {
  const startMins = toMinutes(start);
  const endMins = toMinutes(end);
  let total = 0;
  const breakdown: PriceBlock[] = [];

  let current = startMins;
  while (current < endMins) {
    const next = Math.min(current + 30, endMins);
    const duration = next - current;
    const hours = duration / 60;

    const matchedSlot = timeSlots?.find((slot) => {
      const slotStart = toMinutes(slot.startTime);
      const slotEnd = toMinutes(slot.endTime);
      return current >= slotStart && current < slotEnd;
    });

    const pricePerHour = matchedSlot?.pricePerHour ?? defaultPricePerHour;
    const blockTotal = Math.round(pricePerHour * hours);
    total += blockTotal;

    const lastBlock = breakdown[breakdown.length - 1];
    const source = matchedSlot && timeSlots ? "slot" : "default";

    if (lastBlock && lastBlock.price === pricePerHour && lastBlock.source === source) {
      lastBlock.to = toTimeString(next);
      lastBlock.hours += hours;
      lastBlock.total += blockTotal;
    } else {
      breakdown.push({
        from: toTimeString(current),
        to: toTimeString(next),
        price: pricePerHour,
        hours,
        total: blockTotal,
        source,
      });
    }

    current = next;
  }

  let discountAmount = 0;

  if (voucherData && total >= (voucherData.minBookingAmount || 0)) {
    if (voucherData.percentDiscount) {
      discountAmount = Math.round((total * voucherData.percentDiscount) / 100);
    } else if (voucherData.fixedDiscount) {
      discountAmount = voucherData.fixedDiscount;
    }

    if (
      voucherData.maxDiscountAmount &&
      discountAmount > voucherData.maxDiscountAmount
    ) {
      discountAmount = voucherData.maxDiscountAmount;
    }

    discountAmount = Math.min(discountAmount, total);
  }

  const finalTotal = total - discountAmount;

  return { total, breakdown, discountAmount, finalTotal };
};

