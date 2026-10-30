import React from 'react'
import '../stylesheets/components/frequent-foods.css'

/**
 * Sección "Mis alimentos frecuentes": añade comidas guardadas con un toque.
 * Props:
 *  - foods: [{ id, name, calories }]
 *  - onAdd: (food) => void
 */
export const FrequentFoods = ({ foods = [], onAdd }) => {
  return (
    <section className='frequent-foods' aria-labelledby='frequent-foods-title'>
      <h2 id='frequent-foods-title' className='frequent-foods__title'>
        Mis alimentos frecuentes
      </h2>

      {foods.length === 0
        ? (
          <p className='frequent-foods__empty'>
            Aún no tienes alimentos frecuentes. Marca "Guardar en frecuentes" al
            registrar una comida y aparecerá aquí.
          </p>
          )
        : (
          <ul className='frequent-foods__list'>
            {foods.map((food) => (
              <li key={food.id}>
                <button
                  type='button'
                  className='frequent-foods__item'
                  onClick={() => onAdd(food)}
                  aria-label={`Añadir ${food.name}, ${food.calories} calorías`}
                >
                  <span className='frequent-foods__name'>{food.name}</span>
                  <span className='frequent-foods__kcal'>{food.calories} kcal</span>
                  <span className='frequent-foods__plus' aria-hidden='true'>+</span>
                </button>
              </li>
            ))}
          </ul>
          )}
    </section>
  )
}

export default FrequentFoods