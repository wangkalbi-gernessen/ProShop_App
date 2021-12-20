import React from 'react';
import Product from '../components/Product';
import products from '../products';

const HomeScreen = () => {
  return (
    <div className="container">
      <p className="h1">Latest Products</p>
      <div className="row">
        { products.map(product => (
          <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <Product product={product} />
          </div> 
        ))}
      </div>
    </div>
  )
}

export default HomeScreen;