import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AchievementsGrid from '../components/achievements_grid'

const CATEGORIES = [
  { id: 'entrenamiento', label: 'Entrenamiento', icon: '💪' },
  { id: 'alimentacion', label: 'Alimentación saludable', icon: '🥗' }
]

// Mismo valor que usa AppContext cuando no queda ninguna actividad por marcar
const QUICK_BONUS_POINTS = 15
const FEEDBACK_MS = 4500

/** Valor temporal (mensaje o id resaltado) que se borra solo. */
const useFlash = (ms = FEEDBACK_MS) => {
  const [value, setValue] = useState(null)
  const timer = useRef(null)

  const show = (next) => {
    clearTimeout(timer.current)
    setValue(next)
    timer.current = setTimeout(() => setValue(null), ms)
  }

  useEffect(() => () => clearTimeout(timer.current), [])
  return [value, show]
}

export const HabitsPage = () => {
  const {
    habits,
    totalHabitPoints,
    achievementsCatalog,
    toggleHabitActivity,
    triggerQuickHabitAction,
    addCustomHabitActivity,
    removeHabitActivity,
    markAchievementsSeen
  } = useApp()

  const location = useLocation()

  const [newHabitTitle, setNewHabitTitle] = useState('')
  const [newHabitCategory, setNewHabitCategory] = useState('entrenamiento')
  const [quickNotice, showQuickNotice] = useFlash()
  const [addNotice, showAddNotice] = useFlash()
  const [flashId, showFlashId] = useFlash(1800)

  // "Las que más repites primero" (Feedback U05: Facundo Riquelme).
  // El orden se fija al abrir la página: así las tarjetas no saltan de lugar
  // mientras la persona las va marcando.
  const orderRef = useRef(null)
  if (orderRef.current === null) {
    const byFrequency = [...habits.activities].sort(
      (a, b) => (b.frequencyCount || 0) - (a.frequencyCount || 0)
    )
    orderRef.current = new Map(byFrequency.map((act, index) => [act.id, index]))
  }
  const rankOf = (act) => orderRef.current.get(act.id) ?? Number.MAX_SAFE_INTEGER

  // Llegar desde el aviso de logro ("Ver logros") lleva directo a la grilla,
  // incluso si ya estás en esta página (Feedback U05: pensó que había una sección de notificaciones).
  useEffect(() => {
    if (location.hash !== '#tus-logros') return
    const target = document.getElementById('tus-logros')
    if (!target) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [location.hash, location.key])

  const completedCount = habits.activities.filter((act) => act.completed).length
  const totalCount = habits.activities.length

  const handleQuickAction = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId)
    // Misma regla que AppContext: se marca la primera actividad pendiente de esa categoría
    const target = habits.activities.find((act) => act.category === categoryId && !act.completed)

    triggerQuickHabitAction(categoryId)

    if (target) {
      showFlashId(target.id)
      showQuickNotice(`Marcamos «${target.title}» como completada: +${target.points} pts.`)
    } else {
      showQuickNotice(
        `Ya completaste todo en ${category.label.toLowerCase()}. Sumaste +${QUICK_BONUS_POINTS} pts de bonus.`
      )
    }
  }

  const handleAddHabit = (e) => {
    e.preventDefault()
    const title = newHabitTitle.trim()
    if (!title) return

    const newId = addCustomHabitActivity({ title, category: newHabitCategory, points: 15 })
    if (!newId) return

    const category = CATEGORIES.find((c) => c.id === newHabitCategory)
    showFlashId(newId)
    showAddNotice(`Agregamos «${title}» a ${category.label}. Tócala cuando la completes para sumar +15 pts.`)
    setNewHabitTitle('')
  }

  return (
    <section className='page-section habits-page'>
      {/* Parte 5: accesos rápidos */}
      <div className='section-card'>
        <span className='section-card__eyebrow'>META 3 · CONSTRUYE HÁBITOS QUE NO SE ROMPEN</span>
        <h2 className='section-card__title'>Entrenamiento y compras saludables</h2>
        <p className='section-card__subtitle'>
          Registra lo que hiciste hoy con un toque. Cada acción suma puntos para desbloquear logros.
        </p>

        <div className='form-actions'>
          <button type='button' className='btn-primary' onClick={() => handleQuickAction('entrenamiento')}>
            💪 Registrar entrenamiento
          </button>
          <button type='button' className='btn-secondary' onClick={() => handleQuickAction('alimentacion')}>
            🥗 Registrar compra saludable
          </button>
        </div>

        <div role='status' aria-live='polite'>
          {quickNotice && <div className='status-banner status-banner--success'>✓ {quickNotice}</div>}
        </div>
      </div>

      {/* Parte 5: racha y puntos, con su explicación de uso (Feedback U06: Javier Escudero) */}
      <div className='section-card'>
        <h3 className='section-card__heading'>Tu progreso de hoy</h3>
        <div className='summary-grid'>
          <div className='summary-stat'>
            <span className='summary-stat__value'>🔥 {habits.streakDays}</span>
            <span className='summary-stat__label'>{habits.streakDays === 1 ? 'día de racha' : 'días de racha'}</span>
          </div>
          <div className='summary-stat'>
            <span className='summary-stat__value'>⭐ {totalHabitPoints}</span>
            <span className='summary-stat__label'>puntos totales</span>
          </div>
          <div className='summary-stat'>
            <span className='summary-stat__value'>
              {completedCount}/{totalCount}
            </span>
            <span className='summary-stat__label'>actividades hoy</span>
          </div>
        </div>

        <details className='habit-help'>
          <summary className='habit-help__summary'>¿Para qué sirven los puntos y la racha?</summary>
          <ul className='habit-help__list'>
            <li>
              <strong>Puntos:</strong> cada actividad que completas suma entre +10 y +20 pts. Sirven para
              desbloquear logros, por ejemplo al llegar a 100 pts. Si desmarcas una actividad, sus puntos se
              restan.
            </li>
            <li>
              <strong>Racha:</strong> son los días seguidos en que registras al menos 1 comida o 1 hábito. No
              pide perfección: basta con un registro al día.
            </li>
            <li>
              <strong>Logros:</strong> son permanentes. Una vez desbloqueados, se quedan contigo aunque
              desmarques una tarea.
            </li>
          </ul>
        </details>
      </div>

      {/* Parte 5: listas interactivas por categoría */}
      <div className='section-card'>
        <h3 className='section-card__heading'>Actividades de hoy</h3>
        <p className='section-card__helper'>
          Toca cualquier tarjeta para marcarla como hecha. Arriba están las que más repites.
        </p>

        {CATEGORIES.map((category) => {
          const items = habits.activities
            .filter((act) => act.category === category.id)
            .sort((a, b) => rankOf(a) - rankOf(b))
          const doneInCategory = items.filter((act) => act.completed).length

          return (
            <div key={category.id} className='habit-group'>
              <div className='habit-group__header'>
                <h4 className='habit-group__title'>
                  <span aria-hidden='true'>{category.icon}</span> {category.label}
                </h4>
                <span className='habit-group__count'>
                  {doneInCategory}/{items.length} hechas
                </span>
              </div>

              {items.length === 0 ? (
                <p className='habit-group__empty'>
                  Aún no tienes actividades aquí. Agrega una más abajo.
                </p>
              ) : (
                <ul className='habit-list'>
                  {items.map((act) => (
                    <li key={act.id} className='habit-item'>
                      <button
                        type='button'
                        aria-pressed={act.completed}
                        className={[
                          'habit-card',
                          act.completed ? 'habit-card--done' : '',
                          flashId === act.id ? 'habit-card--flash' : ''
                        ].join(' ')}
                        onClick={() => toggleHabitActivity(act.id)}
                      >
                        <span className='habit-card__left'>
                          <span className='habit-card__check' aria-hidden='true'>
                            {act.completed ? '✓' : ''}
                          </span>
                          <span className='habit-card__text'>
                            <span className='habit-card__title'>{act.title}</span>
                            {act.frequencyCount > 0 && (
                              <span className='habit-card__category'>
                                Completada {act.frequencyCount} {act.frequencyCount === 1 ? 'vez' : 'veces'}
                              </span>
                            )}
                          </span>
                        </span>
                        <span className='habit-card__points'>+{act.points} pts</span>
                      </button>

                      {act.isCustom && (
                        <button
                          type='button'
                          className='habit-item__remove'
                          aria-label={`Quitar «${act.title}»`}
                          title='Quitar actividad'
                          onClick={() => removeHabitActivity(act.id)}
                        >
                          ✕
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}

        <form className='quick-form habit-form' onSubmit={handleAddHabit}>
          <label className='form-label' htmlFor='new-habit-title'>
            Agregar una actividad propia
          </label>
          <div className='form-row'>
            <input
              id='new-habit-title'
              type='text'
              className='form-input'
              placeholder='Ej: Trotar 20 min'
              maxLength={60}
              value={newHabitTitle}
              onChange={(e) => setNewHabitTitle(e.target.value)}
            />
            <select
              className='form-input habit-form__select'
              aria-label='Categoría de la actividad'
              value={newHabitCategory}
              onChange={(e) => setNewHabitCategory(e.target.value)}
            >
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <button type='submit' className='btn-primary habit-form__submit' disabled={!newHabitTitle.trim()}>
              Añadir
            </button>
          </div>
          <div role='status' aria-live='polite'>
            {addNotice && <div className='status-banner status-banner--success'>✓ {addNotice}</div>}
          </div>
        </form>
      </div>

      {/* Parte 6: grilla de logros */}
      <AchievementsGrid
        achievements={achievementsCatalog}
        unlockedIds={habits.unlockedAchievementIds}
        seenIds={habits.seenAchievementIds}
        totalPoints={totalHabitPoints}
        onSeen={markAchievementsSeen}
      />
    </section>
  )
}

export default HabitsPage
