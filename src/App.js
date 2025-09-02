import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Daily from './pages/Daily';
import Logbook from './pages/Logbook';
import FillingLines from './pages/FillingLines';
import QC from './pages/QC';
import Manufacturing from './pages/Manufacturing';
import TankServices from './pages/TankServices';
import Support from './pages/Support';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        >
          <Route path="daily-checklist" element={<Daily />} />
          <Route path="logbook" element={<Logbook />} />
          <Route path="filling" element={<FillingLines />} />
          <Route path="qc" element={<QC />} />
          <Route path="manufacturing" element={<Manufacturing />} />
          <Route path="tank-services" element={<TankServices />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
