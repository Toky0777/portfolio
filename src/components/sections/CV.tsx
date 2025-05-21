import React from 'react';
import Container from '../common/Container';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react';
import Button from '../common/Button';

const CV: React.FC = () => {
  const experience = [
    {
      title: 'Développeur Laravel / Vue.js',
      company: 'Upskill',
      period: 'Janvier 2023 - Aujourd\'hui',
      description:
        'Développement d’API REST sécurisées (JWT, Sanctum), intégration de composants Vue 3 avec Vuex, optimisation de requêtes Eloquent et participation aux rituels agiles (sprints, daily stand-up).',
    },
    {
      title: 'Développeur Full Stack JS',
      company: 'MSERV E-',
      period: 'Juin 2022 - Septembre 2022',
      description:
        'Création d’un progiciel de gestion (ERP) en Angular et Node.js pour une PME, gestion de l’authentification et de l’architecture front-back.',
    },
    {
      title: 'Web Designer',
      company: 'Haytek',
      period: 'Novembre 2020 - Novembre 2021',
      description:
        'Conception de maquettes web responsives avec Figma, intégration front-end avec HTML5, CSS3 et JavaScript.',
    },
  ];

  const education = [
    {
      degree: 'Diplôme de Master en Informatique de Gestion, Génie Logiciel et Intelligence Artificielle',
      institution: 'ISPM | Institut Supérieur Polytechnique de Madagascar',
      period: '2018 - 2024',
      description:
        'Formation axée sur le développement logiciel, les systèmes intelligents et les applications web. Réalisation de projets en ReactJS, Node.js, Laravel et Vue.js.',
    },
  ];


  return (
    <section id="cv" className="py-20 bg-gray-50">
      <Container>
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Curriculum Vitae
            </h2>
            <div className="w-20 h-1 mx-auto mb-6 bg-blue-600"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              My professional journey and qualifications that make me the right choice for your projects.
            </p>
            <Button
              className="mt-6"
              icon={<Download size={16} />}
              onClick={() => window.open('/cv.pdf', '_blank')}
            >
              Download CV
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              </div>
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="pl-4 border-l-2 border-blue-600">
                    <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-blue-600">{item.company}</p>
                    <p className="mb-2 text-sm text-gray-500">{item.period}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              </div>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="pl-4 border-l-2 border-blue-600">
                    <h4 className="text-lg font-semibold text-gray-900">{item.degree}</h4>
                    <p className="text-blue-600">{item.institution}</p>
                    <p className="mb-2 text-sm text-gray-500">{item.period}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CV;