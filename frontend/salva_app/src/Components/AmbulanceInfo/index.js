import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Checkbox,
  RadioButtonGroup,
  RadioButton,
  Button
} from '@carbon/react';
import { Checkmark, ArrowLeft } from '@carbon/react/icons';
import './_index.scss'

const AmbulanceInfo = ({ onBack, onNext }) => {
  // Form data
  const [urgency, setUrgency] = useState("green");
  const [equipment, setEquipment] = useState([]);
  const [team, setTeam] = useState([]);
  const [paramedics, setParamedics] = useState(2);

  // Event handlers for form inputs
  const handleUrgencyChange = (e) => {
    setUrgency(e);
  };

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the value to the equipment array
      setEquipment([...equipment, value]);
    } else {
      // Remove the value from the equipment array
      setEquipment(equipment.filter((item) => item !== value));
    }
  };

  const handleTeamChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the value to the team array
      setTeam([...team, value]);
    } else {
      // Remove the value from the team array
      setTeam(team.filter((item) => item !== value));
    }
  };

  // Submissao dos dados no servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submits data to server
    console.log({
      urgency,
      equipment,
      team
    });
    alert("Form submitted!");
  };

  return (
    <div className="col bg-light mx-2 px-6 py-4 rounded-4 work-sans d-flex flex-column justify-content-between">
      <div>
        <div className="h2 ibm-plex">Especificações da Ambulância</div>

        <Form onSubmit={handleSubmit} className="row overflow-auto-y">
          <FormGroup className="col">
            <RadioButtonGroup
              id="urgency"
              legendText="Nível de Urgência"
              name="urgency"
              defaultSelected="red" 
              orientation="vertical"
              valueSelected={urgency}
              onChange={handleUrgencyChange}
              className="mb-3"
            >
              <RadioButton id="red" labelText="Vermelho: Imediato" value="red" className="text-red"/>
              <RadioButton id="orange" labelText="Laranja: Muito Urgente" value="orange" className="text-orange"/>
              <RadioButton id="yellow" labelText="Amarelo: Urgente" value="yellow" className="text-yellow"/>
              <RadioButton id="green" labelText="Verde: Pouco Urgente" value="green" className="text-green"/>
              <RadioButton id="blue" labelText="Azul: Sem Urgência" value="blue" className="text-blue"/>
            </RadioButtonGroup>
          </FormGroup>
          <FormGroup className="col">
            <legend className="cds--label" dir="auto">Equipamentos Necessários</legend>
            <Checkbox
              id="oxygen"
              labelText="Tanque de Oxigênio"
              value="oxygen"
              checked={equipment.includes("oxygen")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="defibrillator"
              labelText="Desfibrilador"
              value="defibrillator"
              checked={equipment.includes("defibrillator")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="prancha"
              labelText="Prancha rígida"
              value="prancha"
              checked={equipment.includes("prancha")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="stretcher"
              labelText="Maca"
              value="stretcher"
              checked={equipment.includes("stretcher")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="ked_adulto"
              labelText="KED adulto"
              value="ked_adulto"
              checked={equipment.includes("ked_adulto")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="ked_infantil"
              labelText="KED infantil"
              value="ked_infantil"
              checked={equipment.includes("ked_infantil")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="colar_cervical"
              labelText="Colar cervical"
              value="colar_cervical"
              checked={equipment.includes("colar_cervical")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="tala_femur"
              labelText="Tala de fêmur com alongador"
              value="tala_femur"
              checked={equipment.includes("tala_femur")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="tala_moldavel"
              labelText="Tala moldável"
              value="tala_moldavel"
              checked={equipment.includes("tala_moldavel")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="esfigmo_digital"
              labelText="Esfigmomanômetro digital"
              value="esfigmo_digital"
              checked={equipment.includes("esfigmo_digital")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="estetoscopio"
              labelText="Estestoscópio"
              value="estetoscopio"
              checked={equipment.includes("estetoscopio")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="oximetro_pulso"
              labelText="Oxímetro de pulso"
              value="oximetro_pulso"
              checked={equipment.includes("oximetro_pulso")}
              onChange={handleEquipmentChange}
            />
            <Checkbox
              id="desfibrilador"
              labelText="Desfibrilador"
              value="desfibrilador"
              checked={equipment.includes("desfibrilador")}
              onChange={handleEquipmentChange}
            />
          </FormGroup>
          <FormGroup className="col">
            <legend className="cds--label" dir="auto">Equipe de Transporte Adequada</legend>
            <Checkbox
              id="paramedic"
              labelText="Paramédico"
              value="paramedic"
              checked={team.includes("paramedic")}
              onChange={handleTeamChange}
            />
            <Checkbox
              id="physician"
              labelText="Médico"
              value="physician"
              checked={team.includes("physician")}
              onChange={handleTeamChange}
            />
            <Checkbox
              id="nurse"
              labelText="Enfermeiro"
              value="nurse"
              checked={team.includes("nurse")}
              onChange={handleTeamChange}
            />
            <Checkbox
              id="assistant"
              labelText="Auxiliar"
              value="assistant"
              checked={team.includes("assistant")}
              onChange={handleTeamChange}
            />
          </FormGroup>
        </Form>

      </div>
  
      <div className="row">
          <div className="col"><Button className="mt-3 w-100" renderIcon={ArrowLeft} onClick={onBack}>Voltar</Button></div>
          <div className="col d-flex justify-content-end"><Button type="submit" className="mt-3 w-100" renderIcon={Checkmark} onClick={onNext}>Confirmar</Button></div>
      </div>

    </div>
  );
};

export default AmbulanceInfo;
