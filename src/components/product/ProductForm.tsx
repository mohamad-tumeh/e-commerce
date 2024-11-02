import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import { useProductContext } from '../../context/ProductContext';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { useCategoryContext } from '../../context/CategoryContext ';
import ColorPicker from '../ColorPicker';

interface ProductFormProps {
  onClose: () => void;
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, product }) => {
  const { addProduct, updateProduct, deleteProduct } = useProductContext();
  const { fetchCategories } = useCategoryContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.categoryId.toString() || '');
  const [colors, setColors] = useState<string[]>(product?.colors || []);
  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const [validationError, setValidationError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();

    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCategoryId(product.categoryId.toString());
      setColors(product.colors || []);
      setSizes(product.sizes || []);
      setImagePreview(product.image);
    }
  }, [product]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  

  const sizeArray = useMemo(() => sizes.map(s => s.trim()), [sizes]);


  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!name || !description || !price || !categoryId || colors.length === 0 || sizeArray.length === 0) {
      setValidationError('All fields are required, and at least one color and size must be provided.');
      setSnackbarOpen(true);
      return;
    }
  
    const newProduct: Product = {
      id: product?.id || Math.random().toString(),
      name,
      description,
      price: parseFloat(price),
      image: imagePreview || '',
      categoryId,
      colors,
      sizes: sizeArray,
    };
  
    setValidationError('');
  
    if (product) {
      await updateProduct(newProduct);
    } else {
      await addProduct(newProduct);
    }
  
    onClose();
  }, [name, description, price, categoryId, colors, sizeArray]);
  
  const handleDelete = async () => {
    if (product) {
      await deleteProduct(product.id);
      onClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {validationError}
          </Alert>
        </Snackbar>
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxWidth: '200px', marginBottom: '10px', borderRadius: '8px' }} />
          ) : (
            <p style={{ color: '#888' }}>No image selected</p>
          )}
          <input
            accept="image/*"
            id="upload-image"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ColorPicker
          colors={colors}
          setColors={setColors}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Sizes (comma separated)"
          value={sizes.join(', ')}
          onChange={(e) => setSizes(e.target.value.split(',').map(s => s.trim()))}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            {product ? 'Save Changes' : 'Add Product'}
          </Button>
          {product && (
            <Button onClick={handleDelete} variant="contained" color="secondary">
              Delete
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProductForm;
