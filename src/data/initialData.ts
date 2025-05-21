import { Profile, Project, Skill, Testimonial } from '../types';

export const profileData: Profile = {
  name: 'Toky Hénoc',
  title: 'Full Stack Developer',
  bio: 'Passionate developer with 2+ years of experience creating beautiful and functional web applications. Always eager to tackle new challenges and help clients achieve their digital goals.',
  avatar: "https://raw.githubusercontent.com/Toky0777/image/refs/heads/main/Portrait%20professionnel%20élégant%20d'un%20homme.png",
  location: 'Antananarivo, Madagascar',
  email: 'ramananjaratoky07@gmail.com',
  phone: '+261 34 01 450 52',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/toky-ramananjara/',
    github: 'https://github.com/Toky0777',
  },
};

export const skillsData: Skill[] = [
  // FRONTEND
  { id: '1', name: 'Vue.js (Vue 3)', level: 4, category: 'frontend' },
  { id: '4', name: 'HTML5 / CSS3', level: 5, category: 'frontend' },
  { id: '5', name: 'Tailwind CSS', level: 5, category: 'frontend' },
  { id: '6', name: 'SCSS', level: 4, category: 'frontend' },

  // BACKEND
  { id: '7', name: 'Laravel (PHP)', level: 5, category: 'backend' },
  { id: '8', name: 'REST API', level: 5, category: 'backend' },
  { id: '9', name: 'MySQL', level: 4, category: 'backend' },

  // OUTILS / MÉTHODES
  { id: '15', name: 'Git / GitHub', level: 5, category: 'other' },
  { id: '16', name: 'CI/CD (GitHub Actions)', level: 4, category: 'other' },
  { id: '17', name: 'Agile (Scrum, Kanban)', level: 4, category: 'other' },
  { id: '18', name: 'Postman', level: 4, category: 'other' },
  { id: '19', name: 'Vite / Webpack', level: 4, category: 'other' },
];


export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Training Marketplace Platform',
    description: 'A Laravel-based web platform where companies and individuals can browse and book professional training programs from certified training centers. Built from scratch with dynamic filters, booking system, and user authentication.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Laravel', 'Tailwind CSS', 'Blade', 'MySQL', 'Git', 'REST API', 'AJAX'],
    demoUrl: 'https://marketplace.forma-fusion.com',
    repoUrl: 'https://github.com/Toky0777/marketplace.git',
    featured: true,
  },
  {
    id: '2',
    title: 'Subscription Management System',
    description: 'A SaaS-style subscription system managing license plans, pricing tiers, and feature access. Includes CRUD management, payment logic integration readiness, and role-based access control.',
    image: 'https://images.pexels.com/photos/7034390/pexels-photo-7034390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Laravel', 'Vue.js', 'Tailwind CSS', 'MySQL', 'Git', 'API', 'RBAC'],
    demoUrl: 'https://licences.forma-fusion.com',
    repoUrl: 'https://github.com/Toky0777/licences.forma-fusion.git',
    featured: true,
  },
  {
    id: '3',
    title: 'Invoice & Billing Manager',
    description: 'Complete invoicing system tailored for training centers. Includes client management, project-based billing, PDF export, tax calculation, and custom invoice templates.',
    image: 'https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Laravel', 'Tailwind CSS', 'Blade', 'MySQL', 'Git', 'PDF Generation', 'AJAX'],
    demoUrl: 'https://facture-formafusion.com',
    repoUrl: 'https://github.com/Toky0777/facture-formafusion.git',
    featured: false,
  },
  {
    id: '4',
    title: 'Project Management for Training Centers',
    description: 'A robust project management tool built for training centers. Supports course catalog, learner tracking, client CRM, class calendars, session evaluation, project types (intra/inter), and teaching material upload.',
    image: 'https://images.pexels.com/photos/1181336/pexels-photo-1181336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Laravel', 'Vue.js', 'Tailwind CSS', 'MySQL', 'Git', 'CRUD', 'Calendar API'],
    demoUrl: 'https://projets.forma-fusion.com',
    repoUrl: 'https://github.com/Toky0777/project-formafusion.git',
    featured: true,
  },
];


export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Digital Innovations',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'Working with John was an absolute pleasure. He understood our vision perfectly and delivered a website that exceeded our expectations. His attention to detail and commitment to quality is outstanding.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'TechStart Inc.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'John transformed our outdated platform into a modern, user-friendly website. His technical expertise and creative problem-solving skills helped us achieve our business goals. Highly recommended!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'Innovate Solutions',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'We hired John for a complex web application project, and he delivered exceptional results. His proactive communication and ability to adapt to changing requirements made the development process smooth and efficient.',
    rating: 4,
  },
];