import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({props}: any) => {
  const [product, setProduct] = useState({ });
  const { id } = useParams();
  const toNum = Number(id);
  // console.log(toNum);
  // const rating = Number(product?.rating);
  // const stock = Number(product?.countInStock);

  useEffect(() => {
    const fetchProduct = async() => {
      const { data } = await axios.get(`/api/products/${toNum}`);
       setProduct(data);
    }
    fetchProduct();
  },[]);

  console.log(product);
  
  return (
    <>
      <Link to='/' className='btn btn-dark my-3' >Go Back</Link>
      <div className="row">
        <div className="col-md-6">
          {/* <img src={product} alt={product} className="img-fluid" /> */}
        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush">
            {/* <li className='list-group-item'>{ product?.name }</li> */}
            <li className='list-group-item'>
              {/* {product?.rating} */}
              {/* <Rating value={rating } text={`${product?.numReviews} reveiws`} color="red" /> */}
            </li>
            {/* <li className='list-group-item'>Price: ${product?.price}</li> */}
            {/* <li className='list-group-item'>Description: {product?.description}</li> */}
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
                    {/* <p><strong>${product?.price}</strong></p>  */}
                  </div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className="row">
                  <div className="col">
                    Status: 
                  </div>
                  <div className="col">
                    {/* { stock > 0 ? 'In stock' : 'Out of Stock'} */}
                  </div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className="d-grid gap-2 col-12 mx-auto">
                  {/* <button className="btn btn-dark" type="button" disabled={stock === 0}>Add To Cart</button> */}
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