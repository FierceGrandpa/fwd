import { useState, useEffect } from 'react';

import Modal from 'components/UI/Modal';

import dynamic from 'next/dynamic';

import Layout from 'components/Layout';

import PromoSection from 'components/sections/Promo';

const ServicesSection = dynamic(() => import('components/sections/Services'));
const TrustSection = dynamic(() => import('components/sections/Trust'));
const MapSection = dynamic(() => import('components/sections/Map'));
const LastNews = dynamic(() => import('components/sections/LastNews'));

export default function HomePage() {
  const [modal, setModal] = useState(false);

  function signUp() {
    setModal(true);
  }

  return (
    <Layout signUp={signUp}>
      <PromoSection signUp={signUp} />
      <ServicesSection  />
      <TrustSection />
      <MapSection />
      <LastNews />

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
export async function getServerSideProps() {
  const items = await api.getAll();

  return {
    props: {
      items,
    },
  }
}
