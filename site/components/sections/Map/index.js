import { Container, Row } from 'components/UI';

import styles from './styles.scss';

const MapSection = () => (
  <>
    <section>
      <div className="map-wrapper">
        <Container>
          <Row>
            <div className="section-header float-header dark-bg">
              <h2 className="section-title">Как нас найти?</h2>
              <p className="section-subtitle">ул Кондратенко д. 3, литер С</p>
            </div>
          </Row>
        </Container>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A4158fa72ad3521eb66408ac719d561c3eecacea2425361eef1d9adcaee3cf97d&amp;source=constructor"
          width={1280}
          height={720}
        />
      </div>
    </section>
    <style jsx>{styles}</style>
  </>
);
export default MapSection;
