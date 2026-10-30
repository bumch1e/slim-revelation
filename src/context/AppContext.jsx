import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

const STORAGE_KEY = 'slr_mvp_state_v1'

export const INITIAL_STATE = {
  userProfile: {
    name: 'Federico García',
    age: 22,
    occupation: 'Estudiante 4to año Ing. Civil',
    goalType: 'Mantener balance y masa muscular',
    dailyCalorieGoal: 2300,
    proteinGoalGrams: 130,
    waterGoalLiters: 2.5,
    preferredWaterUnit: 'litros', // 'litros' | 'vasos' (Feedback U03: María Ignacia Tapia)
    trainingFrequency: '3-5 veces por semana'
  },
  loggedFoods: [
    {
      id: 'log-1',
      name: 'Avena con leche y plátano',
      calories: 340,
      mealType: 'Desayuno',
      timestamp: '08:30',
      isFrequent: true
    },
    {
      id: 'log-2',
      name: 'Pechuga de pollo con arroz (Almuerzo casino)',
      calories: 520,
      mealType: 'Almuerzo',
      timestamp: '13:15',
      isFrequent: true
    },
    {
      id: 'log-3',
      name: 'Yogur proteico con granola',
      calories: 210,
      mealType: 'Colación',
      timestamp: '16:45',
      isFrequent: true
    }
  ],
  frequentFoods: [
    { id: 'freq-1', name: 'Pechuga de pollo con arroz', calories: 450, category: 'Almuerzo', timesUsed: 12 },
    { id: 'freq-2', name: 'Avena con leche', calories: 310, category: 'Desayuno', timesUsed: 10 },
    { id: 'freq-3', name: 'Batido de proteína Whey', calories: 240, category: 'Post-entreno', timesUsed: 9 },
    { id: 'freq-4', name: 'Salmón grillado con ensalada', calories: 380, category: 'Cena', timesUsed: 6 },
    { id: 'freq-5', name: 'Yogur proteico con granola', calories: 210, category: 'Snack', timesUsed: 8 },
    { id: 'freq-6', name: '2 Huevos revueltos con marraqueta', calories: 360, category: 'Desayuno', timesUsed: 7 }
  ],
  habits: {
    streakDays: 5,
    bonusPoints: 40,
    activities: [
      {
        id: 'hab-1',
        title: 'Sentadillas +15 repeticiones',
        category: 'entrenamiento',
        points: 15,
        completed: true,
        frequencyCount: 8
      },
      {
        id: 'hab-2',
        title: 'Plancha abdominal 60s',
        category: 'entrenamiento',
        points: 10,
        completed: true,
        frequencyCount: 6
      },
      {
        id: 'hab-3',
        title: 'Caminata rápida 30 min o Frisbee',
        category: 'entrenamiento',
        points: 20,
        completed: false,
        frequencyCount: 5
      },
      {
        id: 'hab-4',
        title: '2 porciones de verduras en almuerzo/cena',
        category: 'alimentacion',
        points: 15,
        completed: true,
        frequencyCount: 9
      },
      {
        id: 'hab-5',
        title: 'Hidratación diaria completa (2.5 L)',
        category: 'alimentacion',
        points: 10,
        completed: false,
        frequencyCount: 7
      },
      {
        id: 'hab-6',
        title: 'Compra saludable sin ultraprocesados',
        category: 'alimentacion',
        points: 20,
        completed: false,
        frequencyCount: 4
      }
    ],
    unlockedAchievementIds: ['ach-1', 'ach-2'],
    // Logros que la persona ya vio en la sección "Tus logros" (para mostrar la etiqueta "¡Nuevo!")
    seenAchievementIds: ['ach-1', 'ach-2']
  },
  coachHistory: [
    {
      id: 'q-init-1',
      question: '¿Cómo voy con mi meta de proteína esta semana?',
      answer:
        'Esta semana promedias 124 g de proteína al día (95% de tu meta de 130 g). En 5 de los últimos 7 días cumpliste el objetivo, destacando tus desayunos con avena y el batido post-entreno.',
      unitUsed: 'gramos',
      sourceId: 'src-issn',
      timestamp: 'Hoy, 14:20'
    }
  ],
  // Resumen de los últimos 7 días para el bloque "Tu semana" del Consultor (Meta 2).
  // Coherente con las respuestas precargadas: promedio 2.310 kcal y 124 g de proteína (5 de 7 días en meta).
  weeklySummary: [
    { day: 'Lun', calories: 2280, protein: 132, waterLiters: 2.4 },
    { day: 'Mar', calories: 2350, protein: 131, waterLiters: 2.6 },
    { day: 'Mié', calories: 2410, protein: 135, waterLiters: 2.8 },
    { day: 'Jue', calories: 2180, protein: 118, waterLiters: 2.0 },
    { day: 'Vie', calories: 2300, protein: 130, waterLiters: 2.5 },
    { day: 'Sáb', calories: 2520, protein: 140, waterLiters: 3.0 },
    { day: 'Dom', calories: 2130, protein: 82, waterLiters: 2.2 }
  ]
}

