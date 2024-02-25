import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

export const Navbar = () => {
  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Modaresa Agenda
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
  )
}
