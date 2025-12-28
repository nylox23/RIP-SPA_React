import type { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes';
import defaultImage from '../assets/default_acid.jpg';

interface Props {
    id: number;
    name: string;
    img: string;
}

export const AcidCard: FC<Props> = ({ id, name, img }) => {
    const navigate = useNavigate();

    return (
        <Card className="h-100 shadow-sm acid-card-hover">
            <Card.Img
                variant="top"
                src={img || defaultImage}
                alt={name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>
                <div className="mt-auto pt-3 d-flex justify-content-end">
                    <Button
                        variant="outline-primary"
                        onClick={() => navigate(`${ROUTES.ACIDS}/${id}`)}
                    >
                        Детали
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};