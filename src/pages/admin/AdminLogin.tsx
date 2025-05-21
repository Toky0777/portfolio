import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { authState, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (authState.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Portfolio</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-600 mt-1">Sign in to access the dashboard</p>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  type="text"
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
                
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
                Return to Website
              </Link>
            </div>
          </div>
          
          <div className="mt-4 text-center text-gray-500 text-sm">
            <p>
              For demo purposes, use:
              <br />
              Username: <span className="font-mono">admin</span>
              <br />
              Password: <span className="font-mono">password</span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;