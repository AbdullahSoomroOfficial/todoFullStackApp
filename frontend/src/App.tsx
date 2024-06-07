import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todos from './Components/Todos';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/todos/:status" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
