import React, { useState } from 'react';

interface GeneracionProps {
  onGeneracionChange: (generacion: number) => void;
}

const Generacion: React.FC<GeneracionProps> = ({ onGeneracionChange }) => {
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState<number | null>(null);

  const handleGeneracionChange = (generacion: number) => {
    setGeneracionSeleccionada(generacion);
    onGeneracionChange(generacion);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="generacionDropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {generacionSeleccionada !== null ? `Generación ${generacionSeleccionada}` : 'Generación'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="generacionDropdown">
        <li>
          <button className="dropdown-item" onClick={() => handleGeneracionChange(1)}>
            Generación 1
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleGeneracionChange(2)}>
            Generación 2
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleGeneracionChange(3)}>
            Generación 3
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleGeneracionChange(4)}>
            Generación 4
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleGeneracionChange(5)}>
            Generación 5
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Generacion;
