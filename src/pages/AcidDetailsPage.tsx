import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Spinner, Card } from 'react-bootstrap';
import type { Acid } from '../modules/types';
import { getAcidById } from '../modules/api';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import defaultImage from '../assets/default_acid.jpg';

export const AcidDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [acid, setAcid] = useState<Acid | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getAcidById(id).then(data => {
                setAcid(data);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" style={{ color: '#004976' }} />
            </Container>
        );
    }

    if (!acid) {
        return (
            <Container className="mt-5 text-center">
                <h3>Кислота не найдена</h3>
            </Container>
        );
    }

    return (
        <Container>
            <BreadCrumbs crumbs={[
                { label: ROUTE_LABELS.ACIDS, path: ROUTES.ACIDS },
                { label: acid.Name }
            ]} />

            <Card className="mx-auto" style={{ maxWidth: '800px' }}>
                <Card.Body>
                    <h2 className="mb-3">{acid.Name} - {acid.NameExt}</h2>

                    <div className="text-center mb-4">
                        <Image
                            src={acid.Img || defaultImage}
                            fluid
                            rounded
                            style={{ maxHeight: '400px' }}
                        />
                    </div>

                    <Card.Text style={{ fontSize: '1.1rem' }}>
                        {acid.Info}
                    </Card.Text>

                    <hr />

                    <div className="mb-2" style={{ color: '#004976', fontWeight: 'bold' }}>
                        Количество ионов H⁺: {acid.Hplus}
                    </div>
                    <div>
                        <strong>Молярная масса: </strong> {acid.MolarMass} г/моль
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};