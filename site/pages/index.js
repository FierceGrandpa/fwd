import { useState, useEffect } from 'react';

import Modal from 'components/UI/Modal';

import dynamic from 'next/dynamic';

import Layout from 'components/Layout';

import { Api } from 'helpers/Api';

import PromoSection from 'components/sections/Promo';

const ServicesSection = dynamic(() => import('components/sections/Services'));
const TrustSection = dynamic(() => import('components/sections/Trust'));
const MapSection = dynamic(() => import('components/sections/Map'));
const LastNews = dynamic(() => import('components/sections/LastNews'));

const newsApi = new Api('news');
const servicesApi = new Api('services');
const marksApi = new Api('marks');

export default function HomePage() {
  const [modal, setModal] = useState(false);

  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    newsApi.getAll().then((res) => { setArticles(res); });
    servicesApi.getAll().then((res) => { setServices(res); });
    marksApi.getAll().then((res) => { setMarks(res); });
  });

  function signUp() {
    setModal(true);
  }

  return (
    <Layout signUp={signUp}>
      <PromoSection signUp={signUp} />
      <ServicesSection services={services} />
      <TrustSection marks={marks} />
      <MapSection />
      <LastNews articles={articles} />

      <div id="modal-portal" className={modal ? 'open' : ''}>
        {modal ? (
          <Modal modal={modal} setModal={setModal} />
        ) : null}
      </div>

      <style jsx global>
        {`
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
