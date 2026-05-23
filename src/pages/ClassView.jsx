import React, { useState } from 'react';
import Header from '../components/layout/Header';
import SearchBar from '../components/shared/SearchBar';
import StudentCard from '../components/students/StudentCard';
import useStudentsData from '../hooks/useStudentsData';
import NoteModal from '../components/students/NoteModal';

const ClassView = ({
    selectedGroup,
    students,
    onBack,
    onOpenProfile
}) => {
    const {
        studentsState,
        toggleAttendance,
        toggleTask,
        toggleTag,
        saveNote
    } = useStudentsData(selectedGroup?.id);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [activeNoteModal, setActiveNoteModal] = useState(null);

    const triggerSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 500);
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#f4f6f8] min-h-screen pb-24 flex flex-col relative overflow-hidden">
            <Header
                title={isSaving ? "GUARDANDO..." : "REGISTRO ACTIVO"}
                subtitle={selectedGroup?.fullName}
                showBack={true}
                onBack={onBack}
                rightIcon={true}
            />

            {/* Barra de Búsqueda Integrada */}
            <div className="bg-[#691C32] px-4 pb-4 shadow-xl -mt-1">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Buscar apellido del alumno..."
                />
            </div>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-center px-2 mb-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">
                        Lista de Alumnos ({filteredStudents.length})
                    </p>
                </div>

                {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            state={studentsState[student.id] || {}}
                            onAttendance={(id, status) => { toggleAttendance(id, status); triggerSave(); }}
                            onTaskToggle={(id) => { toggleTask(id); triggerSave(); }}
                            onTagToggle={(sid, tid) => { toggleTag(sid, tid); triggerSave(); }}
                            onOpenNotes={setActiveNoteModal}
                            onOpenProfile={() => onOpenProfile(student)}
                        />
                    ))
                ) : (
                    <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 text-gray-400 font-bold italic">
                        No se encontraron alumnos con ese nombre.
                    </div>
                )}
            </div>

            {activeNoteModal && (
                <NoteModal
                    student={activeNoteModal}
                    initialNote={studentsState[activeNoteModal.id]?.note || ''}
                    onClose={() => setActiveNoteModal(null)}
                    onSave={(newNote) => {
                        saveNote(activeNoteModal.id, newNote);
                        setActiveNoteModal(null);
                        triggerSave();
                    }}
                />
            )}
        </div>
    );
};

export default ClassView;
