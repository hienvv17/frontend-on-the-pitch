import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
    return (
        <>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: "var(--Primary-700)", mt: 5 }}>
                <Typography variant="body2" color="var(--Primary-50)">© 2024 On the Pitch. All rights reserved.</Typography>
            </Box>
        </>
    )
}