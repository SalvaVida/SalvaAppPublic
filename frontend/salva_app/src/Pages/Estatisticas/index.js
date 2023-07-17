import React from 'react';
import Header from '../../Components/Header';
import './_index.scss'
import StatsDashboard from '../../Components/StatsDashboard';

const Estatisticas = () => {
  return (
    <>

      <div className='container-fluid d-flex flex-column vh-100 px-lg-4'>
        <div className='row'>
          <Header />
        </div>
        <div className='row bg-light rounded-4 p-3'>
          <StatsDashboard />
        </div>
      </div>

    </>
  );
};

export default Estatisticas;