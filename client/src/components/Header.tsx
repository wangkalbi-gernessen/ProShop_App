import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = (props: any) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const handleNavCollapse = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  }

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">ProShop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavbarCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavbarCollapsed ? 'collapse' : ' '} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"> 
                <a className="nav-link" aria-current="page" href="/cart">
                  <i className='fas fa-shopping-cart'>Cart</i>
                </a>
              </li>
              { userInfo ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{userInfo.name}</button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <a className="dropdown-item" href='/profile'>Profile</a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logoutHandler}>Logout</a>
                  </li>
                </ul>
              </div>
              ) : 
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className='fas fa-user'>Sign In</i>
                </a>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </header> 
  )
}

export default Header;