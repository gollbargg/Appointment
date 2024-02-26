import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import {AppointmentForm} from './components/AppointmentForm';
import { AppointmentList } from './components/AppointmentList';
import { Navbar } from './layout/Navbar';

function App() {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<any | null>(null);

  const handleAddClick = () => {
    setCurrentAppointment(null); 
    setIsFormVisible(true); 
  };

  const handleEditClick = (appointment: any) => {
    setCurrentAppointment(appointment); 
    setIsFormVisible(true); 
  };

  const handleFormSave = () => {
    setIsFormVisible(false); 
  };
  
  return (
    <div className="app">
      <Navbar />
      <Container maxWidth="sm" className="content">
        <Grid container justifyContent="space-between" alignItems="center" style={{ margin: '20px 0' }}>
          <Grid item>
            <Typography variant="h6" component="h2">
              Appointment List
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddClick} style={{ backgroundColor: '#8275fc' }}>
              Add an Appointment
            </Button>
          </Grid>
        </Grid>
        {isFormVisible && (
          <AppointmentForm appointment={currentAppointment} onSave={handleFormSave} />
        )}
        <AppointmentList />
      </Container>
    </div>
  );
}

export default App;
