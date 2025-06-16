import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './components/Heading';
import Home from './components/HomeContent';
import Browse from './components/Browse';
import About from './components/About';
import RegistrationForm from './components/auth/Registration';
import LoginForm from './components/auth/Login';

import PageWrapper from './assets/PageWrapper';

const GOOGLE_CLIENT_ID = "829774376415-jhk1p16hu7005f3oueun09pumf1gsd66.apps.googleusercontent.com";

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

function AppContent() {
  return (
    <>
      <Header />
      <AnimatedRoutes />
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
