import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const LeadershipManagement = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [filteredLeaders, setFilteredLeaders] = useState<any[]>([]);
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
          <p className="font-medium">{value || 'Unnamed Leader'}</p>
          {item.title && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {item.title}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'initial',
      label: 'Initial',
      render: (value: string) => (
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {value || 'A'}
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Position',
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
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter leader name',
    },
    {
      name: 'initial',
      label: 'Initial Letter',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., G',
    },
    {
      name: 'title',
      label: 'Position/Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Managing Director',
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter leader bio',
    },
    {
      name: 'image',
      label: 'Profile Image',
      type: 'image' as const,
      required: false,
      placeholder: 'Upload or enter image URL (optional)',
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
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const response = await cmsItemsAPI.getLeaders();
      const items = response.data || [];
      setLeaders(items);
      setFilteredLeaders(items);
      setStats({
        total: items.length,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch leaders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.createLeader(data);
      toast({
        title: 'Success',
        description: 'Leader created successfully',
      });
      fetchLeaders();
      setFormOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create leader',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.updateLeader(id, data);
      toast({
        title: 'Success',
        description: 'Leader updated successfully',
      });
      fetchLeaders();
      setFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update leader',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await cmsItemsAPI.deleteLeader(id);
      toast({
        title: 'Success',
        description: 'Leader deleted successfully',
      });
      fetchLeaders();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete leader',
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

  const handleSubmit = (data: any) => {
    if (editingItem) {
      handleUpdate(editingItem._id, data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="space-y-6">
      <CMSTable
        title="Leadership Team Management"
        description="Manage leadership team members displayed on the homepage"
        columns={columns}
        data={filteredLeaders}
        loading={loading}
        stats={[
          { label: 'Total Leaders', value: stats.total || 0 },
        ]}
        onAdd={() => {
          setEditingItem(null);
          setFormOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search leaders..."
        onSearch={(query) => {
          const filtered = leaders.filter(
            (leader) =>
              leader.name?.toLowerCase().includes(query.toLowerCase()) ||
              leader.title?.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredLeaders(filtered);
        }}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingItem(null);
        }}
        title={editingItem ? 'Edit Leader' : 'Add New Leader'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default LeadershipManagement;
