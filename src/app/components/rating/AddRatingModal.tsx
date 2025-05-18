'use client';

import { useContext, useState } from 'react';
import { Box, Typography, Button, Modal, TextField, Rating, Stack } from '@mui/material';
import { privateApi } from '@/api/base';
import { msgDetail } from '@/utility/constant';
import { AppContext } from '@/app/contexts/AppContext';

interface AddRatingModalProps {
  open: boolean;
  onClose: () => void;
  booking: any | null;
  onSubmit: (stars: number | null, comment: string) => void;
  onSubmitSuccess?: () => void; // 👈 Ensure onSubmitSuccess is optional here
}

export default function AddRatingModal({
  open,
  onClose,
  booking,
  onSubmit,
  onSubmitSuccess, // 👈 destructure onSubmitSuccess from props
}: AddRatingModalProps) {
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingComment, setRatingComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenSnackBar } = useContext(AppContext);

  const handleSubmit = async () => {
    if (!booking) return;

    try {
      setIsLoading(true);

      const reviewData = {
        fieldBookingId: booking.id,
        comment: ratingComment,
        rating: ratingValue,
      };

      const configApi = privateApi('');
      const response = await configApi.post('/reviews', reviewData);

      if (response.status >= 200 && response.status < 300) {
        onSubmit?.(ratingValue, ratingComment);
        onSubmitSuccess?.(); // Call onSubmitSuccess if provided

        setOpenSnackBar({
          isOpen: true,
          msg: msgDetail[23],
          type: 'success',
        });
      } else {
        console.error('Review submission failed');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setOpenSnackBar({
        isOpen: true,
        msg: msgDetail[24],
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="rating-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography id="rating-modal-title" variant="h6" component="h2" gutterBottom>
          Đánh giá dịch vụ
        </Typography>

        {booking && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {booking.branchName} - {booking.sportFieldName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {booking.day} | {booking.startTime} - {booking.endTime}
            </Typography>
          </Box>
        )}

        <Stack spacing={3} sx={{ mt: 3 }}>
          <Box>
            <Typography component="legend" gutterBottom>
              Đánh giá của bạn
            </Typography>
            <Rating
              name="rating"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              precision={1}
              size="large"
            />
          </Box>

          <TextField
            label="Nhận xét của bạn"
            multiline
            rows={4}
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
            fullWidth
            placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={onClose} color="inherit">
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={!ratingValue || isLoading}
            >
              {isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
