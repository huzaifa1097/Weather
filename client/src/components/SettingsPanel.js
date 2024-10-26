import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ tempThreshold, setTempThreshold }) => {
  const [localThreshold, setLocalThreshold] = useState(tempThreshold);

  // Sync local threshold with prop whenever tempThreshold changes
  useEffect(() => {
    setLocalThreshold(tempThreshold);
  }, [tempThreshold]);

  const handleThresholdChange = (e) => {
    setLocalThreshold(e.target.value);
  };

  const applyThreshold = () => {
    setTempThreshold(Number(localThreshold));
  };

  return (
    <div className="settings-panel">
      {/* <h2>Settings</h2>
      <label>
        Temperature Alert Threshold (°C):
        <input
          type="number"
          value={localThreshold}
          onChange={handleThresholdChange}
        />
      </label>
      <button onClick={applyThreshold}>Apply</button> */}
    </div>
  );
};

export default SettingsPanel;
