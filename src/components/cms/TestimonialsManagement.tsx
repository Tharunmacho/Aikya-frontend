import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Unnamed'}</p>
          {item.role && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {item.role}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'company',
      label: 'Company',
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">⭐</span>
          <span>{value || 0}/5</span>
        </div>
      ),
    },
    {
      key: 'content',
      label: 'Content',
      render: (value: string) => (
        <div className="max-w-xs">
          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
            {value ? value.substring(0, 60) + '...' : '-'}
          </p>
        </div>
      ),
    },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Customer Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter customer name',
    },
    {
      name: 'role',
      label: 'Role/Position',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Homeowner, Business Owner',
    },
    {
      name: 'company',
      label: 'Company/Location',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Aikya Eden Park Resident',
    },
    {
      name: 'content',
      label: 'Testimonial Content',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter the testimonial text',
    },
    {
      name: 'image',
      label: 'Profile Image',
      type: 'image' as const,
      required: false,
      placeholder: 'Upload or enter image URL',
    },
    {
      name: 'rating',
      label: 'Rating (1-5)',
      type: 'number' as const,
      required: true,
      placeholder: '5',
    },
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await cmsItemsAPI.getTestimonials();
      const items = response.data || [];
      setTestimonials(items);
      setFilteredTestimonials(items);
      setStats({
        total: items.length,
        average: items.length > 0 ? (items.reduce((sum: number, t: any) => sum + (t.rating || 0), 0) / items.length).toFixed(1) : 0,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch testimonials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.createTestimonial(data);
      toast({
        title: 'Success',
        description: 'Testimonial created successfully',
      });
      fetchTestimonials();
      setFormOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create testimonial',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingItem?._id) return;
    setLoading(true);
    try {
      await cmsItemsAPI.updateTestimonial(editingItem._id, data);
      toast({
        title: 'Success',
        description: 'Testimonial updated successfully',
      });
      fetchTestimonials();
      setFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update testimonial',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await cmsItemsAPI.deleteTestimonial(id);
      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully',
      });
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete testimonial',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = [...testimonials];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchLower) ||
          item.company?.toLowerCase().includes(searchLower) ||
          item.content?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredTestimonials(filtered);
  };

  return (
    <>
      <CMSTable
        title="Testimonials Management"
        description="Manage customer testimonials and reviews"
        columns={columns}
        data={filteredTestimonials}
        loading={loading}
        onFilterChange={handleFilterChange}
        onEdit={(item) => {
          setEditingItem(item);
          setFormOpen(true);
        }}
        onDelete={handleDelete}
        onCreateNew={() => {
          setEditingItem(null);
          setFormOpen(true);
        }}
        stats={[
          {
            label: 'Total Testimonials',
            value: stats.total || 0,
            color: 'text-blue-400',
          },
          {
            label: 'Average Rating',
            value: `${stats.average || 0} ⭐`,
            color: 'text-yellow-400',
          },
        ]}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingItem(null);
        }}
        title={editingItem ? 'Edit Testimonial' : 'Create New Testimonial'}
        fields={formFields}
        initialData={editingItem || {}}
        onSubmit={editingItem ? handleUpdate : handleCreate}
      />
    </>
  );
};

export default TestimonialsManagement;
