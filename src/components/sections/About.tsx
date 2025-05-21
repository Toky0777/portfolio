import React from 'react';
import Container from '../common/Container';
import { motion } from 'framer-motion';
import { Award, Clock, Heart, Rocket } from 'lucide-react';
import { profileData } from '../../data/initialData';

const About: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Fast Delivery',
      description: 'I deliver projects on time, ensuring you can meet your business deadlines.',
    },
    {
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      title: 'Passion for Quality',
      description: 'I\'m dedicated to creating high-quality, maintainable code that stands the test of time.',
    },
    {
      icon: <Rocket className="w-8 h-8 text-teal-600" />,
      title: 'Innovative Solutions',
      description: 'I find creative solutions to complex problems, helping your business innovate and grow.',
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: 'Client Satisfaction',
      description: 'Your success is my priority. I work closely with you to ensure complete satisfaction.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I'm dedicated to creating exceptional digital experiences that help businesses and individuals succeed in the digital world.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Always here to help you shine
            </h3>
            <p className="text-gray-600 mb-6">
              {profileData.bio}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-700 mb-1 font-medium">Name:</p>
                <p className="text-gray-600">{profileData.name}</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1 font-medium">Email:</p>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1 font-medium">Location:</p>
                <p className="text-gray-600">{profileData.location}</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1 font-medium">Phone:</p>
                <p className="text-gray-600">{profileData.phone}</p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default About;