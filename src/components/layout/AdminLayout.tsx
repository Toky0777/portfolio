import React from 'react';
import AdminHeader from './AdminHeader';
import { motion } from 'framer-motion';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminHeader />
      
      <motion.main 
        className="flex-grow py-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          
          {children}
        </div>
      </motion.main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Portfolio Admin Panel
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;