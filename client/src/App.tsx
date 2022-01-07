import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <div className="container">
           {/* https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type */}
          <Routes>
            <Route path='/login' element={ <LoginScreen/> } />
            <Route path='/' element={ <HomeScreen/> }  />
            <Route path='/product/:id' element={ <ProductScreen /> } />
            <Route path='/cart/:id' element={ <CartScreen /> }  />
          </Routes>
        </div>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
