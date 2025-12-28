import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AcidCard } from '../components/AcidCard';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import './AcidsPage.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    useAcidsList,
    useSearchTerm,
    setSearchTermAction
} from '../slices/acidsSlice';
import { UseAcidsData } from '../hooks/useAcidsData';
import type { RootState } from '../store';

export const AcidsPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const acids = useAcidsList();
    const reduxSearch = useSearchTerm();
    const [localSearch, setLocalSearch] = useState(reduxSearch);
    const { loading: acidsLoading } = UseAcidsData();

    const { currentCarbonateId, currentAcidCount } = useSelector((state: RootState) => state.carbonateData);

    useEffect(() => {
        setLocalSearch(reduxSearch);
    }, [reduxSearch]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setSearchTermAction(localSearch));
    };

    const isCalcActive = !!currentCarbonateId;

    return (
        <Container>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.ACIDS }]} />

            <div className="top-row-container">
                <Button
                    variant="primary"
                    className="position-relative text-nowrap"
                    disabled={!isCalcActive}
                    onClick={() => isCalcActive && navigate(`${ROUTES.CARBONATE_DETAIL}/${currentCarbonateId}`)}
                    style={{ minWidth: '140px' }}
                >
                    🧪 Рассчитать
                    {currentAcidCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {currentAcidCount}
                        </span>
                    )}
                </Button>

                <Form className="flex-grow-1" onSubmit={handleSearchSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Найти кислоту..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                </Form>
            </div>

            {acidsLoading ? (
                <div className="d-flex justify-content-center p-5">
                    <Spinner animation="border" style={{ color: '#004976' }} />
                </div>
            ) : (
                <>
                    {acids.length === 0 ? (
                        <p className="text-center text-muted">Ничего не найдено.</p>
                    ) : (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {acids.map((acid) => (
                                <Col key={acid.ID}>
                                    <AcidCard
                                        id={acid.ID}
                                        name={acid.Name || ''}
                                        img={acid.Img || ''}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
};