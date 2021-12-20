import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <div className="container">
          <Route path='/' component={ HomeScreen } exact />
        </div>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
