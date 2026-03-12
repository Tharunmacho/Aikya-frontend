import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const CSRManagement = () => {
  const [initiatives, setInitiatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'title',
      label: 'Initiative Title',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Untitled Initiative'}</p>
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
      key: 'date',
      label: 'Date',
    },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Initiative Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter initiative name',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe the CSR initiative',
      rows: 5,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text' as const,
      placeholder: 'e.g., Education, Healthcare, Environment',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'e.g., Chennai, Tirunelveli',
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date' as const,
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'image' as const,
      placeholder: 'Upload initiative image',
    },
    {
      name: 'impact',
      label: 'Impact Metrics',
      type: 'textarea' as const,
      placeholder: 'e.g., 500+ families helped, 1000+ trees planted',
      rows: 3,
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number' as const,
      required: false,
      placeholder: '1',
    },
  ];

  const fetchInitiatives = async () => {
    try {
      setLoading(true);
      const response = await cmsItemsAPI.getInitiatives();
      setInitiatives(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load CSR initiatives',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await cmsItemsAPI.deleteInitiative(id);
    fetchInitiatives();
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (editingItem) {
      await cmsItemsAPI.updateInitiative(editingItem._id, data);
      toast({ title: 'Success', description: 'Initiative updated successfully' });
    } else {
      await cmsItemsAPI.createInitiative(data);
      toast({ title: 'Success', description: 'Initiative created successfully' });
    }
    fetchInitiatives();
  };

  const statsArray = [
    { label: 'Total Initiatives', value: initiatives.length },
  ];

  return (
    <>
      <CMSTable
        title="CSR Initiatives"
        description="Manage Corporate Social Responsibility activities"
        columns={columns}
        data={initiatives}
        stats={statsArray}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search CSR initiatives..."
        loading={loading}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingItem ? 'Edit CSR Initiative' : 'Create New CSR Initiative'}
        description={editingItem ? 'Update initiative details' : 'Add a new CSR initiative'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    </>
  );
};

export default CSRManagement;
