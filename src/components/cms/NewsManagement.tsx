import React, { useState, useEffect } from 'react';
import { cmsItemsAPI } from '@/services/api';
import CMSTable from './CMSTable';
import CMSFormDialog from './CMSFormDialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

const NewsManagement = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
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
          {item.excerpt && (
            <p className="text-xs text-slate-500 truncate mt-1">
              {item.excerpt.substring(0, 80)}...
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
          {value || 'Uncategorized'}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const colors: Record<string, string> = {
          published: 'bg-green-500/20 text-green-300 border-green-500/30',
          draft: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        };
        return (
          <Badge className={`capitalize ${colors[value] || 'bg-gray-500/20 text-gray-300'}`}>
            {value || 'Draft'}
          </Badge>
        );
      },
    },
    {
      key: 'author',
      label: 'Author',
    },
    {
      key: 'publishedDate',
      label: 'Date',
      render: (value: string) =>
        value ? format(new Date(value), 'MMM dd, yyyy') : '-',
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
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
      ],
    },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter article title',
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Brief summary of the article',
      rows: 3,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Full article content',
      rows: 8,
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'image' as const,
      placeholder: 'Upload or enter image URL',
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., John Doe',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Mainframe Modernization',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array' as const,
      placeholder: 'Enter tags (one per line or comma-separated)',
      rows: 2,
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date' as const,
      required: false,
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number' as const,
      required: false,
      placeholder: '1',
    },
  ];

  const fetchArticles = async (filters?: any) => {
    try {
      setLoading(true);
      const response = await cmsItemsAPI.getArticles(filters);
      setArticles(response.data);
      setFilteredArticles(response.data);
      setCategories(response.categories || []);
      setStats(response.stats || {});
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load articles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    fetchArticles(filters);
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
    await cmsItemsAPI.deleteArticle(id);
    fetchArticles();
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (editingItem) {
      await cmsItemsAPI.updateArticle(editingItem._id, data);
      toast({ title: 'Success', description: 'Article updated successfully' });
    } else {
      await cmsItemsAPI.createArticle(data);
      toast({ title: 'Success', description: 'Article created successfully' });
    }
    fetchArticles();
  };

  const statsArray = [
    { label: 'Total News', value: stats.total || 0 },
    { label: 'Published', value: stats.published || 0, color: 'bg-green-500/20' },
    { label: 'Drafts', value: stats.draft || 0, color: 'bg-yellow-500/20' },
    { label: 'Categories', value: categories.length, color: 'bg-blue-500/20' },
  ];

  return (
    <>
      <CMSTable
        title="News & Stories"
        description="Manage your news articles and stories"
        columns={columns}
        data={filteredArticles}
        filters={filters}
        stats={statsArray}
        categories={categories}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFilterChange={handleFilterChange}
        searchPlaceholder="Search news..."
        loading={loading}
      />

      <CMSFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingItem ? 'Edit News Article' : 'Create New News Article'}
        description={editingItem ? 'Update news article details' : 'Add a new news article'}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      />
    </>
  );
};

export default NewsManagement;
