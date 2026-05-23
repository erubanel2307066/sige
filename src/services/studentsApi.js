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
