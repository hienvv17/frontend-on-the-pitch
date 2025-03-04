'use client';

import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Card, CardMedia, CardContent, CardActions, Rating } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SearchIcon from "@mui/icons-material/Search";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { sizing } from '@mui/system';

const stadiums = [
  { name: "Sân ABC", image: "/image/image_12.png", location: "Quận 10", price: "250.000 VND/h", rating: 4.5 },
  { name: "Sân XYZ", image: "/image/image_12.png", location: "Quận 9", price: "220.000 VND/h", rating: 4.0 },
];

const style = {
  button: {
    // width: 127,
    height: '100%',
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
    <>
      <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
        {/* Thanh điều hướng */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>On the Pitch</Typography>
            <Button color="inherit">Đăng nhập</Button>
          </Toolbar>
        </AppBar>

        {/* Banner */}
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Tìm sân dễ dàng - Đặt sân nhanh chóng!
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Đặt sân ngay
          </Button>
        </Box>

        {/* Form tìm kiếm */}
        <Container sx={{ height: '100%' }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField fullWidth label="Loại sân" variant="outlined" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Nhập địa điểm" variant="outlined" />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField fullWidth label="Chọn ngày" type="date" slotProps={{ inputLabel: { shrink: true } }} />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button variant="contained" color="primary" startIcon={<SearchIcon />} fullWidth size="large" sx={{ ...style.button }}>
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </Container>

        {/* Danh sách sân */}
        <Container sx={{ my: 5 }}>
          <Grid container
            direction={'row'}
            sx={{
              alignItems: "center",
              gap: 1,
              mb: 2
            }}
          >
            <SportsSoccerIcon />
            <Typography variant="h5" >
              Sân đá banh
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            {stadiums.map((stadium, index) => (
              <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card>
                  <CardMedia component="img" height="180" image={stadium.image} alt={stadium.name} />
                  <CardContent>
                    <Typography variant="h6">{stadium.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{stadium.location}</Typography>
                    {/* <Typography variant="body1" color="primary">{stadium.price}</Typography> */}
                    <Rating value={stadium.rating} readOnly />
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary">Đặt sân</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.200', mt: 5 }}>
          <Typography variant="body2">© 2025 On the Pitch. All rights reserved.</Typography>
        </Box>
      </Box>
    </>
  );
}
