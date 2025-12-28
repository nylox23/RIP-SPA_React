import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { loginUser } from '../slices/authSlice';
import { ROUTES } from '../Routes';

export const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({ login: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(res)) {
            navigate(ROUTES.ACIDS);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Вход в систему</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="card p-4">
                <Form.Group className="mb-3">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.login}
                        onChange={e => setFormData({...formData, login: e.target.value})}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Войти'}
                </Button>
                <div className="mt-3 text-center">
                    Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
                </div>
            </Form>
        </Container>
    );
};