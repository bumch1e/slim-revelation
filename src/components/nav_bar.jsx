import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export const NavBar = () => {
  const {
    totalCaloriesToday,
    userProfile,
    isOverCalorieGoal,
    habits,
    coachHistory
  } = useApp()

  const completedHabitsCount = habits.activities.filter((a) => a.completed).length
  const totalHabitsCount = habits.activities.length

  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link']
    if (isActive) classes.push('nav-bar__link--active')
    return classes.join(' ')
  }

  return (
    <nav className='nav-bar'>
      <NavLink className={navLinkClass} to='/'>
        <span className='nav-bar__icon' aria-hidden='true'>⚡</span>
        <span className='nav-bar__label'>Calorías</span>
        <span
          className={`nav-bar__badge ${
            isOverCalorieGoal ? 'nav-bar__badge--alert' : ''
          }`}
        >
          {totalCaloriesToday}/{userProfile.dailyCalorieGoal}
        </span>
      </NavLink>

      <NavLink className={navLinkClass} to='/coach'>
        <span className='nav-bar__icon' aria-hidden='true'>💬</span>
        <span className='nav-bar__label'>Consultor</span>
        <span className='nav-bar__badge'>
          {coachHistory.length} {coachHistory.length === 1 ? 'duda' : 'dudas'}
        </span>
      </NavLink>

      <NavLink className={navLinkClass} to='/habitos'>
        <span className='nav-bar__icon' aria-hidden='true'>🔥</span>
        <span className='nav-bar__label'>Hábitos</span>
        <span className='nav-bar__badge'>
          {completedHabitsCount}/{totalHabitsCount} hoy
        </span>
      </NavLink>

      <NavLink className={navLinkClass} to='/perfil'>
        <span className='nav-bar__icon' aria-hidden='true'>⚙️</span>
        <span className='nav-bar__label'>Mi Meta</span>
        <span className='nav-bar__badge'>
          {userProfile.preferredWaterUnit === 'vasos' ? 'Vasos' : 'Litros'}
        </span>
      </NavLink>
    </nav>
  )
}

export default NavBar
