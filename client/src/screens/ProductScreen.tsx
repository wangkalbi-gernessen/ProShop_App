import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({props}: any) => {
  const [product, setProduct] = useState({ });
  const { id } = useParams();
  const toNum = Number(id);
  const rating = Number((product as any).rating);
  const stock = Number((product as any).countInStock);

  useEffect(() => {
    const fetchProduct = async() => {
      const { data } = await axios.get(`/api/products/${toNum}`);
      // console.log(data);
      setProduct({...product, ...data});
    }
    fetchProduct();
  },[]);

  return (
    <>
      <Link to='/' className='btn btn-dark my-3' >Go Back</Link>
      <div className="row">
        <div className="col-md-6">
          <img src={(product as any).image} alt={(product as any).image} className="img-fluid" />
        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush">
            <li className='list-group-item'>{ (product as any).name }</li>
            <li className='list-group-item'>
              {(product as any).rating}
              <Rating value={rating } text={`${(product as any).numReviews} reveiws`} color="red" />
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
              <li className='list-group-item'>
                <div className="d-grid gap-2 col-12 mx-auto">
                  <button className="btn btn-dark" type="button" disabled={stock === 0}>Add To Cart</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductScreen;