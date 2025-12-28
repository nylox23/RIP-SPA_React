import { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { updateProfile, getProfile } from '../slices/authSlice';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';

export const ProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({ login: '', password: '' });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) setFormData({ login: user.login || '', password: '' });
        else dispatch(getProfile());
    }, [user, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await dispatch(updateProfile(formData));
        if (updateProfile.fulfilled.match(res)) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    if (!user && loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

    return (
        <Container>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PROFILE }]} />
            <Container style={{ maxWidth: '500px' }}>
                <h2 className="mb-4">Личный кабинет</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Данные обновлены!</Alert>}
                <Form onSubmit={handleSubmit} className="card p-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.login}
                            onChange={e => setFormData({ ...formData, login: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Новый пароль (оставьте пустым, чтобы не менять)</Form.Label>
                        <Form.Control
                            type="password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </Form.Group>
                    <Button type="submit" disabled={loading}>Сохранить</Button>
                </Form>
            </Container>
        </Container>
    );
};