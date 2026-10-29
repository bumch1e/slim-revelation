import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export const ProfilePage = () => {
  const {
    userProfile,
    updateUserProfile,
    resetDemoData,
    totalCaloriesToday,
    totalHabitPoints,
    habits
  } = useApp()

  const [calorieInput, setCalorieInput] = useState(userProfile.dailyCalorieGoal)
  const [proteinInput, setProteinInput] = useState(userProfile.proteinGoalGrams)
  const [waterInput, setWaterInput] = useState(userProfile.waterGoalLiters)
  const [goalType, setGoalType] = useState(userProfile.goalType)
  const [waterUnit, setWaterUnit] = useState(userProfile.preferredWaterUnit)
  const [savedBanner, setSavedBanner] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateUserProfile({
      dailyCalorieGoal: Math.max(1200, Math.min(4500, Number(calorieInput) || 2300)),
      proteinGoalGrams: Math.max(50, Math.min(250, Number(proteinInput) || 130)),
      waterGoalLiters: Math.max(1, Math.min(5, Number(waterInput) || 2.5)),
      goalType,
      preferredWaterUnit: waterUnit
    })
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 3000)
  }

  const handleReset = () => {
    resetDemoData()
    setCalorieInput(2300)
    setProteinInput(130)
    setWaterInput(2.5)
    setGoalType('Mantener balance y masa muscular')
    setWaterUnit('litros')
  }

  return (
    <section className='page-section'>
      <div className='section-card'>
        <span className='section-card__eyebrow'>PERFIL Y PERSONALIZACIÓN (ACTIVACIÓN)</span>
        <h2 className='section-card__title'>{userProfile.name}</h2>
        <p className='section-card__subtitle'>
          {userProfile.age} años · {userProfile.occupation} · Entrena {userProfile.trainingFrequency}
        </p>

        <div className='summary-grid'>
          <div className='summary-stat'>
            <span className='summary-stat__value'>{totalCaloriesToday} kcal</span>
            <span className='summary-stat__label'>Consumidas hoy</span>
          </div>
          <div className='summary-stat'>
            <span className='summary-stat__value'>{habits.streakDays} días</span>
            <span className='summary-stat__label'>Racha actual</span>
          </div>
          <div className='summary-stat'>
            <span className='summary-stat__value'>{totalHabitPoints} pts</span>
            <span className='summary-stat__label'>Puntos Vigor</span>
          </div>
        </div>
      </div>

      <form className='section-card' onSubmit={handleSave}>
        <h3 className='section-card__heading'>Ajustar mis metas y unidades</h3>
        <p className='section-card__helper'>
          Estos valores actualizan en tiempo real el indicador superior, las alertas de calorías y las respuestas del Consultor.
        </p>

        <div className='form-group'>
          <label className='form-label' htmlFor='goal-select'>
            Objetivo nutricional principal
          </label>
          <select
            id='goal-select'
            className='form-input'
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
          >
            <option value='Bajar de peso de forma sostenible'>Bajar de peso de forma sostenible</option>
            <option value='Mantener balance y masa muscular'>Mantener balance y masa muscular</option>
            <option value='Aumentar masa muscular (Volumen limpio)'>Aumentar masa muscular (Volumen limpio)</option>
          </select>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label className='form-label' htmlFor='kcal-goal-input'>
              Meta diaria (kcal)
            </label>
            <input
              id='kcal-goal-input'
              type='number'
              min='1200'
              max='4500'
              step='50'
              className='form-input'
              value={calorieInput}
              onChange={(e) => setCalorieInput(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='protein-goal-input'>
              Meta proteína (g/día)
            </label>
            <input
              id='protein-goal-input'
              type='number'
              min='50'
              max='250'
              step='5'
              className='form-input'
              value={proteinInput}
              onChange={(e) => setProteinInput(e.target.value)}
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label className='form-label' htmlFor='water-goal-input'>
              Meta de agua (Litros)
            </label>
            <input
              id='water-goal-input'
              type='number'
              min='1'
              max='5'
              step='0.25'
              className='form-input'
              value={waterInput}
              onChange={(e) => setWaterInput(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='water-unit-select'>
              Unidad preferida para agua
            </label>
            <select
              id='water-unit-select'
              className='form-input'
              value={waterUnit}
              onChange={(e) => setWaterUnit(e.target.value)}
            >
              <option value='litros'>Litros (L)</option>
              <option value='vasos'>Vasos (250 ml)</option>
            </select>
          </div>
        </div>

        {savedBanner && (
          <div className='status-banner status-banner--success'>
            ✓ Tus metas y preferencias se actualizaron en toda la aplicación.
          </div>
        )}

        <div className='form-actions'>
          <button type='submit' className='btn-primary'>
            Guardar preferencias
          </button>
          <button
            type='button'
            className='btn-secondary'
            onClick={handleReset}
          >
            Restaurar datos iniciales de prueba
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProfilePage
