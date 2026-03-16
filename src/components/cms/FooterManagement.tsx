import React, { useState, useEffect } from 'react';
import { cmsAPI, cmsItemsAPI, uploadAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { getImageUrl } from '@/utils/getImageUrl';

const FooterManagement = () => {
  const [footerItems, setFooterItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingLogo, setSavingLogo] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [footerConfig, setFooterConfig] = useState({ logo: '' });
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
    fetchFooterConfig();
    fetchFooterItems();
  }, []);

  const fetchFooterConfig = async () => {
    try {
      const response = await cmsAPI.getFooter();
      const data = response?.data || {};
      setFooterConfig({
        logo: data.logo || '',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch footer branding',
        variant: 'destructive',
      });
    }
  };

  const handleLogoUpload = async (file: File) => {
    setUploadingLogo(true);
    try {
      const response = await uploadAPI.uploadSingle(file);
      const uploadedUrl = response?.data?.url;

      if (!uploadedUrl) {
        throw new Error('Upload succeeded but no URL returned');
      }

      setFooterConfig((prev) => ({ ...prev, logo: uploadedUrl }));
      toast({
        title: 'Logo uploaded',
        description: 'Logo uploaded to bucket successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.response?.data?.message || error.message || 'Failed to upload logo',
        variant: 'destructive',
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const saveFooterLogo = async () => {
    setSavingLogo(true);
    try {
      const footerResponse = await cmsAPI.getFooter();
      const existingFooter = footerResponse?.data || {};

      await cmsAPI.updateFooter({
        ...existingFooter,
        logo: footerConfig.logo,
      });

      toast({
        title: 'Success',
        description: 'Footer logo saved to database',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save footer logo',
        variant: 'destructive',
      });
    } finally {
      setSavingLogo(false);
    }
  };

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
      <div className="mb-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-5 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Brand Logo</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Upload logo to bucket and save URL in footer CMS data.</p>
        </div>

        {footerConfig.logo ? (
          <img
            src={getImageUrl(footerConfig.logo)}
            alt="Footer logo"
            className="h-20 w-auto object-contain rounded-md border border-slate-200 dark:border-slate-700 p-2 bg-white"
          />
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            value={footerConfig.logo}
            onChange={(e) => setFooterConfig((prev) => ({ ...prev, logo: e.target.value }))}
            placeholder="Paste logo URL or upload below"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleLogoUpload(file);
              }
            }}
            disabled={uploadingLogo}
          />
        </div>

        <Button
          onClick={saveFooterLogo}
          disabled={savingLogo || uploadingLogo || !footerConfig.logo}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {savingLogo ? 'Saving...' : 'Save Logo to DB'}
        </Button>
      </div>

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
