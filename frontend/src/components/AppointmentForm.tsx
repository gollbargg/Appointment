import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent, Container } from '@mui/material';

import axios from 'axios';

interface AppointmentFormProps {
  appointment?: any; // You can replace 'any' with a more specific type
  onSave: () => void; // Callback function to refresh the list after saving
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ appointment, onSave }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    if (appointment) {
      // If editing an appointment, initialize form with existing data
      setTitle(appointment.title);
      setType(appointment.type);
      setLocation(appointment.location);
      setStartTime(new Date(appointment.startTime));
      setEndTime(new Date(appointment.endTime));
    }
  }, [appointment]);

  const handleSave = async () => {
    const payload = { title, type, location, startTime, endTime };
    if (appointment) {
      // Update existing appointment
      await axios.put(`http://localhost:3000/appointments/${appointment.id}`, payload);
    } else {
      // Create new appointment
      await axios.post('http://localhost:3000/appointments', payload);
    }
    onSave(); // Call the onSave callback to refresh the list
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select value={type} label="Type" onChange={handleTypeChange}>
          <MenuItem value="Virtual">Virtual</MenuItem>
          <MenuItem value="Physical">Physical</MenuItem>
        </Select>
      </FormControl>
      {type === 'Physical' && (
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        />
      )}
      
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
        Save Appointment
      </Button>
    </Container>
  );
};

export default AppointmentForm;