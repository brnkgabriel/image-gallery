import { Input, Fab } from "@mui/material";
import { Add } from "@mui/icons-material"
import { useRef } from "react";

const Form = ({ setFiles }) => {
  const fileRef = useRef(null)
  const handleClick = () => {
    fileRef.current.click()
  }
  const handleChange = (e) => {
    setFiles([...e.target.files])
    fileRef.current.value = null
  }
  const sxForm = {
    display: 'none'
  }
  return (
    <form>
      <Input
        type="file"
        inputProps={{ multiple: true }}
        sx={sxForm}
        inputRef={fileRef}
        onChange={handleChange}
      />
      <Fab
      color="primary"
      aria-label="add"
      onClick={handleClick}>
        <Add fontSize="large"/>
      </Fab>
    </form>
  );
}
 
export default Form;