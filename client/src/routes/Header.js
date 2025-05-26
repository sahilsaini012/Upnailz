import React from 'react'
import { Outlet } from "react-router-dom";
const Header = () => {
    return (
        <>
        <nav>
          <ul>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )
}
export default Header;
