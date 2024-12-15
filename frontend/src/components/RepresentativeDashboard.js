import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Grid 
} from '@mui/material';
import axios from 'axios';

export default function RepresentativeDashboard() {
  const [checkInLocation, setCheckInLocation] = useState('');

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.post('http://localhost:5000/attendance/checkin', { location: checkInLocation }, config);
      
      alert('Check-in successful!');
    } catch (error) {
      console.error('Error checking in', error);
      alert('Check-in failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Representative Dashboard
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Check-in Location"
              value={checkInLocation}
              onChange={(e) => setCheckInLocation(e.target.value)}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCheckIn}
            >
              Check In
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}