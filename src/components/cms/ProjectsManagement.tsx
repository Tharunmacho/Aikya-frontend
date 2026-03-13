import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'name',
      label: 'Project Name',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Unnamed Project'}</p>
          {item.location && (
            <p className="text-xs text-slate-500 mt-1">{item.location}</p>
          )}
          {item.area && item.area !== 'none' && (
            <p className="text-xs text-blue-500 dark:text-blue-400 mt-0.5">
              📍 {item.area}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <Badge className="capitalize bg-blue-500/20 text-blue-300 border-blue-500/30">
          {value || 'General'}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const colors: Record<string, string> = {
          ongoing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          completed: 'bg-green-500/20 text-green-300 border-green-500/30',
          upcoming: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        };
        return (
          <Badge className={`capitalize ${colors[value] || 'bg-gray-500/20 text-gray-300'}`}>
            {value || 'Ongoing'}
          </Badge>
        );
      },
    },
    {
      key: 'type',
      label: 'Type',
    },
     {
       key: 'image',
       label: 'Image',
       render: (value: string) =>
         value ? (
           <img src={value} alt="Project" className="w-12 h-10 rounded object-cover" />
         ) : (
           <div className="w-12 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
             <span className="text-xs text-slate-400">No img</span>
           </div>
         ),
     },
  ];

  const filters = [
    {
      key: 'category',
      label: 'All Categories',
      options: [
        { value: 'all', label: 'All Categories' },
        ...categories.map(cat => ({ value: cat, label: cat })),
      ],
    },
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
        { value: 'upcoming', label: 'Upcoming' },
      ],
    },
    {
      key: 'location',
      label: 'All Locations',
      options: [
        { value: 'all', label: 'All Locations' },
        ...locations.map(loc => ({ value: loc, label: loc })),
      ],
    },
    {
      key: 'area',
      label: 'Chennai Area',
      options: [
        { value: 'all', label: 'All Areas' },
        { value: 'tambaram', label: 'Tambaram' },
        { value: 'perugalathur', label: 'Perugalathur' },
        { value: 'hastinapuram', label: 'Hastinapuram' },
        { value: 'gudavancherry', label: 'Gudavancherry' },
        { value: 'chithlapakam', label: 'Chithlapakam' },
      ],
    },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Project Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter project name',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Chennai, Tamil Nadu',
    },
    {
      name: 'area',
      label: 'Chennai Area',
      type: 'select' as const,
      required: false,
      options: [
        { value: 'none', label: 'No specific area' },
        { value: 'tambaram', label: 'Tambaram' },
        { value: 'perugalathur', label: 'Perugalathur' },
        { value: 'hastinapuram', label: 'Hastinapuram' },
        { value: 'gudavancherry', label: 'Gudavancherry' },
        { value: 'chithlapakam', label: 'Chithlapakam' },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Project description',
      rows: 5,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'plots', label: 'Plots' },
      ],
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'villa', label: 'Villa' },
        { value: 'independent house', label: 'Independent House' },
        { value: 'commercial space', label: 'Commercial Space' },
        { value: 'plots', label: 'Plots' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
        { value: 'upcoming', label: 'Upcoming' },
      ],
    },
    {
      name: 'image',
      label: 'Main Image',
      type: 'image' as const,
      placeholder: 'Upload project image',
    },
    {
      name: 'amenities',
      label: 'Amenities',
      type: 'array' as const,
      placeholder: 'Enter amenities (one per line)',
      rows: 4,
    },
  ];

  const fetchProjects = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await cmsItemsAPI.getProjects(filters);
      setProjects(response.data);
      setCategories(response.categories || []);
      setLocations(response.locations || []);
      setStats(response.stats || {});
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    fetchProjects(filters);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await cmsItemsAPI.deleteProject(id);
    fetchProjects();
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (editingItem) {
      await cmsItemsAPI.updateProject(editingItem._id, data);
      toast({ title: 'Success', description: 'Project updated successfully' });
    } else {
      await cmsItemsAPI.createProject(data);
      toast({ title: 'Success', description: 'Project created successfully' });
    }
    fetchProjects();
  };

  const statsArray = [
    { label: 'Total Projects', value: stats.total || 0 },
    { label: 'Ongoing', value: stats.ongoing || 0, color: 'bg-blue-500/20' },
    { label: 'Completed', value: stats.completed || 0, color: 'bg-green-500/20' },
    { label: 'Upcoming', value: stats.upcoming || 0, color: 'bg-purple-500/20' },
    { label: 'Chennai', value: stats.chennai || 0, color: 'bg-orange-500/20' },
    { label: 'With Area', value: stats.withArea || 0, color: 'bg-teal-500/20' },
  ];

  return (
    <>
      <CMSTable
        title="Projects"
        description="Manage your projects"
        columns={columns}
        data={projects}
        filters={filters}
        stats={statsArray}
        categories={categories}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFilterChange={handleFilterChange}
        searchPlaceholder="Search projects..."
        loading={loading}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingItem ? 'Edit Project' : 'Create New Project'}
        description={editingItem ? 'Update project details' : 'Add a new project'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    </>
  );
};

export default ProjectsManagement;
