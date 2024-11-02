import React from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  Chip,
} from '@mui/material';
import { Product } from '../../models/Product';

interface ProductDetailProps {
  product: Product | null;
  selectedColor: string;
  selectedSize: string;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onAddToCart: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  selectedColor,
  selectedSize,
  onSelectColor,
  onSelectSize,
  quantity,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <Card>
      <CardMedia component="img" height="300" image={product?.image} alt={product?.name} />
      <CardContent>
        <Typography variant="h5">{product?.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product?.description}</Typography>
        <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold', mt: '1rem' }}>
          {product?.price} SAR
        </Typography>

        {product?.colors && product?.colors.length > 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: '1rem' }}>Available Colors:</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              {product?.colors.map((color) => (
                <Box
                  key={color}
                  sx={{
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: selectedColor === color ? '2px solid black' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectColor(color)}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Display available sizes */}
        {product?.sizes && product?.sizes.length > 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: '1rem' }}>Available Sizes:</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              {product.sizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  variant={selectedSize === size ? 'filled' : 'outlined'}
                  onClick={() => onSelectSize(size)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <Button
            variant="contained"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            sx={{ marginRight: '8px' }}
          >
            -
          </Button>
          <Typography variant="body1">{quantity}</Typography>
          <Button
            variant="contained"
            onClick={() => onQuantityChange(quantity + 1)}
            sx={{ marginLeft: '8px' }}
          >
            +
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={onAddToCart}
          sx={{ mt: 2 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
