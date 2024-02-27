import { TextField } from '@mui/material';
import React from 'react'

interface Props {
  label:string
  value:string
  onChange:(event: any) => void;
}

export const FormField = ({ label, value, onChange }: Props) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    onChange={onChange}
    margin="normal"
  />
);
