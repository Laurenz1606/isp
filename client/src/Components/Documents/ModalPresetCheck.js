import React from "react";

export default function ModalPresetCheck({ presets, setPreset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreset({ name, value });
  };
  return (
    <div className="space-y-5">
      {presets !== null
        ? presets.map((data, key) => (
            <label key={key} className="container-check">
              {data.name}
              <input
                type="radio"
                name={data.name}
                value={data.presetID}
                id={data.presetID}
                onChange={handleChange}
              />
              <span className="checkmark" />
            </label>
          ))
        : "Loading"}
    </div>
  );
}
