import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';


const ProfileScreen = () => {
  const { search } = useLocation();
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

  const submitHandler = (e: any) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  
  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile'));
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
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen;