import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import Login from "./pages/login"
import Register from "./pages/register"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>

      <NavBar />
      <Container >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter >
      </Container>
    </>
  )
}

export default App
