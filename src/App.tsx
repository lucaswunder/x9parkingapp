import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login.component';
import HomePage from './pages/home.component';
import LoggedInPage from './pages/loggedin.component';
import QRCodePage from './pages/qrcode.component';

// import QRCodeScanner from './pages/QRCodeScanner';
// import ReportPlate from './pages/ReportPlate';

const App: React.FC = () => {
  return (
    <Routes> {/* Define your routes here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loggedin" element={<LoggedInPage />} />
      <Route path="/scan-qr" element={<QRCodePage />} />
    </Routes>
  );
};

export default App;
