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
): { total: number; breakdown: PriceBlock[] } => {
  const startMins = toMinutes(start);
  const endMins = toMinutes(end);
  let total = 0;
  const breakdown: PriceBlock[] = [];

  let current = startMins;

  while (current < endMins) {
    const next = Math.min(current + 30, endMins); // 30 phút block
    const duration = next - current;
    const hours = duration / 60;

    const matchedSlot = !timeSlots
      ? ({
          id: 0,
          startTime: openTime,
          endTime: closeTime,
          pricePerHour: defaultPricePerHour,
        } as TimeSlot)
      : timeSlots.find((slot) => {
          const slotStart = toMinutes(slot.startTime);
          const slotEnd = toMinutes(slot.endTime);
          return current >= slotStart && current < slotEnd;
        });

    const pricePerHour = matchedSlot?.pricePerHour
      ? matchedSlot.pricePerHour
      : defaultPricePerHour;
    const blockTotal = Math.round(pricePerHour * hours);
    total += blockTotal;

    const lastBlock = breakdown[breakdown.length - 1];

    if (
      lastBlock &&
      lastBlock.price === pricePerHour &&
      lastBlock.source === (matchedSlot && timeSlots ? "slot" : "default")
    ) {
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
        source: matchedSlot && timeSlots ? "slot" : "default",
      });
    }

    current = next;
  }

  return { total, breakdown };
};
