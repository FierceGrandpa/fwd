import { Main } from 'components/UI';

import styles from 'styles/main.scss';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));

const Layout = ({ children, signUp }) => (
  <>
    <Header />

    <Main>{children}</Main>

    <Footer signUp={signUp} />

    <style jsx>{styles}</style>
    <style jsx global>
      {`
        #__next {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        
          position: relative;
          overflow: hidden;
        }
      `}
    </style>
  </>
);

export default Layout;
