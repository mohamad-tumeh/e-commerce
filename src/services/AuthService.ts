import { User } from '../models/User';

const API_URL = 'http://localhost:3001/users';

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
};

export const createUser = async (email: string, password: string): Promise<User> => {
    const newUser = { email, password, role: 'user' };
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return await response.json();
};
