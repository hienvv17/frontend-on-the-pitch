'use client';

import React, { useEffect, useState } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopBtn = () => {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        const shouldShow = window.scrollY > 300;
        setVisible(shouldShow);
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Zoom in={visible}>
            <Fab
                color="primary"
                size="small"
                onClick={handleClick}
                sx={{
                    position: 'fixed',
                    bottom: 40,
                    right: 40,

                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
};

export default ScrollToTopBtn;
