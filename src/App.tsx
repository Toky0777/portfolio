import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminProjects from './pages/admin/AdminProjects';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSkills from './pages/admin/AdminSkills';
import AdminCV from './pages/admin/AdminCV';
import { AnimatePresence } from 'framer-motion';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
              <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
              <Route path="/admin/cv" element={<ProtectedRoute><AdminCV /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
              
              {/* 404 - Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;