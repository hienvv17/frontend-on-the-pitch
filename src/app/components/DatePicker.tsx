import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import "moment/locale/vi";
import { viVN } from "@mui/x-date-pickers/locales";
import { IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type CustomDatePickerProps = {
    label?: string;
    name?: string;
    value: Moment | null;
    onChange: (value: Moment | null) => void;
    [key: string]: any;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    label,
    name,
    value,
    onChange,
    ...rest
}) => {
    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale="vi"
            localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <DatePicker

                label={label}
                value={value}
                name={name}
                onChange={onChange}
                minDate={moment()}
                format="DD/MM/YYYY"
                dayOfWeekFormatter={(day) => {
                    const customWeekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                    return customWeekDays[day.day()];
                }}
                sx={{ width: "100%" }}
                disabled={rest.isBusy}
                views={["year", "month", "day"]}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        error: false,
                        InputProps: value && moment.isMoment(value) && value.isValid()
                            ? {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onChange(null);
                                            }}
                                            size="small"
                                            edge="end"
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                            : undefined,
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
