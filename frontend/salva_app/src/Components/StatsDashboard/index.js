// Importando as bibliotecas necessárias
import React, { useState, useEffect } from "react";
import {
  SimpleBarChart,
  DonutChart,
  PieChart,
  HistogramChart,
} from "@carbon/charts-react";
import '@carbon/charts-react/styles.css'

import { Grid, Row, Column } from "@carbon/react";
import { faker } from '@faker-js/faker';

// Dados falsos para o dashboard
const generateFakeData = (count) => {
    // Dias da semana
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  
    // Urgencia
    const urgencies = ["0", "1", "2", "3", "4"];
  
    // Hospitais de SP
    const hospitals = [
      "Hospital Albert Einstein",
      "Hospital Sírio-Libanês",
      "Hospital Santa Catarina",
      "Hospital São Paulo",
      "Hospital das Clínicas",
    ];
  
    // Transferencias por dia da semana
    const transfersByDay = Array.from({length: count}, () => ({
      group: faker.helpers.arrayElement(days),
      value: faker.number.int({ min: 10, max: 50 }),
    }));
  
    // Urgencia por dia da semana
    const urgencyByDay = Array.from({length: count}, () => {
        const day = faker.helpers.arrayElement(days);
        return {
          group: day,
          key: faker.helpers.arrayElement(urgencies),
          value: day,
        };
      });
  
    // Hospitais por transferencia
    const hospitalsByTransfers = hospitals.map((hospital) => ({
        group: hospital,
        value: faker.number.int({ min: 20, max: 100 }),
    }));
  
    // Hospitais por tempo de transferencia
    const hospitalsByWaitingTime = hospitals.map((hospital) => ({
        group: hospital,
        value: faker.number.int({ min: 0, max: 200 }),
    }));
  
    // distância média percorrida pelas ambulâncias
    const averageDistance = faker.number.float({ min: 5, max: 50 });
  
    // tempo médio de transferência
    const averageTransferTime = faker.number.float({ min: 15, max: 90 });
  
    // número de pacientes
    const numberOfPatients = faker.number.int({ min: 15, max: 200 });
    
    // número de transferências canceladas ou recusadas
    const cancelledOrRefusedTransfers = faker.number.int({ min: 0, max: 100 });
  
    return {
      transfersByDay,
      urgencyByDay,
      hospitalsByTransfers,
      hospitalsByWaitingTime,
      averageDistance,
      averageTransferTime,
      cancelledOrRefusedTransfers,
      numberOfPatients,
    };
};

const StatsDashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if(!data) {
            const mock_data = generateFakeData(100);
            console.log(mock_data)
            setData(mock_data);
        }
    }, []);
      
    const urgencyByDayOptions = {
        "title": "Urgência pela escala Manchester",
        "axes": {
          "bottom": {
            "title": "Urgência",
            "mapsTo": "key",
            "bins": 4,
            "limitDomainToBins": true
          },
          "left": {
            "title": "No. de Transferências",
            "scaleType": "linear",
            "stacked": true,
            "binned": true
          }
        },
        "height": "400px"
    }

    const transfersByDayOptions = {
        title: "Transferências por dia",
        axes: {
          left: {
            title: "Number of Transfers",
            mapsTo: "value",
          },
          bottom: {
            title: "Day",
            mapsTo: "group",
            scaleType: "labels",
          },
        },
        "height": "400px"
    };

    const hospitalsByTransfersOptions = {
        title: "Hospitais por Transferencias",
        "resizable": true,
        "legend": {
            "alignment": "center"
          },
          "donut": {
            "valueMapsTo": "count",
            "center": {
              "label": "Transferências"
            },
            "alignment": "center"
          },
        "height": "400px"
    };
    
    const hospitalsByWaitingTimeOptions = {
        title: "Tempo de Tranferência (minutos)",
        "resizable": true,
        "legend": {
            "alignment": "center"
          },
        "pie": {
            "alignment": "center"
        },
        "height": "400px"
      };
      
   return (
    <>
        <div className="col-12">
            <h2 className="mb-4">Estatísticas</h2>
        </div>
        <div className="col-6">
            {data ?
                    <SimpleBarChart
                        data={data?.transfersByDay}
                        options={transfersByDayOptions}
                    />
                    : ""
            }
        </div>
        <div className="col-6">
            {data ?
                    <HistogramChart
                        data={data?.urgencyByDay}
                        options={urgencyByDayOptions}
                    />
                    : ""
            }
        </div>
        <div className="col-3 mt-4">
            {data ?
                    <DonutChart
                        data={data?.hospitalsByTransfers}
                        options={hospitalsByTransfersOptions}
                    />
                    : ""
            }
        </div>
        <div className="col-3 mt-4">
            {data ?
                    <PieChart
                        data={data?.hospitalsByWaitingTime}
                        options={hospitalsByWaitingTimeOptions}
                    />
                    : ""
            }
        </div>
        <div className="col-6 mt-4 d-flex  flex-column justify-content-between">
            <div>
                <h5 className="fw-400">Distância média percorrida pelas ambulâncias:</h5>
                <h3>{data?.averageDistance} km</h3>
            </div>
            <div>
                <h5 className="fw-400">Tempo médio de transferência:</h5>
                <h3>{data?.averageTransferTime} minutos</h3>
            </div>
            <div>
                <h5 className="fw-400">Paciente atendidos:</h5>
                <h3>{data?.numberOfPatients} pacientes</h3>
            </div>
            <div>
                <h5 className="fw-400">Número de transferências canceladas ou recusadas:</h5>
                <h3>{data?.cancelledOrRefusedTransfers} km</h3>
            </div>
        </div>
    </>
    );
 };

export default StatsDashboard;
