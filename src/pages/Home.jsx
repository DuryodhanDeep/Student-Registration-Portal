import React, { useEffect } from 'react';
import StudHome from '../user/student/StudHome';
import { useNavigate } from "react-router-dom";
// import InstrHome from '../user/instr/InstrHome';

const Home = ({ userDetail, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    isLoggedIn ? (
      <StudHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userDetail={userDetail} />
    ) : ''
  );
}

export default Home;
