import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const SignUpPage: React.FC = () => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { signUp } = useAuth()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signUp(email, password);
        navigate('/signin');
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <Box className={classes.box}>
                <Typography component="h1" variant="h5">
                    Create an account
                </Typography>
                <Box component="form" onSubmit={handleSignUp}>
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
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                Already have an account?{' '}
                                <Link href="/signin" variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Log in.
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpPage;
