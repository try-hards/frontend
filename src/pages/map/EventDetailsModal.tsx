import { EventDto } from '@/types/EventDto';

import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface Props {
  event: EventDto | null;
  unsetEvent: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EventDetailsModal({ event, unsetEvent }: Props) {
  const handleClose = () => {
    unsetEvent();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={!!event}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        {event?.name}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box
          component={'img'}
          src={event?.photo}
          alt={event?.name}
          sx={{
            width: '100%',
          }}
        />
      </DialogContent>
      <DialogContent>
        <Typography gutterBottom>{event?.description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Join event
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
