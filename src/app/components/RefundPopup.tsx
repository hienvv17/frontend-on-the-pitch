import React, {  useContext, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box
} from '@mui/material';
import { AppContext } from '../contexts/AppContext';
import { msgDetail } from '@/utility/constant';


interface RefundPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const RefundPopup = ({ open, onClose, onSubmit, selectedItem }: any) => {
  const [reason, setReason] = useState('');
const { setOpenSnackBar } = useContext(AppContext);
  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason, selectedItem); 
    } else {
     
       setOpenSnackBar({
              isOpen: true,
              msg: msgDetail[22], 
              type: 'error',
            });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2
        }
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          pb: 0
        }}
      >
        Hoàn Tiền
      </DialogTitle>

      <DialogContent>
        <Box mt={2}>
          <TextField
            autoFocus
            label="Nhập lý do hoàn tiền..."
            type="text"
            fullWidth
            variant="outlined"
            multiline
            minRows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            padding: "8px 30px",
            fontWeight: 500,
            color: '#555',
            ':hover': {
              backgroundColor: '#D32F2F',
              borderColor:"transparent",
              color:"#fff"
            }
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            borderRadius: 2,
            padding: "8px 30px",
            textTransform: 'none',
            fontWeight: 500,
            ':hover': {
              backgroundColor: '#63A7F9'
            }
          }}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefundPopup;
