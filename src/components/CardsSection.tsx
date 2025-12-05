import Card from './Card';

export default function CardsSection() {
  const cardData = [
    {
      title: "Starter Plan",
      frontText: "Perfect for beginners",
      backText: "Includes basic features, 24/7 support, easy setup wizard, 10GB storage, and access to community resources. Get started in minutes!",
      color: "linear-gradient(135deg, #20B2AA 0%, #1a8f88 100%)"
    },
    {
      title: "Pro Plan",
      frontText: "For growing teams",
      backText: "Advanced features, real-time analytics, priority support, 100GB storage, custom integrations, and advanced security. Scale with confidence!",
      color: "linear-gradient(135deg, #4682B4 0%, #3a6a94 100%)"
    },
    {
      title: "Enterprise Plan",
      frontText: "Ultimate solution",
      backText: "Full customization, dedicated account manager, unlimited storage, premium tools, SLA guarantee, and white-label options. Enterprise-grade power!",
      color: "linear-gradient(135deg, #FFD700 0%, #e6c200 100%)"
    }
  ];

  return (
    <section className="cards-section">
      <div className="cards-header">
        <h2 className="cards-title">Choose Your Path to Greatness</h2>
        <p className="cards-subtitle">
          Select the package that matches your ambition. Click any card to reveal its full power.
        </p>
      </div>

      <div className="cards-container">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            frontText={card.frontText}
            backText={card.backText}
            color={card.color}
          />
        ))}
      </div>
    </section>
  );
}
