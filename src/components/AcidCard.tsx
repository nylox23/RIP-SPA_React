import { FC } from 'react';
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
        <Card className="h-100">
            <Card.Title className="pt-2">{name}</Card.Title>
            <Card.Img
                variant="top"
                src={img || defaultImage}
                alt={name}
            />
            <Card.Body className="px-0 pb-0 d-flex flex-column justify-content-end">
                <div className="d-flex justify-content-between mt-3">
                    {/* <Button variant="primary" disabled> */}
                        {/* Добавить в расчет */}
                    {/* </Button> */}

                    <Button variant="secondary" onClick={() => navigate(`${ROUTES.ACIDS}/${id}`)}>
                        Детали
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};