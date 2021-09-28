import Link from 'next/link';

import { site } from 'data';

import styles from './styles.scss';

const SiteLogo = () => (
  <>
    <Link href="/">
      <div className={`${site.prefix}-logo`} title="Полный Привод">
        <span>Полный</span>
        <span>Привод</span>
      </div>
    </Link>
    <style jsx>{styles}</style>
  </>
);
export default SiteLogo;
