import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login, register } from '../actions/userActions';


const RegisterScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState("");

  const dispatch = useDispatch(); 
  const userRegister = useSelector((state: any) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  
  const redirect = search ? search.split('=')[1] : '/';

  const submitHandler = (e: any) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(name, email, password));
    }
  }
  
  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  
  return (
    <div className="container">
      <FormContainer>
        <p className="h1">Sign Up</p>
        { message && <Message variant='danger'>{message}</Message> }
        { error && <Message variant='danger'>{error}</Message> }
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
            <button className="btn btn-primary" type="submit" >Register</button>
          </div>
        </form>
        <div className="row py-3">
          <div className="col">
            Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </div>
        </div>
      </FormContainer>
    </div>
  )
}

export default RegisterScreen;