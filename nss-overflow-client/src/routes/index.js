import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Tags, TagQuestions } from '../views/index';

export default function AppRoutes({ user }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tags' element={<Tags />} />
        <Route path='/questions/tags/:selectedTag' element={<TagQuestions />} />
      </Routes>
    </>
  );
}
