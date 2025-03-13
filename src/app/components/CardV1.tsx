import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import { grey } from "@mui/material/colors";

export default function CardV1(props) {
    return (
        <Box sx={{ display: "block" }}>
            <Card sx={{ display: "flex", borderRadius: 4, border: 1, borderColor: grey[400], overflow: "clip", width: 450, maxHeight: 150, mx: 1, my: 1 }}>
                {/* Hình ảnh bên trái */}
                <CardMedia
                    component="img"
                    sx={{ width: 120, height: "auto", objectFit: "cover" }}
                    image={props.data.image} //Link hình
                    alt="Sân bóng đá"
                />

                {/* Nội dung bên phải */}
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <RoomIcon color="error" fontSize="small" />
                        <Typography variant="body2">{props.data.location}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <StarIcon sx={{ color: "#FFD700" }} fontSize="small" />
                        <Typography variant="body2">{props.data.rating}</Typography>
                    </Box>

                    <Typography variant="h6" fontWeight={600} mt={1}>
                        {props.title + " " + props.data.location}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Mở cửa: 6:00 - 21:00
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};


