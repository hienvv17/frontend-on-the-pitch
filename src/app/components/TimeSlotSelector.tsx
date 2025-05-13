'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AppContext } from '../contexts/AppContext';
import { msgDetail } from '@/utility/constant';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { blueBlurDialogSlotProps } from '@/utility/dialogSlotProps';
import CustomDatePicker from './DatePicker';
import { generateTimeSlots2 } from '@/utility/generateTimeSlots2';
import dayjs from 'dayjs';

interface TimeSlotSelectorProps {
  disabledSlots?: Date[];
  open: boolean;
  onClose: () => void;
  dialogData: any;
  [key: string]: any; // Cho phép các props khác
}

export default function TimeSlotSelector({
  disabledSlots = [],
  open,
  onClose,
  dialogData,
  ...rest
}: TimeSlotSelectorProps) {
  const { setOpenSnackBar } = useContext(AppContext);

  const [timeSlotsStart, setTimeSlotsStart] = useState<any[]>([]);
  const [timeSlotsEnd, setTimeSlotsEnd] = useState<any[]>([]);
  const [filteredStartSlots, setFilteredStartSlots] = useState<string[]>([]);

  useEffect(() => {
    rest.setBookingData((prev: any) => ({
      ...prev,
      bookingDate:
        rest.searchData.dayPicked !== null ? rest.searchData.dayPicked.format('YYYY-MM-DD') : '',
    }));
  }, []);

  const handleCancel = () => {
    rest.setBookingData((prev: any) => ({
      ...prev,
      startTime: '',
      endTime: '',
      bookingDate:
        rest.searchData.dayPicked !== null ? rest.searchData.dayPicked.format('YYYY-MM-DD') : '',
      totalPrice: 0,
      email: '',
      sportFieldId: 0,
    }));

    rest.setSelectedSlots([]);
    rest.setStartSlot(null);
    rest.setSelectedDate(rest.searchData.dayPicked);
    // setStartTime('');
    // setEndTime('');
    setOpenSnackBar({ isOpen: false, msg: msgDetail[14], type: 'error' });
    onClose(); // Đóng Dialog
  };

  const handleContinue = () => {
    console.log('rest.startTime', rest.startTime);
    console.log('rest.endTime', rest.endTime);

    if (rest.startTime === '' || rest.endTime === '') {
      setTimeout(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[14], type: 'error' });
      }, 100);
      return;
    }

    setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: 'info' });

    rest.setBookingData((prev: any) => ({
      ...prev,
      startTime: rest.startTime,
      endTime: rest.endTime,
    }));

    // rest.setIsContinue(true);
    rest.setOpenDialog1(true);
    // onClose(); // Đóng Dialog
    // router.push("/checkout"); // chuyển sang trang thanh toán
  };

  const generateTimeSlotsFromRanges = (
    ranges: { startTime: string; endTime: string }[],
    booked: { startTime: string; endTime: string }[],
    stepMinutes: number = 30,
  ) => {
    const result: string[] = [];

    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const toHHMM = (totalMinutes: number) => {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const isBooked = (slotStart: number, slotEnd: number) =>
      booked.some((b) => {
        const bStart = toMinutes(b.startTime);
        const bEnd = toMinutes(b.endTime);
        return slotStart < bEnd && slotEnd > bStart;
      }) || booked.some((b) => slotEnd === toMinutes(b.startTime));

    const MAX_START_TIME = toMinutes('22:00');

    for (const range of ranges) {
      let start = toMinutes(range.startTime);
      const end = toMinutes(range.endTime);

      while (start + stepMinutes <= end && start <= MAX_START_TIME) {
        const next = start + stepMinutes;
        if (!isBooked(start, next)) {
          result.push(toHHMM(start));
        } else {
          console.log(`Slot ${toHHMM(start)} - ${toHHMM(next)} bị loại do booked`);
        }
        start = next;
      }
    }

    return result;
  };

  useEffect(() => {
    const result = generateTimeSlotsFromRanges(
      dialogData?.field?.availableTimeSlots ?? [],
      dialogData?.field?.bookedTimeSlots ?? [],
    );
    setFilteredStartSlots(result);
  }, [dialogData?.field?.availableTimeSlots, dialogData?.field?.bookedTimeSlots]);

  const generateEndTimeSlots = (
    ranges: { startTime: string; endTime: string }[],
    booked: { startTime: string; endTime: string }[],
    selectedStartTime: string,
    stepMinutes: number = 30,
  ): string[] => {
    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const toHHMM = (totalMinutes: number) => {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const startMinutes = toMinutes(selectedStartTime);
    const MIN_END = startMinutes + 60; // Phải cách ít nhất 1 tiếng
    const MAX_END = toMinutes('23:00');

    const isInRange = (minute: number) =>
      ranges.some((range) => {
        const rStart = toMinutes(range.startTime);
        const rEnd = toMinutes(range.endTime);
        return minute <= rEnd && startMinutes >= rStart;
      });

    const isBooked = (slotStart: number, slotEnd: number) =>
      booked.some((b) => {
        const bStart = toMinutes(b.startTime);
        const bEnd = toMinutes(b.endTime);
        return slotStart < bEnd && slotEnd > bStart;
      });

    const result: string[] = [];

    for (let end = MIN_END; end <= MAX_END && isInRange(end); end += stepMinutes) {
      if (!isBooked(startMinutes, end)) {
        result.push(toHHMM(end));
      }
    }

    return result;
  };

  const handleChangeStartTime = (event: SelectChangeEvent<typeof rest.startTime>) => {
    const selectedStartTime = event.target.value as string;
    rest.setStartTime(selectedStartTime);

    const newEndSlots = generateEndTimeSlots(
      dialogData?.field?.availableTimeSlots,
      dialogData?.field?.bookedTimeSlots,
      selectedStartTime,
    );

    setTimeSlotsEnd(newEndSlots);
    rest.setEndTime(''); // reset nếu thay đổi start time
  };

  const handleChangeEndTime = (event: SelectChangeEvent<typeof rest.endTime>) => {
    rest.setEndTime(event.target.value as string);
  };

  return (
    <>
      {/* {open && */}
      <Dialog
        closeAfterTransition={false}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        aria-hidden={false}
        slotProps={blueBlurDialogSlotProps}
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center" direction={'row'}>
            <Typography sx={{ fontWeight: 'bold' }}>{rest.title}</Typography>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Grid
            container
            direction={'column'}
            sx={{ width: '100%', gap: 5, height: '100%', my: 3 }}
          >
            <Grid>
              <CustomDatePicker
                label="Chọn ngày"
                name="bookingDate"
                value={rest.selectedDate}
                // setSelectedDate={setSelectedDate}
                onChange={() => {}}
                isBusy={true}
              />
            </Grid>

            <Grid container spacing={1} sx={{ width: '100%' }}>
              <Grid container direction="row" sx={{ width: '100%' }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-start-time-label">Giờ vào</InputLabel>
                    <Select
                      labelId="select-start-time-label"
                      id="select-start-time"
                      value={rest.startTime}
                      label="startTime"
                      onChange={handleChangeStartTime}
                    >
                      <MenuItem value="">
                        <em>Xóa</em>
                      </MenuItem>
                      {filteredStartSlots.map((slot, index) => (
                        <MenuItem key={index} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-end-time-label">Giờ ra</InputLabel>
                    <Select
                      labelId="select-end-time-label"
                      id="select-end-time"
                      value={rest.endTime}
                      label="endTime"
                      onChange={handleChangeEndTime}
                    >
                      <MenuItem value="">
                        <em>Xóa</em>
                      </MenuItem>
                      {timeSlotsEnd.map((slot, index) => (
                        <MenuItem key={index} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            gap={2} // khoảng cách giữa hai nút
            sx={{ px: 2, mb: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              // disabled={!hasAtLeastOneHourBlock(selectedSlots)}
              onClick={handleContinue}
              endIcon={<ArrowForwardIcon />}
            >
              Tiếp tục
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              startIcon={<ClearIcon />}
            >
              Hủy
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* } */}
    </>
  );
}
