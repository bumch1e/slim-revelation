import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import FrequentFoods from '../components/frequent_foods'
import DailyHistory from '../components/daily_history'

export const CaloriesPage = () => {
  const {
    userProfile,
    loggedFoods,
    frequentFoods,
    totalCaloriesToday,
    calorieProgressPercent,
    isOverCalorieGoal,
    addFood,
    addFrequentFoodToLog,
    removeLoggedFood
  } = useApp()

  const [foodName, setFoodName] = useState('')
  const [foodCalories, setFoodCalories] = useState('')
  const [saveToFrequent, setSaveToFrequent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!foodName.trim() || !foodCalories) return
    const ok = addFood({
      name: foodName,
      calories: Number(foodCalories),
      mealType: 'Registro del día',
      saveToFrequent
    })
    if (ok) {
      setFoodName('')
      setFoodCalories('')
      setSaveToFrequent(false)
    }
  }

  return (
    <section className='page-section'>
      <div className='section-card'>
        <div className='section-card__header-row'>
          <div>
            <span className='section-card__eyebrow'>META 1 · REGISTRO RÁPIDO</span>
            <h2 className='section-card__title'>Tu energía hoy</h2>
            <p className='section-card__subtitle'>
              {calorieProgressPercent}% de tu meta diaria ({userProfile.dailyCalorieGoal} kcal)
            </p>
          </div>
          <div className={`kcal-circle ${isOverCalorieGoal ? 'kcal-circle--over' : ''}`}>
            <span className='kcal-circle__number'>{totalCaloriesToday}</span>
            <span className='kcal-circle__unit'>kcal hoy</span>
          </div>
        </div>

        {isOverCalorieGoal && (
          <div className='status-banner status-banner--warning'>
            ⚠️ Has superado tu meta diaria por {totalCaloriesToday - userProfile.dailyCalorieGoal} kcal. Puedes ajustar tu meta en "Mi Meta" o eliminar algún registro erróneo abajo.
          </div>
        )}

        <form className='quick-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label' htmlFor='food-name'>
              Nombre del alimento
            </label>
            <input
              id='food-name'
              type='text'
              className='form-input'
              placeholder='Ej. Pechuga de pollo con arroz'
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='food-kcal'>
              Calorías (kcal)
            </label>
            <input
              id='food-kcal'
              type='number'
              min='1'
              max='3000'
              className='form-input'
              placeholder='Ej. 450'
              value={foodCalories}
              onChange={(e) => setFoodCalories(e.target.value)}
              required
            />
          </div>

          <label className={`frequent-toggle ${saveToFrequent ? 'frequent-toggle--checked' : ''}`}>
            <input
              type='checkbox'
              checked={saveToFrequent}
              onChange={(e) => setSaveToFrequent(e.target.checked)}
            />
            <span>⭐ Guardar en mis alimentos frecuentes para futuros registros</span>
          </label>

          <button type='submit' className='btn-primary'>
            Registrar alimento
          </button>
        </form>
      </div>

      <FrequentFoods
        foods={frequentFoods}
        onAdd={(food) => addFrequentFoodToLog(food.id)}
      />

      <DailyHistory
        entries={loggedFoods.map((entry) => ({ ...entry, time: entry.timestamp }))}
        onDelete={removeLoggedFood}
      />
    </section>
  )
}

export default CaloriesPage