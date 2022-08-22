import { Close } from "@mui/icons-material"
import { Box, Alert, IconButton, Collapse } from "@mui/material"
import { useEffect } from "react"
import { useRef } from "react"
import { useAuth } from "../context/AuthContext"

const Notify = () => {
  const alertRef = useRef()
  const { alert: { isAlert, severity, message, timeout }, setAlert } = useAuth()

  useEffect(() => {
    alertRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    })

    let timer

    if (timeout) {
      timer = setTimeout(() => {
        setAlert({ ...alert, isAlert: false })
      }, timeout);
    }

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout])

  const sxBox = { mb: 2 }
  return (
    <Box sx={sxBox} ref={alertRef}>
      <Collapse in={isAlert}>
        <Alert
          action={
            <IconButton
              size="small"
              onClick={() => setAlert({...alert, isAlert: false})}
              aria-label="Close">
              <Close fontSize="small" />
            </IconButton>
          }
          severity={severity}>
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default Notify
