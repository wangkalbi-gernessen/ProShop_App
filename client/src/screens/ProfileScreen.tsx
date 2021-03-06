import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState("");

  const dispatch = useDispatch(); 
  
  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  
  const userUpdateProfile = useSelector((state: any) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state: any) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  const submitHandler = (e: any) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  
  useEffect(() => {
    console.log(loadingOrders);
    console.log(errorOrders);
    if(!userInfo) {
      navigate('/login');
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    } 
  }, [dispatch, navigate, userInfo, user]);
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <p className="h1">User Profile</p>
          { message && <Message variant='danger'>{message}</Message> }
          { error && <Message variant='danger'>{error}</Message> }
          { success && <Message variant='danger'>Profile Updated</Message> }
          { loading && <Loader/> }
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password address</label>
              <input type="password" className="form-control" id="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit" >Update</button>
            </div>
          </form>
        </div>
        <div className="col-md-9">
          <p className="h2">My Orders</p>
          {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
            <div className="table-responsive-sm">
              <table className='table'>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">PAID</th>
                    <th scope="col">DELIVERED</th>
                    <th scope="col"></th>
                  </tr>
                </thead>  
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? (
                        order.paidAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times' style={{color: "red"}}></i>
                        )}
                      </td>
                      <td>{order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times' style={{color: "red"}}></i>
                        )}
                      </td>
                      <Link to={`/order/${order._id}`}>
                        <button className="btn btn-light btn-sm" type="submit">Details</button>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen;