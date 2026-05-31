import { supabase } from './supabaseClient';

/**
 * Obtiene la lista de alumnos de un grupo específico.
 */
export const getStudentsByGroup = async (groupId) => {
    try {
        const { data, error } = await supabase
            .from('alumnos')
            .select('*')
            .eq('grupo_id', groupId)
            .order('numero_lista', { ascending: true });

        if (error) {
            console.error('Error de Supabase (Students):', error);
            throw error;
        }

        console.log("Datos de Supabase (Students - Raw):", data);
        if (data.length > 0) {
            console.log("[DEBUG] Claves del primer alumno:", Object.keys(data[0]));
            console.log("[DEBUG] Primer alumno raw:", JSON.stringify(data[0]));
        }

        // Mapear propiedades de supabase a lo que espera react
        // IMPORTANTE: la columna en BD se llama 'identificación' (con tilde)
        const mappedData = data.map(s => ({
            id: s['identificación'] ?? s.identificacion ?? s.id,
            name: s.nombre_completo,
            listNum: s.numero_lista,
            listNumber: s.numero_lista,
            groupId: s.grupo_id
        }));

        return mappedData;
    } catch (error) {
        console.error('Error fetching students:', error.message);
        return [];
    }
};

/**
 * Obtiene todo el historial (bitácora diaria + registros de conducta) de un alumno
 * @param {string} alumnoId
 * @returns {Promise<{bitacora: Array, conducta: Array}>}
 */
export const getStudentHistory = async (alumnoId) => {
    try {
        if (!alumnoId) return { bitacora: [], conducta: [] };

        const { data: bitacora, error: bError } = await supabase
            .from('bitacora_diaria')
            .select('*')
            .eq('alumno_id', alumnoId)
            .order('fecha', { ascending: true });

        const { data: conducta, error: cError } = await supabase
            .from('registros_conducta')
            .select('*')
            .eq('alumno_id', alumnoId)
            .order('fecha', { ascending: true });

        if (bError) throw bError;
        if (cError) throw cError;

        return { bitacora: bitacora || [], conducta: conducta || [] };
    } catch (error) {
        console.error('[getStudentHistory] Error:', error.message || error);
        return { bitacora: [], conducta: [] };
    }
};

export const getActiveTrimester = async () => {
    try {
        const { data, error } = await supabase
            .from('configuracion_escolar')
            .select('trimestre_actual')
            .eq('id', 1)
            .single();

        if (error) {
            console.error('[getActiveTrimester] Error:', error);
            throw error;
        }

        return data?.trimestre_actual ?? 1;
    } catch (error) {
        console.error('[getActiveTrimester] Error:', error.message || error);
        return 1;
    }
};

export const updateActiveTrimester = async (num) => {
    try {
        const { data, error } = await supabase
            .from('configuracion_escolar')
            .update({ trimestre_actual: num })
            .eq('id', 1);

        if (error) {
            console.error('[updateActiveTrimester] Error:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('[updateActiveTrimester] Error:', error.message || error);
        return null;
    }
};

export const promoteStudents = async () => {
    try {
        const stepOne = await supabase
            .from('alumnos')
            .update({ estatus: false, grupo_id: 'Graduados' })
            .eq('grupo_id', '3D');

        if (stepOne.error) {
            throw stepOne.error;
        }

        const stepTwo = await supabase
            .from('alumnos')
            .update({ grupo_id: '3D' })
            .eq('grupo_id', '2D');

        if (stepTwo.error) {
            throw stepTwo.error;
        }

        const stepThree = await supabase
            .from('alumnos')
            .update({ grupo_id: '2D' })
            .eq('grupo_id', '1D');

        if (stepThree.error) {
            throw stepThree.error;
        }

        return true;
    } catch (error) {
        console.error('[promoteStudents] Error:', error.message || error);
        return false;
    }
};

export const bulkInsertStudents = async (namesArray) => {
    try {
        const sanitized = namesArray
            .map(name => name?.trim())
            .filter(Boolean);

        if (sanitized.length === 0) {
            return [];
        }

        const { data: lastRow, error: fetchError } = await supabase
            .from('alumnos')
            .select('numero_lista')
            .eq('grupo_id', '1D')
            .order('numero_lista', { ascending: false })
            .limit(1)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        const startListNumber = (lastRow?.numero_lista ?? 0) + 1;
        const inserts = sanitized.map((nombre_completo, index) => ({
            nombre_completo,
            numero_lista: startListNumber + index,
            grupo_id: '1D',
            estatus: true
        }));

        const { data, error: insertError } = await supabase
            .from('alumnos')
            .insert(inserts);

        if (insertError) {
            throw insertError;
        }

        return data;
    } catch (error) {
        console.error('[bulkInsertStudents] Error:', error.message || error);
        return [];
    }
};
