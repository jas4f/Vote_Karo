import {  Link , useNavigate } from "react-router-dom";
import style from './navbar.module.css';
import { useState } from "react";
 const Navbar = () => {

     const [activeButton,setActiveButton] = useState();
    const navigate = useNavigate();
         const handleClick = (event)=>{
            event.preventDefault();
             localStorage.removeItem("role");
             localStorage.removeItem("token");
             navigate('/login');
         }
      const handleButtonClick = (buttonName) => {
           setActiveButton(buttonName);
      };
  //  const [visible, setVisible] = useState(true);


  return(
  <div className={style.container_navbar}> 
    <div className={style.welcome_text}>
        <p className={style.announcement_bar_text}>Welcome to Vote Karo <i class="fa-solid fa-check-to-slot"></i></p>
    </div>
    <div className={style.topbar_home}>
     <div className={style.item_navbar}>
                      <Link to='/profile' className={`${style.profile_link}`}><button className={`${style.home_btn2} ${activeButton === 'profile' ? `${style.active}` : ''}`} onClick={() => handleButtonClick('profile')}><i class="fa-regular fa-user"></i> Profile</button></Link>
     </div>
     <div className={style.item_navbar}>
                      <Link to='/' className={`${style.profile_link} ${activeButton === 'home' ? `${style.active}` : ''}`}><button className={`${style.home_btn3} ${activeButton === 'home' ? `${style.active}` : ''}`} onClick={() => handleButtonClick('home')}><i class="fas fa-home"></i> Home</button></Link>
     </div>
     <div className={style.item_navbar}>
                      <Link to='/result' className={`${style.profile_link} ${activeButton === 'result' ? `${style.active}` : ''}`}><button className={`${style.home_btn3} ${activeButton === 'result' ? `${style.active}` : ''}`} onClick={() => handleButtonClick('home')}>Live Result</button></Link>
     </div>
     <div className={style.item_navbar}>
          <button className={style.home_btn} onClick={handleClick}><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>
     </div>
    </div>
  </div>
  )
};

export default Navbar;