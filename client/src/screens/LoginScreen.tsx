import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';


const LoginScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); 
  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  
  const redirect = search ? search.split('=')[1] : '/';

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
  
  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  
  return (
    <div className="container">
      <FormContainer>
        <p className="h1">Sign In</p>
        { error && <Message variant='danger'>{error}</Message> }
        { loading && <Loader/> }
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password address</label>
            <input type="password" className="form-control" id="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" type="submit" >Sign In</button>
          </div>
        </form>
        <div className="row py-3">
          <div className="col">
            New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </div>
        </div>
      </FormContainer>
    </div>
  )
}

export default LoginScreen;