import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Loading = () => {
  const { loading } = useAuth()

  const sxCircularProgress = { color: "white" }
  const sxBackdrop = { zIndex: theme => theme.zIndex.drawer + 999 }

  return (
    <Backdrop
      sx={sxBackdrop}
      open={loading}>
      <CircularProgress sx={sxCircularProgress} />
    </Backdrop>
  )
}

export default Loading
