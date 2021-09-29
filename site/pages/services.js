import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from 'components/Layout';

import TopSection from 'components/sections/Top';

import {
  Container, Row, ServiceCard,
} from 'components/UI';
import Pagination from 'components/UI/Pagination';

import Modal from 'components/UI/Modal';

import {Api} from "helpers/Api";

const api = new Api('services');

export default function ServicesPage({ items }) {
  const router = useRouter();
  const pageLimit = 2;

  const [services, setList] = useState(items || []);
  const [modal, setModal] = useState(false);
  const { query, route, asPath } = router;
  const { page } = query;
  const getStartIndex = () => {
    if (!page || page < 1) {
      return 1;
    } if (page > Math.ceil(services.length / pageLimit)) {
      return Math.ceil(services.length / pageLimit);
    }
    return page;
  };
  const id = parseInt(asPath
    .replace(route, '')
    ?.replace(`?page=${page}`, '')
    ?.replace('#service-', ''), 10);

  function signUp() {
    setModal(true);
  }

  const getCurrentItems = () => {
    const offset = (getStartIndex() - 1) * pageLimit;
    return services?.sort((e) => e.id).slice(offset, offset + pageLimit);
  };
  useEffect(() => {
    api.getAll().then((res) => { setList(res); });
  });

  return (
    <Layout>
      <TopSection
        title="Наши услуги"
        description={(
          <>
            Ремонт, обслуживание и тюнинг
            <br />
            машины в одном месте!
          </>
        )}
        img="services"
        signUp={signUp}
      />
      <section className="table section-primary light-bg">
        <Container>
          <Row isHalf>
            {services
              ? getCurrentItems().map((e) => <ServiceCard key={e.id} service={e} signUp={signUp} isOpen={id === e.id} />)
              : null}
            {services && services.length > 3
              ? (
                <Pagination
                  link="services"
                  total={services.length}
                  pageLimit={pageLimit}
                  page={page}
                />
              )
              : null}
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

export async function getServerSideProps() {
  const items = await api.getAll();

  return {
    props: {
      items,
    },
  }
}
