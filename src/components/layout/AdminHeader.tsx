import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { useState } from 'react';

const adminLinks = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Profile', path: '/admin/profile' },
  { name: 'Skills', path: '/admin/skills' },
  { name: 'CV', path: '/admin/cv' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Testimonials', path: '/admin/testimonials' },
];

const AdminHeader: React.FC = () => {
  const { authState, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin" className="text-xl font-bold mr-8">
              Admin Panel
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium ${
                    location.pathname === link.path
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            {authState.user && (
              <div className="hidden md:flex items-center">
                <span className="text-sm mr-4">
                  Welcome, {authState.user.username}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-800"
                  onClick={handleLogout}
                  icon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm py-2 ${
                    location.pathname === link.path
                      ? 'text-blue-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {authState.user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-800 justify-start px-0"
                  onClick={handleLogout}
                  icon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;