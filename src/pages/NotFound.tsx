import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Container from '../components/common/Container';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
              <Button icon={<ArrowLeft size={16} />}>Back to Home</Button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default NotFound;