import React from 'react';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { profileData } from '../../data/initialData';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-300 mb-4">
              Helping businesses and individuals create beautiful, functional digital experiences.
            </p>
            <div className="flex space-x-4">
              {profileData.socialLinks.github && (
                <a 
                  href={profileData.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {profileData.socialLinks.linkedin && (
                <a 
                  href={profileData.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {profileData.socialLinks.twitter && (
                <a 
                  href={profileData.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              <a 
                href={`mailto:${profileData.email}`} 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/#home" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/#skills" className="text-gray-300 hover:text-white transition-colors">Skills</Link>
              <Link to="/#projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
              <Link to="/#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
              <Link to="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>{profileData.location}</p>
              <p>
                <a 
                  href={`mailto:${profileData.email}`} 
                  className="hover:text-white transition-colors"
                >
                  {profileData.email}
                </a>
              </p>
              <p>
                <a 
                  href={`tel:${profileData.phone}`} 
                  className="hover:text-white transition-colors"
                >
                  {profileData.phone}
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;