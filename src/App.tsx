import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';

import Header from './components/Heading';
import Home from './components/HomeContent';
import Browse from './components/Browse';
import About from './components/About';
import RegistrationForm from './components/auth/Registration';
import LoginForm from './components/auth/Login';

import PageWrapper from './assets/PageWrapper';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/browse" element={<PageWrapper><Browse /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/signin" element={<PageWrapper><LoginForm /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><RegistrationForm /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ['/signup', '/signin'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  // Set background color based on current route
  React.useEffect(() => {
    if (shouldHideHeader) {
      document.body.style.backgroundColor = '#333333';
    } else {
      document.body.style.backgroundColor = ''; // Reset to default or you can set another color
    }

    // Optional cleanup (especially useful with animations or transitions)
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [location.pathname]);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <AnimatedRoutes />
    </>
  );
}


export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
