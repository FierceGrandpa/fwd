import { Container, Row } from 'components/UI';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.scss';

const NewsCard = dynamic(() => import('./Card'));

const LastNewsSection = () => {
  const [articles, setList] = useState([]);
  useEffect(() => {
    axios.get('https://localhost:44358/api/articles/')
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <section className="section-primary">
        <Container>
          <Row>
            <div className="section-header light-color">
              <h2 className="section-title">Последние статьи</h2>
              <p className="section-subtitle">собираем самое полезное для вас</p>
            </div>
          </Row>
          <Row>
            <div className="news-grid">
              {articles
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3)
                .map((e) => (
                  <NewsCard key={e.id} news={e} />
                ))}
            </div>
          </Row>
        </Container>
      </section>
      <style jsx>{styles}</style>
    </>
  );
};
export default LastNewsSection;
