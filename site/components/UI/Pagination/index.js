import styles from './styles.scss';

const Pagination = ({
  total, pageLimit, page, link,
}) => {
  const getRange = () => {
    const res = [];
    for (let i = 1; i <= Math.ceil(total / pageLimit); i += 1) {
      res.push(i);
    }
    return res;
  };

  return (
    <>
      <div className="pagination">
        {getRange().map((i) => (
          <a
            key={i}
            href={`/${link}?page=${i}`}
            title={`Страница ${i}`}
            className={`pagination-item${i == page ? ' pagination-item--active' : ''}`}
          >
            {i}
          </a>
        ))}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};
export default Pagination;
