import React, { useState, useRef, useCallback } from 'react';
import { Button, Box } from '@mui/material';
import { SketchPicker } from 'react-color';
import DeleteIcon from '@mui/icons-material/Delete';

interface ColorPickerProps {
  colors: string[];
  setColors: (colors: string[]) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, setColors }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>('');
  const addColorButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleAddColor = useCallback(() => {
    if (currentColor && !colors.includes(currentColor)) {
      const updatedColors = [...colors, currentColor];
      setColors(updatedColors); 
      setCurrentColor('');
      setColorPickerVisible(false);
      addColorButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentColor, colors, setColors]);
  
  const handleRemoveColor = useCallback((colorToRemove: string) => {
    const updatedColors = colors.filter(color => color !== colorToRemove);
    setColors(updatedColors);
  }, [colors, setColors]);
  
  return (
    <Box sx={{ margin: '20px 0' }}>
      <Button variant="contained" onClick={() => setColorPickerVisible(!colorPickerVisible)}>
        {colorPickerVisible ? 'Hide Color Picker' : 'Choose Colors'}
      </Button>
      {colorPickerVisible && (
        <Box sx={{ marginTop: '10px' }}>
          <SketchPicker
            color={currentColor}
            onChangeComplete={(color) => setCurrentColor(color.hex)}
          />
          <Button
            ref={addColorButtonRef}
            variant="outlined"
            onClick={handleAddColor}
            sx={{ marginTop: '10px' }}
          >
            Add Color
          </Button>
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {colors.map((color) => (
          <Box
            key={color}
            sx={{
              position: 'relative',
              width: '30px',
              height: '30px',
              backgroundColor: color,
              borderRadius: '4px',
              border: '1px solid #ccc',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <DeleteIcon
              sx={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: 'white',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveColor(color);
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ColorPicker;
