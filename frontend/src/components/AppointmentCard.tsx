import { Card, CardContent, Typography, IconButton } from '@mui/material';
import React from 'react'
import { Appointment } from '../types/Appointment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: (appointmentId: number) => void;
}

export const AppointmentCard = ({ appointment, onDelete }: AppointmentCardProps) => {
  return (
    <Card elevation={3} sx={{ width: '15rem', height: '20rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
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
        <IconButton aria-label="delete" onClick={() => onDelete(appointment.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" >
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
