import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import SkewedDataset from './components/SkewedDataset'
import FacialRecognition from './components/FacialRecognition'
import SearchBias from './components/SearchBias'
import HiringBias from './components/HiringBias'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import BackgroundEffect from './components/BackgroundEffect'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', title: 'Introduction' },
    { id: 'dataset', title: 'Skewed Datasets' },
    { id: 'facial', title: 'Facial Recognition' },
    { id: 'search', title: 'Search Bias' },
    { id: 'hiring', title: 'Hiring Algorithms' },
  ]

  return (
    <div className="app">
      <BackgroundEffect />

      <Navigation
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="main-content">
        <section id="hero" className="section">
          <Hero />
        </section>

        <section id="dataset" className="section">
          <SkewedDataset />
        </section>

        <section id="facial" className="section">
          <FacialRecognition />
        </section>

        <section id="search" className="section">
          <SearchBias />
        </section>

        <section id="hiring" className="section">
          <HiringBias />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
