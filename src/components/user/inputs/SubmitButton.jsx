import { Send } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const SubmitButton = () => {
  return (
    <Button
      endIcon={<Send />}
      type="submit"
      variant="contained">
      Submit
    </Button>
  )
}

export default SubmitButton
