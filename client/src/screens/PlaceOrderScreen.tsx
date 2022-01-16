import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  // Calculate prices
  const addDecimals = (num: number) => {
    return (Math.round(num * 100)/100).toFixed(2);
  }
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc: any, item: any) => Number(acc) + Number(item.price) * Number(item.quantity), 0));
  cart.shippingPrice = addDecimals(cart.cartItems > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  
  const orderCreate = useSelector((state: any) => state.orderCreate);
  const { order, success, error }  = orderCreate;
  
  useEffect(() => {
    if(success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }));
  }

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group list-group-flush">
            <li className='list-group-item'>
              <p className='h2'>Shipping</p>
              <p className='h4'>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '} {cart.shippingAddress.postalCode},{' '} 
                {cart.shippingAddress.country}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='h2'>Payment Method</p>
              <p className='h4'>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='h2'>Order Items</p>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ul className='list-group list-group-flush'>
                  {cart.cartItems.map((item: any, index: any) => (
                    <li className='list-group-item' key={index}>
                      <div className="row">
                        <div className="col-md-1">
                          <img src={item.image} alt={item.name} className="img-fluid rounded" />          
                        </div>
                        <div className="col-md-1">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-md-4">
                          {item.qty} x ${item.price} = ${Number(item.quantity) * Number(item.price)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <p className='h2'>Order Summary</p>
              </li>
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">Items</div>
                  <div className="col">${cart.itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${cart.shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${cart.taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">Total</div>
                  <div className="col">${cart.totalPrice}
                  </div>
                </div>
              </li>
              <li className='list-group-item'>
                {error && <Message variant='danger'>{error}</Message>}
              </li>
              <li className='list-group-item'>
                <button className="btn btn-primary" type="submit" disabled={cart.cartItems === 0} onClick={placeOrderHandler} >Place Order</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen;