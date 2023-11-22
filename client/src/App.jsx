import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Global from "./styles/Global"
import Principal from './pages/Principal'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Global />
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
