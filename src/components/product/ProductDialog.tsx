import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductForm from './ProductForm';
import { Product } from '../../models/Product';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProduct?: Product; 
}

const ProductDialog: React.FC<ProductDialogProps> = ({ open, onClose, selectedProduct }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedProduct  ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <ProductForm 
          onClose={onClose}
          product={selectedProduct} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
