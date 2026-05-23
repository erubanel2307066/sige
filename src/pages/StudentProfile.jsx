import React from 'react';
import { ChevronLeft, Download, AlertCircle, CheckCircle, HelpCircle, Activity, FileText, ClipboardList } from 'lucide-react';
import Header from '../components/layout/Header';

const StudentProfile = ({ student, onBack }) => {
    // Mock Data para el perfil
    const stats = {
        attendance: 85,
        tasks: 70,
        conduct: 8.5,
        status: 'atencion' // optimo, atencion, riesgo
    };

    const statusConfig = {
        optimo: { label: 'Rendimiento Óptimo', color: 'bg-emerald-500', icon: <CheckCircle className="text-white" size={20} />, text: 'text-emerald-700' },
        atencion: { label: 'Requiere Atención', color: 'bg-amber-500', icon: <HelpCircle className="text-white" size={20} />, text: 'text-amber-700' },
        riesgo: { label: 'En Riesgo Académico', color: 'bg-rose-500', icon: <AlertCircle className="text-white" size={20} />, text: 'text-rose-700' }
    };

    const currentStatus = statusConfig[stats.status];

    const timeline = [
        { date: '22 May', type: 'Conducta', content: 'Platicó en clase durante la explicación de variables.', icon: '🗣️' },
        { date: '15 May', type: 'Nota', content: 'Entregó la práctica de algoritmos muy completa.', icon: '⭐' },
        { date: '08 May', type: 'Asistencia', content: 'Llegó tarde a la primera hora (Retardo).', icon: '⏰' },
    ];

    return (
        <div className="bg-[#f4f6f8] min-h-screen pb-10 text-left">
            <Header
                title={`LISTA #${student.listNum}`}
                subtitle={student.name}
                showBack={true}
                onBack={onBack}
            />

            {/* Botón de Descarga Flotante/Header */}
            <div className="bg-[#691C32] px-4 pb-6 -mt-1 flex justify-end">
                <button className="flex items-center gap-2 bg-[#BC955C] text-[#691C32] px-5 py-2.5 rounded-xl font-black text-xs shadow-lg uppercase tracking-widest active:scale-95 transition-all">
                    <Download size={18} /> Descargar PDF
                </button>
            </div>

            <div className="p-5 space-y-6">

                {/* 1. Semáforo de Estado */}
                <div className={`p-5 rounded-3xl ${currentStatus.color} shadow-lg shadow-black/10 flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                            {currentStatus.icon}
                        </div>
                        <div className="text-white">
                            <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70">Estado Actual</p>
                            <h3 className="text-xl font-black italic">{currentStatus.label}</h3>
                        </div>
                    </div>
                    <Activity className="text-white/30" size={40} />
                </div>

                {/* 2. Proyección Trimestral (Estilo Excel Oficial) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="text-[#691C32]" size={24} />
                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Evaluación Trimestral</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Asistencias */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asistencias</span>
                                <span className="text-lg font-black text-gray-800">{stats.attendance}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                                <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${stats.attendance}%` }}></div>
                            </div>
                        </div>

                        {/* Prácticas */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prácticas Entregadas</span>
                                <span className="text-lg font-black text-gray-800">{stats.tasks}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                                <div className="h-full bg-[#1e3a8a] rounded-full" style={{ width: `${stats.tasks}%` }}></div>
                            </div>
                        </div>

                        {/* Guía de Observación */}
                        <div className="pt-4 border-t border-dashed border-gray-200">
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guía de Observación</p>
                                    <p className="text-xs text-rose-500 font-bold mt-0.5">-1.5 pts por conducta</p>
                                </div>
                                <div className="text-3xl font-black text-[#691C32]">
                                    {stats.conduct.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Timeline de Incidentes */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="text-[#691C32]" size={24} />
                        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Bitácora del Alumno</h3>
                    </div>

                    <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#BC955C] z-10"></div>
                                <div className="flex items-start gap-4">
                                    <span className="text-xl">{item.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-black text-[#691C32] uppercase tracking-wider">{item.type}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentProfile;
