import React, {useState} from 'react'
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  return (
    <div className='app'>
        <Router>
            <Routes>
             
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userDetail={userDetail}/>} />
                <Route path="/login" element={<Login setUserDetail={setUserDetail} setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
