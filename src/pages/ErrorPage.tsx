import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
    type: 'unauthorized' | 'notfound';
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type }) => {
    const navigate = useNavigate();
    const isUnauthorized = type === 'unauthorized';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: isUnauthorized ? '#f44336' : '#3f51b5',
                color: '#fff',
                padding: 4,
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                {isUnauthorized ? 'Unauthorized Access' : '404 - Page Not Found'}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {isUnauthorized
                    ? 'You do not have permission to view this page.'
                    : 'The page you are looking for does not exist.'}
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    if (isUnauthorized) {
                        navigate('/signin');
                    } else {
                        navigate('/products'); 
                    }
                }}
            >
                {isUnauthorized ? 'Sign In' : 'Go to Products'}
            </Button>
        </Box>
    );
};

export default ErrorPage;
