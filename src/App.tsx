import {useState} from 'react';
import {ThemeProvider} from 'styled-components';
import original from 'react95/dist/themes/original';

import {GlobalStyles} from './styles/GlobalStyles';
import {Desktop} from './components/layout/Desktop';
import {Taskbar} from './components/layout/Taskbar';
import {LoginModal} from './components/auth/LoginModal';
import {DepartmentWindow} from './components/department/DepartmentWindow';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';

function MainLayout() {
    const {isAuthenticated, logout, login} = useAuth();

    // UI states окон
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isDeptWindowOpen, setIsDeptWindowOpen] = useState(false);

    const handleLogout = () => {
        setIsDeptWindowOpen(false);
        setIsStartOpen(false);
        logout();
    };

    const handleLoginSuccess = (token: string) => {
        login(token);
    };

    return (
        <>
            <GlobalStyles/>

            {!isAuthenticated && (
                <LoginModal onSuccess={handleLoginSuccess}/>
            )}

            <Desktop
                onOpenDept={() => setIsDeptWindowOpen(true)}
                onClick={() => setIsStartOpen(false)}
            >
                {isAuthenticated && isDeptWindowOpen && (
                    <DepartmentWindow onClose={() => setIsDeptWindowOpen(false)}/>
                )}
            </Desktop>

            <Taskbar
                isStartOpen={isStartOpen}
                setIsStartOpen={setIsStartOpen}
                isDeptOpen={isDeptWindowOpen}
                onToggleDept={() => setIsDeptWindowOpen((prev) => !prev)}
                onLogout={handleLogout}
            />
        </>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={original}>
            <AuthProvider>
                <MainLayout/>
            </AuthProvider>
        </ThemeProvider>
    );
}