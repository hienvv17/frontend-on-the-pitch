"use client";

import React, { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AppContext } from "../contexts/AppContext";
import { msgDetail } from "@/utility/constant";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { blueBlurDialogSlotProps } from "@/utility/dialogSlotProps";
import CustomDatePicker from "./DatePicker";
import { generateTimeSlots2 } from "@/utility/generateTimeSlots2";
import dayjs from "dayjs";



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

  console.log("TimeSlotSelector ->rest", rest);

  const { setOpenSnackBar } = useContext(AppContext);

  const [timeSlotsStart, setTimeSlotsStart] = useState<any[]>([]);
  const [timeSlotsEnd, setTimeSlotsEnd] = useState<any[]>([]);

  useEffect(() => {
    rest.setBookingData((prev: any) => ({
      ...prev,
      bookingDate:
        rest.searchData.dayPicked !== null
          ? rest.searchData.dayPicked.format("YYYY-MM-DD")
          : "",
    }));
  }, []);

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
    // setStartTime('');
    // setEndTime('');
    setOpenSnackBar({ isOpen: false, msg: msgDetail[14], type: "error" });
    onClose(); // Đóng Dialog
  };

  const handleContinue = () => {
    console.log("rest.startTime", rest.startTime);
    console.log("rest.endTime", rest.endTime);

    if (rest.startTime === '' || rest.endTime === '') {
      setTimeout(() => {
        setOpenSnackBar({ isOpen: true, msg: msgDetail[14], type: "error" });
      }, 100);
      return;
    }

    setOpenSnackBar({ isOpen: false, msg: msgDetail[16], type: "info" });

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

  useEffect(() => {
    const temp = generateTimeSlots2("05:00", "22:00", []);
    setTimeSlotsStart(temp);
  }, []);



  useEffect(() => {
    if (rest.startTime === '') {
      rest.setEndTime('');
      return;
    }
    const [hours, minutes] = rest.startTime.split(":").map(Number);
    console.log("hours", hours, minutes);
    const temp = generateTimeSlots2((hours + 1 + ":" + minutes).toString(), "23:00", []);

    setTimeSlotsEnd(temp);
  }, [rest.startTime]);

  const handleChangeStartTime = (event: SelectChangeEvent<typeof rest.startTime>) => {
    console.log("event.target.value", event.target);
    console.log("rest.startTime", rest.startTime);
    rest.setStartTime(event.target.value as string);
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
          <Grid container direction={"column"} sx={{ width: "100%", gap: 5, height: "100%", my: 3 }}>
            <Grid>
              <CustomDatePicker
                label="Chọn ngày"
                name="bookingDate"
                value={rest.selectedDate}
                // setSelectedDate={setSelectedDate}
                onChange={() => { }}
                isBusy={true}
              />
            </Grid>

            <Grid container spacing={1} sx={{ width: "100%" }}>
              <Grid container direction="row" sx={{ width: "100%" }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Giờ vào</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rest.startTime}
                      label="startTime"
                      onChange={handleChangeStartTime}
                    >
                      <MenuItem value="">
                        <em>Xóa</em>
                      </MenuItem>
                      {timeSlotsStart.map((time, index) => (
                        <MenuItem key={index} value={time.timeSlot} disabled={time.disable}>
                          {time.timeSlot}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth disabled={rest.startTime === ''}>
                    <InputLabel id="demo-simple-select-label">Giờ ra</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rest.endTime}
                      label="endTime"
                      onChange={handleChangeEndTime}
                    >
                      <MenuItem value="">
                        <em>Xóa</em>
                      </MenuItem>
                      {timeSlotsEnd.map((time, index) => (
                        <MenuItem key={index} value={time.timeSlot} disabled={time.disable}>
                          {time.timeSlot}
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

