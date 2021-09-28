import { site } from 'data';

import styles from './styles.scss';

const Button = ({ type, caption, onClick }) => (
  <>
    <button
      type={type || 'button'}
      title={caption}
      className={`${site.prefix}-button`}
      onClick={onClick}
    >
      {caption}
    </button>
    <style jsx>{styles}</style>
  </>
);
export default Button;
