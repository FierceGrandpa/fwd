import { useState, useEffect } from 'react';
import { Button, Container, Row } from 'components/UI';

import dynamic from 'next/dynamic';

import { Api } from 'helpers/Api';
import styles from './styles.scss';

const MarkCard = dynamic(() => import('./Card'));

const TrustSection = () => {
  const [open, setOpen] = useState(false);
  const [marks, setList] = useState([]);
  const api = new Api('marks');
  useEffect(() => {
    api.getAll().then((res) => { setList(res); });
  });

  return (
    <>
      <section className="section-primary dark-bg">
        <Container>
          <Row>
            <div className="section-header light-color">
              <h2 className="section-title">Работаем со всеми</h2>
              <p className="section-subtitle">популярными моделями автомобилей</p>
            </div>
          </Row>
          <Row>
            <div className={`trust-grid${open ? ' open' : ''}`}>
              {marks.map((mark) => (
                <MarkCard key={mark.id} mark={mark} open={open} />
              ))}
            </div>
          </Row>
          <Row>
            <div style={{
              transform: 'margin-top 0.2s easy',
              marginTop: open ? '50px' : 0,
            }}>
              <Button caption={open ? 'Скрыть' : 'Показать все'} onClick={() => setOpen(!open)} />
            </div>
          </Row>
        </Container>
      </section>
      <style jsx>{styles}</style>
    </>
  );
};
export default TrustSection;
