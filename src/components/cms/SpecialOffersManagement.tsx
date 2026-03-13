import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const SpecialOffersManagement = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<any[]>([]);
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
          <p className="font-medium truncate">{value || 'Untitled'}</p>
          {item.location && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              📍 {item.location}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: string) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          {value || '-'}
        </span>
      ),
    },
    {
      key: 'discount',
      label: 'Discount',
      render: (value: string) =>
        value ? (
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            {value}
          </Badge>
        ) : (
          '-'
        ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const colors: Record<string, string> = {
          active: 'bg-green-500/20 text-green-300 border-green-500/30',
          expired: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
          upcoming: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        };
        return (
          <Badge className={`capitalize ${colors[value] || colors.active}`}>
            {value || 'Active'}
          </Badge>
        );
      },
    },
     {
       key: 'image',
       label: 'Image',
       render: (value: string) =>
         value ? (
           <img src={value} alt="Offer" className="w-12 h-10 rounded object-cover" />
         ) : (
           <div className="w-12 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
             <span className="text-xs text-slate-400">No img</span>
           </div>
         ),
     },
  ];

  const filters = [
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'expired', label: 'Expired' },
      ],
    },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Offer Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter offer title',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Enter offer description',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., ₹45 Lakhs onwards',
    },
    {
      name: 'discount',
      label: 'Discount',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., Up to 20% off',
    },
    {
      name: 'features',
      label: 'Features (one per line)',
      type: 'array' as const,
      required: false,
      placeholder: 'Enter features, one per line',
    },
    {
      name: 'image',
      label: 'Offer Image',
      type: 'image' as const,
      required: false,
      placeholder: 'Upload or enter image URL',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Chennai, Bangalore',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'expired', label: 'Expired' },
      ],
    },
    {
      name: 'contactPhone',
      label: 'Contact Phone',
      type: 'text' as const,
      required: false,
      placeholder: '+91 1234567890',
    },
    {
      name: 'contactEmail',
      label: 'Contact Email',
      type: 'text' as const,
      required: false,
      placeholder: 'contact@example.com',
    },
    {
      name: 'validUntil',
      label: 'Valid Until Date',
      type: 'date' as const,
      required: false,
      placeholder: 'Select expiry date',
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number' as const,
      required: false,
      placeholder: '0',
    },
  ];

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await cmsItemsAPI.getSpecialOffers();
      const items = response.data || [];
      setOffers(items);
      setFilteredOffers(items);
      
      const activeCount = items.filter((o: any) => o.status === 'active').length;
      setStats({
        total: items.length,
        active: activeCount,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to fetch special offers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await cmsItemsAPI.createSpecialOffer(data);
      toast({
        title: 'Success',
        description: 'Special offer created successfully',
      });
      fetchOffers();
      setFormOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create special offer',
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
      await cmsItemsAPI.updateSpecialOffer(editingItem._id, data);
      toast({
        title: 'Success',
        description: 'Special offer updated successfully',
      });
      fetchOffers();
      setFormOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update special offer',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await cmsItemsAPI.deleteSpecialOffer(id);
      toast({
        title: 'Success',
        description: 'Special offer deleted successfully',
      });
      fetchOffers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete special offer',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = [...offers];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchLower) ||
          item.location?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((item) => item.status === filters.status);
    }

    setFilteredOffers(filtered);
  };

  return (
    <>
      <CMSTable
        title="Special Offers Management"
        description="Manage promotional offers and deals"
        columns={columns}
        data={filteredOffers}
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
            label: 'Total Offers',
            value: stats.total || 0,
            color: 'text-blue-400',
          },
          {
            label: 'Active Offers',
            value: stats.active || 0,
            color: 'text-green-400',
          },
        ]}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingItem(null);
        }}
        title={editingItem ? 'Edit Special Offer' : 'Create New Special Offer'}
        fields={formFields}
        initialData={editingItem || {}}
        onSubmit={editingItem ? handleUpdate : handleCreate}
      />
    </>
  );
};

export default SpecialOffersManagement;
