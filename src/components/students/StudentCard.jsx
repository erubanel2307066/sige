import React from 'react';
import { FileText, Edit3 } from 'lucide-react';
import BehaviorTags from './BehaviorTags';

const StudentCard = ({
    student,
    state,
    onAttendance,
    onTaskToggle,
    onTagToggle,
    onOpenNotes,
    onOpenProfile
}) => {
    const isAttended = state.attendance !== null;

    // Determinar color de borde basado en asistencia
    let statusBorder = 'border-gray-200';
    let accentColor = 'transparent';

    if (state.attendance === 'P') {
        statusBorder = 'border-l-8 border-l-[#10b981] border-gray-100';
        accentColor = '#10b981';
    } else if (state.attendance === 'R') {
        statusBorder = 'border-l-8 border-l-[#f59e0b] border-gray-100';
        accentColor = '#f59e0b';
    } else if (state.attendance === 'A') {
        statusBorder = 'border-l-8 border-l-[#ef4444] border-gray-100';
        accentColor = '#ef4444';
    }

    return (
        <div className={`bg-white rounded-3xl shadow-sm border ${statusBorder} overflow-hidden transition-all duration-300 text-left mb-4`}>

            {/* Fila 1: Info del Alumno */}
            <div
                onClick={onOpenProfile}
                className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gradient-to-r from-transparent to-gray-50/30 active:bg-gray-100 cursor-pointer"
            >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-transparent"
                    style={{ borderColor: state.attendance ? accentColor : 'transparent' }}>
                    <span className="text-sm font-black text-gray-500">{student.listNum}</span>
                </div>
                <h3 className="text-[16px] font-extrabold text-gray-800 leading-tight uppercase tracking-tight">
                    {student.name}
                </h3>
            </div>

            {/* Fila 2: Controles de Asistencia y Práctica */}
            <div className="p-4 flex items-center justify-between gap-4">
                {/* Asistencias (Robustos) */}
                <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-2 shadow-inner border border-gray-200">
                    <button
                        onClick={() => onAttendance(student.id, 'P')}
                        className={`w-12 h-12 rounded-xl font-black text-[18px] transition-all transform active:scale-90 ${state.attendance === 'P' ? 'bg-[#10b981] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
                    >P</button>
                    <button
                        onClick={() => onAttendance(student.id, 'R')}
                        className={`w-12 h-12 rounded-xl font-black text-[18px] transition-all transform active:scale-90 ${state.attendance === 'R' ? 'bg-[#f59e0b] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
                    >R</button>
                    <button
                        onClick={() => onAttendance(student.id, 'A')}
                        className={`w-12 h-12 rounded-xl font-black text-[18px] transition-all transform active:scale-90 ${state.attendance === 'A' ? 'bg-[#ef4444] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
                    >A</button>
                </div>

                {/* Botón Práctica (Azul Institucional) */}
                <button
                    onClick={() => onTaskToggle(student.id)}
                    className={`flex-1 h-14 rounded-2xl flex flex-col items-center justify-center font-black transition-all transform active:scale-95 ${state.taskDelivered
                        ? 'bg-[#1e3a8a] text-white shadow-xl shadow-blue-900/30'
                        : 'bg-white text-gray-400 border-2 border-gray-100'
                        }`}
                >
                    <FileText size={22} />
                    <span className="text-[9px] uppercase tracking-[2px] mt-0.5">Práctica</span>
                </button>
            </div>

            {/* Fila 3: Conducta y Notas */}
            <div className="px-4 pb-4 flex items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden">
                    <BehaviorTags
                        activeTags={state.tags || []}
                        onToggle={(tagId) => onTagToggle(student.id, tagId)}
                    />
                </div>

                <button
                    onClick={() => onOpenNotes(student)}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-all transform active:scale-95 ${state.note
                        ? 'bg-[#BC955C] text-[#691C32] border-[#691C32]'
                        : 'bg-gray-50 text-gray-300 border-gray-100'
                        }`}
                >
                    <Edit3 size={24} />
                </button>
            </div>
        </div>
    );
};

export default StudentCard;
