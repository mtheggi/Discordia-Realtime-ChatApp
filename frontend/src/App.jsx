import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import Login from "./pages/login"
import Register from "./pages/register"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import NavBar from "./components/NavBar"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>

      <NavBar />
      <Container >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter >
      </Container>
    </>
  )
}

export default App
