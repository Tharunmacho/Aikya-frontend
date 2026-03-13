import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const WhyChooseManagement = () => {
  const [reasons, setReasons] = useState<any[]>([]);
  const [filteredReasons, setFilteredReasons] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Untitled Reason'}</p>
          {item.icon && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Icon: {item.icon}
            </p>
          )}
        </div>
      ),
    },
     {
       key: 'image',
       label: 'Image',
       render: (value: string) =>
         value ? (
           <img src={value} alt="Feature" className="w-12 h-10 rounded object-cover" />
         ) : (
           <div className="w-12 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
             <span className="text-xs text-slate-400">No img</span>
           </div>
         ),
     },
    {
      key: 'desc',
      label: 'Description',
      render: (value: string) => (
        <div className="max-w-xs">
          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
            {value ? value.substring(0, 60) + '...' : '-'}
          </p>
        </div>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      render: (value: number) => (
        <Badge className="bg-slate-500/20 text-slate-300">{value || 0}</Badge>
      ),
    },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Rapid Delivery',
    },
    {
      name: 'desc',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter description',
    },
    {
      name: 'icon',
      label: 'Icon Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Clock, Shield, Heart, Star',
      helpText: 'Available icons: Clock, Shield, MessageCircle, Heart, Palette, Star, Award, TrendingUp, Users',
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
       label: 'Feature Image (optional)',
       type: 'image' as const,
       required: false,
       placeholder: 'Upload or enter image URL (optional, in addition to icon)',
     },
  ];

  useEffect(() => {
    fetchReasons();
  }, []);

  const fetchReasons = async () => {
    setLoading(true);
    try {
      const response = await cmsItemsAPI.getWhyChooseReasons();
      const items = response.data || [];
      setReasons(items);
      setFilteredReasons(items);
      setStats({
        total: items.length,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch reasons',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.createWhyChooseReason(data);
      toast({
        title: 'Success',
        description: 'Reason created successfully',
      });
      fetchReasons();
      setFormOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create reason',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.updateWhyChooseReason(id, data);
      toast({
        title: 'Success',
        description: 'Reason updated successfully',
      });
      fetchReasons();
      setFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update reason',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await cmsItemsAPI.deleteWhyChooseReason(id);
      toast({
        title: 'Success',
        description: 'Reason deleted successfully',
      });
      fetchReasons();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete reason',
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
    let filtered = [...reasons];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (reason) =>
          reason.title?.toLowerCase().includes(searchLower) ||
          reason.desc?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredReasons(filtered);
  };

  return (
    <div className="space-y-6">
      <CMSTable
        title="Why Choose Us Management"
        description="Manage reasons why customers should choose Aikya"
        columns={columns}
        data={filteredReasons}
        loading={loading}
        stats={[
          { label: 'Total Reasons', value: stats.total || 0 },
        ]}
        onCreateNew={() => {
          setEditingItem(null);
          setFormOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search reasons..."
        onFilterChange={handleFilterChange}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingItem(null);
        }}
        title={editingItem ? 'Edit Reason' : 'Add New Reason'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default WhyChooseManagement;
