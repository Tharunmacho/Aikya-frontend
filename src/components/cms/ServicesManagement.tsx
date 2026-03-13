import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const ServicesManagement = () => {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'title',
      label: 'Service Name',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Unnamed Service'}</p>
          {item.description && (
            <p className="text-xs text-slate-500 truncate mt-1">
              {item.description.substring(0, 60)}...
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
      key: 'icon',
      label: 'Icon',
    },
     {
       key: 'image',
       label: 'Image',
       render: (value: string) =>
         value ? (
           <img src={value} alt="Service" className="w-12 h-10 rounded object-cover" />
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
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Service Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter service title',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Service description',
      rows: 5,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Construction, Interior Design',
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'text' as const,
      placeholder: 'Icon name (e.g., Home, Building, Wrench)',
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number' as const,
      required: false,
      placeholder: '1',
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'image' as const,
      placeholder: 'Upload service image',
    },
  ];

  const fetchServices = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await cmsItemsAPI.getServices(filters);
      setServices(response.data);
      setCategories(response.categories || []);
      setStats(response.stats || {});
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load services',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    fetchServices(filters);
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
    await cmsItemsAPI.deleteService(id);
    fetchServices();
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (editingItem) {
      await cmsItemsAPI.updateService(editingItem._id, data);
      toast({ title: 'Success', description: 'Service updated successfully' });
    } else {
      await cmsItemsAPI.createService(data);
      toast({ title: 'Success', description: 'Service created successfully' });
    }
    fetchServices();
  };

  const statsArray = [
    { label: 'Total Services', value: stats.total || 0 },
  ];

  return (
    <>
      <CMSTable
        title="Services"
        description="Manage your services"
        columns={columns}
        data={services}
        filters={filters}
        stats={statsArray}
        categories={categories}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFilterChange={handleFilterChange}
        searchPlaceholder="Search services..."
        loading={loading}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingItem ? 'Edit Service' : 'Create New Service'}
        description={editingItem ? 'Update service details' : 'Add a new service'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    </>
  );
};

export default ServicesManagement;
