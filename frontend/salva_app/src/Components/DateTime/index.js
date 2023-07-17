import React, { useState, useEffect } from 'react';
import './_index.scss'

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='work-sans me-2 text-muted'>
      <small>
        {currentDateTime.toLocaleString()}
      </small>
    </div>
  );
}

export default DateTime;
