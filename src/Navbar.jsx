import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { useAuth } from './AuthProvider';
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutCircleLine ,RiProfileFill} from "react-icons/ri";

export const Navbar = () => {
  const [showuser, setshowuser] = useState(false)
  const [shownoti, setshownoti] = useState(false)
  const auth = useAuth();
  const Go = useNavigate()
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setshowuser(false);
        setshownoti(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="navbar_container">
      <div className="navbar_left">
        <div className="navbar_logo" onClick={() => Go("/")}>
          <img src="cedamus.png" alt="" />
          <span className="navbar_logo_text">GIC</span>
        </div>
        {auth.isLoggedIn && (
          <div className="navbar_links">
            <Link to="/" className="navbar_link">les employées</Link>
            <Link to="/users" className="navbar_link">Gestion d'utilisateurs</Link>
            <Link to="/roles" className="navbar_link">Gestion des roles</Link>
            <Link to="/recrutement" className="navbar_link">Recrutement</Link>
          </div>
        )}
      </div>
      {auth.isLoggedIn && (<div className="navbar_right">
        <div className="navbar_user_container" ref={userDropdownRef}>
          <FaUser className="navbar_icon" onClick={() => { setshownoti(false);setshowuser((!showuser)) }} />

          <div className="navbar_dropdown" style={{height:showuser?'fit-content':"0px",padding:showuser?'10px':0}}>
            <div className="navbar_dropdown_item">
              <RiProfileFill className="navbar_dropdown_icon" />
              <span>Profile</span>
            </div>
            <div className="navbar_dropdown_item" onClick={()=>auth.logOut()}>
              <RiLogoutCircleLine className="navbar_dropdown_icon" />
              <span>Log out</span>
            </div>
          </div>
        </div>
        <div className="navbar_notifications_container" ref={notificationDropdownRef}>
          <IoIosNotifications className="navbar_notifications_icon" onClick={() => { setshownoti(!shownoti);setshowuser((false)) }} />

          <div className="navbar_notifications_dropdown" style={{height:shownoti?'fit-content':"0px",padding:shownoti?'10px':0}}>
            <div className="navbar_notifications_dropdown_item">
              <div className='navbar_notifications_dropdown_item_logo'>
                <img src="person.avif"  height="100%"  alt="" />
              </div>
              <div className='navbar_notifications_dropdown_item_text'>
                <div className='navbar_notifications_dropdown_item_name'>
                  hamza said
                </div>
                <div className='navbar_notifications_dropdown_item_description'>
                  Send his PV for december
                </div>
              </div>
            </div>
            <div style={{color:"gray",textAlign:"center",padding:"5px",cursor:"pointer"}} onClick={()=>{
              setshownoti(false)
            }}>Show all</div>
          </div>
        </div>
      </div>)}
    </div>
  )
}
