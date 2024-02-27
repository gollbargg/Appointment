import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'

interface Props {
  label:string
  value:any
  onChange:(event: any) => void;
  options:any
}

export const SelectField = ({ label, value, onChange, options }: Props) => {
  return (
    <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange}>
      {options.map((option: any )=> (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}
