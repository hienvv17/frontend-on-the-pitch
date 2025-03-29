import { Card, CardContent, CardMedia, Typography, Box, Grid2 } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import { grey } from "@mui/material/colors";

export default function CardV1(props) {
    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            // pb: 3,
            // height: "20%",
        }}
            className="BOX"
        >
            <Card sx={{
                display: "flex", borderRadius: 4, border: 1, borderColor: grey[400], overflow: "clip",
                width: "100%",
                height: { xs: "120px", sm: "150px", md: "150px", lg: "150px" },
                m: 2
            }}>
                {/* Hình ảnh bên trái */}

                <CardMedia
                    component="img"
                    sx={{ maxWidth: { xs: "60px", sm: "80px", md: "100px" }, height: "100%", objectFit: "cover" }}
                    image={props.data.image} //Link hình
                    alt="Sân bóng đá"
                />

                {/* Nội dung bên phải */}
                <CardContent sx={{ width: "100%" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        {/* <RoomIcon color="error" fontSize="small" /> */}
                        <Typography fontSize={{ xs: '0.7rem', sm: '0.8rem', md: "1rem" }}>{props.data.location}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                        {/* <StarIcon sx={{ color: "#FFD700" }} fontSize="small" /> */}
                        <Typography fontSize={{ xs: '0.7rem', sm: '0.8rem', md: "1rem" }}>{props.data.rating}</Typography>
                    </Box>

                    <Typography fontSize={{ xs: '0.7rem', sm: '0.8rem', md: "1rem" }} fontWeight={600} mt={1}>
                        {props.data.location}
                    </Typography>

                    <Typography fontSize={{ xs: '0.5rem', sm: '0.6rem', md: "1rem" }} color="text.secondary" mt={0.5}>
                        Mở cửa: 6:00 - 21:00
                    </Typography>
                </CardContent>

            </Card>
        </Box>
    );
};


