export function generateTimeSlots2(
  startTime: string,
  endTime: string,
  disableSlots: string[] = [], // Mảng các timeSlot dạng "HH:mm" cần disable
) {
  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const slots = [];
  let current = parseTime(startTime);
  const end = parseTime(endTime);

  while (current <= end) {
    const timeStr = formatTime(current);
    slots.push({
      timeSlot: timeStr,
      disable: disableSlots.includes(timeStr),
    });
    current += 30;
  }

  return slots;
}
