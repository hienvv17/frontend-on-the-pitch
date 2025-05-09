import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Card,
} from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Fade } from 'react-awesome-reveal';
import UserLayout from '@/app/components/UserLayout';

export default function About() {
    return (


        <UserLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Container maxWidth="lg" sx={{ px: 3 }}>
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #1e88e5 30%, #42a5f5 90%)',
                            color: '#fff',
                            borderRadius: 3,
                            p: 5,
                            textAlign: 'center',
                            mb: 8,
                            boxShadow: '0 4px 20px rgba(30,136,229,0.5)',
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h1"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                            }}
                        >
                            Về Chúng Tôi
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto' }}>
                            Chào mừng bạn đến với dịch vụ thuê sân thể thao của chúng tôi – nơi mang đến giải pháp tối ưu và tiện lợi cho nhu cầu vui chơi và luyện tập thể thao của bạn.
                        </Typography>
                    </Box>
                    {/* Mission Section */}
                    <Grid container spacing={6} mb={6} alignItems="stretch">
                        <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
                            <Paper
                                elevation={8}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    backgroundColor: '#e3f2fd',
                                }}
                            >
                                <Box display="flex" alignItems="center" mb={2}>
                                    <SportsSoccerIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
                                    <Typography variant="h5" fontWeight="medium">
                                        Sứ mệnh
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="text.primary" sx={{ pl: 1 }}>
                                    Chúng tôi hướng đến mục tiêu tạo ra nền tảng đặt sân thể thao trực tuyến dễ sử dụng, giúp người chơi tìm kiếm và thuê sân nhanh chóng, thuận tiện mọi lúc mọi nơi.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
                            <Box
                                component="img"
                                src="/image/mission-soccer.png"
                                alt="Sứ mệnh của chúng tôi"
                                sx={{
                                    width: '100%',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    objectFit: 'cover',
                                    // Make sure box fills height for equal height columns
                                    height: 'auto',
                                    flexGrow: 1,
                                }}
                                loading="lazy"
                            />
                        </Grid>
                    </Grid>

                    {/* Core Values Section */}
                    <Grid container spacing={6} mb={6} alignItems="stretch" flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
                            <Box
                                component="img"
                                src="/image/core-values.png"
                                alt="Giá trị cốt lõi"
                                sx={{
                                    width: '100%',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    objectFit: 'cover',
                                    height: 'auto',
                                    flexGrow: 1,
                                }}
                                loading="lazy"
                            />
                        </Grid>
                        <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
                            <Paper
                                elevation={8}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: '#ede7f6',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box display="flex" alignItems="center" mb={2}>
                                    <CheckCircleIcon color="secondary" sx={{ fontSize: 40, mr: 1 }} />
                                    <Typography variant="h5" fontWeight="medium">
                                        Giá trị cốt lõi
                                    </Typography>
                                </Box>

                                <List sx={{ pl: 2 }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Tiện lợi: Giao diện thân thiện, đặt sân nhanh gọn, hỗ trợ đa nền tảng." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Đa dạng: Hệ thống sân thể thao phong phú, đa dạng các loại hình thể thao và địa điểm." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Uy tín: Cam kết chất lượng sân bãi và hỗ trợ khách hàng tận tâm." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="An toàn: Thông tin bảo mật, giao dịch an toàn và minh bạch." />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Service Commitment Section */}
                    <Grid container spacing={6} mb={6} alignItems="stretch">
                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                            <Paper
                                elevation={8}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    backgroundColor: '#fbe9e7',
                                }}
                            >
                                <Box display="flex" alignItems="center" mb={2}>
                                    <SupportAgentIcon color="error" sx={{ fontSize: 40, mr: 1 }} />
                                    <Typography variant="h5" fontWeight="medium">
                                        Cam kết phục vụ
                                    </Typography>
                                </Box>

                                <Typography variant="body1" paragraph sx={{ pl: 1 }}>
                                    Chúng tôi luôn nỗ lực cải tiến dịch vụ, lắng nghe ý kiến khách hàng để mang đến trải nghiệm tốt nhất, giúp bạn tận hưởng những khoảnh khắc thể thao vui khỏe trọn vẹn.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                            <Box
                                component="img"
                                src="/image/customer-support.png"
                                alt="Cam kết phục vụ"
                                sx={{
                                    width: '100%',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    objectFit: 'cover',
                                    height: 'auto',
                                    flexGrow: 1,
                                }}
                                loading="lazy"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Container >
        </UserLayout >
    );
}
