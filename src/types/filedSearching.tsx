export type TimeSlot = {
  startTime: string;
  endTime: string;
};

export type SportField = {
  id: number;
  name: string;
  defaultPrice: string;
  bookedTimeSlots: TimeSlot[];
  availableTimeSlots: TimeSlot[];
  openTime: string;
  closeTime: string;
};
