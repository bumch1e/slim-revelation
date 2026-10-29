import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

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

      <div className='section-card'>
        <div className='section-card__header-row'>
          <h3 className='section-card__heading'>Mis alimentos frecuentes</h3>
          <span className='section-card__badge'>Toca para sumar</span>
        </div>
        <div className='chip-grid'>
          {frequentFoods.map((item) => (
            <button
              key={item.id}
              type='button'
              className='food-chip'
              onClick={() => addFrequentFoodToLog(item.id)}
            >
              <span className='food-chip__name'>{item.name}</span>
              <span className='food-chip__kcal'>+{item.calories} kcal</span>
            </button>
          ))}
        </div>
      </div>

      <div className='section-card'>
        <div className='section-card__header-row'>
          <h3 className='section-card__heading'>Alimentos registrados hoy ({loggedFoods.length})</h3>
          <span className='section-card__badge'>{totalCaloriesToday} kcal</span>
        </div>
        <ul className='item-list'>
          {loggedFoods.map((entry) => (
            <li key={entry.id} className='item-list__row'>
              <div>
                <p className='item-list__title'>{entry.name}</p>
                <span className='item-list__meta'>
                  {entry.mealType} · {entry.timestamp}
                </span>
              </div>
              <div className='item-list__right'>
                <span className='item-list__kcal'>{entry.calories} kcal</span>
                <button
                  type='button'
                  className='item-list__delete'
                  onClick={() => removeLoggedFood(entry.id)}
                  title='Eliminar registro'
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CaloriesPage
