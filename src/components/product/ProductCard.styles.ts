import { styled } from '@mui/system';
import { Card, CardMedia, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    minHeight: 345,
    cursor: 'pointer',
    margin: '1rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    },
}));

export const StyledMedia = styled(CardMedia)(({ theme }) => ({
    height: 180,
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    borderRadius: '12px 12px 0 0',
}));

export const StyledPrice = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginTop: '1rem',
    color: theme.palette.success.main,
}));
