

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import SettingsPage from './pages/SettingsPage';
import ProofPage from './pages/ProofPage';
import TestPage from './pages/TestPage';
import ShipPage from './pages/ShipPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="digest" element={<DigestPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="jt/proof" element={<ProofPage />} />
          <Route path="jt/07-test" element={<TestPage />} />
          <Route path="jt/08-ship" element={<ShipPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
