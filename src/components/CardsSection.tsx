import Card from './Card';

export default function CardsSection() {
  const cardData = [
    {
      title: "Starter Plan",
      frontText: "Perfect for beginners",
      backText: "Includes basic features, 24/7 support, easy setup wizard, 10GB storage, and access to community resources. Get started in minutes!"
    },
    {
      title: "Pro Plan",
      frontText: "For growing teams",
      backText: "Advanced features, real-time analytics, priority support, 100GB storage, custom integrations, and advanced security. Scale with confidence!"
    },
    {
      title: "Enterprise Plan",
      frontText: "Ultimate solution",
      backText: "Full customization, dedicated account manager, unlimited storage, premium tools, SLA guarantee, and white-label options. Enterprise-grade power!"
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
          />
        ))}
      </div>
    </section>
  );
}
