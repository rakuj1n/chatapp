import { Route, Routes } from "react-router-dom";
import Register from './Pages/Register'


export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}


