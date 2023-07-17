import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  SelectItem,
  Button
} from '@carbon/react';
import { ArrowRight, ArrowLeft } from '@carbon/react/icons';
import './_index.scss'

const PatientInfo = ({ onBack, onNext }) => {
  // Form data
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [bloodType, setBloodType] = useState("Desconhecido");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [conditions, setConditions] = useState("");
  const [glasgow, setGlasgow] = useState("1");
  const [bloodPressure, setBloodPressure] = useState(0);

  // Event handlers for form inputs
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleBloodTypeChange = (e) => {
    setBloodType(e.target.value);
  };

  const handleAllergiesChange = (e) => {
    setAllergies(e.target.value);
  };

  const handleMedicationsChange = (e) => {
    setMedications(e.target.value);
  };

  const handleConditionsChange = (e) => {
    setConditions(e.target.value);
  };

  const handleGlasgowChange = (e) => {
    setGlasgow(e.target.value);
  };

  const handleBloodPressure = (e) => {
    setBloodPressure(e.target.value);
  };

  // Submissao dos dados no servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submits data to server
    console.log({
      name,
      age,
      bloodType,
      allergies,
      medications,
      conditions,
      glasgow
    });
    alert("Formulario Cadastrado");
  };

  return (
    <div className="col bg-light mx-2 px-6 py-4 rounded-4 work-sans d-flex flex-column justify-content-between">
      <div>
        <div className="h2 ibm-plex">Informações do Paciente</div>

        <Form onSubmit={handleSubmit} className="row overflow-auto-y">
          <FormGroup className="col-12">
            <TextInput
              id="name"
              labelText="Nome do Paciente"
              value={name}
              onChange={handleNameChange}
              className="mb-2"
              required
            />
          </FormGroup>
          <FormGroup className="col">
            <Select
              id="blood-type"
              labelText="Tipo Sanguíneo"
              value={bloodType}
              onChange={handleBloodTypeChange}
              className="mb-2"
            >
              <SelectItem text="A+" value="A+" />
              <SelectItem text="A-" value="A-" />
              <SelectItem text="B+" value="B+" />
              <SelectItem text="B-" value="B-" />
              <SelectItem text="AB+" value="AB+" />
              <SelectItem text="AB-" value="AB-" />
              <SelectItem text="O+" value="O+" />
              <SelectItem text="O-" value="O-" />
              <SelectItem text="Desconhecido" value="Desconhecido" />
            </Select>
            <TextInput
              id="allergies"
              labelText="Alergias"
              value={allergies}
              onChange={handleAllergiesChange}
              className="mb-2"
            />
            <Select
              id="glasgow"
              labelText="Escala de Glasgow"
              value={glasgow}
              onChange={handleGlasgowChange}
              className="mb-2"
            >
              <SelectItem text="1" value="1" />
              <SelectItem text="2" value="2" />
              <SelectItem text="3" value="3" />
              <SelectItem text="4" value="4" />
              <SelectItem text="5" value="5" />
            </Select>
          </FormGroup>
          <FormGroup className="col">
            <NumberInput
              id="age"
              label="Idade"
              value={age}
              onChange={handleAgeChange}
              min={0}
              max={120}
              className="mb-2"
              required
            />
            <TextInput
              id="medications"
              labelText="Sensibilidade a Medicamentos"
              value={medications}
              onChange={handleMedicationsChange}
              className="mb-2"
            />
            <NumberInput
              id="bloodPressure"
              label="Pressão Arterial (mmHg)"
              value={bloodPressure}
              onChange={handleBloodPressure}
              min={0}
              max={200}
              className="mb-2"
              required
            />
          </FormGroup>
          <FormGroup className="col-12">
            <TextArea
              id="conditions"
              labelText="Condições Específicas"
              value={conditions}
              onChange={handleConditionsChange}
            />
          </FormGroup>
        </Form>
      </div>
  
      <div className="row">
          <div className="col"><Button className="mt-3 w-100" renderIcon={ArrowLeft} onClick={onBack}>Voltar</Button></div>
          <div className="col d-flex justify-content-end"><Button type="submit" className="mt-3 w-100" renderIcon={ArrowRight} onClick={onNext}>Continuar</Button></div>
      </div>

    </div>
  );
};

export default PatientInfo;