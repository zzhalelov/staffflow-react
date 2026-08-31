import React, {useState} from 'react';
import {Window, WindowHeader, WindowContent, Button, TextInput, Frame} from 'react95';
import {Computer} from '@react95/icons';
import {apiClient} from '../../api/client';

interface LoginModalProps {
    onSuccess: (token: string) => void;
    onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({onSuccess}) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await apiClient.post<{ token: string }>('/api/auth/login', {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('staffflow_token', token);
            onSuccess(token);
        } catch {
            setError('Неверное имя пользователя или пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,128,128, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20000,
            }}
        >
            <Window style={{width: 350}}>
                <WindowHeader style={{display: 'flex', alignItems: 'center', gap: 6}}>
                    <Computer variant="16x16_4"/>
                    <span>Вход в систему StaffFlow</span>
                </WindowHeader>
                <WindowContent>
                    <form onSubmit={handleLogin}>
                        <p style={{marginBottom: 15, fontSize: 13}}>
                            Введите учетные данные для доступа к сети:
                        </p>

                        <div style={{marginBottom: 10}}>
                            <label style={{display: 'block', marginBottom: 4, fontSize: 12}}>
                                Имя пользователя:
                            </label>
                            <TextInput
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                            />
                        </div>

                        <div style={{marginBottom: 15}}>
                            <label style={{display: 'block', marginBottom: 4, fontSize: 12}}>
                                Пароль:
                            </label>
                            <TextInput
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                        </div>

                        {error && (
                            <Frame
                                variant="well"
                                style={{padding: 6, color: 'red', marginBottom: 15, fontSize: 12}}
                            >
                                {error}
                            </Frame>
                        )}

                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                            <Button type="submit" primary disabled={loading}>
                                {loading ? 'Вход...' : 'ОК'}
                            </Button>
                        </div>
                    </form>
                </WindowContent>
            </Window>
        </div>
    );
};