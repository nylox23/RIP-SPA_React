import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { registerUser, clearError } from '../slices/authSlice';
import { ROUTES } from '../Routes';

export const RegisterPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Пароли не совпадают');
            return;
        }

        if (formData.password.length < 6) {
            setPasswordError('Пароль должен быть не менее 6 символов');
            return;
        }

        const res = await dispatch(registerUser({
            login: formData.login,
            password: formData.password
        }));

        if (registerUser.fulfilled.match(res)) {
            navigate(ROUTES.LOGIN);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Регистрация</h2>

            {(error || passwordError) && (
                <Alert variant="danger">
                    {passwordError || error}
                </Alert>
            )}

            <Form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <Form.Group className="mb-3">
                    <Form.Label>Придумайте логин</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.login}
                        onChange={e => setFormData({...formData, login: e.target.value})}
                        required
                        minLength={3}
                        maxLength={25}
                        placeholder="Логин"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        required
                        minLength={6}
                        placeholder="Минимум 6 символов"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                        placeholder="Повтор пароля"
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Зарегистрироваться'}
                </Button>

                <div className="text-center">
                    Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
                </div>
            </Form>
        </Container>
    );
};