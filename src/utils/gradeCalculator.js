/**
 * src/utils/gradeCalculator.js
 * Motor de reglas de evaluación para la Esc. Sec. Gral. Miguel Hidalgo y Costilla
 */

// 1. LÓGICA DEL SEMÁFORO
export const getStudentStatus = (projectedGrade) => {
    // De 8.0 hacia arriba -> Óptimo (Verde)
    if (projectedGrade >= 8.0) {
        return 'good';
    }
    // De 7.0 a 7.9 -> Requiere Atención (Ámbar)
    else if (projectedGrade >= 7.0) {
        return 'warning';
    }
    // Menor a 7.0 (6.9 hacia abajo) -> Riesgo (Rojo)
    else {
        return 'danger';
    }
};

// 2. CÁLCULO DE ASISTENCIA (Escala de 10)
export const calculateAttendanceScore = (attendedClasses, totalClasses) => {
    if (totalClasses === 0) return 10.0;
    const score = (attendedClasses / totalClasses) * 10;
    return Number(score.toFixed(1)); // Redondea a 1 decimal (ej. 8.5)
};

// 3. CÁLCULO DE PRÁCTICAS (Escala de 10)
export const calculateTasksScore = (deliveredTasks, totalTasks) => {
    if (totalTasks === 0) return 10.0;
    const score = (deliveredTasks / totalTasks) * 10;
    return Number(score.toFixed(1));
};

// 4. CÁLCULO DE GUÍA DE OBSERVACIÓN (Base 10 + Penalizaciones)
export const calculateObservationScore = (behaviorTags = []) => {
    let baseScore = 10.0;

    // Valores definidos en tus requerimientos
    const tagImpacts = {
        'play': -0.5, // 🎮 Jugó
        'talk': -0.5, // 🗣️ Platicó
        'out': -1.0,  // 🏃 Se salió sin permiso
        'lazy': -1.0, // ❌ No trabajó
        'star': +0.5  // ⭐ Trabajo destacado
    };

    behaviorTags.forEach(tagId => {
        if (tagImpacts[tagId]) {
            baseScore += tagImpacts[tagId];
        }
    });

    // Aseguramos que la calificación no pase de 10 ni baje de 6 (mínimo aprobatorio)
    if (baseScore > 10.0) return 10.0;
    if (baseScore < 6.0) return 6.0;

    return Number(baseScore.toFixed(1));
};

// 5. CÁLCULO FINAL (Proyección Trimestral)
export const calculateFinalProjectedGrade = (attendance, tasks, observation) => {
    // Promedio simple de los 3 rubros diarios.
    const final = (attendance + tasks + observation) / 3;
    return Number(final.toFixed(1));
};
