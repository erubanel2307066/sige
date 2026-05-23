import { useState, useEffect, useCallback } from 'react';
import { getStudentsByGroup } from '../services/studentsApi';
import { getTodayAttendance, upsertDailyRecord, addBehaviorTag, removeBehaviorTag } from '../services/attendanceApi';

const useStudentsData = (groupId) => {
    const [students, setStudents] = useState([]);
    const [studentsState, setStudentsState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const today = new Date().toISOString().split('T')[0];

    const fetchData = useCallback(async () => {
        if (!groupId) return;
        setIsLoading(true);
        try {
            // 1. Obtener lista de alumnos
            const studentData = await getStudentsByGroup(groupId);
            console.log("Hook - Estudiantes:", studentData);
            setStudents(studentData);

            // 2. Obtener asistencia y conducta de hoy
            const { bitacora, conducta } = await getTodayAttendance(groupId, today);
            console.log("Hook - Bitácora:", bitacora);
            console.log("Hook - Conducta:", conducta);

            // 3. Mapear datos al estado local
            const newState = {};
            studentData.forEach(s => {
                const daily = bitacora.find(b => b.alumno_id === s.id) || {};
                const tags = conducta
                    .filter(c => c.alumno_id === s.id)
                    .map(c => c.tag_id);

                newState[s.id] = {
                    attendance: daily.asistencia || null,
                    taskDelivered: daily.entrega_practica || false,
                    note: daily.notas || '',
                    tags: tags || []
                };
            });

            setStudentsState(newState);
            console.log('[fetchData] IDs de alumnos:', studentData.map(s => s.id));
            console.log('[fetchData] Claves de studentsState:', Object.keys(newState));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [groupId, today]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleAttendance = useCallback(async (studentId, status) => {
        const currentState = studentsState[studentId] || { attendance: null, taskDelivered: false, note: '', tags: [] };
        const newStatus = currentState.attendance === status ? null : status;

        console.log('[toggleAttendance] studentId:', studentId, '| newStatus:', newStatus);

        // Actualización optimista
        setStudentsState(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], attendance: newStatus }
        }));

        // Llamada a API
        await upsertDailyRecord(studentId, today, {
            ...currentState,
            attendance: newStatus
        });
    }, [studentsState, today]);

    const toggleTask = useCallback(async (studentId) => {
        const currentState = studentsState[studentId] || { attendance: null, taskDelivered: false, note: '', tags: [] };
        const newStatus = !currentState.taskDelivered;

        // Actualización optimista
        setStudentsState(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], taskDelivered: newStatus }
        }));

        // Llamada a API
        await upsertDailyRecord(studentId, today, {
            ...currentState,
            taskDelivered: newStatus
        });
    }, [studentsState, today]);

    const toggleTag = useCallback(async (studentId, tagId) => {
        const currentState = studentsState[studentId] || { attendance: null, taskDelivered: false, note: '', tags: [] };
        const currentTags = currentState.tags || [];
        const hasTag = currentTags.includes(tagId);

        const newTags = hasTag
            ? currentTags.filter(t => t !== tagId)
            : [...currentTags, tagId];

        // Actualización optimista
        setStudentsState(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], tags: newTags }
        }));

        // Llamada a API
        if (hasTag) {
            await removeBehaviorTag(studentId, tagId, today);
        } else {
            await addBehaviorTag(studentId, tagId, today);
        }
    }, [studentsState, today]);

    const saveNote = useCallback(async (studentId, newNote) => {
        const currentState = studentsState[studentId] || { attendance: null, taskDelivered: false, note: '', tags: [] };

        // Actualización optimista
        setStudentsState(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], note: newNote }
        }));

        // Llamada a API
        await upsertDailyRecord(studentId, today, {
            ...currentState,
            note: newNote
        });
    }, [studentsState, today]);

    return {
        students,
        studentsState,
        isLoading,
        error,
        toggleAttendance,
        toggleTask,
        toggleTag,
        saveNote,
        refresh: fetchData
    };
};

export default useStudentsData;
