import PlaceholderAmbulance from '../PlaceholderAmbulance';
import VerticalProgress from '../VerticalProgress';
import { useNavigate } from "react-router-dom";
import mockup from '../../images/mockup_1.png';

const AmbulanceSelector = ({selectedHospital, selectedAmbulance, setSelectedAmbulance}) => {
  const navigate = useNavigate();

  return (
    <>
        { selectedHospital ?
            <div className="card shadow border-0 rounded-4 bg-frost">
              
              <div className="card-body">
                <h4 className='fw-600 open-sans'>5 Ambulâncias Disponíveis</h4>
                <div className='d-flex justify-content-between mt-3'>
                  <h6 className='fw-500 open-sans text-muted d-inline'><i class="bi bi-person-circle me-2"></i>Hospital Sancta Maggiore</h6>
                  <i class="bi bi-arrow-right"></i>
                  <h6 className='fw-600 open-sans text-primary d-inline'><i class="bi bi-geo-alt-fill me-1"></i>{selectedHospital.properties.name}</h6>
                </div>

                <img src={mockup} />

                {/* <PlaceholderAmbulance aid={"1"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                <PlaceholderAmbulance aid={"2"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                <PlaceholderAmbulance aid={"3"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                <PlaceholderAmbulance aid={"4"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                <PlaceholderAmbulance aid={"5"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>

                {selectedAmbulance ? <button type="submit" class="btn btn-primary mt-3 w-100 rounded-pill" onClick={() => navigate('/chamado')}>Chamar ambulância {selectedAmbulance}</button> : <></>} */}


                {/* <div className="sidebar ambulances">
                  <div>Ambulâncias disponíveis para o trajeto selecionado:</div>

                  <PlaceholderAmbulance aid={"1"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                  <PlaceholderAmbulance aid={"2"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                  <PlaceholderAmbulance aid={"3"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                  <PlaceholderAmbulance aid={"4"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>
                  <PlaceholderAmbulance aid={"5"} selectedAmbulance={selectedAmbulance} setSelectedAmbulance={setSelectedAmbulance}/>

                  {selectedAmbulance ? <button>Chamar ambulância {selectedAmbulance}</button> : <></>}
                </div> */}
              </div>
            </div>
            :
            <></>
        }
    </>
  );
}

export default AmbulanceSelector;
