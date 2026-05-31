import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { exportGroupToExcel, exportGroupToPDF } from '../services/reportsApi';
import SearchBar from '../components/shared/SearchBar';
import StudentCard from '../components/students/StudentCard';
import useStudentsData from '../hooks/useStudentsData';
import NoteModal from '../components/students/NoteModal';

const ClassView = ({
    selectedGroup,
    onBack,
    onOpenProfile,
    onSignOut
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

    const groupLabel = selectedGroup?.id || selectedGroup?.fullName || '3° D';
    const groupSubtitle = selectedGroup?.fullName && selectedGroup?.fullName !== selectedGroup?.id ? selectedGroup.fullName : 'Tecnología';

    if (isLoading) {
        return (
            <div className="bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center p-10">
                <div className="w-14 h-14 border-4 border-[#7A1235] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#0F172A] font-semibold uppercase tracking-[0.3em] text-xs animate-pulse">Cargando alumnos...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-28">
            <div className="px-4 pt-5 pb-4">
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={onBack}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:bg-slate-50"
                        aria-label="Volver"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <div className="min-w-0 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Lista de Clase</p>
                        <p className="mt-1 text-base font-bold text-slate-950">{groupLabel}</p>
                    </div>
                    <button
                        onClick={onSignOut}
                        className="hidden h-11 rounded-3xl bg-[#7A1235] px-4 text-sm font-semibold text-white transition hover:bg-[#962f4b] md:inline-flex"
                    >
                        Salir
                    </button>
                </div>

                <div className="mt-4 rounded-[28px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Grupo</p>
                            <h1 className="mt-1 text-2xl font-bold text-slate-950 leading-tight">{groupLabel}</h1>
                            <p className="mt-1 text-sm text-slate-500">{groupSubtitle}</p>
                        </div>
                        <div className="rounded-3xl bg-[#F1F5F9] px-4 py-3 text-center">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">Alumnos</p>
                            <p className="mt-1 text-2xl font-bold text-slate-950">{students.length}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="🔍 Buscar alumno..." />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                        disabled={!selectedGroup || students.length === 0 || isExporting}
                        onClick={handleExport}
                        className="inline-flex h-12 items-center justify-center rounded-3xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isExporting ? 'Generando...' : 'Excel'}
                    </button>
                    <button
                        disabled={!selectedGroup || students.length === 0 || isGeneratingPDF}
                        onClick={handleGeneratePDF}
                        className="inline-flex h-12 items-center justify-center rounded-3xl bg-[#7A1235] text-sm font-semibold text-white transition hover:bg-[#962f4b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isGeneratingPDF ? 'Generando...' : 'PDF'}
                    </button>
                </div>
            </div>

            <div className="px-4 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Lista de Alumnos ({filteredStudents.length})
                </div>

                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
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
                    <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
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
