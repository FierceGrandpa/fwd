import { useState, useEffect } from 'react';

import { Button } from 'components/UI';

import styles from './styles.scss';

const ServiceCard = ({ service, signUp, isOpen }) => {
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
    id, title, description, offers, height, width, alt, imageSrc
  } = service;
  return (
    <div id={`service-${id}`} className="card-wrapper">
      <div className="service-card">
        <div className="service-card__header" style={{ backgroundImage: `url(${imageSrc})` }} title={title}>
          <h2 className="service-card__title">
            {title}
          </h2>
        </div>
        <div className="service-card__content">
          <p className="service-card__description" dangerouslySetInnerHTML={{ __html: description }} />
          <ul className={`service-card__items-list${open ? ' service-card__items-list--opened' : ''}`}>
            {offers.map((item) => (
              <li className="service-card__item" key={item.id}>
                <h3 className="service-card__item-name">
                  {item.name}
                </h3>
                <div className="service-card__item_right">
                  <span className="service-card__item-price">
                    от
                    {' '}
                    <span>{item.price}</span>
                    {' '}
                    руб.
                  </span>
                  <a onClick={signUp} className="service-card__item-link">
                    Записаться
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <Button caption={open ? 'Свернуть' : 'Развернуть'} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};
export default ServiceCard;
