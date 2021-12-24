import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const res  = await axios('/api/products');
      setProducts(res.data);
    }     
    fetchProducts();  
  }, []);

  return (
    <div className="container">
      <p className="h1">Latest Products</p>
      <div className="row">
        { products.map((product: any) => (
          <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <Product product={product} />
          </div> 
        ))}
      </div>
    </div>
  )
}

export default HomeScreen;