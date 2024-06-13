import { BrowserRouter, Route, Routes } from "react-router-dom"
import Add from './Pages/Add'
import View from './Pages/View'
import Edit from './Pages/Edit'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<Add/>} />
          <Route path="/" element={<View/>} />
          <Route path="/edit" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
