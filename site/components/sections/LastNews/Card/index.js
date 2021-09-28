import DateTimeHelper from 'helpers/DateTime';

import styles from './styles.scss';

const NewsCard = ({ news }) => {
  return (
    <>
      <div className="news-card" style={{ backgroundImage: `url(${news.imageSrc})` }}>
        <div className="news-card__header">
          <span className="news-card__time">{DateTimeHelper.getFormattedDate(news.date)}</span>
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
}
export default NewsCard;
