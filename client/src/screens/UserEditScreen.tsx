import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';


const UserEditScreen = () => {  
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch(); 

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state: any) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if(!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      } 
    }
  }, [dispatch, id, user, successUpdate, navigate]);

  const submitHandler = (e: any) => {
    console.log(isAdmin);

    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  }
  
  return (
    <div className="container">
      <Link to='/admin/userlist'>
        <button type="button" className="btn btn-light my-3">Go Back</button>
      </Link>
      <FormContainer>
        <p className="h1">Edit User</p>
        { loadingUpdate && <Loader/> }
        { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
        { loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
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
              <input className="form-check-input" type="checkbox" checked={isAdmin} id="isAdmin" onChange={e => setIsAdmin(e.target.checked)} />
              <label className="form-check-label" htmlFor="isAdmin">Is Admin</label>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit" >Update</button>
            </div>
          </form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditScreen;