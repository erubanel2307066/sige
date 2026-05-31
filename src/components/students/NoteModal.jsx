import React, { useState } from 'react';
import { X, Check, Edit3 } from 'lucide-react';

const NoteModal = ({ student, initialNote, onClose, onSave }) => {
    const [note, setNote] = useState(initialNote);

    return (
        <div className="fixed inset-0 z-[100] bg-[#1A1A1A]/80 backdrop-blur-sm flex items-end justify-center px-4 py-6 sm:items-center sm:px-6">
            <div className="w-full max-w-md overflow-hidden rounded-t-[32px] bg-white shadow-2xl sm:rounded-[32px]">
                <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] bg-[#691C32] px-5 py-4 text-white">
                    <div className="flex items-center gap-2">
                        <div className="grid h-11 w-11 place-items-center rounded-3xl bg-[#BC955C]/20 text-[#BC955C]">
                            <Edit3 size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#F8FAFC]/80">Bitácora</p>
                            <h2 className="mt-1 text-lg font-bold">BITÁCORA DE OBSERVACIÓN</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-2xl bg-white/10 p-2 text-white transition hover:bg-white/20">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-3xl bg-[#F8FAFC] flex items-center justify-center text-sm font-bold text-[#691C32]">
                            {student.listNum}
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Alumno</p>
                            <p className="text-sm font-bold text-slate-950 leading-tight">{student.name}</p>
                        </div>
                    </div>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Registre incidentes, justificaciones o notas de desempeño..."
                        className="w-full min-h-[160px] rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-[#691C32] focus:ring-2 focus:ring-[#691C32]/10 resize-none"
                        autoFocus
                    />
                </div>

                <div className="space-y-3 border-t border-slate-200 px-5 py-5 bg-slate-50">
                    <button
                        onClick={() => onSave(note)}
                        className="w-full rounded-3xl bg-[#691C32] py-3 text-sm font-semibold text-white transition hover:bg-[#501526] shadow-lg shadow-[#691C32]/15"
                    >
                        <span className="inline-flex items-center justify-center gap-2 uppercase tracking-[0.12em]">
                            <Check size={18} /> GUARDAR REGISTRO
                        </span>
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full rounded-3xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
