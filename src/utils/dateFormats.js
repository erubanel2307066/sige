/**
 * Devuelve información del día actual ajustada para pruebas.
 * Si es fin de semana (Sábado/Domingo) o Viernes tarde, devuelve Martes (2) para la demo.
 */
export const getCurrentDayInfo = () => {
    const daysNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date();
    let day = date.getDay();

    // Ajuste para pruebas: si es Domingo (0), Viernes (5) o Sábado (6), forzamos Martes (2)
    const isWeekendOrFriday = [0, 5, 6].includes(day);

    if (isWeekendOrFriday) {
        day = 2; // Martes
    }

    return {
        dayIndex: day,
        dayName: daysNames[day]
    };
};
