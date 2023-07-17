// Importar React e Mapbox
import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Definir o número de carros a serem adicionados
const NUM_CARS = 10;

// Definir o componente do mapa
const Test = () => {
  // Criar uma referência para o elemento do mapa
  const mapContainer = React.useRef(null);

  // Criar um estado para armazenar o mapa e os carros
  const [map, setMap] = useState(null);
  const [cars, setCars] = useState([]);

  // Inicializar o mapa quando o componente é montado
  useEffect(() => {
    // Criar uma nova instância do mapa
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-46.6333, -23.5505], // São Paulo
      zoom: 12,
    });

    // Adicionar um controle de navegação ao mapa
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Adicionar um controle de geolocalização ao mapa
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Adicionar um evento de carregamento ao mapa
    map.on("load", () => {
      // Criar um array vazio para armazenar os carros
      const cars = [];

      // Criar um loop para adicionar os carros ao mapa
      for (let i = 0; i < NUM_CARS; i++) {
        // Gerar uma posição aleatória para o carro dentro de um raio de 10 km do centro do mapa
        const radius = 10000; // em metros
        const angle = Math.random() * Math.PI * 2; // em radianos
        const distance = Math.random() * radius; // em metros
        const dx = distance * Math.cos(angle); // em metros
        const dy = distance * Math.sin(angle); // em metros
        const lng = map.getCenter().lng + (dx / 111320) * Math.cos(map.getCenter().lat); // em graus
        const lat = map.getCenter().lat + (dy / 110540); // em graus

        // Criar um objeto com as propriedades do carro
        const car = {
          id: `car-${i}`, // um identificador único para o carro
          lng, // a longitude do carro
          lat, // a latitude do carro
          bearing: Math.random() * 360, // a direção do carro em graus
          speed: Math.random() * 20 + 100, // a velocidade do carro em km/h
          route: null, // a rota do carro como um array de coordenadas
          waypoint: null, // o próximo ponto da rota do carro como uma coordenada
          waypointIndex: 0, // o índice do próximo ponto da rota do carro no array de rota
        };

        // Adicionar o carro ao array de carros
        cars.push(car);

        // Adicionar uma camada ao mapa para renderizar o carro como um ícone personalizado
        map.addLayer({
          id: car.id,
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [car.lng, car.lat],
              },
            },
          },
          layout: {
            "icon-image": "car-15", // um ícone pré-definido pelo Mapbox
            "icon-rotate": ["get", "bearing"], // rotacionar o ícone de acordo com a propriedade bearing do carro
            "icon-rotation-alignment": "map", // alinhar o ícone com a direção do mapa
            "icon-allow-overlap": true, // permitir que o ícone se sobreponha a outros elementos do mapa
            "icon-ignore-placement": true, // ignorar as regras de posicionamento do ícone
          },
          paint: {
            "icon-color": ["get", "color"], // colorir o ícone de acordo com a propriedade color do carro
          },
        });

        // Adicionar uma propriedade ao carro para armazenar a cor do ícone
        car.color = map.getPaintProperty(car.id, "icon-color");
      }

      // Atualizar o estado com o mapa e os carros
      setMap(map);
      setCars(cars);
    });

    // Remover o mapa quando o componente é desmontado
    return () => map.remove();
  }, []);

  // Atualizar a posição e a rota dos carros a cada segundo
  useEffect(() => {
    // Criar uma função para atualizar os carros
    const updateCars = () => {
      // Verificar se o mapa e os carros estão definidos
      if (map && cars) {
        // Criar um novo array para armazenar os carros atualizados
        const updatedCars = [];

        // Criar um loop para atualizar cada carro
        for (let car of cars) {
          // Calcular a distância percorrida pelo carro em um segundo em graus
          const distance = (car.speed * 1000) / 3600 / 111111; // em graus

          // Verificar se o carro tem uma rota definida
          if (car.route) {
            // Verificar se o carro chegou ao próximo ponto da rota
            if (
              Math.abs(car.lng - car.waypoint[0]) < distance &&
              Math.abs(car.lat - car.waypoint[1]) < distance
            ) {
              // Incrementar o índice do próximo ponto da rota
              car.waypointIndex++;

              // Verificar se o carro chegou ao final da rota
              if (car.waypointIndex >= car.route.length) {
                // Limpar a rota do carro
                car.route = null;
                car.waypoint = null;
                car.waypointIndex = 0;
              } else {
                // Atualizar o próximo ponto da rota do carro
                car.waypoint = car.route[car.waypointIndex];

                // Calcular o ângulo entre a posição atual do carro e o próximo ponto da rota em graus
                const dx = car.waypoint[0] - car.lng; // em graus
                const dy = car.waypoint[1] - car.lat; // em graus
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // em graus

                // Atualizar a direção do carro de acordo com o ângulo calculado
                car.bearing = angle;
              }
            }
          }

          // Verificar se o carro tem um próximo ponto definido
          if (car.waypoint) {
            // Calcular a nova posição do carro de acordo com a distância e a direção
            const dx = distance * Math.cos((car.bearing * Math.PI) / 180); // em graus
            const dy = distance * Math.sin((car.bearing * Math.PI) / 180); // em graus
            const newLng = car.lng + dx; // em graus
            const newLat = car.lat + dy; // em graus

            // Atualizar a posição do carro com os novos valores
            car.lng = newLng;
            car.lat = newLat;
          } else {
            // Gerar uma nova rota aleatória para o carro usando a API de direções do Mapbox
            fetch(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${car.lng},${car.lat};${car.lng +
                (Math.random() - 0.5) / 50},${car.lat +
                (Math.random() - 0.5) / 50}?geometries=geojson&access_token=${mapboxgl.accessToken}`
            )
              .then((response) => response.json())
              .then((data) => {
                // Verificar se a API retornou uma rota válida
                if (data.code === "Ok") {
                  // Obter a rota como um array de coordenadas
                  const route = data.routes[0].geometry.coordinates;

                  // Verificar se a rota tem pelo menos dois pontos
                  if (route.length >= 2) {
                    // Definir a rota, o próximo ponto e o índice do carro
                    car.route = route;
                    car.waypoint = route[1];
                    car.waypointIndex = 1;

                    // Calcular o ângulo entre a posição atual do carro e o próximo ponto da rota em graus
                    const dx = car.waypoint[0] - car.lng; // em graus
                    const dy = car.waypoint[1] - car.lat; // em graus
                    const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // em graus

                    // Atualizar a direção do carro de acordo com o ângulo calculado
                    car.bearing = angle;
                  }
                }
              })
              .catch((error) => {
                // Em caso de erro na API, mostrar uma mensagem no console
                console.error(error);
              });
          }

          // Atualizar a fonte do mapa com a nova posição e direção do carro
          map.getSource(car.id).setData({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [car.lng, car.lat],
            },
            properties: {
              bearing: car.bearing,
              color: car.color,
            },
          });

          // Adicionar o carro atualizado ao array de carros atualizados
          updatedCars.push(car);
        }

        // Atualizar o estado com os carros atualizados
        setCars(updatedCars);
      }
    };

    // Criar um intervalo para chamar a função de atualização dos carros a cada segundo
    const interval = setInterval(updateCars, 1000);

    // Limpar o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [map, cars]);

  // Renderizar o elemento do mapa
  return <div ref={mapContainer} className="map-container" />;
};

// Exportar o componente do mapa
export default Test;
