import React from 'react'
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

interface Props {
  label:string
  value:any
  onChange:(event: any) => void;
}

export const DateTimePicker = ({ label, value, onChange }: Props) => (
  <div style={{ margin: '20px 0' }}>
    <label>{label}:</label>
    <Flatpickr
      data-enable-time
      value={value}
      onChange={onChange}
    />
  </div>
);
