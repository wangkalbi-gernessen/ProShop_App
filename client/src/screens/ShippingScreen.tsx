import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment');
  }

  return (
    <div className="container">
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <p className='h1'>Shipping</p>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">Postal Code</label>
            <input type="text" className="form-control" id="postalCode" placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input type="text" className="form-control" id="country" placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" type="submit" >Continue</button>
          </div>
        </form>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen;