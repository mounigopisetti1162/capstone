import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import {Search} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css'
import { fontSize } from '@mui/system';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
        localStorage.removeItem("token")}
  return (
    <>
    <nav class="navbar bg-body-tertiary">
    <div className="nav">
    <div class="left ">
    <a class="navbar-brand app-name">InfIChat</a>
    </div>
    <div className='center'>

    
    <form className="d-flex form" role="search">
      <SearchIcon className='search-icon'/>
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    </form>

    </div>
  <div className='right'>
    <GroupsIcon className='group-icon'/>
<img clasName='pro-pic' src='1.jpg' alt='name'/>
  <LogoutIcon className='logout' onClick={logout}/>
  
  </div>
  </div>
</nav>

</>
  )
}

export default Navbar