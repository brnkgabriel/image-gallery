import { Avatar, DialogActions, DialogContent, DialogContentText, IconButton, TextField } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import SubmitButton from "./inputs/SubmitButton"
import { v4 as uuidv4 } from "uuid"
import uploadFile from "../../firebase/uploadFile"
import { updateProfile } from "firebase/auth"
import { deleteAll } from "../../firebase/deleteFile"
import updateUserRecords from "../../firebase/updateUserRecords"
import CropEasy from "../crop/CropEasy"
import { Box } from "@mui/system"
import { Crop } from "@mui/icons-material"
import { useEffect } from "react"

const Profile = () => {
  const { currentUser, setLoading, setAlert, modal, setModal } = useAuth()
  const [name, setName] = useState(currentUser?.displayName)
  const [file, setFile] = useState(null)
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL)
  const [openCrop, setOpenCrop] = useState(false)


  const handleChange = evt => {
    const file = evt.target.files[0]

    if (file) {
      setFile(file)
      setPhotoURL(URL.createObjectURL(file))
      setOpenCrop(true)
    }
  }

  const sxInput = { display: "none" }
  const sxAvatar = {
    width: 75,
    height: 75,
    cursor: "pointer"
  }

  const handleSubmit = async evt => {
    evt.preventDefault()

    setLoading(true)

    let userObj = { displayName: name }
    let imagesObj = { uName: name }

    try {
      if (file) {
        await deleteAll(`profile/${currentUser?.uid}`)
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop()
        const url = await uploadFile(file, `profile/${currentUser?.uid}/${imageName}`)

        userObj = { ...userObj, photoURL: url }
        imagesObj = { ...imagesObj, uPhoto: url }
      }

      await updateProfile(currentUser, userObj)

      await updateUserRecords("gallery", currentUser?.uid, imagesObj)

      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your profile has been updated",
        timeout: 3000,
        location: "modal"
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

  const sxCropAvatar = {
    display: "flex",
    alignItems: "center"
  }

  useEffect(() => {
    if (openCrop) {
      setModal({ ...modal, title: "Crop Profile Photo" })
    } else {
      setModal({ ...modal, title: "Update Profile" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCrop])
  return (
    !openCrop ? (

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields
          </DialogContentText>
          <TextField
            margin="normal"
            type="text"
            inputProps={{ minLength: 2 }}
            fullWidth
            variant="standard"
            value={name || ""}
            required
            onChange={e => setName(e.target.value)}
            autoFocus />
          <Box sx={sxCropAvatar}>
            <label htmlFor="profilePhoto">
              <input
                id="profilePhoto"
                type="file"
                style={sxInput}
                onChange={handleChange}
                accept="image/*" />
              <Avatar
                sx={sxAvatar}
                src={photoURL} />
            </label>
            { file && (
              <IconButton
                aria-label="Crop"
                color="primary"
                onClick={() => setOpenCrop(true)}>
                <Crop />
              </IconButton>
            ) }
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton />
        </DialogActions>
      </form>
    ) : (
      <CropEasy {...{photoURL, setOpenCrop, setPhotoURL, setFile}} />
    )
  )
}

export default Profile