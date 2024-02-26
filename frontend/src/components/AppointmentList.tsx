import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Grid } from '@mui/material';
import { useStore } from '../store/store';
import { AppointmentCard } from './AppointmentCard';

export const AppointmentList = () => {

  const { appointments, fetchAppointments, removeAppointment } = useStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

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
      await removeAppointment(appointmentToDelete);
      handleCloseDialog();
    }
  };
  
  const handleEdit = () => {
    console.log("editing")
  }


  return (
    <>
      <Grid container spacing={4} style={{ padding: '20px' }}>
        {appointments.map((appointment) => (
          <Grid item spacing={4} style={{ marginRight: '5rem' }} xs={12} sm={6} md={4} key={appointment.id}>
            <AppointmentCard
              appointment={appointment}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>
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
    </>
  );
    
}
