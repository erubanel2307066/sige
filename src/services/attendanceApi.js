import { supabase } from './supabaseClient';

/**
 * Obtiene la asistencia y conducta de hoy para un grupo.
 */
export const getTodayAttendance = async (groupId, date) => {
    try {
        // 1. Obtener registros de bitácora diaria
        const { data: bitacora, error: bError } = await supabase
            .from('bitacora_diaria')
            .select('*')
            .eq('fecha', date);

        // 2. Obtener registros de conducta
        const { data: conducta, error: cError } = await supabase
            .from('registros_conducta')
            .select('*')
            .eq('fecha', date);

        if (bError) throw bError;
        if (cError) throw cError;

        return { bitacora, conducta };
    } catch (error) {
        console.error('Error fetching today attendance:', error.message);
        return { bitacora: [], conducta: [] };
    }
};

/**
 * Guarda o actualiza un registro de asistencia/práctica.
 */
export const upsertDailyRecord = async (alumnoId, date, data) => {
    try {
        if (!alumnoId) {
            console.error('[upsertDailyRecord] alumnoId es undefined, cancelando.');
            return false;
        }
        const { error } = await supabase
            .from('bitacora_diaria')
            .upsert({
                alumno_id: alumnoId,
                fecha: date,
                asistencia: data.attendance,
                entrega_practica: data.taskDelivered,
                notas: data.note,
            }, { onConflict: 'alumno_id,fecha' });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error upserting daily record:', error.message);
        return false;
    }
};

/**
 * Agrega un tag de conducta.
 */
export const addBehaviorTag = async (alumnoId, tagId, date) => {
    try {
        if (!alumnoId) {
            console.error('[addBehaviorTag] alumnoId es undefined, cancelando.');
            return false;
        }
        const { error } = await supabase
            .from('registros_conducta')
            .insert({
                alumno_id: alumnoId,
                tag_id: tagId,
                fecha: date
            });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error adding behavior tag:', error.message);
        return false;
    }
};

/**
 * Elimina un tag de conducta.
 */
export const removeBehaviorTag = async (alumnoId, tagId, date) => {
    try {
        const { error } = await supabase
            .from('registros_conducta')
            .delete()
            .eq('alumno_id', alumnoId)
            .eq('tag_id', tagId)
            .eq('fecha', date);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error removing behavior tag:', error.message);
        return false;
    }
};
