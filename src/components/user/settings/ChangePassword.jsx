import { DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { updatePassword } from "firebase/auth"
import { useRef } from "react"
import { useAuth } from "../../../context/AuthContext"
import PasswordField from "../inputs/PasswordField"
import SubmitButton from "../inputs/SubmitButton"

const ChangePassword = () => {
  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        throw new Error("Passwords do not match")
      }
      await updatePassword(currentUser, passwordRef.current.value)
      setModal({
        ...modal,
        isOpen: false
      })
      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your password has been updated successfully",
        timeout: 8000,
        location: "main"
      })
    } catch (error) {
      
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "modal"
      })
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          Please Enter your new password:
        </DialogContentText>
        <PasswordField {...{passwordRef}} />
        <PasswordField {...{passwordRef: confirmPasswordRef, id: "confirmPassword", label: "Confirm Password"}} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  )
}

export default ChangePassword
