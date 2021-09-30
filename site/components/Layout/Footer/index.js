import Image from 'next/image';
import Link from 'next/link';

import {
  Button, Container, Logo, Row,
} from 'components/UI';

import { site } from 'data';

import styles from './styles.scss';

const { prefix } = site;

const Footer = ({ signUp }) => (
  <>
    <footer className={`${prefix}-footer`}>
      <Container>
        <Row>
          <Logo />
          <div className={`${prefix}-footer__widget`}>
            <nav className={`${prefix}-footer-nav`} >
              <ul className={`${prefix}-footer-nav__list`}>
                {site.links.map((link) => (
                  <li className={`${prefix}-footer-nav__item`} key={link.id} title={link.caption}>
                    <Link href={link.href} >
                      <span className={`${prefix}-footer-nav__link`}>
                        {link.caption}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className={`${prefix}-footer__text`}>
              <span className={`${prefix}-footer__text--accent`}>СТО «Полный привод» </span>
              – мы знаем о машинах всё.
              <br />
              Ремонт, техническое обслуживание и тюнинг автомобилей.
            </p>
            <small className={`${prefix}-footer__text ${prefix}-footer__text--accent`}>
              © 2021 СТО «Полный привод»
              <span>.</span>
              {' '}
              <br className="only-mobile" />
              Все права защищены.
            </small>
          </div>
          <div className={`${prefix}-footer__widget`}>
            <ul className="social-icons">
              <li className="social-icon" title="vk">
                <a href="https://vk.com/" target="_blank" rel="noreferrer">
                  <Image src="/img/icons/vk.png" width={38} height={24} />
                </a>
              </li>
              <li className="social-icon" title="instagram">
                <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                  <Image src="/img/icons/instagram.png" width={32} height={32} />
                </a>
              </li>
            </ul>
          </div>
          <div className={`${prefix}-footer__widget`}>
            <Button caption="Записаться" onClick={signUp} />
            <small className="developer-info">
              Сайт создан
              <br />
              <span> andstudio.ru & <a style={{ color: '#fff' }} href="https://vk.com/lu.perfect" target="_blank" rel="noreferrer">lu.perfect</a> </span>
            </small>
          </div>
        </Row>
      </Container>
    </footer>
    <style jsx>{styles}</style>
  </>
);

export default Footer;
