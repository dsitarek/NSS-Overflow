import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Home,
  Tags,
  TagQuestions,
  AskQuestion,
  Thread,
  Search,
} from '../views/index';

export default function AppRoutes({ user }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tags' element={<Tags />} />
        <Route path='/questions/tags/:selectedTag' element={<TagQuestions />} />
        <Route path='/askQuestion' element={<AskQuestion />} />
        <Route path='/questions/:threadId' element={<Thread />} />
        <Route path='/questions/search/:search' element={<Search />} />
      </Routes>
    </>
  );
}
