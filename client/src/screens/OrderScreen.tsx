import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

// Declare global Window interface
declare global {
  interface Window {
      paypal:any;
  }
}

const OrderScreen = (match: any) => {
  const { orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: any) => state.orderDetails);
  const { order, loading, error }  = orderDetails;

  const orderPay = useSelector((state: any) => state.orderPay);
  const { loading: loadingPay, success: successPay }  = orderPay;

  if(!loading) {
    // Calculate prices
    const addDecimals = (num: number) => {
      return (Math.round(num * 100)/100).toFixed(2);
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc: any, item: any) => Number(acc) + Number(item.price) * Number(item.quantity), 0));
  }
  
  useEffect(() => {
    const addPaypalScript =async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }

    if(!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId));
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult: any) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult)); 
  }
  
  

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <div className='container'>
    <p className='h1'>Order {order._id}</p>
    <div className="row">
      <div className="col-md-8">
        <ul className="list-group list-group-flush">
          <li className='list-group-item'>
            <p className='h2'>Shipping</p>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{' '}
              <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
            </p>
            <p className='h4'>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '} {order.shippingAddress.postalCode},{' '} 
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (<Message variant='success'>Delivered on {order.deliveredAt}</Message>) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </li>
          <li className='list-group-item'>
            <p className='h2'>Payment Method</p>
            <p className='h4'>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}</Message>) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </li>
          <li className='list-group-item'>
            <p className='h2'>Order Items</p>
            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
              <ul className='list-group list-group-flush'>
                {order.orderItems.map((item: any, index: any) => (
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
                        {item.qty} x ${item.price} = ${Number(item.qty) * Number(item.price)}
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
                <div className="col">${order.itemsPrice}</div>
              </div>
            </li>
            <li className='list-group-item'>
              <div className="row">
                <div className="col">Shipping</div>
                <div className="col">${order.shippingPrice}</div>
              </div>
            </li>
            <li className='list-group-item'>
              <div className="row">
                <div className="col">Tax</div>
                <div className="col">${order.taxPrice}</div>
              </div>
            </li>
            <li className='list-group-item'>
              <div className="row">
                <div className="col">Total</div>
                <div className="col">${order.totalPrice}</div>
              </div>
            </li>
            {!order.isPaid && (
              <div className="list-group-item">
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
}

export default OrderScreen;