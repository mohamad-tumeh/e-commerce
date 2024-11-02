import React from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface FilterProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  minPrice: string;
  onMinPriceChange: (price: string) => void;
  maxPrice: string;
  onMaxPriceChange: (price: string) => void;
  categories: { id: string; name: string }[];
}

const Filters: React.FC<FilterProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  categories,
}) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      fullWidth
    />
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        label="Category"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Min Price"
      variant="outlined"
      type="number"
      value={minPrice}
      onChange={(e) => onMinPriceChange(e.target.value)}
      fullWidth
    />
    <TextField
      label="Max Price"
      variant="outlined"
      type="number"
      value={maxPrice}
      onChange={(e) => onMaxPriceChange(e.target.value)}
      fullWidth
    />
  </Box>
);

export default Filters;
