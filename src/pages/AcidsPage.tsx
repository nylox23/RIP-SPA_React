import { FC, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Acid, CarbonateInfo } from '../modules/types';
import { getAcids, getCurrentCarbonate } from '../modules/api';
import { AcidCard } from '../components/AcidCard';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';

export const AcidsPage: FC = () => {
    const navigate = useNavigate();
    const [acids, setAcids] = useState<Acid[]>([]);
    const [carbonateInfo, setCarbonateInfo] = useState<CarbonateInfo | null>(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async (searchTerm: string) => {
        setLoading(true);
        const [acidsData, carbonateData] = await Promise.all([
            getAcids(searchTerm),
            getCurrentCarbonate()
        ]);

        setAcids(acidsData);
        setCarbonateInfo(carbonateData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData('');
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData(search);
    };

    const isCalcActive = carbonateInfo && carbonateInfo.AcidCount > 0;

    return (
        <Container>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.ACIDS }]} />

            <div className="top-row-container">
                <Button className="calc-button-style" disabled={!isCalcActive} onClick={() => isCalcActive && navigate(`/carbonate/${carbonateInfo?.CarbonateID}`)}>
                    🧪 Рассчитать{isCalcActive && (<span className="indicator">{carbonateInfo?.AcidCount}</span>)}
                </Button>

                <Form className="flex-grow-1" onSubmit={handleSearchSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Найти кислоту..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>
            </div>

            {loading ? (
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
                                        name={acid.Name}
                                        img={acid.Img}
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