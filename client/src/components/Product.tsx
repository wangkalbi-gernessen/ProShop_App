import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ( { product }: any ) => {
  return (
    <div className="card my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="" className="card-img-top" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <div className="card-title">
            <p><strong>{product.name}</strong></p>
          </div>
        </Link>
        <div className="card-text">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} color="red"/>
        </div>
        <p className="h3 card-text">{`$ ${product.price}`}</p>
      </div>
    </div>
  )
}

export default Product;