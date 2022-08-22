import { TextField } from '@mui/material'
import React from 'react'

const EmailField = ({ emailRef, defaultValue }) => {
  return (
    <TextField
      autoFocus
      margin="normal"
      id="email"
      label="Email Address"
      type="email"
      fullWidth
      required
      inputRef={emailRef}
      defaultValue={defaultValue}
      variant="standard"/>
  )
}

export default EmailField
