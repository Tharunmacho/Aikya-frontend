import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

const EventsManagement = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const columns = [
    {
      key: 'title',
      label: 'Event Title',
      render: (value: string, item: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{value || 'Untitled Event'}</p>
          {item.location && (
            <p className="text-xs text-slate-500 mt-1">{item.location}</p>
          )}
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (value: string) =>
        value ? format(new Date(value), 'MMM dd, yyyy') : '-',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const colors: Record<string, string> = {
          upcoming: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          ongoing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          completed: 'bg-green-500/20 text-green-300 border-green-500/30',
        };
        return (
          <Badge className={`capitalize ${colors[value] || 'bg-gray-500/20 text-gray-300'}`}>
            {value || 'Upcoming'}
          </Badge>
        );
      },
    },
  ];

  const filters = [
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
      ],
    },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Event Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter event name',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Event description',
      rows: 5,
    },
    {
      name: 'date',
      label: 'Event Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'time',
      label: 'Time',
      type: 'text' as const,
      placeholder: 'e.g., 10:00 AM - 5:00 PM',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'Event venue',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
      ],
    },
    {
      name: 'image',
      label: 'Event Image',
      type: 'image' as const,
      placeholder: 'Upload event image',
    },
    {
      name: 'registrationLink',
      label: 'Registration Link',
      type: 'text' as const,
      placeholder: 'https://...',
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number' as const,
      required: false,
      placeholder: '1',
    },
  ];

  const fetchEvents = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await cmsItemsAPI.getEvents(filters);
      setEvents(response.data);
      setStats(response.stats || {});
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    fetchEvents(filters);
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
    await cmsItemsAPI.deleteEvent(id);
    fetchEvents();
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (editingItem) {
      await cmsItemsAPI.updateEvent(editingItem._id, data);
      toast({ title: 'Success', description: 'Event updated successfully' });
    } else {
      await cmsItemsAPI.createEvent(data);
      toast({ title: 'Success', description: 'Event created successfully' });
    }
    fetchEvents();
  };

  const statsArray = [
    { label: 'Total Events', value: stats.total || 0 },
    { label: 'Upcoming', value: stats.upcoming || 0, color: 'bg-purple-500/20' },
    { label: 'Completed', value: stats.completed || 0, color: 'bg-green-500/20' },
  ];

  return (
    <>
      <CMSTable
        title="Events"
        description="Manage your events and activities"
        columns={columns}
        data={events}
        filters={filters}
        stats={statsArray}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFilterChange={handleFilterChange}
        searchPlaceholder="Search events..."
        loading={loading}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingItem ? 'Edit Event' : 'Create New Event'}
        description={editingItem ? 'Update event details' : 'Add a new event'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    </>
  );
};

export default EventsManagement;
