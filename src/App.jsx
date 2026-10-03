import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Explainers from './pages/Explainers.jsx';
import Article from './pages/Article.jsx';
import Quizzes from './pages/Quizzes.jsx';
import Quiz from './pages/Quiz.jsx';
import Kits from './pages/Kits.jsx';
import Research from './pages/Research.jsx';
import ResearchSubmit from './pages/ResearchSubmit.jsx';
import Paper from './pages/Paper.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explainers" element={<Explainers />} />
        <Route path="explainers/:slug" element={<Article />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="quizzes/:slug" element={<Quiz />} />
        <Route path="kits" element={<Kits />} />
        <Route path="research" element={<Research />} />
        <Route path="research/submit" element={<ResearchSubmit />} />
        <Route path="research/:id" element={<Paper />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
