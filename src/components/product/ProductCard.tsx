import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import { StyledCard, StyledMedia, StyledPrice } from './ProductCard.styles';
import { Product } from '../../models/Product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <StyledCard onClick={handleCardClick}>
            <StyledMedia image={product.image} title={product.name} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Box>
                    <Typography gutterBottom variant="h5" color="primary">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <StyledPrice variant="h6">{product.price} SAR</StyledPrice>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default ProductCard;
