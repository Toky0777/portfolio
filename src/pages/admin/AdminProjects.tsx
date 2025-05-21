import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import Input from '../../components/common/Input';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { ExternalLink, Edit, Trash, Plus, Save, X } from 'lucide-react';
import { projectsData as initialProjectsData } from '../../data/initialData';
import { Project } from '../../types';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([...initialProjectsData]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProject) return;
    
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (name === 'tags') {
      const tagsArray = value.split(',').map(tag => tag.trim());
      setEditingProject(prev => ({ ...prev!, tags: tagsArray }));
    } else if (type === 'checkbox') {
      setEditingProject(prev => ({ ...prev!, [name]: checked }));
    } else {
      setEditingProject(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleAddNew = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description...',
      image: 'https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tags: ['New'],
      featured: false,
    };
    
    setEditingProject(newProject);
  };

  const handleCancel = () => {
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== id));
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingIndex = projects.findIndex(p => p.id === editingProject.id);
      
      if (existingIndex >= 0) {
        // Update existing project
        setProjects(prev => [
          ...prev.slice(0, existingIndex),
          editingProject,
          ...prev.slice(existingIndex + 1)
        ]);
      } else {
        // Add new project
        setProjects(prev => [...prev, editingProject]);
      }
      
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Projects | Admin</title>
      </Helmet>
      
      <AdminLayout title="Manage Projects">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Manage your portfolio projects. Add, edit, or remove projects from your website.
          </p>
          
          <Button
            onClick={handleAddNew}
            icon={<Plus size={16} />}
          >
            Add New Project
          </Button>
        </div>

        {editingProject && (
          <Card className="mb-8">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingProject.id.includes('new') ? 'Add New Project' : 'Edit Project'}
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
                    label="Project Title"
                    name="title"
                    value={editingProject.title}
                    onChange={handleChange}
                    fullWidth
                  />
                  
                  <TextField
                    label="Description"
                    name="description"
                    value={editingProject.description}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <Input
                    label="Image URL"
                    name="image"
                    value={editingProject.image}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <Input
                    label="Tags (comma separated)"
                    name="tags"
                    value={editingProject.tags.join(', ')}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={editingProject.featured}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="featured" className="text-gray-700">
                      Featured Project
                    </label>
                  </div>
                </div>
                
                <div>
                  <Input
                    label="Demo URL (optional)"
                    name="demoUrl"
                    value={editingProject.demoUrl || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Repository URL (optional)"
                    name="repoUrl"
                    value={editingProject.repoUrl || ''}
                    onChange={handleChange}
                    className="mt-4"
                    fullWidth
                  />
                  
                  <div className="mt-4">
                    <p className="font-medium text-gray-700 mb-2">Preview</p>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={editingProject.image}
                        alt={editingProject.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold">{editingProject.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {editingProject.description}
                        </p>
                      </div>
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
                  Save Project
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id}>
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map(tag => (
                    <span
                      key={`${project.id}-${tag}`}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Repo
                    </a>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(project)}
                    icon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(project.id)}
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

export default AdminProjects;