import { useState } from 'react';
import './Card.css';

interface CardProps {
  title: string;
  frontText: string;
  backText: string;
}

export default function Card({ title, frontText, backText }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-wrapper" onClick={handleClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="card-face card-front" style={{ backgroundImage: 'url(/card1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="card-overlay"></div>
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-front-text">{frontText}</p>
            <div className="card-divider"></div>
          </div>
        </div>

        {/* Back Side */}
        <div className="card-face card-back" style={{ backgroundImage: 'url(/card1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="card-overlay"></div>
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-back-text">{backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
