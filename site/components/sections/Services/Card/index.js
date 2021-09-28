import styles from './styles.scss';

const ServiceCard = ({ service, href }) => {
  const {
    id, title, height, width, alt, imageSrc,
  } = service;

  return (
    <>
      <a className="service-card" href={href} title={alt}>
        <div className="service-card__image-wrapper">
          <div>
            <img className="service-card__image" src={imageSrc} height={height} width={width} alt={alt || title} />
          </div>
        </div>
        <div className="service-card__text-wrapper">
          <h3 className="service-card__title">{title}</h3>
        </div>
      </a>
      <style jsx>{styles}</style>
    </>
  );
};
export default ServiceCard;
