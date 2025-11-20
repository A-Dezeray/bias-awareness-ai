import { useState } from 'react'
import './FacialRecognition.css'

interface DemographicData {
  name: string
  trainingSamples: number
  accuracy: number
  falsePositiveRate: number
  color: string
}

const FacialRecognition = () => {
  const [showBalanced, setShowBalanced] = useState(false)

  const biasedData: DemographicData[] = [
    {
      name: 'Light-skinned Males',
      trainingSamples: 8500,
      accuracy: 94.2,
      falsePositiveRate: 0.8,
      color: 'var(--accent-blue)'
    },
    {
      name: 'Light-skinned Females',
      trainingSamples: 7200,
      accuracy: 92.7,
      falsePositiveRate: 1.2,
      color: 'var(--accent-purple)'
    },
    {
      name: 'Dark-skinned Males',
      trainingSamples: 1800,
      accuracy: 76.5,
      falsePositiveRate: 6.4,
      color: 'var(--accent-orange)'
    },
    {
      name: 'Dark-skinned Females',
      trainingSamples: 1200,
      accuracy: 65.3,
      falsePositiveRate: 12.7,
      color: 'var(--accent-red)'
    }
  ]

  const balancedData: DemographicData[] = [
    {
      name: 'Light-skinned Males',
      trainingSamples: 5000,
      accuracy: 91.5,
      falsePositiveRate: 1.1,
      color: 'var(--accent-blue)'
    },
    {
      name: 'Light-skinned Females',
      trainingSamples: 5000,
      accuracy: 90.8,
      falsePositiveRate: 1.3,
      color: 'var(--accent-purple)'
    },
    {
      name: 'Dark-skinned Males',
      trainingSamples: 5000,
      accuracy: 89.7,
      falsePositiveRate: 1.5,
      color: 'var(--accent-orange)'
    },
    {
      name: 'Dark-skinned Females',
      trainingSamples: 5000,
      accuracy: 88.4,
      falsePositiveRate: 1.8,
      color: 'var(--accent-red)'
    }
  ]

  const currentData = showBalanced ? balancedData : biasedData
  const maxSamples = Math.max(...biasedData.map(d => d.trainingSamples))

  return (
    <div className="facial-recognition-container fade-in-up">
      <div className="glass-card">
        <div className="demo-header">
          <h2>Facial Recognition Bias</h2>
          <p className="demo-subtitle">
            Real-world facial recognition systems show dramatically different accuracy rates
            across demographic groups, with serious consequences for privacy and civil rights.
          </p>
        </div>

        <div className="toggle-container">
          <span className={!showBalanced ? 'toggle-label active' : 'toggle-label'}>
            Biased Dataset
          </span>
          <div
            className={`toggle-switch ${showBalanced ? 'active' : ''}`}
            onClick={() => setShowBalanced(!showBalanced)}
          />
          <span className={showBalanced ? 'toggle-label active' : 'toggle-label'}>
            Balanced Dataset
          </span>
        </div>

        <div className="metrics-grid">
          {currentData.map((demographic, index) => (
            <div key={index} className="metric-card glass-card" style={{ '--accent': demographic.color } as React.CSSProperties}>
              <h4 className="metric-title">{demographic.name}</h4>

              <div className="metric-item">
                <span className="metric-label">Training Samples</span>
                <div className="sample-bar-container">
                  <div
                    className="sample-bar"
                    style={{
                      width: `${(demographic.trainingSamples / maxSamples) * 100}%`,
                      background: demographic.color
                    }}
                  />
                  <span className="metric-value">{demographic.trainingSamples.toLocaleString()}</span>
                </div>
              </div>

              <div className="metric-item">
                <span className="metric-label">Accuracy</span>
                <div className="circular-progress">
                  <svg className="progress-ring" width="80" height="80">
                    <circle
                      className="progress-ring-circle-bg"
                      cx="40"
                      cy="40"
                      r="32"
                    />
                    <circle
                      className="progress-ring-circle"
                      cx="40"
                      cy="40"
                      r="32"
                      stroke={demographic.color}
                      strokeDasharray={`${demographic.accuracy * 2.01} 201`}
                    />
                  </svg>
                  <span className="progress-text">{demographic.accuracy}%</span>
                </div>
              </div>

              <div className="metric-item">
                <span className="metric-label">False Positive Rate</span>
                <div className="false-positive-indicator">
                  <div
                    className="false-positive-bar"
                    style={{
                      height: `${Math.min(demographic.falsePositiveRate * 7, 100)}%`,
                      background: demographic.falsePositiveRate > 5
                        ? 'var(--accent-red)'
                        : demographic.falsePositiveRate > 2
                        ? 'var(--accent-orange)'
                        : 'var(--accent-green)'
                    }}
                  />
                  <span className="metric-value">{demographic.falsePositiveRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="explanation-section">
          <div className="explanation-card glass-card">
            <h4>The Problem</h4>
            <p>
              Studies like the MIT/Stanford Gender Shades research found that commercial facial recognition
              systems had error rates up to <strong>34% higher</strong> for darker-skinned women compared to
              lighter-skinned men.
            </p>
            <p>
              This isn't a technical limitation — it's a data problem. Training sets were historically
              dominated by lighter-skinned faces, causing systems to:
            </p>
            <br />
            <ul>
              <li>Misidentify or fail to detect darker-skinned individuals</li>
              <li>Generate higher false positive rates in law enforcement use</li>
              <li>Exclude people from services requiring facial authentication</li>
              <li>Perpetuate surveillance disparities across communities</li>
            </ul>
          </div>

          <div className="explanation-card glass-card">
            <h4>Real-World Impact</h4>
            <div className="impact-list">
              <div className="impact-item">
                <span className="impact-icon">⚖️</span>
                <div>
                  <strong>Criminal Justice</strong>
                  <p>False matches have led to wrongful arrests, with documented cases of innocent people detained based on faulty facial recognition.</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🏢</span>
                <div>
                  <strong>Access Control</strong>
                  <p>Building security systems may fail to recognize authorized darker-skinned employees, creating daily frustration and exclusion.</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">📱</span>
                <div>
                  <strong>Consumer Products</strong>
                  <p>Phone unlocking, photo tagging, and filters work worse for underrepresented groups, signaling who products were designed for.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="solution-section glass-card">
          <h4>What Engineers Must Do</h4>
          <div className="solution-grid">
            <div className="solution-item">
              <div className="solution-number">1</div>
              <div className="solution-content">
                <h5>Diversify Training Data</h5>
                <p>Actively collect balanced datasets across skin tones, ages, genders, and lighting conditions.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">2</div>
              <div className="solution-content">
                <h5>Measure Disaggregated Performance</h5>
                <p>Test accuracy separately for each demographic group — not just overall system performance.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">3</div>
              <div className="solution-content">
                <h5>Apply Fairness Constraints</h5>
                <p>Set minimum accuracy thresholds for all groups and retrain when disparities emerge.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">4</div>
              <div className="solution-content">
                <h5>Enable Human Review</h5>
                <p>Never deploy facial recognition for high-stakes decisions without human oversight and appeal processes.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">5</div>
              <div className="solution-content">
                <h5>Document Limitations</h5>
                <p>Be transparent about known biases and performance gaps in system documentation.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">6</div>
              <div className="solution-content">
                <h5>Consider Not Building It</h5>
                <p>Some use cases (mass surveillance, predictive policing) may cause more harm than benefit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacialRecognition
