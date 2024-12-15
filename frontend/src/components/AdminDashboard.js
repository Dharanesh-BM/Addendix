import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

export default function AdminDashboard() {
  const [representatives, setRepresentatives] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newRepresentative, setNewRepresentative] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Fetch representatives and attendance data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const repsResponse = await axios.get('http://localhost:5000/admin/representatives', config);
        setRepresentatives(repsResponse.data);
        
        const attendanceResponse = await axios.get('http://localhost:5000/admin/attendance', config);
        setAttendanceData(attendanceResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleAddRepresentative = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.post('http://localhost:5000/admin/representatives', newRepresentative, config);
      
      // Refresh representatives list
      const response = await axios.get('http://localhost:5000/admin/representatives', config);
      setRepresentatives(response.data);
      
      setOpenAddDialog(false);
      setNewRepresentative({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding representative', error);
    }
  };

  const handleDeleteRepresentative = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.delete(`http://localhost:5000/admin/representatives/${id}`, config);
      
      // Refresh representatives list
      const response = await axios.get('http://localhost:5000/admin/representatives', config);
      setRepresentatives(response.data);
    } catch (error) {
      console.error('Error deleting representative', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Representatives Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Representatives
              <Button 
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setOpenAddDialog(true)}
                sx={{ ml: 2 }}
              >
                Add Representative
              </Button>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {representatives.map((rep) => (
                    <TableRow key={rep._id}>
                      <TableCell>{rep.name}</TableCell>
                      <TableCell>{rep.email}</TableCell>
                      <TableCell align="right">
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteRepresentative(rep._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Attendance Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Attendance Records
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Check-in Time</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>{record.userId.name}</TableCell>
                      <TableCell>{record.userId.email}</TableCell>
                      <TableCell>{new Date(record.checkInTime).toLocaleString()}</TableCell>
                      <TableCell>{record.location || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Representative Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Representative</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newRepresentative.name}
            onChange={(e) => setNewRepresentative({...newRepresentative, name: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newRepresentative.email}
            onChange={(e) => setNewRepresentative({...newRepresentative, email: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newRepresentative.password}
            onChange={(e) => setNewRepresentative({...newRepresentative, password: e.target.value})}
          />
          <Button onClick={handleAddRepresentative} color="primary">
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}