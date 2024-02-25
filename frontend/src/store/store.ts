import { create } from 'zustand'
import axios from 'axios';
import { Appointment } from '../types/Appointment';

interface AppState {
  appointments: Appointment[];
  fetchAppointments: () => Promise<void>;
  removeAppointment: (appointmentId: number) => Promise<void>;
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

}));