export const ACHIEVEMENTS_CATALOG = [
  {
    id: 'ach-1',
    title: 'Primer Paso',
    description: 'Completaste tu primera actividad saludable o de entrenamiento.',
    icon: '🌱',
    requirementText: '1 hábito completado'
  },
  {
    id: 'ach-2',
    title: 'Semana Consistente',
    description: 'Mantuviste tu racha activa durante 5 días seguidos en semana de clases.',
    icon: '🔥',
    requirementText: 'Racha de 5 días'
  },
  {
    id: 'ach-3',
    title: 'Máquina de Fuerza',
    description: 'Completaste todas las actividades de entrenamiento del día.',
    icon: '💪',
    requirementText: '3 entrenamientos en el día'
  },
  {
    id: 'ach-4',
    title: 'Nutrición Verde',
    description: 'Completaste todos los hábitos de alimentación saludable del día.',
    icon: '🥗',
    requirementText: '3 hábitos alimenticios hoy'
  },
  {
    id: 'ach-5',
    title: 'Balance Total (100+ pts)',
    description: 'Alcanzaste o superaste los 100 puntos de hábitos acumulados.',
    icon: '🏆',
    requirementText: '100 puntos acumulados'
  },
  {
    id: 'ach-6',
    title: 'Registro Preciso',
    description: 'Registraste al menos 4 comidas en tu bitácora calórica del día.',
    icon: '📊',
    requirementText: '4 comidas registradas hoy'
  }
]

