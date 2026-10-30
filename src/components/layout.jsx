import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { AppProvider, useApp } from '../context/AppContext'

import NavBar from '../components/nav_bar'
import CaloriesPage from '../pages/calories_page'
import CoachPage from '../pages/coach_page'
import HabitsPage from '../pages/habits_page'
import ProfilePage from '../pages/profile_page'

const LayoutShell = () => {
  const {
    userProfile,
    totalCaloriesToday,
    calorieProgressPercent,
    isOverCalorieGoal,
    habits,
    totalHabitPoints,
    recentAchievement,
    clearAchievementNotification
  } = useApp()

  const [isMobileFrame, setIsMobileFrame] = useState(true)
  const [showPointsModal, setShowPointsModal] = useState(false)

  return (
    <div className={`layout-wrapper ${isMobileFrame ? 'layout-wrapper--mobile' : 'layout-wrapper--full'}`}>
      {/* Barra superior para alternar entre vista móvil (prototipo) y vista web ancha */}
      <div className='layout__device-toolbar'>
        <span className='layout__device-label'>
          Vista del prototipo: <strong>{isMobileFrame ? 'Web Móvil (430px)' : 'Web Expandida'}</strong>
        </span>
        <button
          type='button'
          className='layout__device-toggle'
          onClick={() => setIsMobileFrame((prev) => !prev)}
        >
          {isMobileFrame ? '🖥️ Cambiar a vista ancha' : '📱 Cambiar a vista móvil'}
        </button>
      </div>

      <div className='layout'>
        {/* Encabezado persistente con indicadores dinámicos (Feedback U02 y U06) */}
        <header className='layout__header'>
          <div className='layout__brand-row'>
            <div>
              <span className='layout__eyebrow'>SLIM REVELATION · DIARIO NUTRICIONAL</span>
              <h1 className='layout__title'>Hola, {userProfile.name.split(' ')[0]}</h1>
            </div>

            <div className='layout__status-pills'>
              <button
                type='button'
                className='layout__points-pill'
                onClick={() => setShowPointsModal(true)}
                title='Ver cómo funcionan las rachas y puntos'
              >
                <span>🔥 {habits.streakDays}d</span>
                <span className='layout__pill-divider'>·</span>
                <span>⭐ {totalHabitPoints} pts</span>
                <span className='layout__info-dot' aria-hidden='true'>?</span>
              </button>
            </div>
          </div>

          {/* Barra dinámica de progreso calórico siempre visible (Feedback U02: Saimon Oyanedel) */}
          <div
            className={`layout__kcal-bar ${
              isOverCalorieGoal ? 'layout__kcal-bar--over' : ''
            }`}
          >
            <div className='layout__kcal-bar-top'>
              <span className='layout__kcal-bar-label'>
                Energía hoy: <strong>{totalCaloriesToday} kcal</strong> de {userProfile.dailyCalorieGoal} kcal
              </span>
              <span className='layout__kcal-bar-pct'>
                {calorieProgressPercent}% {isOverCalorieGoal ? '⚠️ Meta superada' : ''}
              </span>
            </div>
            <div className='layout__kcal-track'>
              <div
                className='layout__kcal-fill'
                style={{ width: `${Math.min(100, calorieProgressPercent)}%` }}
              />
            </div>
          </div>
        </header>

        {/* Notificación flotante cuando se desbloquea un logro nuevo (Meta 3) */}
        {recentAchievement && (
          <div className='layout__toast' role='status' aria-live='polite'>
            <div className='layout__toast-content'>
              <span className='layout__toast-icon'>{recentAchievement.icon}</span>
              <div>
                <p className='layout__toast-title'>
                  ¡Nuevo logro desbloqueado: {recentAchievement.title}!
                </p>
                <p className='layout__toast-desc'>{recentAchievement.description}</p>
              </div>
            </div>
            <div className='layout__toast-actions'>
              <NavLink
                to='/habitos#tus-logros'
                className='layout__toast-link'
                onClick={clearAchievementNotification}
              >
                Ver logros
              </NavLink>
              <button
                type='button'
                className='layout__toast-close'
                onClick={clearAchievementNotification}
                aria-label='Cerrar notificación'
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo del sistema de puntos y rachas (Feedback U06: Javier Escudero) */}
        {showPointsModal && (
          <div className='layout__modal-backdrop' onClick={() => setShowPointsModal(false)}>
            <div
              className='layout__modal'
              onClick={(e) => e.stopPropagation()}
              role='dialog'
              aria-modal='true'
              aria-labelledby='points-modal-title'
            >
              <div className='layout__modal-header'>
                <h2 id='points-modal-title'>¿Para qué sirven los puntos y la racha?</h2>
                <button
                  type='button'
                  className='layout__modal-close'
                  onClick={() => setShowPointsModal(false)}
                >
                  ✕
                </button>
              </div>
              <p className='layout__modal-text'>
                En semanas de alta carga académica es fácil perder la constancia. El sistema de
                puntos mide tu progreso diario sin exigir perfección calórica:
              </p>
              <ul className='layout__modal-list'>
                <li>
                  <strong>🔥 Racha activa ({habits.streakDays} días):</strong> Se mantiene al
                  registrar al menos 1 comida o 1 hábito saludable al día.
                </li>
                <li>
                  <strong>⭐ Puntos de hábito ({totalHabitPoints} pts):</strong> Cada entrenamiento
                  o acción saludable suma entre +10 y +20 pts para desbloquear logros permanentes.
                </li>
                <li>
                  <strong>🏆 Logros sin castigo:</strong> Una vez que desbloqueas una insignia en la
                  pestaña <em>Hábitos</em>, queda guardada en tu perfil aunque desmarques una tarea.
                </li>
              </ul>
              <button
                type='button'
                className='layout__modal-btn'
                onClick={() => setShowPointsModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        )}

        {/* Navegación principal */}
        <NavBar />

        {/* Contenedor de páginas (Rutas de las 3 metas + Perfil) */}
        <div className='layout__page'>
          <Routes>
            <Route path='/' element={<CaloriesPage />} />
            <Route path='/coach' element={<CoachPage />} />
            <Route path='/habitos' element={<HabitsPage />} />
            <Route path='/perfil' element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

const Layout = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <LayoutShell />
      </BrowserRouter>
    </AppProvider>
  )
}

export default Layout
