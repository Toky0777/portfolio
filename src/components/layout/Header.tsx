import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../common/Container';
import { Menu, X, ChevronRight, UserCircle } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/#home' },
  { name: 'About', path: '/#about' },
  { name: 'Skills', path: '/#skills' },
  { name: 'CV', path: '/#cv' },
  { name: 'Projects', path: '/#projects' },
  // { name: 'Testimonials', path: '/#testimonials' },
  { name: 'Contact', path: '/#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      return location.pathname === (basePath || '/') &&
        (location.hash === `#${hash}` || (!location.hash && hash === 'home'));
    }
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-md py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <Container className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-blue-600"
        >
          <span className="mr-2">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="items-center hidden space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive(link.path)
                ? 'text-blue-600'
                : scrolled
                  ? 'text-gray-800'
                  : 'text-gray-800'
                }`}
              onClick={handleNavClick}
            >
              {link.name}
            </Link>
          ))}
          {/* <Link to="/admin/login">
            <Button 
              variant="outline" 
              size="sm"
              icon={<UserCircle size={16} />}
            >
              Admin
            </Button>
          </Link> */}
          <Button size="sm">Get in Touch</Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="text-gray-800 md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </Container>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 pt-20 bg-white md:hidden"
        >
          <Container>
            <nav className="flex flex-col py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-medium py-2 flex justify-between items-center ${isActive(link.path) ? 'text-blue-600' : 'text-gray-800'
                    }`}
                  onClick={handleNavClick}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ))}
              <Link
                to="/admin/login"
                className="flex items-center justify-between py-2 text-lg font-medium text-gray-800"
                onClick={handleNavClick}
              >
                Admin Panel
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Button className="w-full mt-4">Get in Touch</Button>
            </nav>
          </Container>
        </motion.div>
      )}
    </header>
  );
};

export default Header;