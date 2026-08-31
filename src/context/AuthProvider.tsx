import {useState} from 'react';
import type {ReactNode} from 'react';
import {AuthContext} from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return Boolean(localStorage.getItem('staffflow_token'));
    });

    const login = (token: string) => {
        localStorage.setItem('staffflow_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('staffflow_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};