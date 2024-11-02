import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { User } from '../models/User';
import { createUser, fetchUsers } from '../services/AuthService';

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAdmin: () => boolean;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedRole = localStorage.getItem('userRole') as 'user' | 'admin';
        
        if (storedEmail && (storedRole === 'user' || storedRole === 'admin')) {
            setUser({ email: storedEmail, role: storedRole, id: 0, password: '' });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const users = await fetchUsers();
            const foundUser = users.find((u) => u.email === email && u.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('userEmail', foundUser.email);
                localStorage.setItem('userRole', foundUser.role); 
            } else {
                console.error("Invalid email or password.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const createdUser = await createUser(email, password);
            setUser(createdUser);
            localStorage.setItem('userEmail', createdUser.email);
            localStorage.setItem('userRole', createdUser.role);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
    };

    const isAdmin = () => localStorage.getItem('userRole') === 'admin';
    const isAuthenticated = () => !!localStorage.getItem('userEmail');

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, isAdmin, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
