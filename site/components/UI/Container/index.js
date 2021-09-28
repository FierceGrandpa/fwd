import { site } from 'data';

import styles from './styles.scss';

const Container = ({ children, ...rest }) => (
  <div className={`${site.prefix}-container`} {...rest}>
    { children }
    <style jsx>{styles}</style>
  </div>
);

export default Container;
