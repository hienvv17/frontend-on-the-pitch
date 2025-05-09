import { Grid2, Typography } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface TimeSlot {
    timeSlot: string;
    disable: boolean;
}

interface Option {
    value: string;
    label: string;
    isDisabled?: boolean;
}

interface Props {
    options: TimeSlot[];
    value: string | null;
    onChange: (value: string | null) => void;
    [key: string]: any; // Cho phép các props khác
}

export default function TimeSlotSelect({ options, value, onChange, ...rest }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const selectRef = useRef<any>(null);

    const formattedOptions: Option[] = options.map((slot) => ({
        value: slot.timeSlot,
        label: slot.timeSlot,
        isDisabled: slot.disable,
    }));

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isDisabled ? '#999' : 'black',
            backgroundColor: state.isDisabled ? '#f0f0f0' : provided.backgroundColor,
            cursor: state.isDisabled ? 'not-allowed' : 'default',
        }),
    };

    // Scroll vào option khả dụng đầu tiên và cuộn lên trên khi menu mở
    useEffect(() => {
        if (menuOpen) {
            setTimeout(() => {
                const dropdown = document.querySelector('.react-select__menu-list');
                const firstEnabledOption = document.querySelector(
                    '.react-select__option:not(.react-select__option--is-disabled)'
                );
                if (dropdown && firstEnabledOption) {
                    (firstEnabledOption as HTMLElement).scrollIntoView({ block: 'start' });
                }
            }, 0);
        }
    }, [menuOpen]);

    return (
        <Select
            ref={selectRef}
            options={formattedOptions}
            value={formattedOptions.find((opt) => opt.value === value) || null}
            onChange={(option) => onChange(option?.value ?? null)}
            isClearable
            placeholder="Chọn giờ"
            styles={customStyles}
            onMenuOpen={() => setMenuOpen(true)}
            onMenuClose={() => setMenuOpen(false)}
            classNamePrefix="react-select"

        />
    );
}
