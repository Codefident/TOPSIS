import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { NoPage } from './pages/NoPage';
import { Results } from './pages/Results';
import { DataInput } from './pages/DataInput';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/results' element={<Results />} />
        <Route path='/input-data' element={<DataInput />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
