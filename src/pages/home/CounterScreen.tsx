import { Box, Button, Typography } from '@mui/material';

export default function CounterScreen() {

  return (
    <Box>
      <Typography sx={{ mt: 4 }} variant='h6'>
        Counter:
      </Typography>
      <Button sx={{ mt: 2 }} variant='contained'>
        Increase
      </Button>
    </Box>
  );
}
