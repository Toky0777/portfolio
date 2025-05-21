import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import CV from '../components/sections/CV';
import Projects from '../components/sections/Projects';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import { profileData } from '../data/initialData';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{`${profileData.name} | ${profileData.title}`}</title>
        <meta name="description" content={profileData.bio} />
        <meta name="keywords" content="portfolio, developer, web development, design" />
      </Helmet>

      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Hero />
          <About />
          <Skills />
          <CV />
          <Projects />
          {/* <Testimonials /> */}
          <Contact />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Home;