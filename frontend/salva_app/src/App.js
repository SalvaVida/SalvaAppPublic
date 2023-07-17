// routing
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// components
import Chamado from './Pages/Chamado';
import Login from './Pages/Login';
import Viagens from "./Pages/Viagens";
import Estatisticas from "./Pages/Estatisticas";
import Test from "./Pages/Test";

// styling
// import './App.css';

function App() {
  return (
    <Router>
      <div className="App">

        {/* Screen Switcher */}
        <Routes>
          <Route path="/chamado" element={<Chamado/>} />
          <Route path="/viagens" element={<Viagens/>} />
          <Route path="/estatisticas" element={<Estatisticas/>} />
          <Route path="/test" element={<Test />} />
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
