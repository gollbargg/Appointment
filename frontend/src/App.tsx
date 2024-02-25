import { Container } from '@mui/material';
import React from 'react';
import './App.css';
import { AppointmentList } from './components/AppointmentList';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Container maxWidth="sm" className="content">
        <h1>Appointments</h1>
        <AppointmentList />
      </Container>

    </div>
  );
}

export default App;
