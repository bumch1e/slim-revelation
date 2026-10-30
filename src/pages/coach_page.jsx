import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export const CoachPage = () => {
  const {
    userProfile,
    coachHistory,
    officialSources,
    weeklySummary,
    weeklyStats,
    askCoachQuestion,
    removeCoachAnswer,
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
        <div className='section-card__header-row'>
          <div>
            <h3 className='section-card__heading'>Tu semana</h3>
            <p className='section-card__helper'>
              Promedio de los últimos {weeklyStats.totalDays} días. Estos son los datos con los que el
              Consultor personaliza cada respuesta.
            </p>
          </div>
          <span className='section-card__badge'>
            {weeklyStats.daysOnTarget}/{weeklyStats.totalDays} días en meta
          </span>
        </div>

        <div className='summary-grid'>
          <div className='summary-stat'>
            <span className='summary-stat__value'>{weeklyStats.avgCalories} kcal</span>
            <span className='summary-stat__label'>Promedio diario</span>
          </div>
          <div className='summary-stat'>
            <span className='summary-stat__value'>{weeklyStats.avgProtein} g</span>
            <span className='summary-stat__label'>
              Proteína ({weeklyStats.proteinGoalPercent}% de tu meta)
            </span>
          </div>
          <div className='summary-stat'>
            <span className='summary-stat__value'>{weeklyStats.waterValue}</span>
            <span className='summary-stat__label'>Agua al día en {weeklyStats.waterUnitLabel}</span>
          </div>
        </div>

        <div className='week-chart'>
          {weeklySummary.map((day) => {
            const onTarget = Number(day.protein) >= userProfile.proteinGoalGrams
            const barHeight = Math.round((Number(day.protein) / weeklyStats.maxProtein) * 100)
            return (
              <div key={day.day} className='week-chart__col'>
                <span className='week-chart__value'>{day.protein}</span>
                <div className='week-chart__track'>
                  <div
                    className={`week-chart__bar ${onTarget ? 'week-chart__bar--on-target' : ''}`}
                    style={{ height: `${barHeight}%` }}
                  />
                </div>
                <span className='week-chart__day'>{day.day}</span>
              </div>
            )
          })}
        </div>
        <p className='week-chart__legend'>
          Gramos de proteína por día · meta {userProfile.proteinGoalGrams} g (barra destacada = meta cumplida)
        </p>
      </div>

      <div className='section-card'>
        <h3 className='section-card__heading'>Respuestas del Consultor</h3>
        {coachHistory.length === 0 && (
          <p className='qa-list__empty'>
            Aún no tienes consultas guardadas. Usa el buscador o toca una de las preguntas frecuentes.
          </p>
        )}

        <div className='qa-list'>
          {coachHistory.map((item) => {
            const source = officialSources.find((s) => s.id === item.sourceId) || officialSources[0]
            return (
              <article key={item.id} className='qa-card'>
                <div className='qa-card__header'>
                  <div className='qa-card__question'>
                    <strong>Tú:</strong> {item.question}
                  </div>
                  <button
                    type='button'
                    className='qa-card__delete'
                    onClick={() => removeCoachAnswer(item.id)}
                    title='Eliminar esta consulta'
                    aria-label='Eliminar esta consulta'
                  >
                    ×
                  </button>
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
