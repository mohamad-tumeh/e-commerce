import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface CategoryProps {
  id: number;
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ name, image }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 'auto', textAlign: 'center', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={image || "https://via.placeholder.com/300"}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
