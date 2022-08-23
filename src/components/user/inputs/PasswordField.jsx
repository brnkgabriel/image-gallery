import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { VisibilityOff, Visibility } from "@mui/icons-material"

const PasswordField = ({
  passwordRef,
  id="password",
  label="password",
  autoFocus=true
}) => {
  const [ showPassword, setShowPassword ] = useState(false)

  const handleClick = evt => {
    setShowPassword(!showPassword)
  }

  const handleMouseDown = evt => {
    evt.preventDefault()
  }
  return (
    <TextField
      autoFocus={autoFocus}
      margin="normal"
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      required
      inputRef={passwordRef}
      inputProps={{minLength: 6}}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <IconButton
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            aria-label="Toggle password visibility">
            { showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }}
      variant="standard"/>
  )
}

export default PasswordField
