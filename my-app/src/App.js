import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ForSalePage from './pages/ForSalePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/for-sale" element={<ForSalePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
