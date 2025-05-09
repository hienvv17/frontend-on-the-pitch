"use client"

import React, { useContext, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    Rating,
    Divider,
    Tabs,
    Tab,
    TextField,
    Button,
} from '@mui/material';
import { Clear, Send } from "@mui/icons-material";
import { styled } from '@mui/system';
import moment from 'moment';
import { AppContext } from '../contexts/AppContext';

const initialReviewed: any[] | (() => any[]) = [
    {
        id: 1,
        title: 'Sân 1',
        rating: 5,
        comment: 'Sân chất lượng tốt, trải nghiệm tuyệt vời',
        date: "2025-05-07",
    },
    {
        id: 2,
        title: 'Sân 1',
        rating: 4,
        comment: 'Mặt sân êm, cơ sở vật chất tốt',
        date: "2025-05-06",
    },
    {
        id: 3,
        title: 'Sân 2',
        rating: 4,
        comment: 'Sân đẹp, thoáng dãng',
        date: "2025-05-06",
    },
    {
        id: 4,
        title: 'Sân 1',
        rating: 3,
        comment: 'Đèn chiếu sáng vừa đủ, sân tốt',
        date: "2025-05-04",
    },
    {
        id: 5,
        title: 'Sân 2',
        rating: 5,
        comment: 'Sân tốt, sẽ quay lại lần tới',
        date: "2025-05-02",
    },
    {
        id: 6,
        title: 'Sân 2',
        rating: 4,
        comment: 'Dịch vụ chất lượng, không có gì để chê.',
        date: "2025-05-02",
    },
];

const initialNotReviewed: any[] | (() => any[]) = [
    {
        id: 101,
        title: 'Sân 2',
        orderDate: "2025-05-03",
    },
    {
        id: 102,
        title: 'Sân 3',
        orderDate: "2025-05-02",
    },
    {
        id: 103,
        title: 'Sân1',
        orderDate: "2025-05-01",
    },
];

// Styled component for review card container
const ReviewCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    //   boxShadow: theme.shadows?.[3] || theme.shadows?.[1], // fallback shadow
    borderRadius: theme.shape.borderRadius,
}));

const ReviewsList = styled(Box)(({ theme }) => ({
    maxHeight: 400,
    overflowY: 'auto',
    paddingRight: theme.spacing(1),
    // Scrollbar styling for webkit browsers
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.action.hover,
        borderRadius: '4px',
    },
}));

function TabPanel(props: any) {
    const { children, value, index } = props;
    return value === index ? <Box sx={{ mt: 2 }}>{children}</Box> : null;
}

