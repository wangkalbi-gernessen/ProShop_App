import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const ProductScreen = (match: any) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  
  const productDetails = useSelector((state: any) => state.productDetails)
  const { loading, error, product } = productDetails;
  
  const rating = Number((product as any).rating);
  const stock = Number((product as any).countInStock);

  useEffect(() => {
    dispatch(listProductDetails(id));
  },[dispatch, id, match]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${quantity}`);
  }

  return (
    <>
      <Link to='/' className='btn btn-dark my-3' >Go Back</Link>
      { loading ? <Loader/> : error ? <Message variant="danger">{ error }</Message> : (
        <div className="row">
        <div className="col-md-6">
          <img src={(product as any).image} alt={(product as any).image} className="img-fluid" />
        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush">
            <li className='list-group-item'>{ (product as any).name }</li>
            <li className='list-group-item'>
              <Rating value={ rating } text={`${(product as any).numReviews} reveiws`} color="red" />
            </li>
            <li className='list-group-item'>Price: ${(product as any).price}</li>
            <li className='list-group-item'>Description: {(product as any).description}</li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">
                    Price: 
                  </div>
                  <div className="col">
                    <p><strong>${(product as any).price}</strong></p> 
                  </div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">
                    Status: 
                  </div>
                  <div className="col">
                    { stock > 0 ? 'In stock' : 'Out of Stock'}
                  </div>
                </div>
              </li>
              { product.countInStock > 0 && (
                <li className='list-group-item'>
                <div className="row">
                  <div className="col">Quantity</div>
                  <div className="col">
                    <select className="form-select" aria-label="Default select example" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                      {[...Array((product as any).countInStock).keys()].map((x: number) => (
                        <option key={ x + 1 } value={ x + 1}>{ x + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
              )}
              <li className='list-group-item'>
                <div className="d-grid gap-2 col-12 mx-auto">
                  <button className="btn btn-dark" type="button" disabled={stock === 0} onClick={addToCartHandler}>Add To Cart</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default ProductScreen;