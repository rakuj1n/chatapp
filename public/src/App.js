import { Route, Routes } from "react-router-dom";
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from "./Pages/Chat";
import SetAvatar from "./Pages/SetAvatar";



export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </div>
  );
}


