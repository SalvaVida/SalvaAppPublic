import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useDebounce } from 'use-debounce';

import SearchBar from '../SearchBar';
import Button from '../Button';

import arrowRight from '../../images/icons/arrow--right.svg';
import './_index.scss'

// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYnV0dGVyZmx5YXdheSIsImEiOiJjbGcxOHBwMmMxMmdoM2x0YWF4enU4Z3FqIn0.CQyk9vgc7XX94n7KxV3jTA';

// The main component that renders the map and the search functionality
const MapLocator = ({onNext, selectedHospital, setSelectedHospital, setETA, userLocation, setUserLocation}) => {

  /* REFS */
  const mapContainerRef = useRef(null); // map container DOM element
  const mapRef = useRef(null); // map object

  /* STATES */
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [searchResults, setSearchResults] = useState([]);
  // const [selectedResult, setSelectedResult] = useState(null);

  /* HANDLERS */
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // setSelectedResult(null);
  };
  const handleSelectResult = (result) => {
    // setSelectedResult(result);
    setSearchValue(result.place_name);
    setSearchResults([]);
    setSelectedHospital(result);
    // mapRef.current.jumpTo({
    //   center: result.center,
    //   zoom: 12,
    // });
  };

  // fetch the search results from the Mapbox API
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${mapboxgl.accessToken}&proximity=${userLocation.longitude},${userLocation.latitude}&types=poi.landmark`
      );
      const data = await response.json();
      setSearchResults(data.features);
      console.log(data.features);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateETA = (route) => {
    const seconds = route;

    let hours = Math.floor(seconds / 3600);
    let remainingSeconds = seconds - hours * 3600;
    let minutes = Math.floor(remainingSeconds / 60);

    // Returns a string with the ETA
    if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''} e ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else if (hours > 0 && minutes === 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
  };

  const calculateRoute = (map, destination) => {
    //const origin = map.getCenter().toArray();
    //const origin = [-46.66395664215088,-23.580143730700186]
    const origin = [userLocation.longitude, userLocation.latitude]

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry;
        // const duration = data.routes[0].duration;
        console.log(data.routes[0].duration)
        // const eta = calculateETA(duration);
        setETA(calculateETA(data.routes[0].duration));
        if (map.current.getLayer('route')) {
          map.current.getSource('route').setData(route);
        } else {
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: route,
              },
            },
            paint: {
              'line-width': 4,
              'line-color': '#1c1c1c',
              'line-opacity': 0.75,
            },
          });
        }
      });
  };

  // initialize the map when the component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/butterflyaway/clhywl06404d501p84wio20wv',
      center: [-50.983585, -14.074453],
      zoom: 3.83,
    });

    map.addControl(new mapboxgl.GeolocateControl(), 'top-left');

    map.on('load', () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          map.jumpTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 13,
          });
        },
        (error) => {
          console.error(error);
          map.jumpTo({
            center: [userLocation.longitude, userLocation.latitude],
            zoom: 13,
          });
          // alert('Ative os serviços de localização para melhores resultados.');
        }
      );
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  // fetch the search results when the debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue) {
      fetchSearchResults(debouncedSearchValue);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchValue]);

  /* Load hospitals layer */
  useEffect(() => {
    if (!mapRef.current) return; // wait for map to initialize
    mapRef.current.on('load', () => {
      mapRef.current.addLayer({
        id: 'poi-labels',
        type: 'symbol',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
        'source-layer': 'poi_label',
        filter: ['==', 'maki', 'hospital'],
        layout: {
          'text-field': '{name}',
          'text-size': 17,
          'text-anchor': 'top',
          'text-offset': [0,1],
          'text-font': ['DIN Pro Bold'],
          'icon-image': 'hospital',
          'icon-allow-overlap': false,
        },
        paint: {
          'text-color': 'rgb(210, 35, 35)',
          "icon-halo-width": 10,
          'text-halo-width': 0.5,
          'text-halo-blur': 0.5,
          'text-halo-color': 'rgb(255, 255, 255)',
        }
      });
    });
  });

  /*  Update selected hospital */
  useEffect(() => {
    if (!mapRef.current) return; // wait for map to initialize
    // when a hospital is clicked, selects hospital 
    mapRef.current.on('click', 'poi-labels', (e) => {
      e.clickOnMarker = true; // avoids double event firing
      const { features } = e;
      if (features.length > 0) {
        const clickedHospital = features[0];
        setSelectedHospital(clickedHospital);
        mapRef.current.setFeatureState(
          { source: 'poi-labels', id: clickedHospital.id },
          { selected: true }
        );
      }
    });
    // when the map is clicked, remove selected hospital
    mapRef.current.on('click', (e) => {
      if (e.clickOnMarker) return; // avoids double event firing when marker is the target
      if (selectedHospital) {
        mapRef.current.setFeatureState(
          { source: 'poi-labels', id: selectedHospital.id },
          { selected: false }
        );
        setSelectedHospital(null);
        setSearchValue("");
        setSearchResults([]);
        setETA("");
        if (mapRef.current.getLayer('route')) {
          mapRef.current.removeLayer('route');
          mapRef.current.removeSource('route');
          mapRef.current.removeLayer('destination');
          mapRef.current.removeSource('destination');
        }
      }
    });
  });

  /* Generate route whenever the selected hospital changes*/
  useEffect(() => {
    if (mapRef && selectedHospital) {
      const coordinates = selectedHospital.geometry.coordinates;
      const destination = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
      };

      const data = {
        type: 'FeatureCollection',
        features: [destination],
      };

      if (mapRef.current.getLayer('destination')) {
        mapRef.current.getSource('destination').setData(data);
      } else {
        mapRef.current.addLayer({
          id: 'destination',
          type: 'circle',
          source: {
            type: 'geojson',
            data: data,
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#e25050',
          },
        });
      }

      // map.jumpTo({ center: coordinates });
      calculateRoute(mapRef, coordinates);
    }
  }, [mapRef, selectedHospital]);


  return (
    <>
      <div className='searchBar-container d-flex'>
        <SearchBar
          value={searchValue}
          onChange={handleSearchChange}
          results={searchResults}
          onSelect={handleSelectResult}
          placeholder="Busque o local ou selecione no mapa"
          setValue={setSearchValue}
          setSelectedHospital={setSelectedHospital}
        />
        {selectedHospital ?
          <Button
            text="Confirmar"
            isActive={selectedHospital}
            className="confirmButton ms-2"
            onClick={onNext}
            activeIcon={arrowRight}
          />
          :
          ""
        }
      </div>
      <div ref={mapContainerRef} className="map-container"></div>
    </>
  );
};

export default MapLocator;
