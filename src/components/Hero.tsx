import './Hero.css'

const Hero = () => {
  return (
    <div className="hero-container fade-in-up">
      <div className="glass-card hero-card">
        <h1 className="hero-title">
          Understanding Bias in AI
        </h1>
        <p className="hero-subtitle">
          An interactive guide to recognizing and addressing bias in artificial intelligence systems
        </p>

        <div className="hero-description">
          <p>
            AI systems learn from data. When that data is incomplete, skewed, or reflects historical prejudices,
            the AI inherits those biases — often amplifying them in ways that harm real people.
          </p>
          <p>
            This guide shows you how bias emerges in AI systems and what engineers can do to build more
            responsible, equitable technology.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card glass-card">
            <div className="stat-number">80%</div>
            <div className="stat-label">of AI researchers acknowledge bias as a major concern</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number">5x</div>
            <div className="stat-label">higher error rate for darker-skinned faces in some systems</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-number">73%</div>
            <div className="stat-label">of hiring managers use AI tools that may contain bias</div>
          </div>
        </div>

        <div className="hero-cta">
          <button
            className="glass-button"
            onClick={() => document.getElementById('dataset')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Interactive Examples
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
