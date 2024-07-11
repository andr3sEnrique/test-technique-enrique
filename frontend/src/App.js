import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFinal from './components/auth/Login';
import Index from './components/Index';
import Register from './components/auth/Register';

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginFinal />} />
        <Route path='/register' element={<Register/>} />
        <Route
          path='/products'
          element={token ? <Index /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;