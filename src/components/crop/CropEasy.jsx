import { Cancel, Crop } from '@mui/icons-material'
import { Button, DialogActions, DialogContent, Slider, Typography, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useAuth } from '../../context/AuthContext'
import getCroppedImg from './utils/cropImage'

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const { setAlert, setLoading } = useAuth()

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const sxDialogContent = {
    background: "#333",
    position: "relative",
    height: 400,
    width: "auto",
    minWidth: {sm: 500},
  }

  const sxDialogActions = {
    flexDirection: "column",
    mx: 3,
    my: 2
  }

  const sxBox = {
    width: "100%",
    mb: 1
  }

  const zoomPercent = value => `${Math.round(value * 100)}%`

  const cropImage = async () => {
    setLoading(true)
    try {
      const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels, rotation)
      setPhotoURL(url)
      setFile(file)
      setOpenCrop(false)
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

  const sxBoxActions = {
    display: "flex",
    gap: 2,
    flexWrap: "wrap"
  }
  return (
    <>
      <DialogContent dividers sx={sxDialogContent}>
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={sxDialogActions}>
        <Box sx={sxBox}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay='auto'
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
              />
          </Box>
          <Box>
            <Typography>Rotation: {rotation}</Typography>
            <Slider
              valueLabelDisplay='auto'
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
              />
          </Box>
        </Box>
        <Box sx={sxBoxActions}>
          <Button
           variant="outlined"
           startIcon={<Cancel />}
           onClick={() => setOpenCrop(false)}>
            Cancel
          </Button>
          <Button
           variant="contained"
           startIcon={<Crop />}
           onClick={cropImage}>
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default CropEasy