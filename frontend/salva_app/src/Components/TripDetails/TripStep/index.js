import React from 'react';
import './_index.scss'

function TripStep({title, info, subinfo, icon}) {
  return (
    <div>
      <div className='d-flex align-items-center'>
        <img src={icon} className="tripStep-icon" alt={title} />
        <span className='tripStep-title ms-2 fw-600'>{title}</span>
      </div>
      <div className='tripStep-info mt-2'>
        <small>
          {info}
        </small>
      </div>
      {subinfo ?
        <div className='tripStep-info fw-600 mt-2'>
          <small>
            {subinfo}
          </small>
        </div>
          :
          ''
        }
    </div>
  );
}

export default TripStep;
