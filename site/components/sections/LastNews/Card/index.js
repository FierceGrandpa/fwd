import { dateTime } from 'helpers/date-time';

import styles from './styles.scss';

const NewsCard = ({ news }) => (
  <>
    <div className="news-card" style={{ backgroundImage: `url(${news.imageSrc})` }}>
      <div className="news-card__header">
        <span className="news-card__time">{dateTime.getFormattedDate(news.createAt)}</span>
      </div>
      <div className="news-card__content">
        <p className="news-card__title">
          {news.title}
        </p>
        <a className="news-card__link" href={`/articles?page=1#article-${news.id}`}>
          Читать
        </a>
      </div>
    </div>
    <style jsx>{styles}</style>
  </>
);
export default NewsCard;
