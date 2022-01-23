import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <div className="container">
           {/* https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type */}
          <Routes>
            <Route path='/order/:id' element={ <OrderScreen/> } />
            <Route path='/shipping' element={ <ShippingScreen/> } />
            <Route path='/payment' element={ <PaymentScreen/> } />
            <Route path='/placeorder' element={ <PlaceOrderScreen/> } />
            <Route path='/login' element={ <LoginScreen/> } />
            <Route path='/register' element={ <RegisterScreen/> } />
            <Route path='/profile' element={ <ProfileScreen/> } />
            <Route path='/' element={ <HomeScreen/> }  />
            <Route path='/product/:id' element={ <ProductScreen /> } />
            <Route path='/cart/:id' element={ <CartScreen /> }  />
            <Route path='/admin/userlist' element={ <UserListScreen /> }  />
          </Routes>
        </div>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
