import React from 'react'
import { Typography, Box, CircularProgress } from '@mui/material'

export default function CircularProgressWithLabel({ value }) {
  const sxBox = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
    <Box>
      <CircularProgress size={60} thickness={5} variant='determinate' value={value} />
      <Box sx={sxBox}>
        <Typography
        variant='caption'
        component='div'
        color='white'
        fontSize='1rem'>{value}%</Typography>
      </Box>
    </Box>
  )
}
