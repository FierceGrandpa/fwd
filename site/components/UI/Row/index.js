import { site } from 'data';

import styles from './styles.scss';

const Row = ({ children, isHalf }) => (
  <>
    <div className={`${site.prefix}-row${isHalf ? ` ${site.prefix}-row--half` : ''}`}>
      {children}
    </div>
    <style jsx>{styles}</style>
  </>
);
export default Row;
