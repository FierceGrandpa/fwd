import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container, Logo } from 'components/UI';

import { site } from 'data';

import styles from './styles.scss';

const { prefix, links, contacts } = site;

const Header = () => {
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`${prefix}-header`}>
        <div className={`${prefix}-header-row`}>
          <Container>
            <Logo />
            <div
              className={`${prefix}-header__burger${open ? ` ${prefix}-header__burger--active` : ''}`}
              onClick={() => setOpen(!open)}
            >
              <span />
            </div>
            <div className={`${prefix}-header__separator`} />
            <nav className={`${prefix}-header-nav${open ? ` ${prefix}-header-nav--active` : ''}`} >
              <ul className={`${prefix}-header-nav__list`}>
                {links.map((link) => (
                  <li className={`${prefix}-header-nav__item`} key={link.id} title={link.caption}>
                    <Link href={link.href}>
                      <span
                        className={`${prefix}-header-nav__link${asPath === link.href ? ` ${prefix}-header-nav__link--active` : ''}`}
                      >
                        {link.caption}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`${prefix}-header__phone`} title={contacts.phone}>
              <span>
                <Link href={`tel:${contacts.phone}`}>{contacts.phone}</Link>
              </span>
            </div>
          </Container>
        </div>
      </header>
      <style jsx>{styles}</style>
    </>
  );
};

export default Header;
