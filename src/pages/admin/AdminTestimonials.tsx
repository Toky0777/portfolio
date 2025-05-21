import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import Input from '../../components/common/Input';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { Edit, Trash, Plus, Save, X, Star } from 'lucide-react';
import { testimonialsData as initialTestimonialsData } from '../../data/initialData';
import { Testimonial } from '../../types';

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([...initialTestimonialsData]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingTestimonial) return;
    
    const { name, value } = e.target;
    
    if (name === 'rating') {
      setEditingTestimonial(prev => ({ ...prev!, [name]: parseInt(value) }));
    } else {
      setEditingTestimonial(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleAddNew = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: 'New Client',
      role: 'Position',
      company: 'Company Name',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: 'Testimonial content...',
      rating: 5,
    };
    
    setEditingTestimonial(newTestimonial);
  };

  const handleCancel = () => {
    setEditingTestimonial(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
    }
  };

  const handleSave = async () => {
    if (!editingTestimonial) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingIndex = testimonials.findIndex(t => t.id === editingTestimonial.id);
      
      if (existingIndex >= 0) {
        // Update existing testimonial
        setTestimonials(prev => [
          ...prev.slice(0, existingIndex),
          editingTestimonial,
          ...prev.slice(existingIndex + 1)
        ]);
      } else {
        // Add new testimonial
        setTestimonials(prev => [...prev, editingTestimonial]);
      }
      
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Testimonials | Admin</title>
      </Helmet>
      
      <AdminLayout title="Manage Testimonials">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Manage client testimonials. Add, edit, or remove testimonials from your website.
          </p>
          
          <Button
            onClick={handleAddNew}
            icon={<Plus size={16} />}
          >
            Add New Testimonial
          </Button>
        </div>

        {editingTestimonial && (
          <Card className="mb-8">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingTestimonial.id.includes('new') ? 'Add New Testimonial' : 'Edit Testimonial'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Client Name"
                    name="name"
                    value={editingTestimonial.name}
                    onChange={handleChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Role/Position"
                    name="role"
                    value={editingTestimonial.role}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <Input
                    label="Company"
                    name="company"
                    value={editingTestimonial.company}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <Input
                    label="Avatar URL"
                    name="avatar"
                    value={editingTestimonial.avatar}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <select
                      name="rating"
                      value={editingTestimonial.rating}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <TextField
                    label="Testimonial Content"
                    name="content"
                    value={editingTestimonial.content}
                    onChange={handleChange}
                    className="h-32"
                    fullWidth
                  />
                  
                  <div className="mt-4">
                    <p className="font-medium text-gray-700 mb-2">Preview</p>
                    <div className="bg-white p-4 border rounded-lg">
                      <div className="flex items-center mb-3">
                        <img
                          src={editingTestimonial.avatar}
                          alt={editingTestimonial.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-semibold">{editingTestimonial.name}</h4>
                          <p className="text-sm text-gray-600">
                            {editingTestimonial.role}, {editingTestimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < editingTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic text-sm">"{editingTestimonial.content}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  icon={<Save size={16} />}
                >
                  Save Testimonial
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id}>
              <CardContent>
                <div className="flex items-start mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic border-l-4 border-gray-200 pl-4 py-2">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(testimonial)}
                    icon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(testimonial.id)}
                    icon={<Trash size={14} />}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminTestimonials;