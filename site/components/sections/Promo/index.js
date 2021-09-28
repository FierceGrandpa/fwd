import { Button, Container, Row } from 'components/UI';

import styles from './styles.scss';

const PromoSection = ({ signUp }) => (
  <>
    <section>
      <Container>
        <Row>
          <div className="promo-content">
            <h1 className="promo-content__header">
              Специализированный
              <br />
              сервис
              <span> обслуживания</span>
              <br />
              и
              <span> ремонта </span>
              Авто
            </h1>
            <p className="promo-content__text">
              Ремонт, обслуживание и тюнинг
              <br />
              машины в одном месте!
            </p>
          </div>
        </Row>
        <Row>
          <Button caption="Записаться" onClick={signUp} />
        </Row>
      </Container>
    </section>
    <style jsx>{styles}</style>
  </>
);

export default PromoSection;
