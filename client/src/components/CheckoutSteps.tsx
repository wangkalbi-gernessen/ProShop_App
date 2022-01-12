import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4}: any) => {
  return (
    <div className="navbar justify-content-center mb-4">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"> 
          {step1 ? (
            <Link to='/login'>
              <a className="nav-link" >Sign In</a>
            </Link>
          ) : (
            <a className="nav-link disabled">Sign In</a>  
          )}
        </li>
        <li className="nav-item"> 
          {step2 ? (
            <Link to='/shipping'>
              <a className="nav-link" >Shipping</a>
            </Link>
          ) : (
            <a className="nav-link disabled">Shipping</a>  
          )}
        </li>
        <li className="nav-item"> 
          {step3 ? (
            <Link to='/payment'>
              <a className="nav-link" >Payment</a>
            </Link>
          ) : (
            <a className="nav-link disabled">Payment</a>  
          )}
        </li>
        <li className="nav-item"> 
          {step4 ? (
            <Link to='/placeorder'>
              <a className="nav-link" >Place Order</a>
            </Link>
          ) : (
            <a className="nav-link disabled">Place Order</a>  
          )}
        </li>
        
    </ul>
    </div>
  )
}

export default CheckoutSteps;