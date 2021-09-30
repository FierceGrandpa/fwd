import { useState, useEffect } from 'react';

import { dateTime } from 'helpers/date-time';

import { Button } from 'components/UI';

import styles from './styles.scss';

const NewsCard = ({ news, isOpen }) => {
  const [mounded, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  });
  useEffect(() => {
    if (mounded) {
      setOpen(isOpen);
    }
  }, [isOpen]);
  const {
    id, imageSrc, createAt, title, content,
  } = news;
  return (
    <div id={`article-${id}`} className="card-wrapper">
      <div className="news-card">
        <div className="news-card__header" style={{ backgroundImage: `url(${imageSrc})` }}>
          <span className="news-card__time">
            {dateTime.getFormattedDate(createAt)}
          </span>
          <h2 className="news-card__title">
            {(title)}
          </h2>
        </div>
        <div className="news-card__content">
          <div className={`news-card__text${open ? ' opened' : ''}`}>
            <p>
              <div dangerouslySetInnerHTML={{
                __html: content,
              }} />
            </p>
          </div>
          <Button caption={open ? 'Скрыть' : 'Подробнее'} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};
export default NewsCard;
