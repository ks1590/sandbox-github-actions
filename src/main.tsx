import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Map } from './Map';
// import Table from './Table';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Map />
    {/* <Table /> */}
  </StrictMode>
);
