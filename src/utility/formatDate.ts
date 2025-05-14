// utils/formatDate.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Convert UTC date string to Vietnam time zone and format it.
 * @param dateStr - ISO date string from server (e.g., '2025-05-14T14:00:00.000Z')
 * @param format - Desired format (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns Vietnam-localized formatted string
 */
export function formatToVietnamTime(dateStr: string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs.utc(dateStr).tz('Asia/Ho_Chi_Minh').format(format);
}
