import React, { useState } from 'react';
import Container from '../common/Container';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../../data/initialData';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = filter
    ? projectsData.filter(project =>
      project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    )
    : projectsData;

  const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
  );

  return (
    <section id="projects" className="py-20 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Projects
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of my recent work. Each project presented unique challenges and opportunities to create something amazing.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full flex flex-col">
                <div className="relative w-full pt-[60%] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium"
                      >
                        <Github size={16} className="mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;