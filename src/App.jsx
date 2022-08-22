import { Container } from "@mui/material";
import ImagesList from "./components/imagesList/ImagesList";
import Nav from "./components/Nav";
import Upload from "./components/upload/Upload";
import AuthContext from "./context/AuthContext";
import Modal from "./components/Modal"
import MainNotification from "./components/MainNotification";
import Loading from "./components/Loading";

function App() {
  const sxContainer = {
    textAlign: "center",
    mt: "3rem",
  }
  return (
    <Container maxWidth="lg" sx={sxContainer}>
      <AuthContext>
        <Loading />
        <Modal />
        <MainNotification />
        <Nav />
        <Upload />
        <ImagesList />
      </AuthContext>
    </Container>
  )
}

export default App;
