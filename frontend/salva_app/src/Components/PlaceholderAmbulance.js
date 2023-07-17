import React, { useEffect, useState } from 'react';

const PlaceholderAmbulance = ({aid, selectedAmbulance, setSelectedAmbulance}) => {
  const [boxClass, setBoxClass] = useState('option');

  const handleClick = () => {
    setSelectedAmbulance(aid);
    // setBoxClass('option active');
  };

  useEffect(() => {
    if(aid === selectedAmbulance) {
      setBoxClass('option active');
    }
    else {
      setBoxClass('option');
    }
  }, [selectedAmbulance]);


  return (
    <div
        className={boxClass}
        onClick={handleClick}
      >
        <div className='placeholder_image'>{aid}</div>
        <div className='placeholder_text'>Opção {aid}</div>
    </div>
  );
};

export default PlaceholderAmbulance;