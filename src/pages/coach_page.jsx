import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export const CoachPage = () => {
  const {
    userProfile,
    coachHistory,
    officialSources,
    askCoachQuestion,
    updateUserProfile
  } = useApp()

  const [customQuestion, setCustomQuestion] = useState('')

  const quickQuestions = [
    '¿Cómo voy con mi meta de proteína?',
    `¿Cuánta agua debo tomar hoy en ${userProfile.preferredWaterUnit}?`,
    '¿Cuántas calorías me quedan disponibles hoy?',
    '¿Qué comer rápido en semana de certámenes?'
  ]

  const handleAsk = (e) => {
    e.preventDefault()
    if (!customQuestion.trim()) return
    askCoachQuestion(customQuestion)
    setCustomQuestion('')
  }

  return (
    <section className='page-section'>
      <div className='section-card'>
        <span className='section-card__eyebrow'>META 2 · CONSULTOR BASADO EN EVIDENCIA</span>
        <h2 className='section-card__title'>Pregunta lo que ibas a buscar en un foro</h2>
        <p className='section-card__subtitle'>
          Respuestas personalizadas según tu registro semanal y respaldadas por fuentes oficiales.
        </p>

        <div className='unit-selector-bar'>
          <span>Unidad para líquidos:</span>
          <div className='unit-selector-bar__buttons'>
            <button
              type='button'
              className={`unit-pill ${userProfile.preferredWaterUnit === 'litros' ? 'unit-pill--active' : ''}`}
              onClick={() => updateUserProfile({ preferredWaterUnit: 'litros' })}
            >
              Litros (L)
            </button>
            <button
              type='button'
              className={`unit-pill ${userProfile.preferredWaterUnit === 'vasos' ? 'unit-pill--active' : ''}`}
              onClick={() => updateUserProfile({ preferredWaterUnit: 'vasos' })}
            >
              Vasos (250 ml)
            </button>
          </div>
        </div>

        <form className='quick-form' onSubmit={handleAsk}>
          <div className='form-row'>
            <input
              type='text'
              className='form-input'
              placeholder='Ej. ¿Cuántos litros o vasos de agua necesito hoy?'
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
            />
            <button type='submit' className='btn-primary'>
              Consultar
            </button>
          </div>
        </form>

        <div className='chip-grid'>
          {quickQuestions.map((q) => (
            <button
              key={q}
              type='button'
              className='food-chip'
              onClick={() => askCoachQuestion(q)}
            >
              <span className='food-chip__name'>{q}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='section-card'>
        <h3 className='section-card__heading'>Respuestas del Consultor</h3>
        <div className='qa-list'>
          {coachHistory.map((item) => {
            const source = officialSources.find((s) => s.id === item.sourceId) || officialSources[0]
            return (
              <article key={item.id} className='qa-card'>
                <div className='qa-card__question'>
                  <strong>Tú:</strong> {item.question}
                </div>
                <p className='qa-card__answer'>{item.answer}</p>
                <div className='qa-card__source'>
                  <span>📚 Fuente verificada: <strong>{source.organization}</strong></span>
                  <a href={source.url} target='_blank' rel='noreferrer' className='qa-card__link'>
                    Ver publicación oficial ↗
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className='section-card'>
        <h3 className='section-card__heading'>Fuentes científicas y oficiales de la aplicación</h3>
        <ul className='item-list'>
          {officialSources.map((src) => (
            <li key={src.id} className='item-list__row'>
              <div>
                <p className='item-list__title'>{src.organization} — {src.title}</p>
                <span className='item-list__meta'>{src.summary}</span>
              </div>
              <a href={src.url} target='_blank' rel='noreferrer' className='qa-card__link'>
                Abrir fuente ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CoachPage
