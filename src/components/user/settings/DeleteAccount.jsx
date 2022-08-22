import { Send } from "@mui/icons-material"
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { useRef } from "react"
import { useAuth } from "../../../context/AuthContext"

const DeleteAccount = () => {
  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth()
  const emailRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      
    } catch (error) {
      
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to delete your account? This action will delete all of your files and records
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" endIcon={<Send />} type="submit">
          Confirm
        </Button>
      </DialogActions>
    </form>
  )
}

export default DeleteAccount
