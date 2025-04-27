import * as React from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/vi'; // Chỉ cần import nếu sử dụng ngôn ngữ khác mặc định (ví dụ: Tiếng Việt)
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { viVN } from '@mui/x-date-pickers/locales';

// Thiết lập ngôn ngữ toàn cục (Ví dụ: Tiếng Việt)
moment.locale('vi');

export default function DatePickerValue(props: any) {
    const [value] = React.useState<Moment | null>(moment()); // Mặc định là hôm nay

    // const handleChange = (newValue: Moment | null) => {
    //     setValue(newValue);
    //     console.log("value", newValue?.format('DD/MM/YYYY')); // In ra giá trị ngày mới chọn
    // }

    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale="vi"
            localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <DatePicker
                label={props.label}
                value={value}
                name={props.name}
                onChange={props.onChange}
                minDate={moment()} // Chặn các ngày nhỏ hơn hôm nay
                format="DD/MM/YYYY"
                dayOfWeekFormatter={(day) => {
                    const customWeekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                    return customWeekDays[day.day()]; // Đổi chữ thành CN, T2, T3...
                }}
                sx={{ width: "100%" }}
                disabled={props.isBusy}
            />
        </LocalizationProvider>
    );
}
