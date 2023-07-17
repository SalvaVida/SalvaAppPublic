import React, {useState, useEffect} from 'react';
import {
  ProgressBar,
} from '@carbon/react';

import TripStep from './TripStep';

import './_index.scss'
import location_filled from '../../images/icons/location--filled.svg';
import location from '../../images/icons/location.svg';
import health_cross from '../../images/icons/health-cross.svg';
import patient_info from '../../images/icons/download-study.svg';
import Button from '../Button';


function TripDetails({userAddress, selectedHospital, eta, pageIndex, patientInformation, ambulanceInformation}) {
  const [buttonState, setButtonState] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const buttonText = buttonState ? "Chamar agora" : "Aguardando informações...";
  const mock_address = "Rua Chico Bento 12981 Turma da Mônica - SP"

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const dateTimeOptions = {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log(selectedHospital)
    if(selectedHospital && selectedHospital.text) setHospitalName(selectedHospital.text);
    else if (selectedHospital && selectedHospital.properties.name) setHospitalName(selectedHospital.properties.name);
  }, [selectedHospital]);

  useEffect(() => {
    if(ambulanceInformation) setButtonState(true);
    else setButtonState(false);
  }, [ambulanceInformation]);

  return (
    <>
    <div className='col'>
      <TripStep title="Origem" info={userAddress.address} icon={location_filled} />
    </div>
    <div className='col'>
      <TripStep
        title="Destino"
        info={selectedHospital ? hospitalName : "Escolha o destino..."}
        subinfo={eta ? `${eta} de distância` : ""}
        icon={location}
      />
    </div>
    <div className={`col ${pageIndex >= 1 ? "" : "opacity-50" }`}>
      <TripStep title="Paciente" info={patientInformation ? "Informações cadastradas" : "Aguardando preenchimento..."} icon={patient_info} />
    </div>
    <div className={`col ${pageIndex >= 2 ? "" : "opacity-50" }`}>
      <TripStep title="Ambulância" info={ambulanceInformation ? "Informações cadastradas" : "Aguardando preenchimento..."} icon={health_cross} />
    </div>
    <div className='col-3'>
      <Button text={buttonText} isActive={buttonState} className='w-100 h-100 tripDetails-button' activeText={currentDateTime.toLocaleString([], dateTimeOptions)} />
    </div>
    </>
  );
}

export default TripDetails;
