import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (category: { id?: string; name: string; image: string }) => void;
  initialData?: { id?: string; name: string; image?: string } | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  useEffect(() => {
    setName(initialData?.name || '');
    setImagePreview(initialData?.image || null);
  }, [initialData]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);
  
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory = {
      id: initialData?.id,
      name,
      image: imagePreview || '',
    };
    onSubmit(newCategory);
    onClose();
  }, [initialData, name, imagePreview, onSubmit, onClose]);
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{initialData ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', maxWidth: '200px', marginBottom: '10px', borderRadius: '8px' }}
              />
            ) : (
              <p style={{ color: '#888' }}>No image selected</p>
            )}
            <input
              accept="image/*"
              id="upload-category-image"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-category-image">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Save Changes' : 'Add Category'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryForm;
