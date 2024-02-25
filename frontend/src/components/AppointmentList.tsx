import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Paper, List, ListItem, ListItemText } from '@mui/material';

interface Buyer {
  id:number;
  name:string;
  company_name:string
}

interface Vendor {
  id:number;
  name:string
}

interface Appointment {
  id: number;
  title: string;
  type:string
  location:string
  host:Vendor
  client:Buyer;
  startTime: string;
  endTime: string;
}

export const AppointmentList = () => {

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/appointments');
        console.log("gol",response)
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);
  
  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
    <List>
      {appointments.map((appointment) => (
        <ListItem key={appointment.id} divider>
          <ListItemText
            primary={appointment.title}
            secondary={`Start: ${appointment.startTime} - End: ${appointment.endTime}`}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
  )
}
