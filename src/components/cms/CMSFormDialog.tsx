import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { uploadAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2 } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'image' | 'date' | 'number' | 'array';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

interface CMSFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
}

const CMSFormDialog: React.FC<CMSFormDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  fields,
  initialData,
  onSubmit,
  submitLabel = 'Save',
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageKey, setImageKey] = useState(0); // Force image re-render
  const fileInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});
  const initializedRef = React.useRef(false); // Track if form has been initialized
  const { toast } = useToast();

  useEffect(() => {
    // Initialize form data when dialog opens or initialData changes
    if (open) {
      if (initialData) {
        // Process initialData to ensure proper format
        const processedData: Record<string, any> = {};
        fields.forEach(field => {
          const value = initialData[field.name];
          
          // Handle different field types
          if (field.type === 'array') {
            processedData[field.name] = Array.isArray(value) ? value : (value ? [value] : []);
          } else if (field.type === 'select') {
            // Ensure select fields have valid values (handle undefined/null)
            processedData[field.name] = value !== undefined && value !== null ? String(value) : '';
          } else {
            processedData[field.name] = value !== undefined && value !== null ? value : '';
          }
        });
        setFormData(processedData);
        console.log('📝 Form initialized with data:', processedData);
      } else {
        // Initialize empty form
        const emptyForm: Record<string, any> = {};
        fields.forEach(field => {
          emptyForm[field.name] = field.type === 'array' ? [] : '';
        });
        setFormData(emptyForm);
        console.log('📝 Form initialized empty');
      }
      initializedRef.current = true;
    }
    
    // Reset when dialog closes
    if (!open) {
      initializedRef.current = false;
      setFormData({});
    }
  }, [open, initialData, fields]);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string) => {
    // Split by newline or comma
    const items = value.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [name]: items }));
  };

  const handleImageUpload = async (name: string, file: File) => {
    try {
      setUploading(true);
      
      // Get old image URL if this is an update (from current formData, not initialData)
      const oldImageUrl = formData[name];
      
      console.log('🔄 Uploading image:', file.name);
      console.log('🗑️ Will replace:', oldImageUrl);
      
      // Upload new image
      const response = await uploadAPI.uploadSingle(file);
      
      if (response.success) {
        const newImageUrl = response.data.url;
        console.log('✅ New image URL:', newImageUrl);
        
        // Clean up old image if it exists and it's not a placeholder
        if (oldImageUrl && !oldImageUrl.includes('unsplash.com') && !oldImageUrl.includes('placeholder')) {
          try {
            await uploadAPI.deleteImage(oldImageUrl);
            console.log('🗑️ Old image removed');
          } catch (error) {
            console.warn('⚠️ Could not delete old image:', error);
          }
        }
        
        // Update form data with new image URL and force re-render
        setImageKey(prev => prev + 1);
        setFormData(prev => {
          const updated = { ...prev, [name]: newImageUrl };
          console.log('📝 Form data updated:', updated);
          return updated;
        });
        
        // Clear the file input
        if (fileInputRefs.current[name]) {
          fileInputRefs.current[name]!.value = '';
        }
        
        toast({
          title: 'Image uploaded',
          description: 'New image uploaded successfully',
        });
      }
    } catch (error: any) {
      console.error('❌ Upload error:', error);
      toast({
        title: 'Upload failed', 
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast({
        title: 'Validation Error',
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="mt-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="mt-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(val) => handleInputChange(field.name, val)}
          >
            <SelectTrigger className="mt-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'image':
        const currentImageUrl = formData[field.name] || '';
        console.log(`🔍 Rendering image field, current URL:`, currentImageUrl);
        return (
          <div className="mt-2 space-y-3">
            {currentImageUrl && (
              <div className="relative inline-block">
                <img
                  src={currentImageUrl}
                  alt="Preview"
                  key={`${field.name}-${imageKey}-${currentImageUrl}`}
                  className="w-32 h-32 object-cover rounded-lg border"
                  onLoad={() => console.log('🖼️ Image loaded:', currentImageUrl)}
                  onError={(e) => {
                    console.warn('❌ Image load error:', currentImageUrl);
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23ddd" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, [field.name]: '' }));
                    setImageKey(prev => prev + 1);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                ref={(el) => (fileInputRefs.current[field.name] = el)}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('📁 File selected:', file.name, '- Size:', file.size, 'bytes');
                    handleImageUpload(field.name, file);
                  }
                }}
                disabled={uploading}
                className="flex-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {uploading && <Loader2 size={20} className="animate-spin" />}
            </div>
            <Input
              type="text"
              value={currentImageUrl}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, [field.name]: e.target.value }));
                setImageKey(prev => prev + 1);
              }}
              placeholder="Or enter image URL (https://... or /api/images/...)"
              className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        );

      case 'array':
        return (
          <Textarea
            value={Array.isArray(value) ? value.join('\n') : ''}
            onChange={(e) => handleArrayChange(field.name, e.target.value)}
            placeholder={field.placeholder || 'Enter items (one per line or comma-separated)'}
            rows={field.rows || 4}
            className="mt-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">{title}</DialogTitle>
          {description && <DialogDescription className="text-slate-600 dark:text-slate-400">{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.type === 'textarea' || field.type === 'array' || field.type === 'image' ? 'md:col-span-2' : ''}
              >
                <Label htmlFor={field.name} className="text-slate-700 dark:text-slate-300">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderField(field)}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting || uploading} className="bg-amber-500 hover:bg-amber-600 text-slate-900">
              {submitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CMSFormDialog;
