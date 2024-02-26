import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import React from 'react'
import { Appointment } from '../types/Appointment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: (appointmentId: number) => void;
  onEdit: (appointment: Appointment) => void;
}

export const AppointmentCard = ({ appointment, onDelete, onEdit }: AppointmentCardProps) => {
  return (
    <Card elevation={3} sx={{ width: '15rem', height: '18rem', display: 'flex', flexDirection: 'column', borderRadius:'8px' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {appointment.title}
        </Typography>
        <Typography color="textSecondary">
          Type: {appointment.type}
        </Typography>
        {appointment.type === 'Physical' && (
          <Typography color="textSecondary">
            Location: {appointment.location}
          </Typography>
        )}
        <Typography color="textSecondary">
          Host: {appointment.host?.name}
        </Typography>
        <Typography color="textSecondary">
          Client: {appointment.client?.name} ({appointment.client?.company_name})
        </Typography>
        <Typography color="textSecondary">
          Start: {appointment.startTime}
        </Typography>
        <Typography color="textSecondary">
          End: {appointment.endTime}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="edit" onClick={() => onEdit?.(appointment)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDelete(appointment.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};