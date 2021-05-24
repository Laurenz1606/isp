import React, { useState } from "react";

export default function ModalRoleCheck({ text }) {
  const [checked, setChecked] = useState(false);
  return (
    <label className="container-check">
      {text}
      <input
        type="checkbox"
        name={text}
        value={checked}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span className="checkmark" />
    </label>
  );
}
