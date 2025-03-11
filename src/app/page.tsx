'use client';

import { Typography, Box } from "@mui/material";
import UserLayout from "./components/UserLayout";
// import { sizing } from '@mui/system';

const stadiums = [
  { name: "Sân ABC", image: "/image/image_12.png", location: "Quận 10", price: "250.000 VND/h", rating: 4.5 },
  { name: "Sân XYZ", image: "/image/image_12.png", location: "Quận 9", price: "220.000 VND/h", rating: 4.0 },
];

const style = {
  button: {
    // width: 127,
    // height: '100%',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 700,
    radius: '4px',
    padding: '6px 10px 6px 10px',
    gap: '6px',
    lineHeight: '24px',
    align: 'center',
    // backgroundColor: '#2962FF',
  },
  listItemText: { color: "white", }
} as const;

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      <UserLayout>
        <Typography align="center" sx={{ mt: "10px" }}>Trang chủ</Typography>
      </UserLayout>
    </Box>
  );
}
