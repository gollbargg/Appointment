import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppointmentCard } from './AppointmentCard';

describe('AppointmentCard', () => {
  const mockAppointment = {
    id: 1,
    title: 'Test Appointment',
    type: 'Virtual',
    location: 'Online',
    host: { name: 'Host Name' },
    client: { name: 'Client Name', company_name: 'Client Company' },
    startTime: '2022-01-01T10:00:00Z',
    endTime: '2022-01-01T11:00:00Z',
  };

  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  it('renders appointment information correctly', () => {
    render(
      <AppointmentCard
        appointment={mockAppointment}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    // Check if the appointment title is rendered
    expect(screen.getByText(mockAppointment.title)).toBeInTheDocument();

    // Check if the appointment type is rendered
    expect(
      screen.getByText(`Type: ${mockAppointment.type}`)
    ).toBeInTheDocument();

    // Only display location for 'Physical' types, so it should not be in the document
    expect(
      screen.queryByText(`Location: ${mockAppointment.location}`)
    ).not.toBeInTheDocument();

    // Check if the host and client information is rendered
    expect(
      screen.getByText(`Host: ${mockAppointment.host.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Client: ${mockAppointment.client.name} (${mockAppointment.client.company_name})`
      )
    ).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(
      <AppointmentCard
        appointment={mockAppointment}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockAppointment);
  });

  it('calls onDelete when the delete button is clicked', () => {
    render(
      <AppointmentCard
        appointment={mockAppointment}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockAppointment.id);
  });
});
