import React, { useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]); 

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    E-Commerce
                </Typography>
                <Button color="inherit" component={Link} to="/products">
                    Products
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                    Cart
                </Button>
                {isAuthenticated() ? (
                    <>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>

                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/signin">
                            Sign In
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </>

                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
