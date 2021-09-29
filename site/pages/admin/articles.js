import { useEffect, useState } from 'react';

import Layout from 'components/Layout';

import { Container, Row } from 'components/UI';

import ArticleCard from 'components/admin/ArticleCard';

import { Api } from 'helpers/Api';

import { site } from 'data';

export default function AdminArticlesPage() {
  if (typeof window === 'undefined') {
    return 'loading...';
  }

  const [password, setPassword] = useState('');
  const [list, setList] = useState([]);
  const [record, setRecord] = useState(null);

  const api = new Api('news');

  function refreshList() {
    api.getAll().then((res) => { setList(res); });
  }

  useEffect(() => {
    refreshList();
  });

  const addOrEdit = (data, onSuccess) => {
    if (data.id === '') {
      api.create(data)
        .then(() => {
          onSuccess();
          refreshList();
        });
    } else {
      api.update(data.id, data)
        .then(() => {
          onSuccess();
          refreshList();
        });
    }
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Вы действительно хотите удалить запись?')) {
      api.remove(id).then(() => refreshList());
    }
  };

  if (password === site.password) {
    localStorage.setItem('key', site.key);
  }

  const imageCard = (data) => (
    <div className="record-card" onClick={() => setRecord(data)}>
      <div className="record-card__image-wrapper">
        <div>
          <img src={data.imageSrc} height={data.height} width={data.width} alt={data.alt || data.imageName} />
        </div>
      </div>
      <div className="record-card__text-wrapper">
        <h5 className="record-card__title">
          {data.imageName}
          {' '}
          (
          {data.width}
          {' '}
          X
          {' '}
          {data.height}
          )
        </h5>
        <p className="record-card__subtitle">
          alt:
          {' '}
          {data.alt}
        </p>
        <button type="button" className="delete-button" onClick={(e) => onDelete(e, parseInt(data.id, 10))}>
          <svg viewBox="-40 0 427 427.00131" >
            <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
            <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
            <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/>
            <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
          </svg>
        </button>
      </div>
      <style jsx>
        {`
        .record-card {
          display: flex;
          flex-direction: column;
          align-items: center;
            color: #000;
            
            margin: 5px;
          
          position: relative;
        
          cursor: pointer;
        
          overflow: hidden;
        
          background-color: white;
        
          border-radius: 16px;
          
          height: 220px;
        
          transition: all .2s linear;
          padding: 25px 10px;
          
          box-shadow: 1px 2px 30px 6px rgba(15, 15, 15, 0.1);
          &:hover {
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.24);
            .delete-button {
               visibility: visible;
              opacity: 1;
            }
          }
        
          &__image-wrapper {
            position: relative;
            width: 100px;
            height: 75px;
            
            margin-bottom: 10px;
            
            & > :global(div) {
              position: relative;
              width: 100px;
              height: 75px;
        
              display: inline-block;
              max-width: 100%;
              overflow: hidden;
              box-sizing: border-box;
              margin: 0;
        
              img {
                position: absolute;
                inset: 0;
                box-sizing: border-box;
                padding: 0;
                border: none;
                margin: auto;
                display: block;
                width: 0;
                height: 0;
                min-width: 100%;
                max-width: 100%;
                min-height: 100%;
                max-height: 100%;
              }
            }
          }
        
          &__text-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-align: center;
          }
        
          &__title {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4;
          }
        
          &__subtitle {
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.35;
          }
        
          &__subtitle,
          &__title {
            margin-bottom: 0;
        
            width: 100%;
        
            text-underline: none;
          }
          
          .delete-button {
          position: absolute;
    bottom: 0;
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s;
            border: 0;
            background: transparent;
            border: transparent;
            display: flex;
            width: 42px;
            height: 42px;
            justify-content: center;
            align-items: center;
          }
        }
      `}
      </style>
    </div>
  );

  return (
    <Layout>
      <section className="top-section">
        <Container>
          <Row isHalf>
            <div className="section-header light-color">
              <h2 className="section-title">Наши статьи</h2>
              <p className="section-subtitle">
                Собираем всё самое интересное
                и полезное в одном месте
              </p>
            </div>
          </Row>
          <Row isHalf>
            <div className="wrapper">
              <div className="form-card">
                <ArticleCard addOrEdit={addOrEdit} recordForEdit={record} />
              </div>
              <table className="table">
                <tbody>
                  {
                  [...Array(Math.ceil(list.length / 3))].map((e, i) => (
                    <tr key={i}>
                      <td>{imageCard(list[3 * i])}</td>
                      <td>{list[3 * i + 1] ? imageCard(list[3 * i + 1]) : null}</td>
                      <td>{list[3 * i + 2] ? imageCard(list[3 * i + 2]) : null}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </Row>
        </Container>
      </section>
      <style jsx>
        {`
          .top-section {
            padding: 40px 0;
          
            background-color: #121212;
            width: 100%;
            min-height: calc(100vh - 72px - 228px);
            @media (max-width: 767px) {
              min-height: calc(100vh - 72px);
            }
          }
              
              
          .wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          
          table,
          .form-card {
            width: 100%;
          }
              
              
          table tr td:not(:nth-child(3)){
            border-right: 1px solid #00000020;
            
          }
          
          table tr:not(:last-child) td{
            border-bottom: 1px solid #00000020;
          }
          
          :global(.fwd-row) {
            &:last-child {
              display: flex;
              align-items: start;
              justify-content: space-between;
            }
          }
        `}
      </style>
    </Layout>
  );
}
