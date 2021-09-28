import Layout from 'components/Layout';

import MapSection from 'components/sections/Map';

export default function AddressPage() {
  return (
    <>
      <Layout>
        <MapSection />
      </Layout>
      <style jsx global>
        {`
          section {
            min-height: calc(100vh - 72px);
          }
          iframe {
            min-height: calc(100vh - 72px);
            height: 1080px;
            width: 1920px;
          }
          :global(.map-wrapper) {
            min-height: calc(100vh - 72px);
          }
      `}
      </style>
    </>
  );
}
