import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const LocationCardsManagement = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'name',
      label: 'Location Name',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Unnamed Location'}</p>
          {item.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {item.description.substring(0, 50)}...
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'projectCount',
      label: 'Projects',
      render: (value: number) => (
        <Badge className="bg-blue-500/20 text-blue-300">
          {value || 0} Projects
        </Badge>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      render: (value: number) => (
        <Badge className="bg-slate-500/20 text-slate-300">{value || 0}</Badge>
      ),
    },
     {
       key: 'image',
       label: 'Image',
       render: (value: string) =>
         value ? (
           <img src={value} alt="Location" className="w-12 h-10 rounded object-cover" />
         ) : (
           <div className="w-12 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
             <span className="text-xs text-slate-400">No img</span>
           </div>
         ),
     },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Location Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., CHENNAI',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'e.g., Explore our premium projects in Chennai',
    },
    {
      name: 'image',
      label: 'Location Image',
      type: 'image' as const,
      required: true,
      placeholder: 'Upload location image',
    },
    {
      name: 'projectCount',
      label: 'Number of Projects',
      type: 'number' as const,
      required: false,
      placeholder: '0',
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number' as const,
      required: false,
      placeholder: '1',
    },
  ];

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await cmsItemsAPI.getLocationCards();
      const items = response.data || [];
      setLocations(items);
      setFilteredLocations(items);
      setStats({
        total: items.length,
        totalProjects: items.reduce((sum: number, loc: any) => sum + (loc.projectCount || 0), 0),
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch locations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.createLocationCard(data);
      toast({
        title: 'Success',
        description: 'Location created successfully',
      });
      fetchLocations();
      setFormOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create location',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.updateLocationCard(id, data);
      toast({
        title: 'Success',
        description: 'Location updated successfully',
      });
      fetchLocations();
      setFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update location',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await cmsItemsAPI.deleteLocationCard(id);
      toast({
        title: 'Success',
        description: 'Location deleted successfully',
      });
      fetchLocations();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete location',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingItem) {
      await handleUpdate(editingItem._id, data);
    } else {
      await handleCreate(data);
    }
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = [...locations];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (location) =>
          location.name?.toLowerCase().includes(searchLower) ||
          location.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredLocations(filtered);
  };

  return (
    <div className="space-y-6">
      <CMSTable
        title="Location Cards Management"
        description="Manage location showcase cards on the homepage"
        columns={columns}
        data={filteredLocations}
        loading={loading}
        stats={[
          { label: 'Total Locations', value: stats.total || 0 },
          { label: 'Total Projects', value: stats.totalProjects || 0 },
        ]}
        onCreateNew={() => {
          setEditingItem(null);
          setFormOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search locations..."
        onFilterChange={handleFilterChange}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingItem(null);
        }}
        title={editingItem ? 'Edit Location' : 'Add New Location'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default LocationCardsManagement;
