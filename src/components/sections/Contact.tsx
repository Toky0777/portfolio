import React, { useState, FormEvent, useRef } from 'react';
import Container from '../common/Container';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import Input from '../common/Input';
import TextField from '../common/TextField';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactFormData } from '../../types';
import emailjs from '@emailjs/browser';
import { profileData } from '../../data/initialData';

// Initialize EmailJS
emailjs.init("CdEFhOBWBkiOq7b11");

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_n5zxbzx',
        'template_arheris',
        formRef.current!,
        'CdEFhOBWBkiOq7b11'
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Get In Touch
            </h2>
            <div className="w-20 h-1 mx-auto mb-6 bg-blue-600"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Contact Information
            </h3>

            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="p-3 mr-4 bg-blue-100 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-gray-900">
                    Location
                  </h4>
                  <p className="text-gray-600">{profileData.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 mr-4 bg-blue-100 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-gray-900">
                    Email
                  </h4>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 mr-4 bg-blue-100 rounded-full">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-gray-900">
                    Phone
                  </h4>
                  <a
                    href={`tel:${profileData.phone}`}
                    className="text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Follow Me
            </h3>

            <div className="flex space-x-4">
              {profileData.socialLinks.linkedin && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 transition-colors bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}

              {profileData.socialLinks.github && (
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 transition-colors bg-gray-200 rounded-full hover:bg-gray-800 hover:text-white"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              )}

              {profileData.socialLinks.twitter && (
                <a
                  href={profileData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 transition-colors bg-gray-200 rounded-full hover:bg-blue-400 hover:text-white"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Send Me a Message
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  label="Your Name"
                  placeholder="Rakoto Josoa"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  fullWidth
                />

                <Input
                  type="email"
                  name="email"
                  id="email"
                  label="Your Email"
                  placeholder="rakoto@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  fullWidth
                />
              </div>

              <Input
                type="text"
                name="subject"
                id="subject"
                label="Subject"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                fullWidth
              />

              <TextField
                name="message"
                id="message"
                label="Your Message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                fullWidth
              />

              <div>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>

                {submitStatus === 'success' && (
                  <p className="mt-3 text-green-600">
                    Your message has been sent successfully!
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="mt-3 text-red-600">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;