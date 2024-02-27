import { create } from 'zustand'
import axios from 'axios';
import { Appointment } from '../types/Appointment';
import { Buyer } from '../types/Buyer';
import { Vendor } from '../types/Vendor';

export interface AppointmentFormState {
  title: string;
  type: string;
  location: string;
  buyers: Buyer[];
  vendors: Vendor[];
  hostId: string;
  clientId: string;
  startTime: any;
  endTime: any;
}

export const initialFormState: AppointmentFormState = {
  title: '',
  type: '',
  location: '',
  buyers: [],
  vendors: [],
  hostId: '',
  clientId: '',
  startTime: null,
  endTime: null,
};

interface AppState {
  appointments: Appointment[];
  fetchAppointments: () => Promise<void>;
  removeAppointment: (appointmentId: number) => Promise<void>;
  addAppointment: (appointmentData: Appointment) => Promise<void>;
  updateAppointment: (appointmentId: number, appointmentData: Partial<Appointment>) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  appointments: [],

  fetchAppointments: async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments');
      set({ appointments: response.data });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  },

  removeAppointment: async (appointmentId: number) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${appointmentId}`);
      set((state) => ({ appointments: state.appointments.filter(appointment => appointment.id !== appointmentId) }));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  },

  addAppointment: async (appointmentData) => {
    try {
      const response = await axios.post('http://localhost:3000/appointments', appointmentData);
      set((state) => ({ appointments: [...state.appointments, response.data] }));
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  },

  updateAppointment: async (appointmentId, appointmentData) => {
    try {
      await axios.put(`http://localhost:3000/appointments/${appointmentId}`, appointmentData);
      set((state) => ({
        appointments: state.appointments.map(appointment => 
          appointment.id === appointmentId ? { ...appointment, ...appointmentData } : appointment
        ),
      }));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  },


}));

