import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import RegisterModal from './components/RegisterModal';
import Page404 from './pages/Page404';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<RegisterModal />} /> 
            <Route path='*' element={<Page404 />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
