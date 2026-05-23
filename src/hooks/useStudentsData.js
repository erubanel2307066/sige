import { useState, useCallback } from 'react';
import { STUDENTS_1D } from '../utils/constants';

const useStudentsData = (initialGroupId) => {
    const [studentsState, setStudentsState] = useState(() => {
        // Inicialización predeterminada para demo con 1D
        const initialState = {};
        STUDENTS_1D.forEach(s => {
            initialState[s.id] = { attendance: null, taskDelivered: false, tags: [], note: '' };
        });
        return initialState;
    });

    const toggleAttendance = useCallback((studentId, status) => {
        setStudentsState(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                attendance: prev[studentId].attendance === status ? null : status
            }
        }));
    }, []);

    const toggleTask = useCallback((studentId) => {
        setStudentsState(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                taskDelivered: !prev[studentId].taskDelivered
            }
        }));
    }, []);

    const toggleTag = useCallback((studentId, tagId) => {
        setStudentsState(prev => {
            const currentTags = prev[studentId]?.tags || [];
            const hasTag = currentTags.includes(tagId);
            const newTags = hasTag ? currentTags.filter(t => t !== tagId) : [...currentTags, tagId];
            return {
                ...prev,
                [studentId]: { ...prev[studentId], tags: newTags }
            };
        });
    }, []);

    const saveNote = useCallback((studentId, newNote) => {
        setStudentsState(prev => ({
            ...prev,
            [studentId]: { ...prev[studentId], note: newNote }
        }));
    }, []);

    return {
        studentsState,
        toggleAttendance,
        toggleTask,
        toggleTag,
        saveNote
    };
};

export default useStudentsData;
