import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const CareersManagement = () => {
  const [positions, setPositions] = useState<any[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'title',
      label: 'Position',
       render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Untitled Position'}</p>
          {item.location && (
            <p className="text-xs text-slate-500 mt-1">{item.location}</p>
          )}
        </div>
      ),
    },
     {
       key: 'image',
       label: 'Image',
       render: (value: string) =>
         value ? (
           <img src={value} alt="Job" className="w-12 h-10 rounded object-cover" />
         ) : (
           <div className="w-12 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
             <span className="text-xs text-slate-400">No img</span>
           </div>
         ),
     },
    {
      key: 'department',
      label: 'Department',
      render: (value: string) => (
        <Badge className="capitalize bg-blue-500/20 text-blue-300 border-blue-500/30">
          {value || 'General'}
        </Badge>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <Badge className="capitalize bg-amber-500/20 text-amber-300 border-amber-500/30">
          {value || 'Full-time'}
        </Badge>
      ),
    },
    {
      key: 'experience',
      label: 'Experience',
    },
  ];

  const filters = [
    {
      key: 'department',
      label: 'All Departments',
      options: [
        { value: 'all', label: 'All Departments' },
        ...departments.map(dept => ({ value: dept, label: dept })),
      ],
    },
    {
      key: 'type',
      label: 'All Types',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'full-time', label: 'Full-time' },
        { value: 'part-time', label: 'Part-time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' },
      ],
    },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Job Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Senior Software Engineer',
    },
    {
      name: 'description',
      label: 'Job Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe the role',
      rows: 5,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Engineering, Sales, Marketing',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'e.g., Chennai, Remote',
    },
    {
      name: 'type',
      label: 'Employment Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'full-time', label: 'Full-time' },
        { value: 'part-time', label: 'Part-time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' },
      ],
    },
    {
      name: 'experience',
      label: 'Experience Required',
      type: 'text' as const,
      placeholder: 'e.g., 3-5 years',
    },
    {
      name: 'salary',
      label: 'Salary Range',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., ₹5L - ₹8L per annum',
    },
    {
      name: 'requirements',
      label: 'Requirements',
      type: 'array' as const,
      placeholder: 'Enter requirements (one per line)',
      rows: 5,
    },
    {
      name: 'responsibilities',
      label: 'Responsibilities',
      type: 'array' as const,
      placeholder: 'Enter responsibilities (one per line)',
      rows: 5,
    },
    {
      name: 'benefits',
      label: 'Benefits',
      type: 'array' as const,
      placeholder: 'Enter benefits (one per line)',
      rows: 3,
    },
    {
      name: 'applyLink',
      label: 'Apply Link',
      type: 'text' as const,
      placeholder: 'Application form URL',
    },
     {
       name: 'image',
       label: 'Job / Department Image',
       type: 'image' as const,
       required: false,
       placeholder: 'Upload or enter image URL',
     },
  ];

  const fetchPositions = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await cmsItemsAPI.getPositions(filters);
      setPositions(response.data);
      setDepartments(response.departments || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load positions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    fetchPositions(filters);
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
    await cmsItemsAPI.deletePosition(id);
    fetchPositions();
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (editingItem) {
      await cmsItemsAPI.updatePosition(editingItem._id, data);
      toast({ title: 'Success', description: 'Position updated successfully' });
    } else {
      await cmsItemsAPI.createPosition(data);
      toast({ title: 'Success', description: 'Position created successfully' });
    }
    fetchPositions();
  };

  const statsArray = [
    { label: 'Open Positions', value: positions.length },
  ];

  return (
    <>
      <CMSTable
        title="Career Positions"
        description="Manage job openings and career opportunities"
        columns={columns}
        data={positions}
        filters={filters}
        stats={statsArray}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFilterChange={handleFilterChange}
        searchPlaceholder="Search positions..."
        loading={loading}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingItem ? 'Edit Position' : 'Create New Position'}
        description={editingItem ? 'Update job details' : 'Add a new job opening'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    </>
  );
};

export default CareersManagement;
