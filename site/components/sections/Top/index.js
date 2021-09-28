import { Button, Container, Row } from 'components/UI';

import styles from './styles.scss';

const TopSection = ({ title, description, img, signUp }) => (
  <>
    <section style={{ backgroundImage: `url(img/bg/${img}.webp)` }}>
      <Container>
        <Row isHalf>
          <div className="top-section_left">
            <h1 className="top-section_left__header">
              {title}
            </h1>
            <p className="top-section_left__text">
              {description}
            </p>
          </div>
          <div className="top-section_right">
            <Button caption="Записаться" onClick={signUp} />
          </div>
        </Row>
      </Container>
    </section>
    <style jsx>{styles}</style>
  </>
);

export default TopSection;
