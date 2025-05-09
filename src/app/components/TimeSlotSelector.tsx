"use client";

import React, { useContext, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { format, addMinutes, isEqual } from "date-fns";
import Grid from "@mui/material/Grid2";
import { AppContext } from "../contexts/AppContext";
import { msgDetail } from "@/utility/constant";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { blueBlurDialogSlotProps } from "@/utility/dialogSlotProps";
import CustomDatePicker from "./DatePicker";
import moment from "moment";

const startTime = new Date();
startTime.setHours(5, 0, 0, 0);

const endTime = new Date();
endTime.setHours(23, 0, 0, 0);

function generateTimeSlots() {
  const slots: Date[] = [];
  let current = new Date(startTime);
  while (current <= endTime) {
    slots.push(new Date(current));
    current = addMinutes(current, 30);
  }
  return slots;
}

interface TimeSlotSelectorProps {
  disabledSlots?: Date[];
  open: boolean;
  onClose: () => void;
  [key: string]: any; // Cho phép các props khác
}

export default function TimeSlotSelector({
  disabledSlots = [],
  open,
  onClose,
  ...rest
}: TimeSlotSelectorProps) {
  // console.log("TimeSlotSelector ->rest", rest);

  const { setOpenSnackBar } = useContext(AppContext);

  // const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
  // const [startSlot, setStartSlot] = useState<Date | null>(null);

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    rest.setBookingData((prev: any) => ({
      ...prev,
      bookingDate:
        rest.searchData.dayPicked !== null
          ? rest.searchData.dayPicked.format("YYYY-MM-DD")
          : "",
    }));
  }, []);

  const isSlotSelected = (slot: Date) =>
    rest.selectedSlots.some((s: number | Date) => isEqual(s, slot));

  const isSlotDisabled = (slot: Date) =>
    disabledSlots.some((s) => isEqual(s, slot));

  const toggleSlot = (slot: Date) => {
    if (isSlotDisabled(slot)) return;

    const isAlreadySelected = isSlotSelected(slot);

    if (isAlreadySelected) {
      rest.setSelectedSlots([]);
      rest.setStartSlot(null);
      return;
    }

    if (rest.selectedSlots.length === 0) {
      rest.setSelectedSlots([slot]);
      rest.setStartSlot(slot);
    } else {
      if (!rest.startSlot) return; // thêm dòng này để tránh lỗi null

      const start = rest.startSlot;

      const startIndex = timeSlots.findIndex((s) => isEqual(s, start));
      const endIndex = timeSlots.findIndex((s) => isEqual(s, slot));

      const [from, to] =
        startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
      const range = timeSlots
        .slice(from, to + 1)
        .filter((s) => !isSlotDisabled(s));

      rest.setSelectedSlots(range);
    }
  };

  const handleCancel = () => {
    rest.setBookingData((prev: any) => ({
      ...prev,
      startTime: "",
      endTime: "",
      bookingDate:
        rest.searchData.dayPicked !== null
          ? rest.searchData.dayPicked.format("YYYY-MM-DD")
          : "",
      totalPrice: 0,
      email: "",
      sportFieldId: 0,
    }));

    rest.setSelectedSlots([]);
    rest.setStartSlot(null);
    rest.setSelectedDate(rest.searchData.dayPicked);
    setOpenSnackBar({ isOpen: false, msg: msgDetail[14], type: "error" });
    onClose(); // Đóng Dialog
  };

  const handleContinue = () => {
    setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: "info" });

    if (!rest.bookingData.bookingDate) {
      setTimeout(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[15], type: "error" });
      }, 100);
      return;
    }

    if (!hasAtLeastOneHourBlock(rest.selectedSlots)) {
      setTimeout(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[14], type: "error" });
      }, 100);
      return;
    }

    setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: "info" });
    // console.log("continue");

    // console.log("startTime:", rest.selectedSlots[0].toTimeString().slice(0, 5));
    // console.log("endTime:", rest.selectedSlots[rest.selectedSlots.length - 1].toTimeString().slice(0, 5));

    const startTimeValue = rest.selectedSlots[0].toTimeString().slice(0, 5);
    const endTimeValue = rest.selectedSlots[rest.selectedSlots.length - 1]
      .toTimeString()
      .slice(0, 5);

    rest.setBookingData((prev: any) => ({
      ...prev,
      startTime: startTimeValue,
      endTime: endTimeValue,
    }));

    // rest.setIsContinue(true);
    rest.setOpenDialog1(true);
    onClose(); // Đóng Dialog
    // router.push("/checkout"); // chuyển sang trang thanh toán
  };

  function hasAtLeastOneHourBlock(selected: Date[]) {
    if (selected.length < 2) {
      // setOpenSnackBar({ isOpen: true, msg: msgDetail[14], type: 'error' });
      return false;
    }

    const sorted = [...selected].sort((a, b) => a.getTime() - b.getTime());

    let count = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff = sorted[i].getTime() - sorted[i - 1].getTime();
      if (diff === 30 * 60 * 1000) {
        count++;
        if (count >= 3) return true; // ít nhất 3 slot liên tiếp
      } else {
        count = 1; // reset nếu không liên tiếp
      }
    }

    return false;
  }

  // console.log("rest.selectedDate", rest.selectedDate);

  const handleDateChange = (e: any) => {
    // console.log("handleDateChange ->e", e);
    const value = e === null ? e : moment(e).format("YYYY-MM-DD");
    rest.setSelectedDate(e);
    rest.setBookingData((prev: any) => ({
      ...prev,
      bookingDate: value,
      startTime: null,
      endTime: null,
    }));
  };

  // useEffect(() => {
  //   setSelectedDate(rest.selectedDate !== null ? moment(rest.selectedDate) : null);
  // }, []);

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
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            direction={"row"}
          >
            <Typography sx={{ fontWeight: "bold" }}>{rest.title}</Typography>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Grid container direction={"column"} sx={{ width: "100%", gap: 2 }}>
            <Grid>
              <CustomDatePicker
                label="Chọn ngày"
                name="bookingDate"
                value={rest.selectedDate}
                // setSelectedDate={setSelectedDate}
                onChange={handleDateChange}
                isBusy={false}
              />
            </Grid>
            <Grid container spacing={1}>
              {timeSlots.map((slot, index) => {
                const disabled = isSlotDisabled(slot);
                const selected = isSlotSelected(slot);

                return (
                  <Grid size={12} key={index}>
                    <Button
                      variant={selected ? "contained" : "outlined"}
                      color={
                        disabled
                          ? "inherit"
                          : rest.startSlot && isEqual(slot, rest.startSlot)
                            ? "secondary"
                            : selected
                              ? "primary"
                              : "primary"
                      }
                      fullWidth
                      disabled={disabled}
                      onClick={() => toggleSlot(slot)}
                    >
                      {format(slot, "HH:mm")}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            gap={2} // khoảng cách giữa hai nút
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
