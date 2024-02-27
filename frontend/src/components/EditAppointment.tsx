import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Appointment } from '../types/Appointment';
import { SelectField } from './SelectField';

interface EditAppointmentProps  {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
};

export const EditAppointment = ({ open, appointment, onClose, onSave }: EditAppointmentProps) => {

  const [editedAppointment, setEditedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (appointment) {
      setEditedAppointment(appointment);
    }
  }, [appointment]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedAppointment) {
      setEditedAppointment({ ...editedAppointment, [name]: value });
    }
  };


  const handleSave = () => {
    if (editedAppointment) {
      onSave(editedAppointment);
    }
  };

  
  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Appointment</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        name="title"
        label="Title"
        type="text"
        fullWidth
        variant="outlined"
        value={editedAppointment?.title || ''}
        onChange={handleChange}
      />
      <TextField
        autoFocus
        margin="dense"
        name="location"
        label="Location"
        type="text"
        fullWidth
        variant="outlined"
        value={editedAppointment?.location || ''}
        onChange={handleChange}
      />
      <SelectField
        label="Type"
        value={editedAppointment?.type || ''}
        onChange={handleChange}
        options={[
          { value: 'Virtual', label: 'Virtual' },
          { value: 'Physical', label: 'Physical' }
        ]}
      />
    
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </DialogActions>
  </Dialog>
  )
}
