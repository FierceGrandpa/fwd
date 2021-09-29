import { Container, Row } from 'components/UI';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Api } from 'helpers/Api';
import styles from './styles.scss';

const NewsCard = dynamic(() => import('./Card'));

const LastNewsSection = () => {
  const [articles, setList] = useState([]);
  const api = new Api('news');
  useEffect(() => {
    api.getAll().then((res) => { setList(res); });
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
                .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
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
