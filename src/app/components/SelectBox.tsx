"use client"

import React from 'react'
import Select from 'react-select'
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Box, Grid2, Typography } from '@mui/material';
import { Favorite, Room, SportsSoccer } from "@mui/icons-material";


type IconType = "Favorite" | "Room" | "SportsSoccer";

interface SelectBoxProps {
    icon: IconType;
    titleValue: string;
    options: any;
    [key: string]: any; // Cho phép các props khác
}

const icons: Record<IconType, React.ElementType> = { Favorite, Room, SportsSoccer };

interface Option {
    value: string | number | null;
    label: string | null;
}

export default function SelectBox({ icon, titleValue, options, ...rest }: SelectBoxProps) {
    const IconComponent = icons[icon];

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Select<Option>
                options={options}
                value={rest.value}
                isClearable={true}
                isSearchable={false}
                onChange={rest.onChange}
                name={rest.name}
                isDisabled={rest.isBusy}
                placeholder={
                    <Grid2 container direction={"row"} sx={{ gap: 1 }}>
                        {IconComponent ? <IconComponent /> : null} <Typography>{titleValue}</Typography>
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
        </Box>
    );
}
