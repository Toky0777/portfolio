import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import Input from '../../components/common/Input';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { Save } from 'lucide-react';
import { profileData as initialProfileData } from '../../data/initialData';
import { Profile } from '../../types';

const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({ ...initialProfileData });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // In a real app, this would call an API endpoint
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success!
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile | Admin</title>
      </Helmet>
      
      <AdminLayout title="Edit Profile">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Job Title"
                      name="title"
                      value={profile.title}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  
                  <TextField
                    label="Biography"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    fullWidth
                  />
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Location"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Social Media Links
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="LinkedIn URL"
                      name="socialLinks.linkedin"
                      value={profile.socialLinks.linkedin || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="GitHub URL"
                      name="socialLinks.github"
                      value={profile.socialLinks.github || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Twitter URL"
                      name="socialLinks.twitter"
                      value={profile.socialLinks.twitter || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Instagram URL"
                      name="socialLinks.instagram"
                      value={profile.socialLinks.instagram || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Profile Image
                  </h3>
                  
                  <div className="mb-4">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                  
                  <Input
                    label="Avatar URL"
                    name="avatar"
                    value={profile.avatar}
                    onChange={handleChange}
                    fullWidth
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the URL of your profile image.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Save Changes
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Don't forget to save your changes when you're done editing your profile information.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    icon={<Save size={16} />}
                    className="w-full"
                  >
                    Save Profile
                  </Button>
                  
                  {saveStatus === 'success' && (
                    <p className="mt-2 text-green-600 text-sm">
                      Profile updated successfully!
                    </p>
                  )}
                  
                  {saveStatus === 'error' && (
                    <p className="mt-2 text-red-600 text-sm">
                      Error saving profile. Please try again.
                    </p>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminProfile;