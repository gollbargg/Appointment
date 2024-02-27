import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

export const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#E7ECEF' }}> 
      <Toolbar>
        <img 
          src="https://framerusercontent.com/images/k0mX1BT4dLNf0CVHxl5mQ4rf4.svg" 
          alt="Modaresa Logo" 
          style={{ height: '30px', marginRight: '10px' }}
        />
      </Toolbar>
    </AppBar>
  );
};
