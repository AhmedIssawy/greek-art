import { useState } from 'react';
import './Card.css';

interface CardProps {
  title: string;
  frontText: string;
  backText: string;
  color: string;
}

export default function Card({ title, frontText, backText, color }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-wrapper" onClick={handleClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="card-face card-front" style={{ background: color }}>
          <h2 className="card-title">{title}</h2>
          <p className="card-front-text">{frontText}</p>
          <div className="card-divider"></div>
          <span className="card-hint">Click to see details</span>
        </div>

        {/* Back Side */}
        <div className="card-face card-back" style={{ background: color }}>
          <h2 className="card-title">{title}</h2>
          <p className="card-back-text">{backText}</p>
          <span className="card-hint">Click to flip back</span>
        </div>
      </div>
    </div>
  );
}
