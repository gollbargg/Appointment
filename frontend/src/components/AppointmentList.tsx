import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Grid } from '@mui/material';
import { useStore } from '../store/store';
import { AppointmentCard } from './AppointmentCard';
import { Appointment } from '../types/Appointment';
import { EditAppointment } from './EditAppointment';

export const AppointmentList = () => {

  const { appointments, fetchAppointments, removeAppointment, updateAppointment } = useStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);

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
  
  const handleEditClick = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentAppointment(null);
  };

  const handleSaveEditedAppointment = async (editedAppointment: Appointment) => {
  
    if (!editedAppointment.id) {
      console.error("Appointment ID is missing.");
      return;
    }
    try {
      await updateAppointment(editedAppointment.id, editedAppointment);
      console.log("Appointment updated successfully.");
      handleCloseEditDialog();
    } catch (error) {
      console.error("Failed to save edited appointment:", error);
    }
  };
  

  return (
    <>
      <Grid container spacing={4} style={{ padding: '20px' }}>
        {appointments.map((appointment) => (
          <Grid item spacing={4} style={{ marginRight: '5rem' }} xs={12} sm={6} md={4} key={appointment.id}>
            <AppointmentCard
              appointment={appointment}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
            />
          </Grid>
        ))}
      </Grid>
      {openEditDialog && currentAppointment && (
        <EditAppointment
          open={openEditDialog}
          appointment={currentAppointment}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEditedAppointment}
        />
      )}

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
