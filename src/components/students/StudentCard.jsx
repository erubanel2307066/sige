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
    const attendance = state.attendance;

    const attendanceButtons = [
        { key: 'P', label: 'P', selected: attendance === 'P', selectedClass: 'bg-[#22C55E] text-white' },
        { key: 'R', label: 'R', selected: attendance === 'R', selectedClass: 'bg-[#F59E0B] text-white' },
        { key: 'A', label: 'A', selected: attendance === 'A', selectedClass: 'bg-[#EF4444] text-white' },
    ];

    return (
        <div className="bg-white rounded-[24px] border border-slate-200 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-3xl bg-slate-100 flex items-center justify-center text-sm font-extrabold text-slate-700">
                        {student.listNum}
                    </div>
                    <div className="min-w-0">
                        <button onClick={onOpenProfile} className="text-left">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Alumno</p>
                            <h3 className="mt-1 text-[18px] font-bold text-slate-950 leading-tight">{student.name}</h3>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-center gap-3">
                {attendanceButtons.map((btn) => (
                    <button
                        key={btn.key}
                        onClick={() => onAttendance(student.id, btn.key)}
                        className={`w-[60px] h-[60px] rounded-3xl text-lg font-black transition-all ${btn.selected ? btn.selectedClass : 'bg-slate-100 text-slate-500 border border-slate-200'}`}
                        aria-label={`Marcar asistencia ${btn.label}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onTaskToggle(student.id)}
                className={`mt-5 w-full h-12 rounded-3xl border text-sm font-semibold transition-all ${state.taskDelivered ? 'bg-[#22C55E]/10 border-[#22C55E] text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            >
                Práctica
            </button>

            <div className="mt-4">
                <BehaviorTags activeTags={state.tags || []} onToggle={(tagId) => onTagToggle(student.id, tagId)} />
            </div>

            <button
                onClick={() => onOpenNotes(student)}
                className="mt-5 w-full h-12 rounded-3xl bg-[#7A1235] text-white font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#962f4b]"
            >
                <Edit3 size={18} /> Editar alumno
            </button>
        </div>
    );
};

export default StudentCard;
