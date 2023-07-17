import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import PatientInfo from '../../Components/PatientInfo';
import AmbulanceInfo from '../../Components/AmbulanceInfo';
import MapLocator from '../../Components/MapLocator';
import Header from '../../Components/Header';
import TripDetails from '../../Components/TripDetails';

import './_index.scss'

mapboxgl.accessToken = 'pk.eyJ1IjoiYnV0dGVyZmx5YXdheSIsImEiOiJjbGcxOHBwMmMxMmdoM2x0YWF4enU4Z3FqIn0.CQyk9vgc7XX94n7KxV3jTA';

const Chamado = () => {

  // Map Info
  const [userLocation, setUserLocation] = useState({
    longitude: -46.66395664215088,
    latitude: -23.580143730700186,
  });
  const [userAddress, setUserAddress] = useState({
    address: "",
    postcode: "",
  });
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [eta, setETA] = useState('');

  // Patient Info
  const [patientInformation, setPatientInformation] = useState(false);

  // Ambulance Info
  const [ambulanceInformation, setAmbulanceInformation] = useState(false);

  // Pagination
  const [pageIndex, setPageIndex] = useState(0);
  const handleBackAmbulance = () => {
    setAmbulanceInformation(false);
    setPatientInformation(false);
    setPageIndex((prev) => (prev + 2) % 3);
  };
  const handleBackPatient = () => {
    setSelectedHospital(null);
    setPatientInformation(false);
    setPageIndex((prev) => (prev + 2) % 3);
  };
  const handleBack = () => {
    setPageIndex((prev) => (prev + 2) % 3);
  };
  const handleNextAmbulance = () => {
    setAmbulanceInformation(true);
  };
  const handleNextPatient = () => {
    setPatientInformation(true);
    setPageIndex((prev) => (prev + 1) % 3);
  };
  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % 3);
  };
  const pages = [
    {
      component: MapLocator,
      props: {
        onNext: handleNext,
        selectedHospital,
        setSelectedHospital,
        setETA,
        userLocation,
        setUserLocation,
      },
    },
    {
      component: PatientInfo,
      props: {
        onBack: handleBackPatient,
        onNext: handleNextPatient,
      },
    },
    {
      component: AmbulanceInfo,
      props: {
        onBack: handleBackAmbulance,
        onNext: handleNextAmbulance,
      },
    },
  ];
  const CurrentPage = pages[pageIndex].component;

  const tripDetails_props = {
    userAddress,
    selectedHospital,
    eta,
    pageIndex,
    patientInformation,
    ambulanceInformation,
  }

  useEffect(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation.longitude},${userLocation.latitude}.json?access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json(); // parse the response data as JSON
        } else {
          throw new Error('Something went wrong'); // handle non-200 status codes
        }
      })
      .then((data) => {
        if (data.features.length > 0) {
          setUserAddress({
            address: data.features[0].place_name,
            postcode: data.features[1].place_name,
          });
        } else {
          console.log('No address found');
        }
      })
      .catch((error) => {
        console.error(error); // handle errors
        console.log('Error getting address');
      });

  }, [userLocation]);

  return (
    <>

      <div className='container-fluid d-flex flex-column vh-100 px-lg-4'>
        <div className='row'>
          <Header />
        </div>
        <div className='row py-0 mt-2 tripDetails-container'>
          <TripDetails {...tripDetails_props}/>
        </div>
        <div className='row flex-fill'>
          {/* <Map /> */}
          <CurrentPage {...pages[pageIndex].props} />
        </div>
      </div>

    </>
  );
};

export default Chamado;