
import React from 'react';
import Modal from 'react-bootstrap/modal';

interface Props {
  show: boolean;
  onHide: () => void;
  pokemonData: any;
}

const carta: React.FC<Props> = ({ show, onHide, pokemonData }) => {
  const totalMoves = pokemonData?.moves.length || 0;

  const chunkArray = (arr: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < Math.min(arr.length, 15); i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const movesChunks = chunkArray(pokemonData?.moves || [], 3);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemonData?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={pokemonData?.sprites.front_default}
          alt={pokemonData?.name}
          className="img-fluid carta-image-size" // Ajusta el tamaño aquí
        />
        <hr />
        <p><strong>Altura:</strong> {pokemonData?.height / 10} m</p>
        <hr />
        <p><strong>Peso:</strong> {pokemonData?.weight / 10} kg</p>
        <hr />
        <p><strong>Tipo:</strong> {pokemonData?.types.map((type: any) => type.type.name).join(', ')}</p>
        <hr />
        <p><strong>Movimientos:</strong> {totalMoves}</p>
        <div className="row">
          {movesChunks.map((chunk, index) => (
            <div key={index} className="col">
              <ul>
                {chunk.map((move: any, moveIndex: number) => (
                  <li key={moveIndex}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr />
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default carta;