import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

export const login = (email: any, password: any) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config: any = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    // This is a reason of bug
    const { data } = await axios.post(
      '/api/users/login',
      { email, password }, 
      config
    );
    
    
    dispatch({ 
        type: USER_LOGIN_SUCCESS, 
        payload: data  
      });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
    console.log("failed");
    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,  
    });
  }
} 

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
}

export const register = (name: any, email: any, password: any) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    const { data } = await axios.post(
      '/api/users',
      { name, email, password }, 
      config
    );

    dispatch({ 
      type: USER_REGISTER_SUCCESS, 
      payload: data,
    });

    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch({ 
      type: USER_REGISTER_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,  
    });
  }
}

export const getUserDetails = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      } 
    }
    
    const { data } = await axios.get(
      `/api/users/${id}`,
      config
    );

    dispatch({ 
      type: USER_DETAILS_SUCCESS, 
      payload: data,
    });
  } catch (error: any) {
    dispatch({ 
      type: USER_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,  
    });
  }
}

export const updateUserProfile = (user: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      } 
    }
    
    const { data } = await axios.put(
      `/api/users/profile`,
      user,
      config
    );

    dispatch({ 
      type: USER_UPDATE_PROFILE_SUCCESS, 
      payload: data,
    });
  } catch (error: any) {
    dispatch({ 
      type: USER_UPDATE_PROFILE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,  
    });
  }
}