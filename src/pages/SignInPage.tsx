import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        marginTop: '2rem',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: '1rem',
    },
    submit: {
        margin: '1rem 0',
    },
});

const SignInPage: React.FC = () => {
    const classes = useStyles();
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email, password); 
        const role = localStorage.getItem('userRole');
        console.log("role",role)
        if (role === 'admin') {
            navigate('/dashboard');
        } else {
            navigate('/products');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <Box className={classes.box}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                Don't have an account?{' '}
                                <Link href="/signup" variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </Container>
    );
};

export default SignInPage;