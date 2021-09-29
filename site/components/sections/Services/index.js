import {
  memo, useMemo, useEffect, useState,
} from 'react';
import { Container, Row } from 'components/UI';

import dynamic from 'next/dynamic';

import axios from 'axios';
import styles from './styles.scss';
import {Api} from "../../../helpers/Api";

const ServiceCard = dynamic(() => import('./Card'));

const ServicesSection = () => {
  const [services, setList] = useState([]);
  const api = new Api('services');
  useEffect(() => {
    api.getAll().then((res) => { setList(res); });
  });

  return (
    <>
      <section className="section-primary light-bg">
        <Container>
          <Row>
            <div className="section-header dark-color">
              <h2 className="section-title">Популярные услуги</h2>
              <p className="section-subtitle">Все услуги вы можете найти в соответсвующей вкладке</p>
            </div>
          </Row>
          <Row>
            <div className="services-grid">
              {services.sort((e) => e.id).slice(0, 7).map((service) => (
                <ServiceCard key={service.id} service={service} href={`/services?page=${Math.ceil((services.findIndex((e) => e.id === service.id) + 1) / 2)}#service-${service.id}`} />
              ))}
              <ServiceCard
                service={{
                  id: 10000,
                  title: 'Другие услуги',
                  height: 324,
                  width: 509,
                  imageSrc: '/img/services/all_services.webp',
                  alt: 'Все наши услуги',
                }}
                href="/services"
              />
            </div>
          </Row>
        </Container>
      </section>
      <style jsx>{styles}</style>
    </>
  );
};

export default memo(ServicesSection);
