'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  Rating,
  Avatar,
} from '@mui/material';
import {
  Close,
  AccessTime,
  LocationOn,
  SportsTennis,
  AttachMoney,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ImageSlider from './ImgSlide';
import { publicApi } from '@/api/base';

interface BranchDetailsModalProps {
  open: boolean;
  onClose: () => void;
  branchId: string | null;
}

interface SportCategory {
  id: number;
  name: string;
}

interface SportField {
  id: number;
  name: string;
  images: string[] | null;
}

interface TopReiews {
  id: number;
  comment: string;
  rating: number;
  fieldName: string;
  userName: string;
  userImage: string;
}
interface BranchDetails {
  id: string;
  name: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  openTime: string;
  closeTime: string;
  totalFields: string;
  averagePrice: string;
  sportCategories: SportCategory[];
  sportFields: SportField[];
  images: [];
  topReviews: TopReiews[];
}

export default function BranchDetailsModal({ open, onClose, branchId }: BranchDetailsModalProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [branchDetails, setBranchDetails] = useState<BranchDetails | null>(null);
  const [images, setImages] = useState<string[]>([]);

  // Fetch branch details when modal opens and branchId changes
  useEffect(() => {
    if (open && branchId) {
      fetchBranchDetails(branchId);
    }
  }, [open, branchId]);

  const fetchBranchDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const configApi = publicApi('');
      const response = await configApi.get(`/branches/${id}`);

      if (response.data.success) {
        setBranchDetails(response.data.branch);
        setImages(response.data.images || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch branch details');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    return Number.parseInt(price).toLocaleString('vi-VN') + ' VNĐ';
  };

  const getFullAddress = () => {
    if (!branchDetails) return '';
    return `${branchDetails.street}, ${branchDetails.ward}, ${branchDetails.district}, ${branchDetails.city}`;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="branch-details-modal"
      aria-describedby="modal-showing-branch-details"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '2%',
          left: { xs: '0.5%', sm: '20%', md: '23%' },

          width: { xs: '90%', sm: '75%', md: '50%' },
          maxWidth: '1000px',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
          overflow: 'auto',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
              Đóng
            </Button>
          </Box>
        ) : branchDetails ? (
          <>
            <Box sx={{ mb: 3 }}>
              {/* Image Gallery */}
              <Box
                sx={{
                  position: 'relative',
                  mb: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: '300px',
                }}
              >
                <ImageSlider
                  images={branchDetails.images}
                  defaultImage="https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png"
                  interval={3000}
                  height={300}
                  showControls={true}
                  showIndicators={true}
                />
              </Box>

              {/* Branch Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.dark,
                    mb: 1,
                  }}
                >
                  {branchDetails.name}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {branchDetails.sportCategories.map((category) => (
                    <Chip
                      key={category.id}
                      icon={<SportsTennis />}
                      label={category.name}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </motion.div>

              {/* Branch Info */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <LocationOn
                        sx={{
                          color: theme.palette.primary.main,
                          mr: 1,
                          mt: 0.5,
                        }}
                      />
                      <Typography variant="body1">{getFullAddress()}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccessTime sx={{ color: theme.palette.primary.main, mr: 1 }} />
                      <Typography variant="body1">
                        Giờ mở cửa: <strong>{branchDetails.openTime}</strong> -{' '}
                        <strong>{branchDetails.closeTime}</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AttachMoney sx={{ color: theme.palette.primary.main, mr: 1 }} />
                      <Typography variant="body1">
                        Giá trung bình: <strong>{formatPrice(branchDetails.averagePrice)}</strong>
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SportsTennis sx={{ color: theme.palette.primary.main, mr: 1 }} />
                      <Typography variant="body1">
                        Tổng số sân: <strong>{branchDetails.totalFields}</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                        Loại sân:
                      </Typography>
                      {branchDetails.sportCategories.map((category) => (
                        <Box
                          key={category.id}
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                        >
                          <CheckCircle sx={{ color: 'green', mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">{category.name}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Sport Fields */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                Danh sách sân
              </Typography>

              <Grid container spacing={3}>
                {branchDetails.sportFields.slice(0, 3).map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          field.images && field.images.length > 0
                            ? field.images[0]
                            : 'https://res.cloudinary.com/dv8qmimg8/image/upload/v1743153667/green-soccer-field_slh37e.png'
                        }
                        alt={field.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                          {field.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
            <Divider sx={{ my: 3 }} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                Đánh giá nổi bật
              </Typography>

              <Grid container spacing={3}>
                {branchDetails.topReviews && branchDetails.topReviews.length > 0 ? (
                  branchDetails.topReviews.slice(0, 3).map((review) => (
                    <Grid item xs={12} sm={6} md={4} key={review.id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          p: 1,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={review.userImage}
                            alt={review.userName}
                            sx={{ width: 48, height: 48, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {review.userName}
                            </Typography>
                          </Box>
                        </Box>

                        <Rating value={review.rating} readOnly size="medium" />
                        <br />
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ mb: 1, flexGrow: 1 }}
                        >
                          {review.comment}
                        </Typography>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center" color="text.secondary">
                      Không có đánh giá
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </motion.div>

            {/* <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1, borderRadius: 2 }}
                onClick={() => {
                  onClose()
                }}
              >
                Đặt sân ngay
              </Button>
            </Box> */}
          </>
        ) : null}
      </Box>
    </Modal>
  );
}
