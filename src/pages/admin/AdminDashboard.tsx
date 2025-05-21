import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent } from '../../components/common/Card';
import { FileText, Star, User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectsData, testimonialsData } from '../../data/initialData';

const AdminDashboard: React.FC = () => {
  const cards = [
    {
      title: 'Profile Info',
      icon: <User className="h-6 w-6 text-blue-600" />,
      description: 'Update your personal information, skills, and contact details',
      link: '/admin/profile',
      color: 'blue',
    },
    {
      title: 'Projects',
      icon: <Briefcase className="h-6 w-6 text-teal-600" />,
      description: 'Manage your portfolio projects and case studies',
      count: projectsData.length,
      link: '/admin/projects',
      color: 'teal',
    },
    {
      title: 'Testimonials',
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      description: 'Manage client testimonials and feedback',
      count: testimonialsData.length,
      link: '/admin/testimonials',
      color: 'yellow',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Portfolio</title>
      </Helmet>
      
      <AdminLayout title="Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={card.link}>
                <Card hoverable className="h-full">
                  <CardContent>
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg bg-${card.color}-100 mr-4`}>
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {card.title}
                          {card.count !== undefined && (
                            <span className="ml-2 text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                              {card.count}
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{card.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Tips</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>
                Update your profile information regularly to keep your portfolio fresh.
              </span>
            </li>
            <li className="flex items-start">
              <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>
                Showcase your best and most recent projects at the top of your portfolio.
              </span>
            </li>
            <li className="flex items-start">
              <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>
                Collect testimonials from satisfied clients to build trust with potential new clients.
              </span>
            </li>
            <li className="flex items-start">
              <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>
                Regularly check your contact form to ensure you're not missing any important messages.
              </span>
            </li>
          </ul>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;