import { Container } from '@mui/material';
import React from 'react';
import './App.css';
import { AppointmentList } from './components/AppointmentList';

function App() {
  return (
    <Container maxWidth="sm">
      <h1>Appointments</h1>
      <AppointmentList />
    </Container>
  );
}

export default App;
