import { CheckCircleOutline } from '@mui/icons-material'
import { Box, ImageListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CircularProgressWithLabel from './CircularProgressWithLabel'
// import { v4 as uuidv4 } from "uuid"
import uploadFileProgress from '../../../firebase/uploadFileProgress'
import addDocument from '../../../firebase/addDocument'
import { useAuth } from '../../../context/AuthContext'

export default function ProgressItem({ file }) {
  const [ progress, setProgress ] = useState(10)
  const [ imageUrl, setImageURL ] = useState(null)
  const { currentUser, setAlert } = useAuth()

  useEffect(() => {
    const uploadImage = async () => {
      // const imageName = uuidv4() + "." + file.name.split(".").pop()
      const imageName = file.name
      try {
        const url = await uploadFileProgress(file, `gallery/${currentUser.uid}`, imageName, setProgress)
        
        const galleryDoc = {
          imageURL: url,
          uid: currentUser?.uid || "",
          uEmail: currentUser?.email || "",
          uName: currentUser?.displayName || "",
          uPhoto: currentUser?.photoURL || ""
        }
        await addDocument("gallery", galleryDoc, imageName)
        setImageURL(null)
      } catch (error) {
        console.log(error)
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 8000,
          location: "main"
        })
      }
    }
    setImageURL(URL.createObjectURL(file))
    uploadImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])
  const sxBox = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: "rgba(0,0,0,.5)"
  }
  const sxCheck = {
    width: 60,
    height: 60,
    color: 'lightGreen',
  }

  const sxImageList = {
    position: "relative"
  }
  return (
    imageUrl && (
      <ImageListItem cols={1} rows={1} sx={sxImageList}>
        <img src={imageUrl} alt="gallery" loading="lazy"/>
        <Box sx={sxBox}>
          {
            progress < 100
              ? (<CircularProgressWithLabel value={progress} />)
              : (<CheckCircleOutline sx={sxCheck} />)
          }
        </Box>
      </ImageListItem>
    )
  )
}
