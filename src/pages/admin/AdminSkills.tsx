import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Edit, Trash, Plus, Save, X } from 'lucide-react';
import { skillsData as initialSkillsData } from '../../data/initialData';
import { Skill } from '../../types';

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([...initialSkillsData]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (skill: Skill) => {
    setEditingSkill({ ...skill });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingSkill) return;
    
    const { name, value } = e.target;
    
    if (name === 'level') {
      setEditingSkill(prev => ({ ...prev!, [name]: parseInt(value) }));
    } else {
      setEditingSkill(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleAddNew = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 3,
      category: 'frontend',
    };
    
    setEditingSkill(newSkill);
  };

  const handleCancel = () => {
    setEditingSkill(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills(prev => prev.filter(skill => skill.id !== id));
    }
  };

  const handleSave = async () => {
    if (!editingSkill) return;
    
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingIndex = skills.findIndex(s => s.id === editingSkill.id);
      
      if (existingIndex >= 0) {
        setSkills(prev => [
          ...prev.slice(0, existingIndex),
          editingSkill,
          ...prev.slice(existingIndex + 1)
        ]);
      } else {
        setSkills(prev => [...prev, editingSkill]);
      }
      
      setEditingSkill(null);
    } catch (error) {
      console.error('Error saving skill:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Skills | Admin</title>
      </Helmet>
      
      <AdminLayout title="Manage Skills">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Manage your skills and expertise levels.
          </p>
          
          <Button
            onClick={handleAddNew}
            icon={<Plus size={16} />}
          >
            Add New Skill
          </Button>
        </div>

        {editingSkill && (
          <Card className="mb-8">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Skill Name"
                  name="name"
                  value={editingSkill.name}
                  onChange={handleChange}
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={editingSkill.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level (1-5)
                  </label>
                  <select
                    name="level"
                    value={editingSkill.level}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  >
                    {[1, 2, 3, 4, 5].map(level => (
                      <option key={level} value={level}>
                        {level} - {level === 1 ? 'Beginner' : level === 5 ? 'Expert' : `Level ${level}`}
                      </option>
                    ))}
                  </select>
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
                  Save Skill
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <Card key={skill.id}>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {skill.category}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 font-semibold">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${skill.level * 20}%` }}
                  ></div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(skill)}
                    icon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(skill.id)}
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

export default AdminSkills;