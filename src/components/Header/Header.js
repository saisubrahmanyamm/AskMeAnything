import React from "react";
import './css/Header.css';
import Logo from './images/Logo.png';
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import { Avatar } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

function Header() {
    const user = useSelector(selectUser); 
    return(
        <header>
            <div className = "header-container">
            <div className = "header-left">
                <a><img src={Logo} alt="AMA-LOGO"  /></a>
                {/* <h3 onClick={Navigate('/')}>Home</h3> */}
            </div>

            <div className = "header-middle">
             <div className = "header-search-container">
                <SearchIcon></SearchIcon>
                <input type = "text" placeholder="Search..." />
             </div>
            </div>
            <div className = "header-right">
            <div className = "header-right-container">
               <span> <Avatar src = {user?.photo} onClick={() => auth.signOut()} /></span>
                <InboxIcon />
                <HelpIcon />
            </div>
            </div>

            </div>
        </header>
    );
}

export default Header