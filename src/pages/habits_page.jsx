import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export const HabitsPage = () => {
  const {
    habits,
    totalHabitPoints,
    achievementsCatalog,
    toggleHabitActivity,
    triggerQuickHabitAction,
    addCustomHabitActivity
  } = useApp()

  const [newHabitTitle, setNewHabitTitle] = useState('')
  const [newHabitCategory, setNewHabitCategory] = useState('entrenamiento')

  const handleAddHabit = (e) => {
    e.preventDefault()
    if (!newHabitTitle.trim()) return
    addCustomHabitActivity({
      title: newHabitTitle,
      category: newHabitCategory,
      points: 15
    })
    setNewHabitTitle('')
  }

  return (
    <section className='page-section'>
      <div className='section-card'>
        <span className='section-card__eyebrow'>META 3 · CONSTRUYE HÁBITOS QUE NO SE ROMPEN</span>
        <h2 className='section-card__title'>Entrenamiento y compras saludables</h2>
        <p className='section-card__subtitle'>
          Toca cualquier tarjeta completa para marcarla como realizada y sumar puntos para tus logros.
        </p>

        <div className='form-actions'>
          <button
            type='button'
            className='btn-primary'
            onClick={() => triggerQuickHabitAction('entrenamiento')}
          >
            💪 + Registrar Entrenamiento Rápido
          </button>
          <button
            type='button'
            className='btn-secondary'
            onClick={() => triggerQuickHabitAction('alimentacion')}
          >
            🥗 + Registrar Compra Saludable
          </button>
        </div>
      </div>

      <div className='section-card'>
        <h3 className='section-card__heading'>Actividades del día (Toca el recuadro para completar)</h3>
        <div className='habit-list'>
          {habits.activities.map((act) => (
            <button
              key={act.id}
              type='button'
              className={`habit-card ${act.completed ? 'habit-card--done' : ''}`}
              onClick={() => toggleHabitActivity(act.id)}
            >
              <div className='habit-card__left'>
                <span className='habit-card__check'>
                  {act.completed ? '✓' : ''}
                </span>
                <div>
                  <p className='habit-card__title'>{act.title}</p>
                  <span className='habit-card__category'>
                    {act.category === 'entrenamiento' ? 'Entrenamiento' : 'Alimentación saludable'}
                  </span>
                </div>
              </div>
              <span className='habit-card__points'>+{act.points} pts</span>
            </button>
          ))}
        </div>

        <form className='quick-form' onSubmit={handleAddHabit} style={{ marginTop: '16px' }}>
          <div className='form-row'>
            <input
              type='text'
              className='form-input'
              placeholder='Agregar nuevo hábito o ejercicio...'
              value={newHabitTitle}
              onChange={(e) => setNewHabitTitle(e.target.value)}
            />
            <select
              className='form-input'
              value={newHabitCategory}
              onChange={(e) => setNewHabitCategory(e.target.value)}
            >
              <option value='entrenamiento'>Entrenamiento</option>
              <option value='alimentacion'>Alimentación</option>
            </select>
            <button type='submit' className='btn-primary'>
              Añadir
            </button>
          </div>
        </form>
      </div>

      <div className='section-card'>
        <div className='section-card__header-row'>
          <h3 className='section-card__heading'>
            Tus Logros ({habits.unlockedAchievementIds.length}/{achievementsCatalog.length})
          </h3>
          <span className='section-card__badge'>⭐ {totalHabitPoints} pts totales</span>
        </div>
        <div className='achievements-grid'>
          {achievementsCatalog.map((ach) => {
            const isUnlocked = habits.unlockedAchievementIds.includes(ach.id)
            return (
              <div
                key={ach.id}
                className={`achievement-card ${isUnlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'}`}
              >
                <span className='achievement-card__icon'>{ach.icon}</span>
                <p className='achievement-card__title'>{ach.title}</p>
                <p className='achievement-card__desc'>{ach.description}</p>
                <span className='achievement-card__status'>
                  {isUnlocked ? '✓ Desbloqueado' : `Meta: ${ach.requirementText}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HabitsPage
