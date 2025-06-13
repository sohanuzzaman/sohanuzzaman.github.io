import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import CalendlyModal from './components/CalendlyModal';
import BackgroundElements from './components/BackgroundElements';
import TermsOfService from './components/TermsOfService';
import { useGradientEffect, useScrollAnimations } from './hooks/useAnimations';
import './css/critical.css';
import './css/styles.css';

function HomePage() {
  // Initialize custom hooks for animations
  useGradientEffect();
  useScrollAnimations();

  return (
    <>
      <BackgroundElements />
      <Header />
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingButton />
      <CalendlyModal />
    </>
  );
}

function App() {
  useEffect(() => {
    // Remove no-js class to enable enhanced features
    document.documentElement.classList.remove('no-js');

    // Add performance metrics tracking
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log(`[Performance] ${entry.name}: ${entry.startTime.toFixed(0)}ms`);
          });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        console.error('Performance observer error:', e);
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
