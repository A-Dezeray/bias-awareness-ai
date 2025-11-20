import { useState } from 'react'
import './SkewedDataset.css'

const SkewedDataset = () => {
  const [groupAPercentage, setGroupAPercentage] = useState(50)
  const groupBPercentage = 100 - groupAPercentage

  const calculateAccuracy = (percentage: number, isAdvantaged: boolean) => {
    const baseline = 85
    const deviation = Math.abs(50 - percentage)

    if (isAdvantaged) {
      // Group with more data gets better accuracy
      const boost = deviation * 0.2
      return Math.min(95, baseline + boost)
    } else {
      // Group with less data suffers accuracy loss
      const penalty = deviation * 0.8
      return Math.max(45, baseline - penalty)
    }
  }

  const groupAAccuracy = calculateAccuracy(groupAPercentage, groupAPercentage >= 50)
  const groupBAccuracy = calculateAccuracy(groupBPercentage, groupBPercentage >= 50)

  const getBiasLevel = () => {
    const difference = Math.abs(groupAAccuracy - groupBAccuracy)
    if (difference < 5) return { level: 'Low', color: 'var(--accent-green)' }
    if (difference < 15) return { level: 'Moderate', color: 'var(--accent-orange)' }
    return { level: 'High', color: 'var(--accent-red)' }
  }

  const biasLevel = getBiasLevel()

  return (
    <div className="bias-demo-container fade-in-up">
      <div className="glass-card">
        <div className="demo-header">
          <h2>Skewed Datasets</h2>
          <p className="demo-subtitle">
            When training data is imbalanced, AI systems become better at recognizing
            overrepresented groups and worse at recognizing underrepresented ones.
          </p>
        </div>

        <div className="interactive-section">
          <div className="control-panel">
            <h3>Training Data Composition</h3>
            <p className="control-description">
              Adjust the slider to change the balance of data between two groups:
            </p>

            <div className="slider-container">
              <div className="slider-labels">
                <span>Group A: {groupAPercentage}%</span>
                <span>Group B: {groupBPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={groupAPercentage}
                onChange={(e) => setGroupAPercentage(Number(e.target.value))}
                className="dataset-slider"
              />
              <div className="slider-visual">
                <div
                  className="slider-fill group-a"
                  style={{ width: `${groupAPercentage}%` }}
                />
                <div
                  className="slider-fill group-b"
                  style={{ width: `${groupBPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="results-panel">
            <h3>Model Performance</h3>
            <p className="control-description">
              See how the skewed dataset affects accuracy for each group:
            </p>

            <div className="accuracy-bars">
              <div className="accuracy-row">
                <span className="accuracy-label">Group A Accuracy</span>
                <div className="accuracy-bar-container">
                  <div
                    className="accuracy-bar"
                    style={{
                      width: `${groupAAccuracy}%`,
                      background: groupAAccuracy > 75 ? 'var(--accent-green)' : 'var(--accent-red)'
                    }}
                  />
                  <span className="accuracy-value">{groupAAccuracy.toFixed(1)}%</span>
                </div>
              </div>

              <div className="accuracy-row">
                <span className="accuracy-label">Group B Accuracy</span>
                <div className="accuracy-bar-container">
                  <div
                    className="accuracy-bar"
                    style={{
                      width: `${groupBAccuracy}%`,
                      background: groupBAccuracy > 75 ? 'var(--accent-green)' : 'var(--accent-red)'
                    }}
                  />
                  <span className="accuracy-value">{groupBAccuracy.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bias-indicator" style={{ borderColor: biasLevel.color }}>
              <span className="bias-label">Bias Level:</span>
              <span className="bias-value" style={{ color: biasLevel.color }}>
                {biasLevel.level}
              </span>
            </div>
          </div>
        </div>

        <div className="explanation-section">
          <div className="explanation-card glass-card">
            <h4>Why This Matters</h4>
            <p>
              When a dataset is skewed (like 80/20 or 90/10), the AI learns patterns primarily from the
              majority group. The minority group doesn't have enough examples for the system to learn their
              patterns effectively. This leads to:
            </p>
            <br />
            <ul>
              <li><strong>Higher error rates</strong> for underrepresented groups</li>
              <li><strong>False positives/negatives</strong> that disproportionately affect minorities</li>
              <li><strong>Reinforcement of existing inequalities</strong> when deployed</li>
              <li><strong>Loss of trust</strong> from affected communities</li>
            </ul>
          </div>

          <div className="explanation-card glass-card">
            <h4>What Engineers Can Do</h4>
            <ul>
              <li><strong>Audit your datasets</strong> — Check representation across demographic groups</li>
              <li><strong>Collect more diverse data</strong> — Actively seek underrepresented examples</li>
              <li><strong>Use data augmentation</strong> — Carefully generate synthetic examples for minority groups</li>
              <li><strong>Apply fairness metrics</strong> — Measure performance differences across groups</li>
              <li><strong>Weighted sampling</strong> — Balance training by oversampling minority groups</li>
              <li><strong>Test on diverse datasets</strong> — Validate performance before deployment</li>
            </ul>
          </div>
        </div>

        <div className="real-world-examples">
          <h4>Real-World Examples</h4>
          <div className="example-grid">
            <div className="example-card glass-card">
              <div className="example-icon">👨‍⚕️</div>
              <h5>Healthcare AI</h5>
              <p>
                Diagnostic systems trained primarily on one demographic can miss symptoms or misdiagnose
                conditions in underrepresented groups, leading to worse health outcomes.
              </p>
            </div>
            <div className="example-card glass-card">
              <div className="example-icon">🚗</div>
              <h5>Autonomous Vehicles</h5>
              <p>
                Self-driving car systems trained mostly in sunny weather may fail to recognize pedestrians
                in rain or snow, creating safety risks.
              </p>
            </div>
            <div className="example-card glass-card">
              <div className="example-icon">🗣️</div>
              <h5>Voice Recognition</h5>
              <p>
                Speech-to-text systems perform worse for non-native speakers and certain accents when
                training data lacks diversity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkewedDataset
