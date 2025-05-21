import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import Input from '../../components/common/Input';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { Plus, Save, Trash, Edit, X } from 'lucide-react';
import { Experience, Education, Certification } from '../../types';

const AdminCV: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingItem, setEditingItem] = useState<{
    type: 'experience' | 'education' | 'certification';
    item: Experience | Education | Certification | null;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNew = (type: 'experience' | 'education' | 'certification') => {
    const baseItem = {
      id: Date.now().toString(),
      startDate: '',
      current: false,
      description: '',
    };

    let newItem;
    switch (type) {
      case 'experience':
        newItem = {
          ...baseItem,
          title: '',
          company: '',
          location: '',
        } as Experience;
        break;
      case 'education':
        newItem = {
          ...baseItem,
          degree: '',
          institution: '',
          location: '',
        } as Education;
        break;
      case 'certification':
        newItem = {
          ...baseItem,
          name: '',
          issuer: '',
          issueDate: '',
          credentialUrl: '',
        } as Certification;
        break;
    }

    setEditingItem({ type, item: newItem });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingItem?.item) return;

    const { name, value, type } = e.target;
    setEditingItem(prev => ({
      ...prev!,
      item: {
        ...prev!.item!,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      },
    }));
  };

  const handleSave = async () => {
    if (!editingItem?.item) return;
    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      switch (editingItem.type) {
        case 'experience':
          const expItem = editingItem.item as Experience;
          setExperiences(prev => {
            const index = prev.findIndex(i => i.id === expItem.id);
            return index >= 0
              ? [...prev.slice(0, index), expItem, ...prev.slice(index + 1)]
              : [...prev, expItem];
          });
          break;

        case 'education':
          const eduItem = editingItem.item as Education;
          setEducation(prev => {
            const index = prev.findIndex(i => i.id === eduItem.id);
            return index >= 0
              ? [...prev.slice(0, index), eduItem, ...prev.slice(index + 1)]
              : [...prev, eduItem];
          });
          break;

        case 'certification':
          const certItem = editingItem.item as Certification;
          setCertifications(prev => {
            const index = prev.findIndex(i => i.id === certItem.id);
            return index >= 0
              ? [...prev.slice(0, index), certItem, ...prev.slice(index + 1)]
              : [...prev, certItem];
          });
          break;
      }

      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (type: 'experience' | 'education' | 'certification', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    switch (type) {
      case 'experience':
        setExperiences(prev => prev.filter(i => i.id !== id));
        break;
      case 'education':
        setEducation(prev => prev.filter(i => i.id !== id));
        break;
      case 'certification':
        setCertifications(prev => prev.filter(i => i.id !== id));
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage CV | Admin</title>
      </Helmet>

      <AdminLayout title="Manage CV">
        <div className="space-y-8">
          {/* Experience Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
              <Button
                onClick={() => handleAddNew('experience')}
                icon={<Plus size={16} />}
              >
                Add Experience
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map(exp => (
                <Card key={exp.id}>
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItem({ type: 'experience', item: exp })}
                        icon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete('experience', exp.id)}
                        icon={<Trash size={14} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
              <Button
                onClick={() => handleAddNew('education')}
                icon={<Plus size={16} />}
              >
                Add Education
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map(edu => (
                <Card key={edu.id}>
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                    <p className="mt-2 text-gray-700">{edu.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItem({ type: 'education', item: edu })}
                        icon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete('education', edu.id)}
                        icon={<Trash size={14} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
              <Button
                onClick={() => handleAddNew('certification')}
                icon={<Plus size={16} />}
              >
                Add Certification
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map(cert => (
                <Card key={cert.id}>
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">
                      Issued: {cert.issueDate}
                      {cert.expiryDate && ` - Expires: ${cert.expiryDate}`}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        View Credential
                      </a>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItem({ type: 'certification', item: cert })}
                        icon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete('certification', cert.id)}
                        icon={<Trash size={14} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {editingItem.item?.id ? 'Edit' : 'Add'} {editingItem.type.charAt(0).toUpperCase() + editingItem.type.slice(1)}
                  </h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {editingItem.type === 'experience' && (
                    <>
                      <Input
                        label="Job Title"
                        name="title"
                        value={(editingItem.item as Experience).title}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Company"
                        name="company"
                        value={(editingItem.item as Experience).company}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Location"
                        name="location"
                        value={(editingItem.item as Experience).location}
                        onChange={handleChange}
                        fullWidth
                      />
                    </>
                  )}

                  {editingItem.type === 'education' && (
                    <>
                      <Input
                        label="Degree"
                        name="degree"
                        value={(editingItem.item as Education).degree}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Institution"
                        name="institution"
                        value={(editingItem.item as Education).institution}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Location"
                        name="location"
                        value={(editingItem.item as Education).location}
                        onChange={handleChange}
                        fullWidth
                      />
                    </>
                  )}

                  {editingItem.type === 'certification' && (
                    <>
                      <Input
                        label="Certification Name"
                        name="name"
                        value={(editingItem.item as Certification).name}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Issuing Organization"
                        name="issuer"
                        value={(editingItem.item as Certification).issuer}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Credential URL"
                        name="credentialUrl"
                        value={(editingItem.item as Certification).credentialUrl}
                        onChange={handleChange}
                        fullWidth
                      />
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      name="startDate"
                      type="date"
                      value={editingItem.item.startDate}
                      onChange={handleChange}
                      fullWidth
                    />
                    {!editingItem.item.current && (
                      <Input
                        label="End Date"
                        name="endDate"
                        type="date"
                        value={editingItem.item.endDate}
                        onChange={handleChange}
                        fullWidth
                      />
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="current"
                      name="current"
                      checked={editingItem.item.current}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="current" className="text-sm text-gray-700">
                      Currently {editingItem.type === 'experience' ? 'working here' : 'studying here'}
                    </label>
                  </div>

                  <TextField
                    label="Description"
                    name="description"
                    value={editingItem.item.description}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    isLoading={isSaving}
                    icon={<Save size={16} />}
                  >
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminCV;