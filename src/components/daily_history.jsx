import React from 'react'
import '../stylesheets/components/daily-history.css'

/**
 * Listado de alimentos registrados hoy, con botón para eliminar ingresos erróneos.
 * Props:
 *  - entries:  [{ id, name, calories, time }]
 *  - onDelete: (id) => void
 */
export const DailyHistory = ({ entries = [], onDelete }) => {
  const total = entries.reduce((sum, entry) => sum + entry.calories, 0)

  return (
    <section className='daily-history' aria-labelledby='daily-history-title'>
      <header className='daily-history__header'>
        <h2 id='daily-history-title' className='daily-history__title'>
          Historial de hoy
        </h2>
        <p className='daily-history__total'>{total} kcal en total</p>
      </header>

      {entries.length === 0
        ? (
          <p className='daily-history__empty'>
            Todavía no has registrado nada hoy. Añade tu primera comida con el
            formulario o desde tus frecuentes.
          </p>
          )
        : (
          <ul className='daily-history__list'>
            {entries.map((entry) => (
              <li key={entry.id} className='daily-history__row'>
                <div className='daily-history__info'>
                  <span className='daily-history__name'>{entry.name}</span>
                  {entry.time && (
                    <span className='daily-history__time'>{entry.time}</span>
                  )}
                </div>
                <span className='daily-history__kcal'>{entry.calories} kcal</span>
                <button
                  type='button'
                  className='daily-history__delete'
                  onClick={() => onDelete(entry.id)}
                  aria-label={`Eliminar ${entry.name}`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          )}
    </section>
  )
}

export default DailyHistory