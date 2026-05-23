import { BEHAVIOR_TAGS } from './constants';

/**
 * Calcula la calificación de asistencia basada en una regla de 3 (Escala 0-10).
 */
export const calculateAttendanceGrade = (presents, totalClasses) => {
    if (!totalClasses || totalClasses === 0) return 10;
    return Number(((presents / totalClasses) * 10).toFixed(1));
};

/**
 * Calcula la calificación de prácticas entregadas (Escala 0-10).
 */
export const calculateTasksGrade = (delivered, totalTasks) => {
    if (!totalTasks || totalTasks === 0) return 0;
    return Number(((delivered / totalTasks) * 10).toFixed(1));
};

/**
 * Calcula la Guía de Observación (Conducta).
 * Base 10, suma o resta según el impacto de los tags activos.
 */
export const calculateConductGrade = (activeTagIds = []) => {
    let score = 10;

    activeTagIds.forEach(id => {
        const tag = BEHAVIOR_TAGS.find(t => t.id === id);
        if (tag && tag.impact) {
            score += tag.impact;
        }
    });

    // Limitar entre 0 y 10
    return Number(Math.min(10, Math.max(0, score)).toFixed(1));
};
