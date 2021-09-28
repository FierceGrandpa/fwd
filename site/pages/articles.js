import { useRouter } from 'next/router';

import {useEffect, useState} from 'react';

import Layout from 'components/Layout';

import TopSection from 'components/sections/Top';

import { NewsCard, Container, Row } from 'components/UI';
import Pagination from 'components/UI/Pagination';
import Modal from 'components/UI/Modal';
import axios from "axios";

export default function ArticlesPage() {
  const pageLimit = 3;

  const [articles, setList] = useState([]);
  const router = useRouter();
  const { query, route, asPath } = router;
  const { page } = query;
  const getStartIndex = () => {
    if (!page || page < 1) {
      return 1;
    } else if (page > Math.ceil(articles.length / pageLimit)) {
      return Math.ceil(articles.length / pageLimit);
    } else {
      return page;
    }
  };

  const id = parseInt(asPath
    .replace(route, '')
    ?.replace(`?page=${page}`, '')
    ?.replace('#article-', ''), 10);

  const [modal, setModal] = useState(false);

  function signUp() {
    setModal(true);
  }

  const getCurrentItems = () => {
    const offset = (getStartIndex() - 1) * pageLimit;
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date))?.slice(offset, offset + pageLimit);
  };

  useEffect(() => {
    axios.get('https://localhost:44358/api/articles/')
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <Layout>
      <TopSection
        title="Наши статьи"
        description={(
          <>
            Собираем всё самое интересное
            <br />
            и полезное в одном месте
          </>
        )}
        img="articles"
        signUp={signUp}
      />
      <section className="table section-primary light-bg">
        <Container>
          <Row isHalf>
            {articles
              ? getCurrentItems().map((e) => <NewsCard key={e.id} news={e} isOpen={id === e.id} />)
              : null}
            {articles && articles.length > 3
              ? (
                <Pagination
                  link="articles"
                  total={articles.length}
                  pageLimit={pageLimit}
                  page={page}
                />
              ) : null}
          </Row>
        </Container>
      </section>
      <div id="modal-portal" className={modal ? 'open' : ''}>
        {modal ? (
          <Modal modal={modal} setModal={setModal} />
        ) : null}
      </div>

      <style jsx global>
        {`
          .section-primary {
            padding-top: 20px !important;
          }
          
          #modal-portal.open {
            z-index: 20000;
          }
        
          #modal-portal {
            z-index: -1;
            position: fixed;
            width: 100%;
            height: 100%;
            cursor: default;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
          }
      `}
      </style>
    </Layout>
  );
}
