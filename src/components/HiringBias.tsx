import { useState } from 'react'
import './HiringBias.css'

interface Candidate {
  name: string
  experience: number
  education: string
  skills: string[]
  gender: 'Male' | 'Female'
  age: number
  score: number
  biasedScore: number
}

const HiringBias = () => {
  const [useBiasedModel, setUseBiasedModel] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'gender' | 'age'>('all')

  const candidates: Candidate[] = [
    {
      name: 'Alex Johnson',
      experience: 8,
      education: 'BS Computer Science',
      skills: ['React', 'Node.js', 'AWS'],
      gender: 'Male',
      age: 32,
      score: 87,
      biasedScore: 92
    },
    {
      name: 'Sarah Martinez',
      experience: 9,
      education: 'MS Software Engineering',
      skills: ['Python', 'ML', 'Docker'],
      gender: 'Female',
      age: 34,
      score: 91,
      biasedScore: 79
    },
    {
      name: 'Marcus Chen',
      experience: 6,
      education: 'BS Computer Engineering',
      skills: ['Java', 'Spring', 'Kubernetes'],
      gender: 'Male',
      age: 28,
      score: 82,
      biasedScore: 85
    },
    {
      name: 'Emily Rodriguez',
      experience: 10,
      education: 'PhD Computer Science',
      skills: ['AI/ML', 'Research', 'Python'],
      gender: 'Female',
      age: 38,
      score: 94,
      biasedScore: 81
    },
    {
      name: 'James Wilson',
      experience: 7,
      education: 'BS Information Systems',
      skills: ['JavaScript', 'React', 'SQL'],
      gender: 'Male',
      age: 55,
      score: 85,
      biasedScore: 76
    },
    {
      name: 'Priya Patel',
      experience: 5,
      education: 'MS Data Science',
      skills: ['Python', 'TensorFlow', 'SQL'],
      gender: 'Female',
      age: 26,
      score: 79,
      biasedScore: 72
    }
  ]

  const sortedCandidates = [...candidates].sort((a, b) => {
    const scoreA = useBiasedModel ? a.biasedScore : a.score
    const scoreB = useBiasedModel ? b.biasedScore : b.score
    return scoreB - scoreA
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'var(--accent-green)'
    if (score >= 80) return 'var(--accent-blue)'
    if (score >= 70) return 'var(--accent-orange)'
    return 'var(--accent-red)'
  }

  const getGenderStats = () => {
    const maleAvg = candidates
      .filter(c => c.gender === 'Male')
      .reduce((sum, c) => sum + (useBiasedModel ? c.biasedScore : c.score), 0) / 3
    const femaleAvg = candidates
      .filter(c => c.gender === 'Female')
      .reduce((sum, c) => sum + (useBiasedModel ? c.biasedScore : c.score), 0) / 3
    return { male: maleAvg, female: femaleAvg }
  }

  const genderStats = getGenderStats()

  return (
    <div className="hiring-bias-container fade-in-up">
      <div className="glass-card">
        <div className="demo-header">
          <h2>Hiring Algorithm Bias</h2>
          <p className="demo-subtitle">
            AI hiring tools trained on historical data can perpetuate past discrimination,
            systematically disadvantaging qualified candidates based on gender, age, or other protected characteristics.
          </p>
        </div>

        <div className="hiring-controls">
          <div className="model-toggle">
            <span className={!useBiasedModel ? 'toggle-label active' : 'toggle-label'}>
              Fair Model
            </span>
            <div
              className={`toggle-switch ${useBiasedModel ? 'active' : ''}`}
              onClick={() => setUseBiasedModel(!useBiasedModel)}
            />
            <span className={useBiasedModel ? 'toggle-label active' : 'toggle-label'}>
              Biased Model (Historical Data)
            </span>
          </div>

          <div className="metric-selector">
            <button
              className={`glass-button ${selectedMetric === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('all')}
            >
              All Candidates
            </button>
            <button
              className={`glass-button ${selectedMetric === 'gender' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('gender')}
            >
              Gender Analysis
            </button>
            <button
              className={`glass-button ${selectedMetric === 'age' ? 'active' : ''}`}
              onClick={() => setSelectedMetric('age')}
            >
              Age Analysis
            </button>
          </div>
        </div>

        {selectedMetric === 'all' && (
          <div className="candidates-list">
            {sortedCandidates.map((candidate, index) => {
              const currentScore = useBiasedModel ? candidate.biasedScore : candidate.score
              const scoreDiff = candidate.biasedScore - candidate.score
              return (
                <div key={index} className="candidate-card glass-card">
                  <div className="candidate-rank">#{index + 1}</div>
                  <div className="candidate-info">
                    <h4 className="candidate-name">{candidate.name}</h4>
                    <div className="candidate-details">
                      <span>{candidate.education}</span>
                      <span>{candidate.experience} years exp</span>
                      <span>{candidate.gender}, {candidate.age}</span>
                    </div>
                    <div className="candidate-skills">
                      {candidate.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="candidate-score">
                    <div className="score-circle" style={{ borderColor: getScoreColor(currentScore) }}>
                      <span className="score-value" style={{ color: getScoreColor(currentScore) }}>
                        {currentScore}
                      </span>
                    </div>
                    {scoreDiff !== 0 && useBiasedModel && (
                      <div className={`score-change ${scoreDiff > 0 ? 'positive' : 'negative'}`}>
                        {scoreDiff > 0 ? '+' : ''}{scoreDiff}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {selectedMetric === 'gender' && (
          <div className="analysis-section">
            <div className="stat-comparison">
              <div className="stat-card glass-card">
                <h4>Male Candidates</h4>
                <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>
                  {genderStats.male.toFixed(1)}
                </div>
                <p>Average Score</p>
              </div>
              <div className="stat-card glass-card">
                <h4>Female Candidates</h4>
                <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>
                  {genderStats.female.toFixed(1)}
                </div>
                <p>Average Score</p>
              </div>
              <div className="stat-card glass-card">
                <h4>Score Gap</h4>
                <div className="stat-value" style={{ color: 'var(--accent-red)' }}>
                  {Math.abs(genderStats.male - genderStats.female).toFixed(1)}
                </div>
                <p>Points Difference</p>
              </div>
            </div>

            <div className="explanation-card glass-card">
              <h4>What You're Seeing</h4>
              <p>
                {useBiasedModel ? (
                  <>
                    The <strong>biased model</strong> was trained on historical hiring data from a company that
                    historically hired more men. The AI learned to associate being male with being a "good hire"
                    — not because of actual job performance, but because of past discrimination.
                  </>
                ) : (
                  <>
                    The <strong>fair model</strong> evaluates candidates purely on experience, education, and skills.
                    Notice how female candidates score higher on average because they have stronger qualifications
                    in this sample.
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {selectedMetric === 'age' && (
          <div className="analysis-section">
            <div className="age-chart">
              {sortedCandidates.map((candidate, index) => {
                const currentScore = useBiasedModel ? candidate.biasedScore : candidate.score
                return (
                  <div key={index} className="age-data-point">
                    <div
                      className="age-dot"
                      style={{
                        backgroundColor: getScoreColor(currentScore),
                        left: `${(candidate.age - 25) * 3}%`,
                        bottom: `${currentScore}%`
                      }}
                    >
                      <div className="age-tooltip">
                        {candidate.name}<br />
                        Age: {candidate.age}<br />
                        Score: {currentScore}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="age-chart-axes">
                <div className="y-axis-label">Score</div>
                <div className="x-axis-label">Age</div>
              </div>
            </div>

            <div className="explanation-card glass-card">
              <h4>Age Bias Pattern</h4>
              <p>
                {useBiasedModel ? (
                  <>
                    The biased model penalizes older candidates (50+) despite their experience and qualifications.
                    This reflects historical age discrimination in hiring decisions that the AI learned to replicate.
                  </>
                ) : (
                  <>
                    In the fair model, age doesn't artificially affect scores. Candidates are evaluated on merit,
                    and experience often correlates positively with performance.
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        <div className="explanation-section">
          <div className="explanation-card glass-card">
            <h4>How This Happens</h4>
            <p>
              Companies train AI on past hiring decisions to "learn what a good hire looks like."
              But if the company's past hiring was discriminatory, the AI learns discrimination:
            </p>
            <br />
            <ul>
              <li>Historical male-dominated workplaces → AI learns "male = qualified"</li>
              <li>Past age discrimination → AI learns "older = less capable"</li>
              <li>Homogeneous hiring patterns → AI penalizes diversity</li>
              <li>Systemic barriers in education → AI perpetuates access gaps</li>
            </ul>
            <br />
            <p>
              The algorithm isn't "fair" just because it's automated. It's a mirror reflecting past injustice.
            </p>
          </div>

          <div className="explanation-card glass-card">
            <h4>Real-World Example: Amazon</h4>
            <p>
              In 2018, Amazon scrapped an AI recruiting tool after discovering it was biased against women.
              The system was trained on resumes submitted over 10 years — mostly from men. It learned to:
            </p>
            <br />
            <ul>
              <li>Penalize resumes containing the word "women's" (as in "women's chess club")</li>
              <li>Downrank graduates of all-women's colleges</li>
              <li>Favor male-dominated language patterns and experiences</li>
            </ul>
            <br />
            <p>
              Amazon's engineers tried to fix it, but ultimately concluded the system couldn't be trusted.
              This is a case where <strong>not deploying</strong> was the responsible choice.
            </p>
          </div>
        </div>

        <div className="solution-section glass-card">
          <h4>What Engineers Must Do</h4>
          <div className="solution-grid">
            <div className="solution-item">
              <div className="solution-number">1</div>
              <div>
                <h5>Audit Training Data</h5>
                <p>
                  Examine historical hiring decisions for patterns of discrimination before using them to train AI.
                </p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">2</div>
              <div>
                <h5>Remove Protected Attributes</h5>
                <p>
                  Exclude gender, age, race, etc. from training data — but watch for proxy variables that correlate.
                </p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">3</div>
              <div>
                <h5>Test for Disparate Impact</h5>
                <p>
                  Measure whether the system produces different outcomes for different demographic groups.
                </p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">4</div>
              <div>
                <h5>Human-in-the-Loop</h5>
                <p>
                  Use AI as a tool to assist human decision-makers, not as an autonomous hiring system.
                </p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">5</div>
              <div>
                <h5>Diverse Development Teams</h5>
                <p>
                  Teams with diverse perspectives are more likely to spot bias before it ships.
                </p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-number">6</div>
              <div>
                <h5>Provide Explainability</h5>
                <p>
                  Candidates should understand how decisions are made and have pathways to appeal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HiringBias
