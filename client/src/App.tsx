import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header/>
      <main className="py-3">
        <div className="container">
          <p className='h1'>Welcome to ProShop</p>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
