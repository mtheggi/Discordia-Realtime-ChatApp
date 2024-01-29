import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import Login from "./pages/login"
import Register from "./pages/register"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
