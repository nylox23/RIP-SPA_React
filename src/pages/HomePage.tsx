import type { FC } from "react";
import { Container, Carousel } from "react-bootstrap";

export const HomePage: FC = () => {
    return (
        <Container className="p-5 mb-4 bg-light rounded-3">
            <h1>Калькулятор Карбонатов</h1>
            <p className="lead">
                Это приложение позволяет просматривать информацию о различных кислотах,
                узнавать их молярную массу и количество ионов водорода и проводить расчет
                количества газа, выделяющегося при взаимодействии CaCO3 с ними (WIP)
            </p>
            <hr className="my-4" />
            {/* Карусель с текстом */}
            <Carousel variant="dark" interval={4000} className="text-center">

                <Carousel.Item>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        <div>
                            <h3>Использование системы</h3>
                            <p>1. Перейдите к списку кислот<br />
                                2. При желании — перейдите к детальному описанию реагентов, содержащему молярную массу и количество ионов H<br />
                                3. Добавьте нужные вам кислоты в заявку<br />
                                4. Нажмите кнопку "Рассчитать", чтобы перейти к заявке</p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        <div>
                            <h3>Возможности</h3>
                            <p>1. Просмотр списка кислот<br />
                                2. Фильтрация кислот по названию<br />
                                3. Детальная информация по каждой кислоте<br />
                                4. Создание заявок на расчет полученного газа (WIP)</p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        <div>
                            <h3>Приятного использования!</h3>
                        </div>
                    </div>
                </Carousel.Item>

            </Carousel>
        </Container>
    );
};