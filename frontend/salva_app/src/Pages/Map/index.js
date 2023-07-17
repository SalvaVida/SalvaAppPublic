import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import AmbulanceSelector from '../../Components/AmbulanceSelector';
import PlaceholderAmbulance from '../../Components/PlaceholderAmbulance';
import SearchInput from '../../Components/SearchInput';
import logo from '../../images/branding/logotype_small.png';
import './_index.scss'
import { useNavigate } from "react-router-dom";


// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYnV0dGVyZmx5YXdheSIsImEiOiJjbGcxOHBwMmMxMmdoM2x0YWF4enU4Z3FqIn0.CQyk9vgc7XX94n7KxV3jTA';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchInputRef = useRef(null);

  // Current map location
  const [lng, setLng] = useState(-46.656027);
  const [lat, setLat] = useState(-23.580986);
  const [zoom, setZoom] = useState(14);

  // Hospital selection
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Ambulance selection
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  
  const calculateRoute = (map, destination) => {
    // const origin = map.getCenter().toArray();
    const origin = [-46.66395664215088,-23.580143730700186]

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry;
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
              'line-color': '#00f',
            },
          });
        }
      });
  };

  const searchHospital = (inputValue) => {
    const query = inputValue;
    if (query.trim() === '') return;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?types=poi&proximity=${map.current.getCenter().lng},${map.current.getCenter().lat}&access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          const hospital = data.features[0];
          setSelectedHospital(hospital);
          // map.current.flyTo({ center: hospital.center });
        }
      })
      .catch((error) => {
        console.error('Error searching for hospital:', error);
      });
  };

  /* Map initialization */
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/butterflyaway/clhywl06404d501p84wio20wv',
      center: [lng, lat],
      zoom: zoom
    });
  });

  /*  Update current map location */
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  /* Load hospitals layer */
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('load', () => {
      map.current.addLayer({
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
    if (!map.current) return; // wait for map to initialize
    // when a hospital is clicked, selects hospital 
    map.current.on('click', 'poi-labels', (e) => {
      e.clickOnMarker = true; // avoids double event firing
      const { features } = e;
      if (features.length > 0) {
        const clickedHospital = features[0];
        setSelectedHospital(clickedHospital);
        map.current.setFeatureState(
          { source: 'poi-labels', id: clickedHospital.id },
          { selected: true }
        );
      }
    });
    // when the map is clicked, remove selected hospital
    map.current.on('click', (e) => {
      if (e.clickOnMarker) return; // avoids double event firing when marker is the target
      if (selectedHospital) {
        map.current.setFeatureState(
          { source: 'poi-labels', id: selectedHospital.id },
          { selected: false }
        );
        setSelectedHospital(null);
        if (map.current.getLayer('route')) {
          map.current.removeLayer('route');
          map.current.removeSource('route');
          map.current.removeLayer('destination');
          map.current.removeSource('destination');
        }
      }
    });
  });

  /* Generate route whenever the selected hospital changes*/
  useEffect(() => {
    if (map && selectedHospital) {
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

      if (map.current.getLayer('destination')) {
        map.current.getSource('destination').setData(data);
      } else {
        map.current.addLayer({
          id: 'destination',
          type: 'circle',
          source: {
            type: 'geojson',
            data: data,
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f00',
          },
        });
      }

      // map.flyTo({ center: coordinates });
      calculateRoute(map, coordinates);
    }
  }, [map, selectedHospital]);

  useEffect(() => {
    if(!selectedHospital) {
      setSelectedAmbulance(null);
    }
  }, [selectedHospital])
  
  const navigate = useNavigate();

  return (
    <>
      {/* UI */}
      <div className='container-fluid map-ui'>
        <div className='row'>

          {/* LOGO */}
          <div className='col-2'>
            <div className="card shadow border-0 rounded-4 bg-frost">
              
              <div className="card-body">
                <img src={logo} className="map-logo" alt="logo" />
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className='col'>
            <div className="card shadow border-0 rounded-4 bg-frost h-100">
              <div className="card-body">
                <h5 className='fw-600 open-sans'>{selectedHospital ? "Destino Selecionado: " + selectedHospital.properties.name : "Chamado Rápido"}</h5>
                <SearchInput
                  searchAction={searchHospital}
                  searchPlaceholder={"Busque o destino ou clique em qualquer hospital no mapa"}
                />
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className='col-2'>
            <div className="card shadow border-0 rounded-4 bg-frost h-100">
              <div className="card-body">
                <h5 className='fw-600 open-sans'><button type="submit" class="btn btn-primary btn-lg mt-3 w-100 rounded-pill" onClick={() => navigate('/chamado')}>Agendamentos</button></h5>
              </div>
            </div>
          </div>

          {/* <div className='col'>
            <div className="card shadow border-0 rounded-4 bg-frost">
              <div className="card-body">
              </div>
            </div>
          </div> */}

        </div>
          {/* Ambulance Selector */}
          <div className='sidebar ambulances'>
            <AmbulanceSelector selectedHospital={selectedHospital} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance} />
          </div>

      </div>
      {/* <div className="sidebar search">
        <input className="form-control" type="text" ref={searchInputRef} placeholder="Procurar hospital" />
        <button onClick={searchHospital}>Gerar Rota</button>
      </div>
      <div className="sidebar debug">
        Current Hospital: Hospital Sancta Maggiore<br/>
        Selected Hospital: {selectedHospital ? selectedHospital.properties.name : ""}<br/>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <AmbulanceSelector selectedHospital={selectedHospital} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance} /> */}

      {/* MAP */}
      <div ref={mapContainer} className="map-container" />
    </>
  );
};

export default Map;