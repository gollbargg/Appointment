import { Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="footer">
    <Typography variant="body1" align="center">
      © {new Date().getFullYear()} My App. All rights reserved.
    </Typography>
  </footer>
  )
}
