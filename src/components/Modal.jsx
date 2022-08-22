import { Close } from "@mui/icons-material"
import { Dialog, DialogTitle, IconButton } from "@mui/material"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Notify from "./Notify"

const Modal = () => {
  const { modal, setModal, alert : { location, isAlert }, setAlert } = useAuth()

  const handleClose = evt => {
    setModal({ ...modal, isOpen: false })
  }

  useEffect(() => {
    if (modal.isOpen === false) {
      if (isAlert && location === "modal") {
        setAlert({ ...alert, isAlert: false })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal?.isOpen])

  const sxIconButton = {
    position: "absolute",
    top: 8,
    right: 8,
    color: theme => theme.palette.grey[500]
  }
  return (
    <Dialog open={modal.isOpen} onClose={handleClose}>
      <DialogTitle>
        { modal.title }
        <IconButton
          aria-label="Close"
          sx={sxIconButton}
          onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      { location === "modal" && <Notify /> }
      {modal.content}
    </Dialog>
  )
}

export default Modal
