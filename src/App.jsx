import { useState } from 'react'
import InputSection from './components/InputSection'
import GuideDisplay from './components/GuideDisplay'
import { generateProjectGuide } from './services/gemini'
import './styles/index.css'

function App() {
  const [guide, setGuide] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async (projectName, projectIdea) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await generateProjectGuide(projectName, projectIdea)
      setGuide(result)
    } catch (err) {
      setError(err.message || "Something went wrong. Please check your API key and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      {/* Background Ambience */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle at 50% 10%, rgba(130, 80, 255, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 90% 90%, rgba(0, 200, 255, 0.05) 0%, transparent 40%)
        `
      }} />

      {!guide ? (
        <div style={{ paddingTop: '5vh' }}>
          <InputSection onSubmit={handleGenerate} isLoading={isLoading} />
          {error && (
            <div style={{
              marginTop: '1rem',
              color: '#ff4d4d',
              background: 'rgba(255, 77, 77, 0.1)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 77, 77, 0.2)'
            }}>
              {error}
            </div>
          )}
        </div>
      ) : (
        <GuideDisplay guide={guide} onReset={() => setGuide(null)} />
      )}
    </div>
  )
}

export default App
