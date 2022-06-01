import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Tags } from '../views/index';

export default function AppRoutes({ user }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tags' element={<Tags />} />
      </Routes>
    </>
  );
}
