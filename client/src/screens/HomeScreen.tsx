import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state: any) => state.productList)
  const { loading, error, products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <p className="h1">Latest Products</p>
      { loading ? (
        <p className='h2'>Loading...</p>
       ) : error ? (
         <p className='h3'>{error}</p> 
       ) : (
        <div className="row">
          { products.map((product: any) => (
            <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <Product product={product} />
            </div> 
          ))}
        </div>
       )}
    </div>
  ) 
}

export default HomeScreen;