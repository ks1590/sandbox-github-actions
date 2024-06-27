import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
// import { Map } from './Map';
import Table from './components/Table';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
      {/* <Map /> */}
      <Table />
    </MantineProvider>
  </StrictMode>
);
