import React, { useState } from 'react';

const Header = (props: any) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">ProShop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavbarCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavbarCollapsed ? 'collapse' : ' '} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"> 
                <a className="nav-link active" aria-current="page" href="/cart">
                  <i className='fas fa-shopping-cart'>Cart</i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className='fas fa-user'>Sign In</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;