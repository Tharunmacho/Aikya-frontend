import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const FooterManagement = () => {
  const [footerItems, setFooterItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <Badge className="capitalize bg-purple-500/20 text-purple-300 border-purple-500/30">
          {value || 'Info'}
        </Badge>
      ),
    },
    {
      key: 'label',
      label: 'Label',
    },
    {
      key: 'value',
      label: 'Value',
      render: (value: string) => (
        <div className="max-w-xs truncate">
          {value || '-'}
        </div>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      render: (value: number) => (
        <span className="text-slate-500 dark:text-slate-400">#{value || 0}</span>
      ),
    },
  ];

  const filters = [
    {
      key: 'type',
      label: 'All Types',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'phone', label: 'Phone Numbers' },
        { value: 'email', label: 'Email' },
        { value: 'address', label: 'Address' },
        { value: 'social', label: 'Social Media' },
        { value: 'link', label: 'Quick Links' },
      ],
    },
  ];

  const formFields = [
    {
      name: 'type',
      label: 'Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'phone', label: 'Phone Number' },
        { value: 'email', label: 'Email Address' },
        { value: 'address', label: 'Physical Address' },
        { value: 'social', label: 'Social Media Link' },
        { value: 'link', label: 'Quick Link' },
      ],
    },
    {
      name: 'label',
      label: 'Label/Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Main Office, Facebook, Customer Support',
    },
    {
      name: 'value',
      label: 'Value/URL',
      type: 'text' as const,
      required: true,
      placeholder: 'Phone number, email, URL, or address',
    },
    {
      name: 'icon',
      label: 'Icon Name (optional)',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., phone, email, facebook, twitter',
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
    fetchFooterItems();
  }, []);

  const fetchFooterItems = async () => {
    setLoading(true);
    try {
      const response = await cmsItemsAPI.getFooterItems();
      const items = response.data || [];
      setFooterItems(items);
      setFilteredItems(items);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch footer items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.createFooterItem(data);
      toast({
        title: 'Success',
        description: 'Footer item created successfully',
      });
      fetchFooterItems();
      setFormOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create footer item',
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
      await cmsItemsAPI.updateFooterItem(editingItem._id, data);
      toast({
        title: 'Success',
        description: 'Footer item updated successfully',
      });
      fetchFooterItems();
      setFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update footer item',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await cmsItemsAPI.deleteFooterItem(id);
      toast({
        title: 'Success',
        description: 'Footer item deleted successfully',
      });
      fetchFooterItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete footer item',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = [...footerItems];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.label?.toLowerCase().includes(searchLower) ||
          item.value?.toLowerCase().includes(searchLower) ||
          item.type?.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    setFilteredItems(filtered);
  };

  return (
    <>
      <CMSTable
        title="Footer Management"
        description="Manage footer contact information, social links, and quick links"
        columns={columns}
        data={filteredItems}
        filters={filters}
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
            label: 'Total Items',
            value: footerItems.length || 0,
            color: 'text-blue-400',
          },
          {
            label: 'Contact Info',
            value: footerItems.filter(i => ['phone', 'email', 'address'].includes(i.type)).length || 0,
            color: 'text-green-400',
          },
          {
            label: 'Social Links',
            value: footerItems.filter(i => i.type === 'social').length || 0,
            color: 'text-purple-400',
          },
        ]}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingItem(null);
        }}
        title={editingItem ? 'Edit Footer Item' : 'Create New Footer Item'}
        fields={formFields}
        initialData={editingItem || {}}
        onSubmit={editingItem ? handleUpdate : handleCreate}
      />
    </>
  );
};

export default FooterManagement;
