"use client"

import React from 'react'
import Select from 'react-select'
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Grid2, Typography } from '@mui/material';
import { Favorite, Room, SportsSoccer } from "@mui/icons-material";


type IconType = "Favorite" | "Room" | "SportsSoccer";

interface SelectBoxProps {
    icon: IconType;
    title: string;
    options: any;
    [key: string]: any; // Cho phép các props khác
}

const icons: Record<IconType, React.ElementType> = { Favorite, Room, SportsSoccer };

interface Option {
    value: string | number | null;
    label: string | null;
}

export default function SelectBox({ icon, title, options, ...rest }: SelectBoxProps) {
    const IconComponent = icons[icon];

    return (
        <Select<Option>
            options={options}
            value={rest.value}
            isClearable={true}
            isSearchable={false}
            onChange={rest.onChange}
            name={rest.name}
            placeholder={
                <Grid2 container direction={"row"} sx={{ gap: 1 }}>
                    {IconComponent ? <IconComponent /> : null} <Typography>{title}</Typography>
                </Grid2>
            }
            styles={{
                container: (base) => ({
                    ...base,
                    width: '100%',
                    height: '100%',
                }),
                control: (base) => ({
                    ...base,
                    width: '100%',
                    height: '100%',
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: 99,
                }),
            }}
            className="SelectBox"
        />
    );
}
