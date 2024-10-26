import React, { useState } from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

const App = () => {
  const [tempThreshold, setTempThreshold] = useState(35);

  return (
    <div>
      <WeatherDashboard tempThreshold={tempThreshold} />
      <SettingsPanel tempThreshold={tempThreshold} setTempThreshold={setTempThreshold} />
    </div>
  );
};

export default App;
