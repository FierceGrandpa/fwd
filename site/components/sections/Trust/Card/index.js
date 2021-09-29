import Image from 'next/image';
import styles from './styles.scss';

const MarkCard = ({ mark, open }) => {
  return (
    <>
      <div className={`mark-card${open ? ' open' : ''}`} title={mark.alt}>
        <div>
          <Image
            src={mark.imageSrc}
            height={mark.height}
            width={mark.width}
            alt={`Работаем с автомобилями модели ${mark.alt}`}
            />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
export default MarkCard;
