import React from 'react';
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Card
} from '@mui/material';
import UserLayout from '@/app/components/UserLayout';

export default function RefundPolicy() {
    return (
        <UserLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                        mb: 4,
                    }}
                >
                    {/* Header with background */}
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 20, md: 50 },
                            bgcolor: "var(--Primary-500)",
                            backgroundImage:
                                "linear-gradient(135deg, var(--Primary-600) 0%, var(--Primary-400) 100%)",
                            display: "flex",
                            alignItems: "center",
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} color="white">
                            Chính sách hoàn tiền
                        </Typography>
                    </Box>

                    <Container maxWidth="md" sx={{ my: 4, px: 2 }}>
                        <Typography paragraph>
                            Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ thuê sân thể thao của chúng tôi. Dưới đây là chính sách hoàn tiền áp dụng nhằm đảm bảo quyền lợi của khách hàng.
                        </Typography>

                        <Box mt={4}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                                1. Điều kiện được hoàn tiền
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                                Khách hàng hủy đặt sân ít nhất <Typography component="span" color="error" fontWeight="bold">48 giờ trước</Typography> thời gian sử dụng dự kiến.
                                            </>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Sân bị đóng cửa hoặc không thể sử dụng do sự cố kỹ thuật từ phía nhà cung cấp trong khoảng thời gian đặt sân."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Trường hợp có lỗi đặt sân (như sai ngày, sai sân, không xác nhận đặt sân), khách hàng được hoàn tiền hoặc đổi lịch phù hợp."
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mt={3}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                                2. Trường hợp không được hoàn tiền
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemText
                                        primary="Khách hàng hủy đặt sân trong vòng dưới 48 giờ trước thời gian dự kiến."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Khách hàng không đến sử dụng sân vào thời gian đã đặt mà không thông báo."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Thời tiết không thuận lợi (mưa bão, nắng gắt) không thuộc phạm vi cam kết của nhà cung cấp."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Khách hàng vi phạm quy định sân dẫn đến việc bị từ chối sử dụng dịch vụ."
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mt={3}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                                3. Quy trình hoàn tiền
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemText
                                        primary="Khách hàng liên hệ bộ phận hỗ trợ qua số điện thoại hoặc email trong thời gian sớm nhất để xác nhận yêu cầu hoàn tiền."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                                Đội ngũ hỗ trợ sẽ kiểm tra và phản hồi xác nhận việc hoàn tiền trong vòng <Typography component="span" color="error" fontWeight="bold">48 giờ làm việc</Typography>.
                                            </>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Quá trình hoàn tiền có thể mất từ 3 đến 7 ngày làm việc, không kể ngày lễ, Tết."
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mt={3} mb={4}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                                4. Liên hệ hỗ trợ
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemText primary={
                                        <>
                                            <Typography>Khách hàng có thắc mắc hoặc cần hỗ trợ về chính sách hoàn tiền, vui lòng liên hệ:</Typography>
                                        </>
                                    }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <>
                                            <Typography fontWeight="bold">Điện thoại: 0989 789 789</Typography>
                                        </>
                                    }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <>
                                            <Typography fontWeight="bold">Email: onthepitchservice@gmail.com</Typography>
                                        </>
                                    }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </Container>
                </Card>
            </Container >
        </UserLayout >
    );
}
