import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { exportGroupToExcel, exportGroupToPDF } from '../services/reportsApi';
import SearchBar from '../components/shared/SearchBar';
import StudentCard from '../components/students/StudentCard';
import useStudentsData from '../hooks/useStudentsData';
import NoteModal from '../components/students/NoteModal';

const ClassView = ({
    selectedGroup,
    onBack,
    onOpenProfile
}) => {
    const {
        students,
        studentsState,
        isLoading,
        toggleAttendance,
        toggleTask,
        toggleTag,
        saveNote
    } = useStudentsData(selectedGroup?.id);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [activeNoteModal, setActiveNoteModal] = useState(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const triggerSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 500);
    };

    const handleExport = async () => {
        if (!selectedGroup || students.length === 0) return;
        try {
            setIsExporting(true);
            // exportGroupToExcel will fetch histories if needed
            await exportGroupToExcel(selectedGroup.id, students);
        } catch (err) {
            console.error('Export error:', err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleGeneratePDF = async () => {
        if (!selectedGroup || students.length === 0) return;
        try {
            setIsGeneratingPDF(true);
            await exportGroupToPDF(selectedGroup.id, students);
        } catch (err) {
            console.error('PDF generation error:', err);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="bg-[#f4f6f8] min-h-screen flex flex-col items-center justify-center p-10">
                <div className="w-12 h-12 border-4 border-[#691C32] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#691C32] font-black uppercase tracking-widest text-xs animate-pulse">Cargando lista de alumnos...</p>
            </div>
        );
    }

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
            <div className="bg-[#691C32] px-4 pb-4 shadow-xl -mt-1 flex items-center gap-4">
                <div className="flex-1">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Buscar apellido del alumno..."
                    />
                </div>

                <div className="pr-2">
                    <div className="flex items-center gap-2">
                        <button
                            disabled={!selectedGroup || students.length === 0 || isExporting}
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-[#BC955C] text-[#691C32] px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isExporting ? 'Generando...' : 'Descargar Excel'}
                        </button>

                        <button
                            disabled={!selectedGroup || students.length === 0 || isGeneratingPDF}
                            onClick={handleGeneratePDF}
                            className="flex items-center gap-2 border border-[#BC955C] text-[#691C32] px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isGeneratingPDF ? 'Generando...' : 'Generar Acta PDF'}
                        </button>
                    </div>
                </div>
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
