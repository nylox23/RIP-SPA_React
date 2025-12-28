import type { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes';
import defaultImage from '../assets/default_acid.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addAcidToCarbonate } from '../slices/carbonateSlice';
import type { AppDispatch, RootState } from '../store';

interface Props { id: number; name: string; img: string; }

export const AcidCard: FC<Props> = ({ id, name, img }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleAdd = () => {
        dispatch(addAcidToCarbonate(id));
    };

    return (
        <Card className="h-100">
            <Card.Title className="pt-2">{name}</Card.Title>
            <Card.Img variant="top" src={img || defaultImage} alt={name} />
            <Card.Body className="px-0 pb-0 d-flex flex-column justify-content-end">
                <div className="d-flex justify-content-between mt-3 gap-2">
                    {isAuthenticated && (
                        <Button variant="primary" onClick={handleAdd} className="flex-grow-1">
                            Добавить
                        </Button>
                    )}
                    <Button
                        variant="secondary"
                        onClick={() => navigate(`${ROUTES.ACIDS}/${id}`)}
                        className={isAuthenticated ? "" : "w-100"}
                    >
                        Детали
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};