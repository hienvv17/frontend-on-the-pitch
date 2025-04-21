import * as React from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/vi'; // Chỉ cần import nếu sử dụng ngôn ngữ khác mặc định (ví dụ: Tiếng Việt)
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { viVN } from '@mui/x-date-pickers/locales';

// Thiết lập ngôn ngữ toàn cục (Ví dụ: Tiếng Việt)
moment.locale('vi');

export default function TimePickerValue(props: any) {
    const [value] = React.useState<Moment | null>(null); // Mặc định là giờ hiện tại



    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale="vi"
            localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <TimePicker
                value={value}
                label={props.label}
                name={props.name}
                onChange={props.onChange}
                minutesStep={10} // Bước nhảy thời gian 10 phút
                ampm={false} // Sử dụng định dạng 24 giờ
                format="HH:mm" // Định dạng giờ 24h
                // maxTime={moment().hour(20).startOf('hour')}
                // minTime={moment().hour(6).startOf('hour')}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        placeholder: '--:--',
                        InputLabelProps: { shrink: true },
                        inputProps: { readOnly: true },
                    },
                    actionBar: {
                        actions: ['clear', 'accept'],
                    },
                }}
            // desktopModeMediaQuery="@media (pointer: coarse)" // ép dùng mobile UI
            />
        </LocalizationProvider>
    );
}
