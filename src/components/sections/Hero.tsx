import React from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/initialData';

const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <Container className="flex flex-col items-center justify-between py-12 lg:flex-row">
        <div className="w-full mb-10 lg:w-1/2 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              <span className="text-blue-600">Hello, I'm</span>
              <br />
              {profileData.name}
            </h1>

            <h2 className="mb-6 text-xl text-gray-700 md:text-2xl">
              {profileData.title}
            </h2>

            <p className="max-w-lg mb-8 text-lg text-gray-600">
              I create beautiful digital experiences that help businesses thrive.
              <span className="block mt-2 font-medium text-blue-600">
                Your success is my priority.
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">View My Work</Button>
              <Button variant="outline" size="lg">Contact Me</Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center w-full lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-0 transform -translate-x-4 translate-y-4 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="relative z-10 object-cover w-64 h-64 border-4 border-white rounded-full shadow-xl md:w-96 md:h-96"
            />
          </div>
        </motion.div>
      </Container>

      <motion.div
        className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={scrollToNextSection}
      >
        <ChevronDown size={32} className="text-gray-500 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;