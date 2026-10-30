import React, { useEffect, useRef } from 'react'
import '../stylesheets/components/achievements-grid.css'

/**
 * Sección "Tus logros".
 *
 * El aviso flotante al desbloquear un logro vive en layout.jsx (así se ve en cualquier pantalla).
 * Aquí se muestra el resultado: qué logros son nuevos y cuánto falta (Feedback U05: Facundo Riquelme,
 * que no encontraba dónde revisar los logros conseguidos).
 *
 * Props:
 *  - achievements: [{ id, icon, title, description, requirementText }]
 *  - unlockedIds:  string[]  ids desbloqueados (nunca se quitan: Feedback U06, Javier Escudero)
 *  - seenIds:      string[]  ids que la persona ya vio en esta sección (si falta, ninguno es "nuevo")
 *  - totalPoints:  number
 *  - onSeen:       () => void  se llama al salir de la sección para marcar todo como visto
 */
export const AchievementsGrid = ({
  achievements = [],
  unlockedIds = [],
  seenIds,
  totalPoints = 0,
  onSeen
}) => {
  const seen = seenIds ?? unlockedIds
  const newIds = unlockedIds.filter((id) => !seen.includes(id))

  // Las etiquetas "¡Nuevo!" duran mientras la persona está en esta página y se limpian al salir.
  const onSeenRef = useRef(onSeen)
  onSeenRef.current = onSeen
  useEffect(() => () => onSeenRef.current?.(), [])

  const unlockedCount = achievements.filter((ach) => unlockedIds.includes(ach.id)).length
  const percent = achievements.length ? Math.round((unlockedCount / achievements.length) * 100) : 0
  const newTitles = achievements.filter((ach) => newIds.includes(ach.id)).map((ach) => ach.title)

  return (
    <div className='section-card achievements' id='tus-logros'>
      <div className='section-card__header-row'>
        <h3 className='section-card__heading'>Tus logros</h3>
        <span className='section-card__badge'>⭐ {totalPoints} pts totales</span>
      </div>

      <div className='achievements__progress'>
        <div
          className='achievements__track'
          role='progressbar'
          aria-label='Logros desbloqueados'
          aria-valuemin={0}
          aria-valuemax={achievements.length}
          aria-valuenow={unlockedCount}
        >
          <div className='achievements__fill' style={{ width: `${percent}%` }} />
        </div>
        <span className='achievements__count'>
          {unlockedCount} de {achievements.length} desbloqueados
        </span>
      </div>

      <div role='status' aria-live='polite'>
        {newTitles.length > 0 && (
          <div className='status-banner status-banner--success'>
            🎉 {newTitles.length === 1 ? 'Logro nuevo' : 'Logros nuevos'}: {newTitles.join(', ')}
          </div>
        )}
      </div>

      <p className='section-card__helper'>
        Un logro desbloqueado es tuyo para siempre, aunque desmarques actividades después.
      </p>

      <div className='achievements-grid'>
        {achievements.map((ach) => {
          const isUnlocked = unlockedIds.includes(ach.id)
          const isNew = newIds.includes(ach.id)

          return (
            <div
              key={ach.id}
              className={[
                'achievement-card',
                isUnlocked ? 'achievement-card--unlocked' : 'achievement-card--locked',
                isNew ? 'achievement-card--new' : ''
              ].join(' ')}
            >
              {isNew && <span className='achievement-card__tag'>¡Nuevo!</span>}
              <span className='achievement-card__icon' aria-hidden='true'>
                {isUnlocked ? ach.icon : '🔒'}
              </span>
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
  )
}

export default AchievementsGrid
