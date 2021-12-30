import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';


const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if(id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id: any) => {
    dispatch(removeFromCart(id));
  }
  
  const checkoutHandler = () => {
    navigate('/login?redirect=shopping');
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p className='h1'>Shopping Cart</p>
          { cartItems.length === 0 ? 
          ( <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
          ) : (
            <ul className='list-group list-group-flush'>
              { cartItems.map((item: any) => (
                <li className="list-group-item" key={item.product}>
                  <div className="row">
                    <div className="col-md-2">
                      <img src={item.image} alt={item.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-3">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-2">${item.price}</div>
                    <div className="col-md-2">
                      <select className="form-select" aria-label="Default select example" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array((item as any).countInStock).keys()].map((x: number) => (
                          <option key={ x + 1 } value={ x + 1}>{ x + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-light" onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) } 
        </div>
        <div className="col-md-4">
          <div className="card">
            <ul className='list-group list-group-flush'>
              <li className="list-group-item">
                <p className="h2">Subtotal () items ({cartItems.reduce((acc: any, item: any) => acc + item.qty + 0)}</p>
                ${cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0).toFixed(2)}
              </li>
              <li className="list-group-item">
                <button type="button" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen;