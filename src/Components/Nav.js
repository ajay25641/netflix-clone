import React from "react";
import "./Nav.css";
import { useNavigate } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();

  const handleSearch = ()=>{
    navigate(`/searchMovie`);
  }
  return (
    <div>
      <div className="header">
        
        <h1 className='nav_logo'>Movie Data Base</h1>
           
        <button className='button_design' onClick={handleSearch}>Search</button>
        
      </div>
    
  </div>

    
  );
};
export default Nav;
