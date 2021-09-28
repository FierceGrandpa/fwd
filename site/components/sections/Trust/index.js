import { useState, useEffect } from 'react';
import { Button, Container, Row } from 'components/UI';

import dynamic from 'next/dynamic';

import axios from 'axios';
import styles from './styles.scss';

const MarkCard = dynamic(() => import('./Card'));

const TrustSection = () => {
  const [open, setOpen] = useState(false);
  const [marks, setList] = useState([]);

  const API = (url = 'https://u1487495.plsk.regruhosting.ru/api/marks/') => ({
    fetchAll: () => axios.get(url),
  });

  function refreshList() {
    API().fetchAll()
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    refreshList();
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
            <Button caption={open ? 'Скрыть' : 'Показать все'} onClick={() => setOpen(!open)} />
          </Row>
        </Container>
      </section>
      <style jsx>{styles}</style>
    </>
  );
};
export default TrustSection;
