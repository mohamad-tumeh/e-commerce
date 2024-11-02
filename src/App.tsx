import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { createTheme, ThemeProvider } from '@mui/material';
import { CategoryProvider } from './context/CategoryContext ';
import AppRoutes from './routes/AppRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CartProvider>
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