export const OFFICIAL_SOURCES = [
  {
    id: 'src-minsal',
    organization: 'MINSAL Chile',
    title: 'Guías Alimentarias para Chile (Ministerio de Salud / INTA)',
    summary: 'Recomendaciones oficiales sobre consumo de agua, legumbres, proteínas y reducción de ultraprocesados para población chilena.',
    url: 'https://www.minsal.cl/guias-alimentarias-para-chile/'
  },
  {
    id: 'src-issn',
    organization: 'ISSN (Journal of the International Society of Sports Nutrition)',
    title: 'Position Stand: Protein and Exercise (1.4 - 2.0 g/kg/día)',
    summary: 'Evidencia científica para estudiantes y deportistas que entrenan fuerza o deportes 3 a 5 veces por semana.',
    url: 'https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8'
  },
  {
    id: 'src-inta',
    organization: 'INTA — Universidad de Chile',
    title: 'Tabla de Composición de Alimentos Chilenos y Porciones de Intercambio',
    summary: 'Base de datos nutricional verificada para comidas cotidianas en Chile (marraqueta, lácteos, carnes, legumbres y frutas).',
    url: 'https://inta.uchile.cl/'
  },
  {
    id: 'src-oms',
    organization: 'Organización Mundial de la Salud (OMS)',
    title: 'Directrices sobre alimentación saludable y balance energético diario',
    summary: 'Parámetros internacionales sobre distribución de macronutrientes, fibra dietética y prevención de fatiga.',
    url: 'https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet'
  }
]

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        // Fusionar con INITIAL_STATE: un estado guardado antes de agregar un campo nuevo
        // (ej. weeklySummary) lo dejaría en undefined y rompería la vista al recargar
        return { ...INITIAL_STATE, ...JSON.parse(saved) }
      }
    } catch (err) {
      console.error('Error leyendo localStorage:', err)
    }
    return INITIAL_STATE
  })

  const [recentAchievement, setRecentAchievement] = useState(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
      console.error('Error guardando en localStorage:', err)
    }
  }, [state])

  // El aviso de logro se cierra solo para que no quede tapando contenido (Meta 3)
  useEffect(() => {
    if (!recentAchievement) return undefined
    const timer = setTimeout(() => setRecentAchievement(null), 8000)
    return () => clearTimeout(timer)
  }, [recentAchievement])

  // Cálculos derivados para que todas las páginas (Partes 2 a 6) los consuman directamente
  const totalCaloriesToday = useMemo(() => {
    return state.loggedFoods.reduce((sum, item) => sum + Number(item.calories || 0), 0)
  }, [state.loggedFoods])

  const calorieProgressPercent = useMemo(() => {
    const goal = state.userProfile.dailyCalorieGoal || 2300
    return Math.round((totalCaloriesToday / goal) * 100)
  }, [totalCaloriesToday, state.userProfile.dailyCalorieGoal])

  const isOverCalorieGoal = useMemo(() => {
    return totalCaloriesToday > state.userProfile.dailyCalorieGoal
  }, [totalCaloriesToday, state.userProfile.dailyCalorieGoal])

  const totalHabitPoints = useMemo(() => {
    const activityPoints = state.habits.activities
      .filter((act) => act.completed)
      .reduce((sum, act) => sum + Number(act.points || 0), 0)
    return (state.habits.bonusPoints || 0) + activityPoints
  }, [state.habits])

  // Promedios de la semana que respaldan las respuestas del Consultor (Meta 2)
  const weeklyStats = useMemo(() => {
    const days = state.weeklySummary || []
    const proteinGoal = state.userProfile.proteinGoalGrams || 130
    const usesGlasses = state.userProfile.preferredWaterUnit === 'vasos'

    if (days.length === 0) {
      return {
        avgCalories: 0,
        avgProtein: 0,
        proteinGoalPercent: 0,
        daysOnTarget: 0,
        totalDays: 0,
        maxProtein: proteinGoal,
        waterValue: 0,
        waterUnitLabel: usesGlasses ? 'vasos (250 ml)' : 'litros'
      }
    }

    const average = (key) =>
      days.reduce((sum, day) => sum + Number(day[key] || 0), 0) / days.length

    const avgProtein = Math.round(average('protein'))
    const avgWaterLiters = Math.round(average('waterLiters') * 10) / 10

    return {
      avgCalories: Math.round(average('calories')),
      avgProtein,
      proteinGoalPercent: Math.round((avgProtein / proteinGoal) * 100),
      daysOnTarget: days.filter((day) => Number(day.protein || 0) >= proteinGoal).length,
      totalDays: days.length,
      maxProtein: Math.max(proteinGoal, ...days.map((day) => Number(day.protein || 0))),
      // Respetar la unidad elegida por la usuaria (Feedback U03: María Ignacia Tapia)
      waterValue: usesGlasses ? Math.round((avgWaterLiters * 1000) / 250) : avgWaterLiters,
      waterUnitLabel: usesGlasses ? 'vasos (250 ml)' : 'litros'
    }
  }, [state.weeklySummary, state.userProfile.proteinGoalGrams, state.userProfile.preferredWaterUnit])

  // Ordenar alimentos frecuentes por uso (Feedback U05: Facundo Riquelme)
  const sortedFrequentFoods = useMemo(() => {
    return [...state.frequentFoods].sort((a, b) => (b.timesUsed || 0) - (a.timesUsed || 0))
  }, [state.frequentFoods])

  // Evaluar desbloqueo permanente de logros (Feedback U06: Javier Escudero - no re-bloquear logros ya conseguidos)
  const evaluateAchievements = (nextState) => {
    const currentUnlocked = new Set(nextState.habits.unlockedAchievementIds || [])
    const newlyUnlocked = []

    const completedActivities = nextState.habits.activities.filter((a) => a.completed)
    const completedTraining = completedActivities.filter((a) => a.category === 'entrenamiento')
    const completedNutrition = completedActivities.filter((a) => a.category === 'alimentacion')
    const points =
      (nextState.habits.bonusPoints || 0) +
      completedActivities.reduce((acc, a) => acc + Number(a.points || 0), 0)

    const unlockIfEligible = (achId, condition) => {
      if (condition && !currentUnlocked.has(achId)) {
        currentUnlocked.add(achId)
        const found = ACHIEVEMENTS_CATALOG.find((a) => a.id === achId)
        if (found) newlyUnlocked.push(found)
      }
    }

    unlockIfEligible('ach-1', completedActivities.length >= 1)
    unlockIfEligible('ach-2', nextState.habits.streakDays >= 5)
    unlockIfEligible('ach-3', completedTraining.length >= 3)
    unlockIfEligible('ach-4', completedNutrition.length >= 3)
    unlockIfEligible('ach-5', points >= 100)
    unlockIfEligible('ach-6', nextState.loggedFoods.length >= 4)

    if (newlyUnlocked.length > 0) {
      setRecentAchievement(newlyUnlocked[0])
    }

    return Array.from(currentUnlocked)
  }

  // --- Acciones para Meta 1: Registro de Calorías (Partes 2 y 3) ---
  const addFood = ({ name, calories, mealType = 'Comida', saveToFrequent = false }) => {
    const cleanName = String(name || '').trim()
    const numericCalories = Number(calories)
    if (!cleanName || Number.isNaN(numericCalories) || numericCalories <= 0) return false

    const now = new Date()
    const timeStr = now.toTimeString().slice(0, 5)

    setState((prev) => {
      const newEntry = {
        id: `log-${Date.now()}`,
        name: cleanName,
        calories: Math.round(numericCalories),
        mealType,
        timestamp: timeStr,
        isFrequent: Boolean(saveToFrequent)
      }

      let updatedFrequents = [...prev.frequentFoods]
      if (saveToFrequent) {
        const existingIndex = updatedFrequents.findIndex(
          (f) => f.name.toLowerCase() === cleanName.toLowerCase()
        )
        if (existingIndex >= 0) {
          updatedFrequents[existingIndex] = {
            ...updatedFrequents[existingIndex],
            calories: Math.round(numericCalories),
            timesUsed: (updatedFrequents[existingIndex].timesUsed || 1) + 1
          }
        } else {
          updatedFrequents.unshift({
            id: `freq-${Date.now()}`,
            name: cleanName,
            calories: Math.round(numericCalories),
            category: mealType,
            timesUsed: 1
          })
        }
      }

      const nextState = {
        ...prev,
        loggedFoods: [newEntry, ...prev.loggedFoods],
        frequentFoods: updatedFrequents
      }

      nextState.habits = {
        ...nextState.habits,
        unlockedAchievementIds: evaluateAchievements(nextState)
      }

      return nextState
    })

    return true
  }

  const addFrequentFoodToLog = (frequentFoodId) => {
    setState((prev) => {
      const target = prev.frequentFoods.find((f) => f.id === frequentFoodId)
      if (!target) return prev

      const now = new Date()
      const timeStr = now.toTimeString().slice(0, 5)

      const newEntry = {
        id: `log-${Date.now()}`,
        name: target.name,
        calories: target.calories,
        mealType: target.category || 'Frecuente',
        timestamp: timeStr,
        isFrequent: true
      }

      const updatedFrequents = prev.frequentFoods.map((f) =>
        f.id === frequentFoodId ? { ...f, timesUsed: (f.timesUsed || 0) + 1 } : f
      )

      const nextState = {
        ...prev,
        loggedFoods: [newEntry, ...prev.loggedFoods],
        frequentFoods: updatedFrequents
      }

      nextState.habits = {
        ...nextState.habits,
        unlockedAchievementIds: evaluateAchievements(nextState)
      }

      return nextState
    })
  }

  // Eliminar alimento mal ingresado (Feedback U02: Saimon Oyanedel)
  const removeLoggedFood = (logId) => {
    setState((prev) => ({
      ...prev,
      loggedFoods: prev.loggedFoods.filter((item) => item.id !== logId)
    }))
  }

  // --- Acciones para Meta 2: Consultor Nutricional (Parte 4) ---
  const askCoachQuestion = (questionText, explicitUnit = null) => {
    const cleanQ = String(questionText || '').trim()
    if (!cleanQ) return null

    const lower = cleanQ.toLowerCase()
    // Respetar unidad pedida en la pregunta o en la preferencia del usuario (Feedback U03: María Ignacia Tapia)
    const unitToUse = lower.includes('vaso')
      ? 'vasos'
      : lower.includes('litro') || lower.includes('lt')
        ? 'litros'
        : explicitUnit || state.userProfile.preferredWaterUnit || 'litros'

    let answer = ''
    let sourceId = 'src-minsal'

    if (lower.includes('agua') || lower.includes('hidrat') || lower.includes('litro') || lower.includes('vaso')) {
      const liters = state.userProfile.waterGoalLiters || 2.5
      const glasses = Math.round((liters * 1000) / 250)
      if (unitToUse === 'vasos') {
        answer = `Para tu nivel de actividad (${state.userProfile.trainingFrequency}), tu meta recomendada es de ${glasses} vasos de agua al día (equivalentes a ${liters} litros considerando vasos de 250 ml). En días de entrenamiento agrega 2 vasos extra.`
      } else {
        answer = `Para tu nivel de actividad (${state.userProfile.trainingFrequency}), tu meta recomendada es de ${liters} litros de agua al día (equivalentes a ${glasses} vasos de 250 ml). En días de entrenamiento suma 0.5 litros adicionales.`
      }
      sourceId = 'src-minsal'
    } else if (lower.includes('prote') || lower.includes('múscul') || lower.includes('muscul')) {
      answer = `Tu meta diaria está configurada en ${state.userProfile.proteinGoalGrams} g de proteína (rango óptimo de 1.6 a 2.0 g/kg según la ISSN). Puedes cubrirla distribuyendo ~30-35 g en tus 4 comidas principales (ej. huevos o avena al desayuno, pollo/legumbres al almuerzo y yogur o batido post-entreno).`
      sourceId = 'src-issn'
    } else if (lower.includes('calor') || lower.includes('bajar') || lower.includes('peso') || lower.includes('meta')) {
      const remaining = Math.max(0, state.userProfile.dailyCalorieGoal - totalCaloriesToday)
      answer = `Hoy llevas ${totalCaloriesToday} kcal registradas de tu meta de ${state.userProfile.dailyCalorieGoal} kcal (${calorieProgressPercent}%). Te quedan ${remaining} kcal disponibles hoy para mantener un balance energético sostenible sin afectar tu rendimiento académico ni deportivo.`
      sourceId = 'src-oms'
    } else {
      answer = `Según tus registros de los últimos 7 días (promedio 2.310 kcal y 124 g de proteína), mantener comidas simples como las que tienes en "Alimentos frecuentes" evita saltar horarios en semanas de certámenes. Revisa las porciones chilenas de referencia en el INTA.`
      sourceId = 'src-inta'
    }

    const newQA = {
      id: `q-${Date.now()}`,
      question: cleanQ,
      answer,
      unitUsed: unitToUse,
      sourceId,
      timestamp: 'Ahora mismo'
    }

    setState((prev) => ({
      ...prev,
      coachHistory: [newQA, ...prev.coachHistory]
    }))

    return newQA
  }

  // Permitir descartar respuestas para que el historial no crezca sin limite
  const removeCoachAnswer = (answerId) => {
    setState((prev) => ({
      ...prev,
      coachHistory: prev.coachHistory.filter((item) => item.id !== answerId)
    }))
  }

  // --- Acciones para Meta 3: Hábitos y Logros (Partes 5 y 6) ---
  const toggleHabitActivity = (activityId) => {
    setState((prev) => {
      const updatedActivities = prev.habits.activities.map((act) => {
        if (act.id !== activityId) return act
        const nextCompleted = !act.completed
        return {
          ...act,
          completed: nextCompleted,
          frequencyCount: nextCompleted
            ? (act.frequencyCount || 0) + 1
            : Math.max(0, (act.frequencyCount || 1) - 1)
        }
      })

      const nextState = {
        ...prev,
        habits: {
          ...prev.habits,
          activities: updatedActivities
        }
      }

      nextState.habits.unlockedAchievementIds = evaluateAchievements(nextState)
      return nextState
    })
  }

  const triggerQuickHabitAction = (category) => {
    setState((prev) => {
      const targetCategory = category === 'entrenamiento' ? 'entrenamiento' : 'alimentacion'
      let markedOne = false

      const updatedActivities = prev.habits.activities.map((act) => {
        if (!markedOne && act.category === targetCategory && !act.completed) {
          markedOne = true
          return {
            ...act,
            completed: true,
            frequencyCount: (act.frequencyCount || 0) + 1
          }
        }
        return act
      })

      const nextBonus = markedOne ? prev.habits.bonusPoints : (prev.habits.bonusPoints || 0) + 15

      const nextState = {
        ...prev,
        habits: {
          ...prev.habits,
          bonusPoints: nextBonus,
          activities: updatedActivities
        }
      }

      nextState.habits.unlockedAchievementIds = evaluateAchievements(nextState)
      return nextState
    })
  }

  // La actividad nueva queda pendiente: los puntos se ganan al completarla, no al crearla
  // (Feedback U06: Javier Escudero, el sistema de puntos debe tener sentido intuitivo).
  // Devuelve el id creado (o null) para que la página pueda resaltarla.
  const addCustomHabitActivity = ({ title, category = 'entrenamiento', points = 15 }) => {
    const cleanTitle = String(title || '').trim()
    if (!cleanTitle) return null

    const newId = `hab-${Date.now()}`

    setState((prev) => ({
      ...prev,
      habits: {
        ...prev.habits,
        activities: [
          ...prev.habits.activities,
          {
            id: newId,
            title: cleanTitle,
            category,
            points: Number(points) || 15,
            completed: false,
            frequencyCount: 0,
            isCustom: true
          }
        ]
      }
    }))
    return newId
  }

  // Quitar una actividad propia agregada por error (mismo criterio que removeLoggedFood, Feedback U02).
  // Los logros ya desbloqueados se mantienen.
  const removeHabitActivity = (activityId) => {
    setState((prev) => ({
      ...prev,
      habits: {
        ...prev.habits,
        activities: prev.habits.activities.filter((act) => act.id !== activityId)
      }
    }))
  }

  // Marca como vistos los logros desbloqueados (se llama al salir de la sección "Tus logros")
  const markAchievementsSeen = () => {
    setState((prev) => {
      const unlocked = prev.habits.unlockedAchievementIds || []
      const seen = prev.habits.seenAchievementIds
      if (seen && unlocked.every((id) => seen.includes(id))) return prev
      return { ...prev, habits: { ...prev.habits, seenAchievementIds: unlocked } }
    })
  }

  // --- Configuración de Perfil y Metas (Hipótesis de Activación / Personalización) ---
  const updateUserProfile = (partialProfile) => {
    setState((prev) => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        ...partialProfile
      }
    }))
  }

  const resetDemoData = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setState(INITIAL_STATE)
    setRecentAchievement(null)
  }

  const value = {
    state,
    userProfile: state.userProfile,
    loggedFoods: state.loggedFoods,
    frequentFoods: sortedFrequentFoods,
    habits: state.habits,
    coachHistory: state.coachHistory,
    achievementsCatalog: ACHIEVEMENTS_CATALOG,
    officialSources: OFFICIAL_SOURCES,
    weeklySummary: state.weeklySummary || [],
    weeklyStats,
    totalCaloriesToday,
    calorieProgressPercent,
    isOverCalorieGoal,
    totalHabitPoints,
    recentAchievement,
    clearAchievementNotification: () => setRecentAchievement(null),
    addFood,
    addFrequentFoodToLog,
    removeLoggedFood,
    askCoachQuestion,
    removeCoachAnswer,
    toggleHabitActivity,
    triggerQuickHabitAction,
    addCustomHabitActivity,
    removeHabitActivity,
    markAchievementsSeen,
    updateUserProfile,
    resetDemoData
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp debe utilizarse dentro de un <AppProvider>')
  }
  return context
}
