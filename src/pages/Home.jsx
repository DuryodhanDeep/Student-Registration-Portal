import React, { useState } from "react";
import "./home.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import DataTable from "../component/DataTable";
import Footer from "../component/Footer";

const Home = ({ userDetail, isLoggedIn, setIsLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [barClicked, setBarClicked] = useState(false);


  const navigate = useNavigate();


  function handleLogout() {
    setIsLoggedIn(false);
    return navigate("./login");
  }

  function handleLogin() {
    return navigate("./login");
  }

  return (

        
    //       
    //         {/* {isLoggedIn ? ( */}
    //         <div className="right-main">
    //           {/* <div className="profile-heading">
    //             <h5 className="profile-heading-text">My academic Profile (name)</h5>
    //           </div>           */}
    //           <div className="data-table">            
    //             {/* <DataTable /> */}
    //           </div>
    //         </div>
    //         {/* ) : (
    //         <Login />
    //         )} */}
    //       
    //   </div>
    // </div>

    <div id="home-page-root">
      <div className={`home-page-left ${barClicked ? 'open-left' : ''}`}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} barClicked={barClicked}/>
      </div>
      <div className={`home-page-right ${barClicked ? 'open-right' : ''}`}>
        <Header className="Header" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setBarClicked={setBarClicked}/>
        <div className="profile-class">
          <div className="profile-heading">
            <h5 className="profile-heading-text">My academic Profile (name)</h5>
          </div>  
          <div className="table-class">
            <div className="roll-number">Roll number</div>
            {/* <div className="data-table"><DataTable />
    //      </div> */}
          </div>

        </div>
        <Footer />
      </div>   
            
    </div>
  );
};

export default Home;
