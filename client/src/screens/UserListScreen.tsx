import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUsers, listUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state: any) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  
  const userDelete = useSelector((state: any) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id: any) => {
    if(window.confirm('Are you sure')) {
      dispatch(deleteUsers(id));
    }
  }
  
  return (
    <div className="container">
      <p className="h1">Users</p>
      { loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> 
      : (
        <div className="table table-striped table-bordered table-hover table-responsive table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ADMIN</th>
              <th scope="col">ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (<i className="fas fa-check" style={{color: 'green'}}></i>) : (
                    <i className="fas fa-times" style={{color: 'red'}}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button type="button" className="btn btn-light btn-sm">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      )}
    </div>
  )
}

export default UserListScreen;