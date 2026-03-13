import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Calendar,
  BarChart3,
  Eye
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface Filter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

interface CMSTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: any[];
  filters?: Filter[];
  stats?: { label: string; value: number; color?: string }[];
  categories?: string[];
  onCreateNew?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => Promise<void>;
  onView?: (item: any) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  searchPlaceholder?: string;
  loading?: boolean;
}

const CMSTable: React.FC<CMSTableProps> = ({
  title,
  description,
  columns,
  data,
  filters = [],
  stats = [],
  categories = [],
  onCreateNew,
  onEdit,
  onDelete,
  onView,
  onFilterChange,
  searchPlaceholder = 'Search...',
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize filter values with defaults only once
    const defaults: Record<string, string> = {};
    filters.forEach(filter => {
      defaults[filter.key] = filter.defaultValue || 'all';
    });
    setFilterValues(defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);
    // Notify parent immediately when filter changes
    if (onFilterChange) {
      onFilterChange({ ...newFilters, search: searchQuery });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Notify parent immediately when search changes
    if (onFilterChange) {
      onFilterChange({ ...filterValues, search: query });
    }
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete || !onDelete) return;

    try {
      await onDelete(itemToDelete._id);
      toast({
        title: 'Deleted successfully',
        description: 'The item has been deleted.',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete item',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      published: 'bg-green-500',
      draft: 'bg-yellow-500',
      active: 'bg-green-500',
      inactive: 'bg-gray-500',
      ongoing: 'bg-blue-500',
      completed: 'bg-green-500',
      upcoming: 'bg-purple-500',
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {description}
            </p>
          )}
          {onEdit && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 italic">
              💡 Click on any row to edit
            </p>
          )}
        </div>
        {onCreateNew && (
          <Button onClick={onCreateNew} className="w-full sm:w-auto gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
            <Plus size={18} />
            Create New
          </Button>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} className="text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Filters
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-full sm:min-w-[220px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Dynamic Filters */}
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={filterValues[filter.key] || 'all'}
              onValueChange={(value) => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-medium">{data.length}</span> of{' '}
          <span className="font-medium">{data.length}</span> items
          {categories.length > 0 && (
            <>
              {' • Categories: '}
              <span className="font-medium">{categories.length}</span>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-8 text-center text-slate-600 dark:text-slate-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-8 text-center text-slate-600 dark:text-slate-500"
                  >
                    No items found
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={item._id || idx}
                    onClick={() => onEdit && onEdit(item)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer group"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100"
                      >
                        {column.render
                          ? column.render(item[column.key], item)
                          : item[column.key] || '-'}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onView(item);
                            }}
                            className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="View"
                          >
                            <Eye size={16} />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(item);
                            }}
                            className="h-8 w-8 p-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(item);
                            }}
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full ${
                    stat.color || 'bg-blue-500/20'
                  } flex items-center justify-center`}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Distribution */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Category Distribution
          </h3>
          <div className="space-y-3">
            {categories.map((category, idx) => {
              const count = data.filter(
                (item) => item.category === category
              ).length;
              const percentage = ((count / data.length) * 100).toFixed(1);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300">{category}</span>
                    <span className="text-slate-600 dark:text-slate-500">{count}</span>
                    <span className="text-slate-500 dark:text-slate-400">{percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CMSTable;