const MyReviews = () => {
    const { setOpenSnackBar } = useContext(AppContext);

    const [tabIndex, setTabIndex] = useState(0);
    const [reviewed, setReviewed] = useState(initialReviewed);
    const [notReviewed, setNotReviewed] = useState(initialNotReviewed);

    // Track which notReviewed item is currently writing a review
    const [writingReviewId, setWritingReviewId] = useState(null);

    // Form state
    // const [formTitle, setFormTitle] = useState('');
    const [formRating, setFormRating] = useState(0);
    const [formComment, setFormComment] = useState('');

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setTabIndex(newValue);
    };

    const startWritingReview = (id: any) => {
        setWritingReviewId(id);
        // setFormTitle('');
        setFormRating(5);
        setFormComment('');
    };

    const cancelWritingReview = () => {
        setWritingReviewId(null);
    };

    const handleSubmitReview = (field: any) => {
        if (formRating === 0) {
            setOpenSnackBar({ isOpen: true, msg: 'Vui lòng chọn số sao đánh giá', type: "error" });
            return;
        }
        if (!formComment.trim()) {
            setOpenSnackBar({ isOpen: true, msg: 'Nội dung đánh giá không được để trống', type: "error" });
            return;
        }

        // Find item in notReviewed
        const itemToReview = notReviewed.find((item) => item.id === field.id);
        if (!itemToReview) {
            setOpenSnackBar({ isOpen: true, msg: 'Sân không tồn tại', type: "error" });
            return;
        }

        // Create new review object
        const newReview = {
            id: itemToReview.id,
            title: field.title,
            rating: formRating,
            comment: formComment.trim(),
            date: moment().format("YYYY-MM-DD"),
        };

        // Update state: move item from notReviewed to reviewed
        // TODO: send request to back-end
        // private api: POST /reviews
        //
        //
        //
        setReviewed((prev) => [newReview, ...prev]);
        setNotReviewed((prev) => prev.filter((item) => item.id !== field.id));

        setWritingReviewId(null);
        setOpenSnackBar({ isOpen: true, msg: 'Đã gửi đánh giá thành công!', type: "info" });
    };

    return (
        <Container sx={{
            p: 2,
            height: "500px",
            "&.MuiContainer-root": {
                px: { xs: 0, sm: 2 },
            },
        }}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="Chưa đánh giá" />
                <Tab label="Đã đánh giá" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                {notReviewed.length > 0 ? (
                    <ReviewsList>
                        {notReviewed.map((item) => (
                            <ReviewCard key={item.id}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="h6" component="h2" fontWeight="600">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {moment(item.orderDate).format("DD/MM/YYYY")}
                                        </Typography>
                                    </Box>
                                    {writingReviewId === item.id ? (
                                        <>
                                            <Box component="form" noValidate sx={{ mt: 1, mb: 2 }}>
                                                <Box display="flex" alignItems="center" mb={1}>
                                                    <Rating
                                                        name={`rating-${item.id}`}
                                                        value={formRating}
                                                        onChange={(e, newValue) => setFormRating(Number(newValue))}
                                                        precision={0.5}
                                                    />
                                                </Box>
                                                <TextField
                                                    fullWidth
                                                    label="Nội dung đánh giá"
                                                    value={formComment}
                                                    onChange={(e) => setFormComment(e.target.value)}
                                                    multiline
                                                    minRows={3}
                                                    margin="normal"
                                                    required
                                                />
                                                <Box display="flex" gap={2} mt={2} sx={{ width: "100%", }}>
                                                    <Button variant="contained" color="primary" onClick={() => handleSubmitReview(item)} startIcon={<Send />}
                                                        sx={{ maxWidth: "180px", flex: 1 }}
                                                    >
                                                        Gửi
                                                    </Button>
                                                    <Button variant="outlined" color="error" onClick={cancelWritingReview} startIcon={<Clear />}>
                                                        Hủy
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Hãy để lại đánh giá của bạn
                                        </Typography>
                                    )}
                                    {writingReviewId !== item.id && (
                                        <Button variant="outlined" size="small" onClick={() => startWritingReview(item.id)}>
                                            Viết đánh giá
                                        </Button>
                                    )}
                                </CardContent>
                            </ReviewCard>
                        ))}
                    </ReviewsList>
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center" mt={4}>
                        Hãy đặt sân để trải nghiệm và đánh giá
                    </Typography>
                )}
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
                {reviewed.length > 0 ? (
                    <ReviewsList>
                        {reviewed.map((review) => (
                            <ReviewCard key={review.id}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="h6" component="h2" fontWeight="600">
                                            {review.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {moment(review.date).format("DD/MM/YYYY")}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Rating value={review.rating} readOnly precision={0.5} size="small" />
                                    </Box>
                                    <Divider sx={{ mb: 1 }} />
                                    <Typography variant="body1" color="text.primary">
                                        {review.comment}
                                    </Typography>
                                </CardContent>
                            </ReviewCard>
                        ))}
                    </ReviewsList>
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center" mt={4}>
                        Bạn chưa có đánh giá nào
                    </Typography>
                )}
            </TabPanel>
        </Container>
    );
};

export default MyReviews;
