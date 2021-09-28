import Layout from 'components/Layout';

import { Container } from 'components/UI';
import {useState} from "react";
import {site} from "../../data";

export default function AdminCompanyPage() {
  const [password, setPassword] = useState('');
  if (typeof window === 'undefined') {
    return 'loading...';
  }

  if (password === site.password) {
    localStorage.setItem('key', site.key);
  }
  if (localStorage.getItem('key') !== site.key) {
    return (
      <>
        <Layout>
          <section>
            <Container>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Container>
          </section>
        </Layout>
        <style jsx>
          {`
            section {
              height: calc(100vh - 72px - 72px);
            }
          `}
        </style>
      </>
    );
  }
  return (
    <Layout>
      AdminCompanyPage
    </Layout>
  );
}
