import React, { useState } from 'react';
import { X, Check, Edit3 } from 'lucide-react';

const NoteModal = ({ student, initialNote, onClose, onSave }) => {
    const [note, setNote] = useState(initialNote);

    return (
        <div className="fixed inset-0 bg-[#1A1A1A]/80 z-[100] flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm transition-all text-left">
            <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">

                {/* Header Modal */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#691C32] text-white">
                    <h3 className="font-bold flex items-center gap-2 text-[14px] tracking-[2px] text-[#BC955C] uppercase">
                        <Edit3 size={18} /> BITÁCORA DE OBSERVACIÓN
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full transition-colors bg-white/10 active:bg-white/20">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-[#BC955C] flex items-center justify-center font-black text-[#691C32]">
                            {student.listNum}
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Estudiante</p>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{student.name}</p>
                        </div>
                    </div>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Registre incidentes, justificaciones o notas de desempeño..."
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-[15px] min-h-[160px] focus:outline-none focus:border-[#BC955C] focus:bg-white transition-all resize-none shadow-inner text-gray-700"
                        autoFocus
                    />
                </div>

                {/* Footer */}
                <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 text-xs font-black text-gray-400 active:bg-gray-200 rounded-xl transition-colors uppercase tracking-widest"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(note)}
                        className="px-6 py-3 bg-[#691C32] active:bg-[#501526] text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-lg shadow-[#691C32]/30 transition-all transform active:scale-95 uppercase tracking-widest"
                    >
                        <Check size={18} /> Guardar Registro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
