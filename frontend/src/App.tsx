import { Button, Container } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import AppointmentForm from './components/AppointmentForm';
import { AppointmentList } from './components/AppointmentList';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';

function App() {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<any | null>(null); // Consider defining a more specific type than 'any'

  const handleAddClick = () => {
    setCurrentAppointment(null); // No current appointment for adding
    setIsFormVisible(true); // Show the form
  };

  const handleEditClick = (appointment: any) => { // Replace 'any' with your appointment type
    setCurrentAppointment(appointment); // Set the current appointment to edit
    setIsFormVisible(true); // Show the form
  };

  const handleFormSave = () => {
    setIsFormVisible(false); // Hide the form after saving
    // Optionally, refresh the appointments list here
  };
  
  return (
    <div className="app">
      <Navbar />
      <Container maxWidth="sm" className="content">
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add New Appointment
      </Button>
      {isFormVisible && (
        <AppointmentForm appointment={currentAppointment} onSave={handleFormSave} />
      )}
        <AppointmentList />
      </Container>

    </div>
  );
}

export default App;
