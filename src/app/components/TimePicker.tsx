import * as React from "react";
import moment from "moment";
import "moment/locale/vi"; // Chỉ cần import nếu sử dụng ngôn ngữ khác mặc định (ví dụ: Tiếng Việt)
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { viVN } from "@mui/x-date-pickers/locales";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
// Thiết lập ngôn ngữ toàn cục (Ví dụ: Tiếng Việt)
moment.locale("vi");

export default function TimePickerValue(props: any) {
  console.log("TimePickerValue -> props", props)
  // const now = moment('2025-04-27 19:25');
  const now = moment();
  const isToday = props.selectedDate && props.selectedDate.isSame(now, "day");
  return (
    <LocalizationProvider
      dateAdapter={AdapterMoment}
      adapterLocale="vi"
      localeText={
        viVN.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DesktopTimePicker
        openTo="hours"
        value={props.value}
        label={props.label}
        name={props.name}
        onChange={props.onChange}
        onError={props.onError}
        minutesStep={30} // Hiển thị giá trị phút 0 và 30 trong bộ chọn, các giá trị phút khác bội số của 30 sẽ bị disable
        ampm={false} // Sử dụng định dạng 24 giờ
        format="HH:mm" // Định dạng giờ:phút
        maxTime={moment().hour(props.maxHour).startOf("hour")}
        minTime={moment()
          .hour(props.name === "endTime" ? 6 : 5)
          .startOf("hour")}
        skipDisabled={true} // Ẩn các giá trị đã bị disable khỏi bộ chọn
        disabled={
          props.isBusy ||
          (isToday && now.hour() >= 22) ||
          (props.name === "endTime" && !props.value2.startTime)
        }
        closeOnSelect={false}
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder: "--:--",
            InputLabelProps: { shrink: true },
            inputProps: { readOnly: true },
          },
          actionBar: {
            actions: ["clear", "accept"],
          },
        }}
        shouldDisableTime={(timeValue, clockType) => {
          const nowTimeValue = props.value2.startTime
            ? props.value2.startTime
            : now;

          if (clockType === "hours") {
            if (!isToday) {
              return props.name === "endTime"
                ? timeValue.hour() <= nowTimeValue.hour()
                : false;
            }
            if (now.minute() >= 30) {
              return props.name === "endTime"
                ? timeValue.hour() < nowTimeValue.hour() + 1
                : timeValue.hour() < now.hour() + 1;
            } else
              return props.name === "endTime"
                ? timeValue.hour() <= nowTimeValue.hour()
                : timeValue.hour() < now.hour();
          }

          if (clockType === "minutes") {
            if (!isToday) {
              return (
                timeValue.hour() === nowTimeValue.hour() + 1 &&
                timeValue.minute() < nowTimeValue.minute()
              );
            }
            if (props.name === "endTime") {
              return (
                timeValue.hour() === nowTimeValue.hour() + 1 &&
                timeValue.minute() < nowTimeValue.minute()
              );
            } else
              return (
                timeValue.hour() === now.hour() &&
                timeValue.minute() < now.minute()
              );
          }

          return false;
        }}
      />
    </LocalizationProvider>
  );
}
