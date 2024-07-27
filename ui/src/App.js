import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import EmployeeListPage from './pages/EmployeeList';
import EmployeeCreatePage from './pages/EmployeeCreate';
import EmployeeDetailPage from './pages/EmployeeDetail';
import UpComingRetirement from './pages/UpComingRetirement';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/add" element={<EmployeeCreatePage />} />
          <Route path="/employee/:id" element={<EmployeeDetailPage />} />
          <Route path="/retirement" element={<UpComingRetirement />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;