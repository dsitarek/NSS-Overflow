import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../views/index';

export default function AppRoutes({ user }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
      </Routes>
    </>
  );
}
