import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import KnowYourChild from './components/KnowYourChild';
import ParentalSupport from './components/ParentalSupport';
import AwarenessHub from './components/AwarenessHub';
import AtHomeGoals from './components/AtHomeGoals';
import Community from './components/Community';
import Onboarding from './components/Onboarding';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#DAF0F7] to-[#A8B5E0]">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/know-your-child" element={<KnowYourChild />} />
            <Route path="/parental-support" element={<ParentalSupport />} />
            <Route path="/awareness-hub" element={<AwarenessHub />} />
            <Route path="/at-home-goals" element={<AtHomeGoals />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;