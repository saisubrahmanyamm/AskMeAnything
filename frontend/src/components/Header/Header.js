import React from "react";
import './css/Header.css';
import Logo from './images/Logo.png';
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

   

function Header() {
    // const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const logout = (event) => {
    
    };
    const user = useSelector(selectUser); 
    return(
        <header>
            <div className = "header-container">
            <div className = "header-left">
                <Link to ="/"><img src={Logo} alt="AMA-LOGO"  /></Link>
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
               {/* <Avatar style={{margin: "0px 5px"}} src = {user?.photo} /> */}
               <IconButton onClick={handleClick}>
                 <Avatar  src={user?.photo} style = {{ width: "40px",
                                                    cursor: "pointer"}}>
                 
                 </Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => console.log()}>
                    <PersonIcon style = {{ marginRight: "10px"}}/>{user?.displayName || user?.email.split('@')[0]}
                    </MenuItem>
                    <MenuItem onClick={() => console.log('Logout')}><SettingsIcon style = {{ marginRight: "10px"}}/>Settings</MenuItem>
                </Menu>
                <HelpIcon />
                <Link to ="/auth"><LogoutIcon onClick= {() => auth.signOut()}/></Link>
            </div>
            </div>

            </div>
        </header>
    );
}

export default Header