import { site } from 'data';

import styles from './styles.scss';

const Main = ({ children, ...rest }) => (
  <>
    <main className={`${site.prefix}-main`} {...rest}>
      { children }
    </main>
    <style jsx>{styles}</style>
  </>
);

export default Main;
