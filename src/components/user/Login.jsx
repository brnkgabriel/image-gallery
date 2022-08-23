import React from 'react'
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import EmailField from "./inputs/EmailField"
import { useRef } from 'react'
import PasswordField from './inputs/PasswordField'
import { useState } from 'react'
import SubmitButton from './inputs/SubmitButton'
import { Google } from '@mui/icons-material' 
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import ResetPassword from './ResetPassword'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [ isRegister, setIsRegister ] = useState(false)
  const {
    modal,
    setModal,
    signUp,
    login,
    loginWithGoogle,
    setAlert,
    setLoading
  } = useAuth()

  useEffect(() => {
    if (isRegister) {
      setModal({ ...modal, title: "Register" })
    } else {
      setModal({ ...modal, title: "Login" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isRegister ])

  const handleSubmit = async evt => {
    evt.preventDefault()
    setLoading(true)
    const email = emailRef.current.value
    const password = passwordRef.current.value
    
    if (isRegister) {
      const confirmPassword = confirmPasswordRef.current.value

      try {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match")
        }
        await signUp(email, password)
        setModal({ ...modal, isOpen: false })
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 5000,
          location: "modal"
        })
      }
    } else {
      try {
        await login(email, password)
        setModal({...modal, isOpen: false })
      } catch (error) {
        console.log(error)
        
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 8000,
          location: "modal"
        })
      }
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      setModal({...modal, isOpen: false})
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
  }

  const sxDialogActions = {
    justifyContent: "space-between",
    px: "19px"
  }

  const sxDialogActionsExt = {
    justifyContent: "left",
    p: "5px 24px"
  }

  const sxDialogActionsGoogle = {
    justifyContent: "center",
    py: "24px"
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your email and your password here:
          </DialogContentText>
          <EmailField { ...{ emailRef, autoFocus: true } } />
          <PasswordField { ...{ passwordRef, autoFocus: false } } />
          { isRegister && (
          <PasswordField 
            {...{passwordRef: confirmPasswordRef,
              id: "confirmPassword",
              label: "Confirm Password",
              autoFocus: false
            } } />) }
        </DialogContent>
        <DialogActions sx={sxDialogActions}>
          <Button size='small' onClick={() => setModal({
            ...modal,
            title: "Reset Password",
            content:<ResetPassword />
            })}>Forgot Password</Button>
          <SubmitButton />
        </DialogActions>
      </form>
      <DialogActions sx={sxDialogActionsExt}>
        {
          isRegister
            ? "Have an account? Sign in now"
            : "Don't have an account? Create one now"
        }
        <Button onClick={() => setIsRegister(!isRegister)}>
        {
          isRegister ? "Login" : "Register"
        }
        </Button>
      </DialogActions>
      <DialogActions sx={sxDialogActionsGoogle}>
        <Button
          onClick={handleGoogleLogin}
          startIcon={<Google />}
          variant="outlined">
          Login with Google
        </Button>
      </DialogActions>
    </>
  )
}

export default Login
