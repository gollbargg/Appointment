import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Paper, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Buyer {
  id:number;
  name:string;
  company_name:string
}

interface Vendor {
  id:number;
  name:string
}

interface Appointment {
  id: number;
  title: string;
  type:string
  location:string
  host:Vendor
  client:Buyer;
  startTime: string;
  endTime: string;
}

export const AppointmentList = () => {

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDeleteClick = (appointmentId: number) => {
    setOpenDialog(true);
    setAppointmentToDelete(appointmentId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (appointmentToDelete !== null) {
      try {
        await axios.delete(`http://localhost:3000/appointments/${appointmentToDelete}`);
        fetchAppointments(); // Refresh the list
        handleCloseDialog();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };
  
  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id} divider secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(appointment.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={appointment.title}
              secondary={`Start: ${appointment.startTime} - End: ${appointment.endTime}`}
            />
          </ListItem>
        ))}
      </List>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this appointment?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
