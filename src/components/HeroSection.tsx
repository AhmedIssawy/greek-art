export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Welcome to Divine Power</h1>
          <p className="hero-subtitle">
            Unleash the strength of the sea god himself. Experience unparalleled excellence 
            with our premium solutions crafted for those who demand the extraordinary.
          </p>
          <p className="hero-description">
            From the depths of innovation rises a platform that commands respect and delivers results. 
            Join the pantheon of satisfied clients who have harnessed legendary performance.
          </p>
          <a href="https://ahmedissawy.engineer" target="_blank" rel="noopener noreferrer" className="hero-cta-link">
            <button className="hero-cta">
              Explore Packages
            </button>
          </a>
        </div>

        <div className="hero-image-container">
          <img 
            src="https://res.cloudinary.com/dmtdjxpwt/image/upload/v1764976436/Adobe_Express_-_file_2_yqktbf.avif" 
            alt="Poseidon - God of the Sea" 
            className="hero-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
