import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePeymentMethod } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  if(!shippingAddress) {
    navigate('/shipping');
  }

  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(savePeymentMethod(paymentMethod));
    navigate('/placeorder');
  }

  return (
    <div className="container">
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <p className='h1'>Payment Method</p>
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend>Select Method</legend>
            <div className="mb-3 form-check">
              <input className="form-check-input" type="radio" name="paymentMethod" id="payPal" checked onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label className="form-check-label" htmlFor="payPal">PayPal or Credit Card</label>
            </div>
            <div className="mb-3 form-check">
              <input className="form-check-input" type="radio" name="paymentMethod" id="stripe" checked onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label className="form-check-label" htmlFor="stripe">Stripe</label>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit" >Continue</button>
            </div>
          </fieldset>
        </form>
      </FormContainer>
    </div>
  )
}

export default PaymentScreen;