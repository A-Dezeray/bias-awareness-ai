import { useState } from 'react'
import './SearchBias.css'

interface SearchResult {
  title: string
  source: string
  snippet: string
  bias: 'pro' | 'neutral' | 'con'
}

const SearchBias = () => {
  const [filterBubble, setFilterBubble] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<'climate' | 'healthcare' | 'ai'>('climate')

  const searchResults: Record<string, { balanced: SearchResult[]; biased: SearchResult[] }> = {
    climate: {
      balanced: [
        { title: 'Climate Change: Scientific Consensus and Evidence', source: 'Nature', snippet: 'Comprehensive analysis of peer-reviewed climate studies shows 97% agreement on human-caused warming...', bias: 'neutral' },
        { title: 'Economic Impacts of Climate Policy', source: 'World Bank', snippet: 'Evaluating both costs and benefits of climate action across different economic models...', bias: 'neutral' },
        { title: 'Renewable Energy: Progress and Challenges', source: 'IEEE', snippet: 'Technical assessment of renewable energy deployment, grid integration challenges, and cost trends...', bias: 'neutral' },
        { title: 'Climate Skeptics Raise Valid Questions on Models', source: 'Science Debate', snippet: 'Some researchers question certainty levels in long-term climate projections and feedback loops...', bias: 'con' },
      ],
      biased: [
        { title: 'Climate Crisis: Act Now or Face Disaster', source: 'EcoWarrior', snippet: 'We have only months left to save the planet. Anyone denying this is complicit in destruction...', bias: 'pro' },
        { title: 'Green Energy Will Save Humanity', source: 'Solar Future', snippet: 'Renewable energy is perfect and has no downsides. Oil companies are pure evil...', bias: 'pro' },
        { title: 'Why Climate Activists Are Right About Everything', source: 'GreenVoice', snippet: 'Every climate protest is justified. Anyone questioning methods is anti-science...', bias: 'pro' },
        { title: 'Climate Action: The Only Moral Choice', source: 'Earth Guardian', snippet: 'Supporting any fossil fuel use makes you morally bankrupt. No compromise is acceptable...', bias: 'pro' },
      ]
    },
    healthcare: {
      balanced: [
        { title: 'Comparing Healthcare Systems Worldwide', source: 'WHO', snippet: 'Analysis of universal healthcare, private systems, and hybrid models across 50 countries...', bias: 'neutral' },
        { title: 'Healthcare Policy: Trade-offs and Outcomes', source: 'JAMA', snippet: 'Examining cost, access, and quality outcomes across different healthcare policy approaches...', bias: 'neutral' },
        { title: 'Medicare Expansion: Budget and Coverage Analysis', source: 'CBO', snippet: 'Independent analysis of costs, coverage expansion, and fiscal implications of policy proposals...', bias: 'neutral' },
        { title: 'Private Healthcare: Efficiency and Innovation', source: 'Health Economics', snippet: 'Market-based approaches to healthcare have shown both successes and failures...', bias: 'neutral' },
      ],
      biased: [
        { title: 'Universal Healthcare: The Only Humane Option', source: 'HealthForAll', snippet: 'Anyone opposing universal healthcare wants poor people to die. There is no debate...', bias: 'pro' },
        { title: 'Why Private Healthcare Is Always Better', source: 'FreeMarketHealth', snippet: 'Government healthcare is socialist tyranny. Markets solve everything perfectly...', bias: 'con' },
        { title: 'Insurance Companies Are Evil Corporations', source: 'PatientFirst', snippet: 'Private insurance exists only to deny care and profit from suffering...', bias: 'pro' },
        { title: 'Government Healthcare Means Death Panels', source: 'Liberty Health', snippet: 'Universal healthcare will lead to rationing, waiting lists, and government control of life decisions...', bias: 'con' },
      ]
    },
    ai: {
      balanced: [
        { title: 'AI Progress: Capabilities and Limitations', source: 'MIT Technology Review', snippet: 'Current AI systems excel at pattern recognition but struggle with reasoning and common sense...', bias: 'neutral' },
        { title: 'AI Safety Research: Current State and Challenges', source: 'AI Alignment Forum', snippet: 'Researchers work on alignment problems while acknowledging uncertainty about timelines...', bias: 'neutral' },
        { title: 'AI in Healthcare: Promise and Pitfalls', source: 'Nature Medicine', snippet: 'AI diagnostic tools show potential but require careful validation and human oversight...', bias: 'neutral' },
        { title: 'Economic Impact of AI Automation', source: 'Brookings', snippet: 'AI will displace some jobs while creating others. Policy responses matter greatly...', bias: 'neutral' },
      ],
      biased: [
        { title: 'AI Will Destroy Humanity Unless We Stop Now', source: 'AI Doomers', snippet: 'Artificial general intelligence is imminent and will certainly kill us all. Shut it all down...', bias: 'con' },
        { title: 'AI Is Humanity\'s Salvation', source: 'Techno-Optimist', snippet: 'AI will solve every problem: disease, poverty, climate change. No concerns are valid...', bias: 'pro' },
        { title: 'Why AI Skeptics Are Luddites', source: 'Future Now', snippet: 'Anyone worried about AI safety is a fearmonger trying to hold back progress...', bias: 'pro' },
        { title: 'AI Apocalypse: The End Is Near', source: 'Tech Alarmist', snippet: 'Every AI advance brings us closer to extinction. Anyone building AI is reckless...', bias: 'con' },
      ]
    }
  }

  const currentResults = filterBubble
    ? searchResults[selectedTopic].biased
    : searchResults[selectedTopic].balanced

  const getBiasColor = (bias: 'pro' | 'neutral' | 'con') => {
    switch (bias) {
      case 'pro': return 'var(--accent-blue)'
      case 'neutral': return 'var(--accent-green)'
      case 'con': return 'var(--accent-orange)'
    }
  }

  const getBiasLabel = (bias: 'pro' | 'neutral' | 'con') => {
    switch (bias) {
      case 'pro': return 'Pro'
      case 'neutral': return 'Neutral'
      case 'con': return 'Con'
    }
  }

  return (
    <div className="search-bias-container fade-in-up">
      <div className="glass-card">
        <div className="demo-header">
          <h2>Search Result Bias</h2>
          <p className="demo-subtitle">
            Search algorithms can create "filter bubbles" by showing results that align with your
            existing views, reinforcing confirmation bias and polarization.
          </p>
        </div>

        <div className="search-controls">
          <div className="topic-selector">
            <button
              className={`glass-button ${selectedTopic === 'climate' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('climate')}
            >
              Climate Change
            </button>
            <button
              className={`glass-button ${selectedTopic === 'healthcare' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('healthcare')}
            >
              Healthcare Policy
            </button>
            <button
              className={`glass-button ${selectedTopic === 'ai' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('ai')}
            >
              AI Development
            </button>
          </div>

          <div className="filter-bubble-toggle">
            <span className={!filterBubble ? 'toggle-label active' : 'toggle-label'}>
              Balanced Results
            </span>
            <div
              className={`toggle-switch ${filterBubble ? 'active' : ''}`}
              onClick={() => setFilterBubble(!filterBubble)}
            />
            <span className={filterBubble ? 'toggle-label active' : 'toggle-label'}>
              Filter Bubble
            </span>
          </div>
        </div>

        <div className="search-results">
          {currentResults.map((result, index) => (
            <div key={index} className="result-card glass-card">
              <div className="result-header">
                <h4 className="result-title">{result.title}</h4>
                <span
                  className="bias-badge"
                  style={{ background: getBiasColor(result.bias) }}
                >
                  {getBiasLabel(result.bias)}
                </span>
              </div>
              <div className="result-source">{result.source}</div>
              <p className="result-snippet">{result.snippet}</p>
            </div>
          ))}
        </div>

        <div className="explanation-section">
          <div className="explanation-card glass-card">
            <h4>How Filter Bubbles Form</h4>
            <p>
              Search engines and social media platforms use algorithms to personalize content based on:
            </p>
            <br />
            <ul>
              <li><strong>Click history</strong> — What you've clicked on before</li>
              <li><strong>Browsing patterns</strong> — Sites you visit regularly</li>
              <li><strong>Social connections</strong> — What your network shares</li>
              <li><strong>Engagement signals</strong> — Content you spend time on</li>
              <li><strong>Location and demographics</strong> — Your profile characteristics</li>
            </ul>
            <br />
            <p>
              While personalization can be helpful, it can also create "echo chambers" where you only see
              information confirming your existing beliefs, making opposing viewpoints seem fringe or invalid.
            </p>
          </div>

          <div className="explanation-card glass-card">
            <h4>Why This Is Dangerous</h4>
            <div className="danger-list">
              <div className="danger-item">
                <span className="danger-icon">🎯</span>
                <div>
                  <strong>Confirmation Bias Amplified</strong>
                  <p>You only see evidence supporting what you already believe, making views seem more certain than warranted.</p>
                </div>
              </div>
              <div className="danger-item">
                <span className="danger-icon">⚔️</span>
                <div>
                  <strong>Increased Polarization</strong>
                  <p>Different groups see completely different "realities," making compromise and understanding nearly impossible.</p>
                </div>
              </div>
              <div className="danger-item">
                <span className="danger-icon">📉</span>
                <div>
                  <strong>Worse Decision-Making</strong>
                  <p>Without exposure to diverse viewpoints and counterarguments, we make less informed decisions.</p>
                </div>
              </div>
              <div className="danger-item">
                <span className="danger-icon">🗳️</span>
                <div>
                  <strong>Democratic Erosion</strong>
                  <p>Shared truth and common ground become impossible when citizens inhabit separate information ecosystems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="solution-section glass-card">
          <h4>What Engineers Can Do</h4>
          <div className="solution-grid">
            <div className="solution-item">
              <div className="solution-icon">🔍</div>
              <div>
                <h5>Diversify Ranking Signals</h5>
                <p>Don't optimize purely for engagement. Surface credible sources with diverse perspectives.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-icon">🏷️</div>
              <div>
                <h5>Label Personalization</h5>
                <p>Show users when results are personalized and offer options to see non-personalized versions.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-icon">📊</div>
              <div>
                <h5>Measure Diversity</h5>
                <p>Track viewpoint diversity in results and set minimum thresholds for contested topics.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-icon">🛡️</div>
              <div>
                <h5>Promote Source Quality</h5>
                <p>Reward verified journalism and academic sources over engagement-bait and misinformation.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-icon">🔄</div>
              <div>
                <h5>Break Bubbles Intentionally</h5>
                <p>Occasionally show high-quality content from outside user filter bubbles to encourage exposure to new ideas.</p>
              </div>
            </div>
            <div className="solution-item">
              <div className="solution-icon">📚</div>
              <div>
                <h5>Educate Users</h5>
                <p>Help users understand how algorithms work and how to actively seek diverse perspectives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBias
