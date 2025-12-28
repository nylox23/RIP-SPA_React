import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Spinner, Alert, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import {
    fetchCarbonateDetail,
    updateAcidMass,
    updateCarbonateMass,
    removeAcidFromCarbonate,
    submitCarbonateForm,
    deleteCarbonate,
    resetDetail
} from '../slices/carbonateSlice';
import { ROUTES } from '../Routes';
import type { DtoCarbonateAcidResponse } from '../api/Api';

export const CarbonateDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { detail, loading, error } = useSelector((state: RootState) => state.carbonateData);

    const [caco3Mass, setCaco3Mass] = useState<string>('');
    const [acidsState, setAcidsState] = useState<Record<number, string>>({});

    useEffect(() => {
        dispatch(resetDetail());
        if (id) dispatch(fetchCarbonateDetail(Number(id)));
    }, [id, dispatch]);

    useEffect(() => {
        if (detail) {
            setCaco3Mass(detail.mass?.toString() || '');

            const initialAcidsState: Record<number, string> = {};
            detail.acids?.forEach(item => {
                const acidId = item.acid?.ID || item.acid_id || 0;
                if (acidId) {
                    initialAcidsState[acidId] = item.mass?.toString() || '';
                }
            });
            setAcidsState(initialAcidsState);
        }
    }, [detail]);

    const isDraft = (() => {
        if (!detail || !detail.status) return false;

        const statusStr = String(detail.status).toLowerCase().trim();

        return statusStr === 'черновик';
    })();

    const handleUpdateAcidMass = (acidId: number) => {
        const massVal = parseFloat(acidsState[acidId]);
        dispatch(updateAcidMass({ id: acidId, mass: isNaN(massVal) ? 0 : massVal }));
    };

    const handleUpdateCarbonateMass = () => {
        dispatch(updateCarbonateMass(parseFloat(caco3Mass) || 0));
    };

    const handleSubmit = async () => {
        await dispatch(submitCarbonateForm());
        navigate(ROUTES.CARBONATE_LIST);
    };

    const handleDelete = async () => {
        if (id) {
            await dispatch(deleteCarbonate(Number(id)));
            navigate(ROUTES.ACIDS);
        }
    };

    const handleRemoveAcid = (acidId: number) => {
        dispatch(removeAcidFromCarbonate(acidId));
    };

    const onAcidMassChange = (acidId: number, val: string) => {
        setAcidsState(prev => ({ ...prev, [acidId]: val }));
    };

    if (loading && !detail) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (!detail) return <Container className="mt-5 text-center">Заявка не найдена</Container>;

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Заявка №{detail.id} <span className="text-muted fs-6">({detail.status})</span></h2>

                {isDraft && <Button variant="danger" onClick={handleDelete}>Удалить заявку</Button>}
            </div>

            {error && <Alert variant="danger">Ошибка: {error}</Alert>}

            <div className="mb-4 card p-3">
                <Form.Label>Масса CaCO3 (г)</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="number"
                        value={caco3Mass}
                        onChange={e => setCaco3Mass(e.target.value)}
                        disabled={!isDraft}
                    />
                    {isDraft && (
                        <Button variant="primary" onClick={handleUpdateCarbonateMass}>
                            Сохранить массу
                        </Button>
                    )}
                </InputGroup>
            </div>

            <div className="card shadow-sm mb-3">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="table-light">
                    <tr>
                        <th className="text-center">Название</th>
                        <th className="text-center">Изображение</th>
                        <th className="text-center" style={{ minWidth: '200px' }}>Количество (г)</th>
                        <th className="text-center">Объем CO₂ (л)</th>
                        {isDraft && <th className="text-center">Действия</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {detail.acids?.map((item: DtoCarbonateAcidResponse) => {
                        const targetAcidId = item.acid?.ID || item.acid_id || 0;
                        const currentVal = acidsState[targetAcidId] ?? (item.mass?.toString() || '');

                        return (
                            <tr key={item.id}>
                                <td className="text-center">{item.acid?.Name}</td>
                                <td className="text-center">
                                    <img
                                        src={item.acid?.Img}
                                        alt={item.acid?.Name}
                                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                    />
                                </td>
                                <td className="text-center">
                                    <InputGroup size="sm" style={{ maxWidth: '180px', margin: '0 auto' }}>
                                        <Form.Control
                                            type="number"
                                            value={currentVal}
                                            onChange={(e) => onAcidMassChange(targetAcidId, e.target.value)}
                                            disabled={!isDraft}
                                        />
                                        {isDraft && (
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => handleUpdateAcidMass(targetAcidId)}
                                                title="Сохранить количество"
                                            >
                                                💾
                                            </Button>
                                        )}
                                    </InputGroup>
                                </td>
                                <td className="text-center fw-bold">{item.result ? item.result.toFixed(2) : '-'}</td>
                                {isDraft && (
                                    <td className="text-center">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleRemoveAcid(targetAcidId)}
                                        >
                                            Удалить
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                    {(!detail.acids || detail.acids.length === 0) && (
                        <tr>
                            <td colSpan={isDraft ? 5 : 4} className="text-center py-3 text-muted">
                                Список кислот пуст
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            {isDraft && (
                <div className="text-end mb-5">
                    <Button variant="success" size="lg" onClick={handleSubmit}>
                        Сформировать заявку
                    </Button>
                </div>
            )}
        </Container>
    );
};