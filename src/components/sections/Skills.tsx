import React from 'react';
import Container from '../common/Container';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/initialData';

const Skills: React.FC = () => {
  const categories = {
    frontend: skillsData.filter(skill => skill.category === 'frontend'),
    backend: skillsData.filter(skill => skill.category === 'backend'),
    design: skillsData.filter(skill => skill.category === 'design'),
    other: skillsData.filter(skill => skill.category === 'other'),
  };

  const renderSkillBar = (skill: typeof skillsData[0], index: number) => {
    const width = `${skill.level * 20}%`; // 1-5 scale converted to percentage

    return (
      <motion.div
        key={skill.id}
        className="mb-5"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <div className="flex justify-between mb-1">
          <span className="text-gray-700 font-medium">{skill.name}</span>
          <span className="text-gray-500 text-sm">{skill.level * 20}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="h-2.5 rounded-full bg-blue-600"
            style={{ width: '0%' }}
            animate={{ width }}
            transition={{
              duration: 1,
              delay: 0.2 + index * 0.1,
              ease: "easeOut"
            }}
          ></motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <Container>
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Skills
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are the technologies and tools I specialize in. My expertise allows me to create powerful, efficient solutions for your specific needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.frontend.length > 0 && (
            <div>
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Frontend Development
              </motion.h3>
              {categories.frontend.map(renderSkillBar)}
            </div>
          )}

          {categories.backend.length > 0 && (
            <div>
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Backend Development
              </motion.h3>
              {categories.backend.map(renderSkillBar)}
            </div>
          )}

          {categories.design.length > 0 && (
            <div>
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Design
              </motion.h3>
              {categories.design.map(renderSkillBar)}
            </div>
          )}

          {categories.other.length > 0 && (
            <div>
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Other Skills
              </motion.h3>
              {categories.other.map(renderSkillBar)}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Skills;