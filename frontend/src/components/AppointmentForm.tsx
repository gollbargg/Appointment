import React, { useState, useEffect } from 'react';
import { Button, SelectChangeEvent, Container } from '@mui/material';
import axios from 'axios';
import { Appointment } from '../types/Appointment';
import { DateTimePicker } from './DateTimePicker';
import { FormField } from './FormField';
import { SelectField } from './SelectField';
import { AppointmentFormState, initialFormState, useStore } from '../store/store';


interface AppointmentFormProps {
  appointment?: Appointment;
  onSave: () => void;
}

export const AppointmentForm = ({ appointment, onSave }: AppointmentFormProps) => {
 
  const [formState, setFormState] = useState<AppointmentFormState>(initialFormState);
  const { fetchAppointments } = useStore();


  useEffect(() => {
    if (appointment) {
      setFormState({
        ...formState,
        title: appointment.title,
        type: appointment.type,
        location: appointment.location,
        startTime: new Date(appointment.startTime),
        endTime: new Date(appointment.endTime),
      });
    }

    const fetchVendorsAndBuyers = async () => {
      try {
        const vendorsResponse = await axios.get('http://localhost:3000/vendors');
        const buyersResponse = await axios.get('http://localhost:3000/buyers');
        setFormState(prevState => ({
          ...prevState,
          vendors: vendorsResponse.data,
          buyers: buyersResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching vendors or buyers:", error);
      }
    };
    fetchVendorsAndBuyers();
  }, [appointment]);


  const handleSave = async () => {
    const payload = { 
      title: formState.title, 
      type: formState.type, 
      location: formState.location, 
      startTime: formState.startTime, 
      endTime: formState.endTime 
    };
    if (appointment) {
      await axios.put(`http://localhost:3000/appointments/${appointment.id}`, payload);
    } else {
      await axios.post('http://localhost:3000/appointments', payload);
    }
    onSave();
    fetchAppointments()
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    const newType = event.target.value;
    setFormState(prevState => ({
      ...prevState,
      type: newType,
    }));
  };

  const handleStartTimeChange = (dates: any) => {
    const selectedDate = dates[0] ? dates[0] : null;
    setFormState(prevState => ({
      ...prevState,
      startTime: selectedDate,
    }));
  };

  const handleEndTimeChange = (dates: any) => {
    const selectedDate = dates[0] ? dates[0] : null;
    setFormState(prevState => ({
      ...prevState,
      endTime: selectedDate,
    }));
  };

  return (
    <Container maxWidth="sm">
      <FormField
        label="Title"
        value={formState.title}
        onChange={(e) => setFormState(prevState => ({ ...prevState, title: e.target.value }))}
      />

      <SelectField
        label="Type"
        value={formState.type}
        onChange={handleTypeChange}
        options={[
          { value: 'Virtual', label: 'Virtual' },
          { value: 'Physical', label: 'Physical' }
        ]}
      />

      {formState.type === 'Physical' && (
        <FormField
          label="Location"
          value={formState.location}
          onChange={(e) => setFormState(prevState => ({ ...prevState, location: e.target.value }))}
        />
      )}

      <SelectField
        label="Host (Vendor)"
        value={formState.hostId}
        onChange={(e) => setFormState(prev => ({ ...prev, hostId: e.target.value }))}
        options={formState.vendors.map(vendor => ({ value: vendor.id, label: vendor.name }))}
      />

      <SelectField
        label="Client (Buyer)"
        value={formState.clientId}
        onChange={(e) => setFormState(prev => ({ ...prev, clientId: e.target.value }))}
        options={formState.buyers.map(buyer => ({ value: buyer.id, label: buyer.name }))}
      />

      <DateTimePicker
        label="Start Time"
        value={formState.startTime}
        onChange={handleStartTimeChange}
      />

      <DateTimePicker
        label="End Time"
        value={formState.endTime}
        onChange={handleEndTimeChange}
      />
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
        Save Appointment
      </Button>
    </Container>
  );
};

