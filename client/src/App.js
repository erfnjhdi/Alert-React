import './styles/App.css';
import './styles/Modal.css';
import './styles/Form.css';
import './styles/Footer.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/Map';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Privacy from './components/Privacy';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MapComponent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
